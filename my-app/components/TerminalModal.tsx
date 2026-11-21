"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Award, Film, GraduationCap, Mail, Sparkles, Terminal, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";

type Output = { command: string; lines: string[] };
const email = "louhabali@gmail.com";
const github = "https://github.com/louhabali";
const chapters = ["2019—2020  Lycée Zerktouni · Physical Sciences, French option", "2020—2021  IRTSE Fouarat · Aviculture", "2021—2023  OFPPT Oujda · Digital Development", "2024—2026  Zone01 Oujda · Project-based software engineering"];
const certificates = ["2025  Attijariwafa bank · Entreprise Management", "2026  EFE Maroc · Work Readiness", "2021  PIE / OFPPT · Entrepreneurial Innovation Programme"];

export function TerminalModal({ open, onClose, onInspect }: { open: boolean; onClose: () => void; onInspect: (project: Project) => void }) {
  const [value, setValue] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([{ command: "", lines: ["Welcome to the ALILO studio console.", "Explore the projects, chapters, certificates, and contact details.", "Type 'help' or choose a cue below."] }]);
  const input = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; input.current?.focus(); const key = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key); }, [open, onClose]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [outputs]);
  if (!open) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const command = value.trim(); const [verb, ...args] = command.split(/\s+/); const arg = args.join(" ");
    let lines: string[] = [];
    switch (verb?.toLowerCase()) {
      case "help": lines = ["help               show this guide", "whoami             meet the developer", "films              list every project", "top                featured films", "open <slug>        open a project's film card", "chapters           education and experience timeline", "certs              certificates", "stack              technologies across the projects", "contact            contact details", "clear              clear this screen", "exit               close the console"]; break;
      case "whoami": lines = ["ALI LOUHAB · SOFTWARE DEVELOPER", "Full-stack applications, backend systems, and hands-on learning.", "Currently learning at Zone01 Oujda."]; break;
      case "films": lines = projects.map((project) => `${project.slug.padEnd(18)} ${project.name}  ·  ${project.stack.length} technologies`); break;
      case "ls": lines = projects.map((project) => `${project.slug.padEnd(18)} ${project.name}`); break;
      case "top": lines = projects.filter((project) => project.isFlagship).map((project) => `#${project.rank}  ${project.name}  ·  ${project.match} match  ·  ${project.tagline}`); break;
      case "chapters": case "education": case "experience": lines = chapters; break;
      case "certs": case "certificates": lines = certificates; break;
      case "stack": {
        const stack = [...new Set(projects.flatMap((project) => project.stack))];
        lines = [`${stack.length} technologies across ${projects.length} projects`, ...Array.from({ length: Math.ceil(stack.length / 5) }, (_, index) => stack.slice(index * 5, index * 5 + 5).join(" · "))];
        break;
      }
      case "about": lines = ["Ali Louhab · Guercif → Kénitra → Oujda", "Science foundation, digital development, then collaborative software engineering.", "The next chapter is still being written."]; break;
      case "contact": lines = [`Email: ${email}`, `GitHub: ${github}`, "Use the contact links on the page to open either destination."]; break;
      case "open": { const project = projects.find((item) => item.slug === arg.toLowerCase()); if (project) { onClose(); onInspect(project); } else lines = [`No film found for '${arg}'. Try 'films'.`]; break; }
      case "clear": setOutputs([]); setValue(""); return;
      case "exit": onClose(); setValue(""); return;
      case "": return;
      default: lines = [`Unknown cue: ${verb}. Type 'help' to see the console guide.`];
    }
    setOutputs((previous) => [...previous, { command, lines }]); setValue("");
  };

  return <div className="modal-backdrop terminal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="terminal-modal" role="dialog" aria-modal="true" aria-labelledby="terminal-title">
    <div className="terminal-head"><div className="window-dots"><i /><i /><i /></div><div className="terminal-brand"><span className="terminal-head-icon"><Terminal size={13} /></span><span><strong id="terminal-title">ALILO STUDIO</strong><small>INTERACTIVE PORTFOLIO CONSOLE</small></span></div><span className="terminal-status"><i /> ONLINE</span><button className="icon-button" onClick={onClose} aria-label="Close console"><X size={19} /></button></div>
    <div className="terminal-body" onClick={() => input.current?.focus()}>{outputs.map((output, index) => <div className="terminal-output" key={`${output.command}-${index}`}>{output.command && <div className="terminal-command-line"><span className="cli-prompt">ali@alilo:~$</span> {output.command}</div>}{output.lines.map((line) => <p key={line}>{line.startsWith("Email: ") ? <><span>Email: </span><a href={`mailto:${email}`}>{email}</a></> : line.startsWith("GitHub: ") ? <><span>GitHub: </span><a href={github} target="_blank" rel="noreferrer">github.com/louhabali</a></> : line}</p>)}</div>)}<div ref={end} />
      <form className="terminal-form" onSubmit={submit}><label className="cli-prompt" htmlFor="terminal-input">ali@alilo:~$</label><input ref={input} id="terminal-input" value={value} onChange={(event) => setValue(event.target.value)} autoComplete="off" spellCheck={false} aria-label="Console command" /><span className="cursor">▋</span></form>
    </div>
    <div className="terminal-quick-cues"><span><Sparkles size={12} /> QUICK CUES</span>{[{ label: "films", icon: Film }, { label: "chapters", icon: GraduationCap }, { label: "certs", icon: Award }, { label: "contact", icon: Mail }].map(({ label, icon: Icon }) => <button key={label} onClick={() => { setValue(label); input.current?.focus(); }}><Icon size={12} />{label}</button>)}</div>
    <div className="terminal-hint">TRY <code>open social-network</code> <span>PRESS ENTER · ESC TO CLOSE</span></div>
  </section></div>;
}
