"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubMark } from "@/components/GithubMark";

function ProjectCard({ project, featured, onInspect }: { project: Project; featured: boolean; onInspect: (project: Project) => void }) {
  return <article className={`project-card ${featured ? "featured-card" : ""} card-${project.theme}`}>
    <button className="card-open" onClick={() => onInspect(project)} aria-label={`Play ${project.name} film`}>
      <div className="card-art" onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      }}>
        {featured && <span className="rank-number">{String(project.rank).padStart(2, "0")}</span>}
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <div className="project-schematic" aria-hidden="true"><div className="schematic-label"><span>THE TECHNICAL CUT</span><i>{project.stack.length} ELEMENTS</i></div><div className="schematic-film-title">{project.name}</div><div className="schematic-flow"><span>APP</span><i /><span className="schematic-core">{project.stack[0]?.toUpperCase() ?? "CODE"}</span><i /><span>DATA</span></div><div className="schematic-stack">{project.stack.slice(0, 4).join(" · ")}{project.stack.length > 4 ? ` · +${project.stack.length - 4}` : ""}</div></div>
        <span className="art-code">{project.slug.toUpperCase()}<br /><i>ONLINE · {project.year}</i></span>
        <span className="art-open"><Play size={14} fill="currentColor" /></span>
      </div>
      <div className="card-copy"><div className="card-title-row"><h3>{project.name}</h3><span className="match">{project.match}</span></div>
        <p>{project.tagline}</p><div className="card-tech">{project.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}{project.stack.length > 3 && <span className="stack-remainder">+{project.stack.length - 3} more</span>}</div>
      </div>
    </button>
    <div className="card-footer"><span>{featured ? "FEATURED FILM" : "FROM THE COLLECTION"}</span>{project.github ? <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source on GitHub`}><GithubMark size={15} /> View source <ArrowUpRight size={12} /></a> : <span className="source-unavailable">Details</span>}</div>
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
