"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, Film, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubMark } from "@/components/GithubMark";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;
  return <ProjectModalContent key={project.slug} project={project} onClose={onClose} />;
}

function ProjectModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "architecture">("overview");
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [onClose]);

  return <div className="modal-backdrop project-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className={`project-modal project-modal-${project.theme}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className={`modal-poster banner-${project.theme}`}>
        <span className="modal-poster-orb" /><span className="modal-poster-orb modal-poster-orb-two" /><span className="modal-poster-grid" />
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close project details"><X /></button>
        <span className="eyebrow"><Film size={12} /> {project.category} · {project.year}</span>
        <div className="modal-poster-number">{project.rank ? String(project.rank).padStart(2, "0") : "ST"}</div>
        <div className="modal-poster-copy"><div className="modal-poster-kicker">A LOUHAB ORIGINAL</div><h2 id="project-modal-title">{project.name}</h2><p>{project.tagline}</p></div>
        <div className="modal-poster-footer"><span>{project.environment}</span><span>{project.match} MATCH</span></div>
      </div>
      <div className="modal-body">
        <div className="modal-score"><span className="match">{project.match} Match</span><span>{project.category}</span><span>{project.year}</span></div>
        <div className="modal-tabs" role="tablist" aria-label="Project details"><button role="tab" aria-selected={tab === "overview"} className={tab === "overview" ? "selected" : ""} onClick={() => setTab("overview")}>Story</button><button role="tab" aria-selected={tab === "architecture"} className={tab === "architecture" ? "selected" : ""} onClick={() => setTab("architecture")}>Behind the build</button></div>
        {tab === "overview" ? <div className="modal-overview"><p className="modal-description">{project.description}</p><h3>FEATURES</h3><ul className="highlight-list">{project.highlights.map((highlight) => <li key={highlight}><span>✦</span>{highlight}</li>)}</ul><h3>COMPLETE TECHNOLOGY CREDITS <span className="stack-count">{String(project.stack.length).padStart(2, "0")}</span></h3><div className="tag-cloud project-stack-cloud">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div> : <div className="architecture-map"><div className="eyebrow">SYSTEM CREDITS · {project.architecture.length} SCENES</div>{project.architecture.map((line, index) => <div className="architecture-line" key={line}><span>{String(index + 1).padStart(2, "0")}</span><code>{line}</code></div>)}</div>}
        <div className="modal-links">{project.github && <a className="button button-light" href={project.github} target="_blank" rel="noreferrer"><GithubMark size={16} /> Explore source <ExternalLink size={14} /></a>}<button className="button button-dark" onClick={onClose}>Back to the collection <ArrowUpRight size={14} /></button></div>
      </div>
    </section>
  </div>;
}
