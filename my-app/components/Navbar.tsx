"use client";

import { useEffect, useState } from "react";
import { Menu, Terminal, X } from "lucide-react";

const links = ["Home", "Flagships", "Systems", "Experience", "Stack", "Contact"];
const sectionIds = ["home", "flagships", "systems", "experience", "stack", "contact"];

export function Navbar({ onTerminal }: { onTerminal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 32) setActiveLink("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 32) { setActiveLink("contact"); return; }
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
        {links.map((link, index) => <a key={link} href={`#${sectionIds[index]}`} className={activeLink === sectionIds[index] ? "active" : ""} onClick={() => setActiveLink(sectionIds[index])}><span className="nav-index">{String(index + 1).padStart(2, "0")}</span>{link}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="terminal-trigger" onClick={onTerminal} aria-label="Open portfolio studio console">
          <span className="terminal-live-dot" aria-hidden="true" /><Terminal size={16} /><span className="terminal-trigger-label">Open console</span><kbd>Ctrl K</kbd>
        </button>
        <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <span className="nav-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map((link, index) => <a key={link} href={`#${sectionIds[index]}`} className={activeLink === sectionIds[index] ? "active" : ""} onClick={() => { setActiveLink(sectionIds[index]); setMenuOpen(false); }}><span className="nav-index">{String(index + 1).padStart(2, "0")}</span>{link}</a>)}
        <button onClick={() => { setMenuOpen(false); onTerminal(); }}><Terminal size={16} /> Open studio console</button>
      </nav>}
    </header>
  );
}
