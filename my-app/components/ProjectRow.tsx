"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubMark } from "@/components/GithubMark";

function ProjectCard({ project, featured, onInspect }: { project: Project; featured: boolean; onInspect: (project: Project) => void }) {
  return <article className={`project-card ${featured ? "featured-card" : ""} card-${project.theme}`}>
    <button className="card-open" onClick={() => onInspect(project)} aria-label={`Inspect ${project.name}`}>
      <div className="card-art" onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      }}>
        {featured && <span className="rank-number">{String(project.rank).padStart(2, "0")}</span>}
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        {featured && <div className="project-schematic" aria-hidden="true"><div className="schematic-label">SYSTEM FLOW <span>● LIVE</span></div><div className="schematic-flow"><span>CLIENT</span><i /><span className="schematic-core">{project.stack[1]?.toUpperCase() ?? "API"}</span><i /><span>DATA</span></div><div className="schematic-stack">{project.stack.slice(0, 3).join(" · ")}</div></div>}
        <span className="art-code">{project.slug.toUpperCase()}<br /><i>ONLINE · {project.year}</i></span>
        <span className="art-open"><ArrowUpRight size={18} /></span>
      </div>
      <div className="card-copy"><div className="card-title-row"><h3>{project.name}</h3><span className="match">{project.match}</span></div>
        <p>{project.tagline}</p><div className="card-tech">{project.stack.slice(0, featured ? 5 : 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
      </div>
    </button>
    <div className="card-footer"><span>{project.environment}</span>{project.github ? <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}><GithubMark size={15} /> Source</a> : <span className="source-unavailable">Source unavailable</span>}</div>
  </article>;
}

export function ProjectRow({ title, subtitle, projects, featured = false, onInspect }: { title: string; subtitle: string; projects: Project[]; featured?: boolean; onInspect: (project: Project) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => rail.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  return <section className="project-section">
    <div className="section-heading"><div><div className="eyebrow">{subtitle}</div><h2>{title}</h2></div>
      <div className="rail-controls"><button onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}><ArrowLeft size={17} /></button><button onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}><ArrowRight size={17} /></button></div>
    </div>
    <div className="project-rail" ref={rail} role="list">{projects.map((project) => <div role="listitem" key={project.slug}><ProjectCard project={project} featured={featured} onInspect={onInspect} /></div>)}</div>
  </section>;
}
