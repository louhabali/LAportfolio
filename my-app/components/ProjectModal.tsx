"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubMark } from "@/components/GithubMark";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "architecture">("overview");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!project) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [project, onClose]);
  if (!project) return null;
  const copyCommand = async () => { await navigator.clipboard.writeText(project.command); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className={`modal-banner banner-${project.theme}`}><button className="icon-button modal-close" onClick={onClose} aria-label="Close project details"><X /></button><span className="eyebrow">{project.category} · {project.year}</span><h2 id="project-modal-title">{project.name}</h2><p>{project.tagline}</p></div>
      <div className="modal-body"><div className="modal-score"><span className="match">{project.match} Match</span><span>{project.environment}</span><span>{project.year}</span></div>
        <div className="modal-tabs" role="tablist" aria-label="Project details"><button role="tab" aria-selected={tab === "overview"} className={tab === "overview" ? "selected" : ""} onClick={() => setTab("overview")}>Overview</button><button role="tab" aria-selected={tab === "architecture"} className={tab === "architecture" ? "selected" : ""} onClick={() => setTab("architecture")}>System architecture</button></div>
        {tab === "overview" ? <div className="modal-overview"><p className="modal-description">{project.description}</p><h3>What it does</h3><ul className="highlight-list">{project.highlights.map((highlight) => <li key={highlight}><span>▸</span>{highlight}</li>)}</ul><h3>Technology stack</h3><div className="tag-cloud">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div> : <div className="architecture-map"><div className="eyebrow">SERVICE TOPOLOGY</div>{project.architecture.map((line, index) => <div className="architecture-line" key={line}><span>{String(index + 1).padStart(2, "0")}</span><code>{line}</code></div>)}</div>}
        <div className="copy-command"><div><span className="cli-prompt">$</span> <code>{project.command}</code></div><button onClick={copyCommand} aria-label="Copy terminal command">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy"}</button></div>
        <div className="modal-links">{project.github ? <a className="button button-light" href={project.github} target="_blank" rel="noreferrer"><GithubMark size={16} /> View on GitHub <ExternalLink size={14} /></a> : <span className="source-note">Source repository not matched yet</span>}<button className="button button-dark" onClick={onClose}>Close details</button></div>
      </div>
    </section>
  </div>;
}
