"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { flagships, type Project } from "@/data/projects";
import { GithubMark } from "@/components/GithubMark";

export function HeroBillboard({ onInspect }: { onInspect: (project: Project) => void }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const project = flagships[active];
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % flagships.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return <section id="home" className={`hero hero-${project.theme}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-cinema-art" aria-hidden="true"><span className="cinema-ring cinema-ring-one" /><span className="cinema-ring cinema-ring-two" /><span className="cinema-prism" /><span className="cinema-caption">A LOUHAB ORIGINAL <i>·</i> FEATURED</span><span className="cinema-index">{String(active + 1).padStart(2, "0")} <i>/ 03</i></span></div>
    <div className="hero-content" key={project.slug}>
      <div className="eyebrow"><span className="live-dot" /> FLAGSHIP ORIGINAL #{project.rank} <span className="eyebrow-divider">/</span> {project.environment}</div>
      <h1>{project.name}</h1>
      <div className="hero-meta"><strong className="match">{project.match} Match</strong><span>{project.year}</span><span className="meta-pill">{project.category}</span></div>
      <h2>{project.tagline}</h2>
      <p className="hero-description">A story told through code. Open the film to see the full story, stack, and system design.</p>
      <div className="hero-stack">{project.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
      <div className="hero-actions">
        <button className="button button-light" onClick={() => onInspect(project)}><Play size={16} fill="currentColor" /> Play film</button>
        {project.github ? <a className="button button-dark" href={project.github} target="_blank" rel="noreferrer"><GithubMark size={17} /> Source code <ArrowUpRight size={15} /></a> : <button className="button button-dark" onClick={() => onInspect(project)}>Film details <ArrowUpRight size={15} /></button>}
      </div>
    </div>
    <div className="hero-bottom">
      <a className="scroll-cue" href="#flagships"><ArrowDown size={15} /> Scroll to explore</a>
      <div className="hero-indicators" aria-label="Choose featured project">{flagships.map((item, index) => <button key={item.slug} onClick={() => setActive(index)} aria-label={`Show ${item.name}`} aria-current={active === index} className={active === index ? "active" : ""}><span>{String(index + 1).padStart(2, "0")}</span><i /></button>)}</div>
    </div>
  </section>;
}
