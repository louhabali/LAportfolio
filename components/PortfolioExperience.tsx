"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Command } from "lucide-react";
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
        <div id="flagships"><ProjectRow title="Featured films" subtitle="THE ORIGINALS · 01—03" projects={flagships} featured onInspect={inspect} /></div>
        <div id="systems"><ProjectRow title="The project collection" subtitle="MORE STORIES FROM THE STUDIO" projects={coreProjects} onInspect={inspect} /></div>
        <section className="about-strip" aria-labelledby="about-title">
          <div className="portrait-stage"><div className="portrait-frame"><Image src="/ali-louhab.png" alt="Portrait of Ali Louhab" width={220} height={270} sizes="(max-width: 640px) 124px, 220px" /><span className="portrait-light" /><span className="portrait-index">AL / 01</span></div><span className="portrait-caption">THE PERSON BEHIND THE PROJECTS</span></div>
          <div className="about-copy"><div className="eyebrow">A PERSONAL CUT · SOFTWARE DEVELOPER</div><h2 id="about-title">Ali Louhab<span className="about-title-period">.</span></h2><div className="about-role">FULL-STACK · BACKEND · SYSTEMS</div><p>Curious by nature, I build digital products from the interface down to the infrastructure. I enjoy untangling complex problems, learning in public, and making software that feels thoughtful to use.</p>
            <div className="about-reel"><span>ORIGIN</span><i /> <span>GUERCIF, MOROCCO</span><i /> <span>NOW</span><i /> <span>OUJDA</span></div>
            <div className="about-links"><a href="mailto:louhabali@gmail.com">Contact Ali <span>louhabali@gmail.com</span><ArrowUpRight size={14} /></a><a href="https://github.com/louhabali" target="_blank" rel="noreferrer"><GithubMark size={15} /> GitHub <span>VIEW THE WORK</span><ArrowUpRight size={14} /></a></div>
          </div>
        </section>
        <CareerSection />
        <TechMatrix />
      </div>
    </main>
    <Footer />
    <button className="floating-cli" onClick={() => setTerminalOpen(true)} aria-label="Open portfolio console"><Command size={18} /><span>Console</span></button>
    <ProjectModal project={selected} onClose={closeProject} />
    <TerminalModal open={terminalOpen} onClose={closeTerminal} onInspect={inspect} />
  </>;
}
