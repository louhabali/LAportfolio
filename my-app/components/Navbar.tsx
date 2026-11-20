"use client";

import { useEffect, useState } from "react";
import { Menu, Terminal, X } from "lucide-react";

const links = ["Home", "Flagships", "Systems", "Experience", "Stack", "Contact"];
const sectionIds = ["home", "flagships", "systems", "experience", "stack", "contact"];

export function Navbar({ onTerminal }: { onTerminal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveLink(visible.target.id);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1, 0.35] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
      <a href="#home" className="brand" aria-label="ALILO home">ALILO<span>_</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} className={activeLink === link.toLowerCase() ? "active" : ""}>{link}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="terminal-trigger" onClick={onTerminal} aria-label="Open command line terminal">
          <span className="terminal-live-dot" aria-hidden="true" /><Terminal size={16} /><span className="terminal-trigger-label">Try the CLI</span><kbd>Ctrl K</kbd>
        </button>
        <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} className={activeLink === link.toLowerCase() ? "active" : ""} onClick={() => setMenuOpen(false)}>{link}</a>)}
        <button onClick={() => { setMenuOpen(false); onTerminal(); }}><Terminal size={16} /> Open terminal</button>
      </nav>}
    </header>
  );
}
