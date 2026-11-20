"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Command } from "lucide-react";
import { GithubMark } from "@/components/GithubMark";
import { Navbar } from "@/components/Navbar";
import { HeroBillboard } from "@/components/HeroBillboard";
import { ProjectRow } from "@/components/ProjectRow";
import { ProjectModal } from "@/components/ProjectModal";
import { TerminalModal } from "@/components/TerminalModal";
import { ProfileGate } from "@/components/ProfileGate";
import { TechMatrix } from "@/components/TechMatrix";
import { Footer } from "@/components/Footer";
import { CareerSection } from "@/components/CareerSection";
import { coreProjects, flagships, type Project } from "@/data/projects";

export function PortfolioExperience() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const closeProject = useCallback(() => setSelected(null), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);
  const inspect = useCallback((project: Project) => setSelected(project), []);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setTerminalOpen(true); } };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  return <>
    <ProfileGate />
    <Navbar onTerminal={() => setTerminalOpen(true)} />
    <main>
      <HeroBillboard onInspect={inspect} />
      <div className="catalog-shell">
        <div id="flagships"><ProjectRow title="Top 3 flagship systems" subtitle="FEATURED WORK · 01—03" projects={flagships} featured onInspect={inspect} /></div>
        <div id="systems"><ProjectRow title="Core & full-stack systems" subtitle="MORE FROM THE CATALOG" projects={coreProjects} onInspect={inspect} /></div>
        <section className="about-strip" aria-labelledby="about-title"><div className="portrait-frame"><Image src="/ali-louhab.png" alt="Portrait of Ali Louhab" width={76} height={92} sizes="76px" /></div><div className="about-copy"><div className="eyebrow">BUILDING IN PUBLIC, LEARNING IN DEPTH</div><h2 id="about-title">Ali Louhab</h2><p>Software developer focused on full-stack applications, backend systems, and deployment workflows. I like understanding a system from its user experience down to the infrastructure that keeps it running.</p><div className="about-links"><a href="mailto:louhabali@gmail.com">louhabali@gmail.com</a><a href="https://www.linkedin.com/in/louhabali/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/louhabali" target="_blank" rel="noreferrer"><GithubMark size={15} /> GitHub <span>↗</span></a></div></div></section>
        <CareerSection />
        <TechMatrix />
      </div>
    </main>
    <Footer />
    <button className="floating-cli" onClick={() => setTerminalOpen(true)} aria-label="Open portfolio terminal"><Command size={18} /><span>Try CLI</span></button>
    <ProjectModal project={selected} onClose={closeProject} />
    <TerminalModal open={terminalOpen} onClose={closeTerminal} onInspect={inspect} />
  </>;
}
