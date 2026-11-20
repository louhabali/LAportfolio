"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { projects, type Project } from "@/data/projects";

type Output = { command: string; lines: string[] };

export function TerminalModal({ open, onClose, onInspect }: { open: boolean; onClose: () => void; onInspect: (project: Project) => void }) {
  const [value, setValue] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([{ command: "", lines: ["ALILO portfolio terminal · type 'help' for available commands."] }]);
  const input = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; input.current?.focus(); const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key); }, [open, onClose]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [outputs]);
  if (!open) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const command = value.trim(); const [verb, ...args] = command.split(/\s+/); const arg = args.join(" ");
    let lines: string[] = [];
    switch (verb?.toLowerCase()) {
      case "help": lines = ["help                 show this help", "whoami               about the developer", "ls                   list all projects", "top                  list flagship systems", "open <slug>          inspect a project", "stack                show primary technologies", "contact              contact links", "clear                clear the terminal", "exit                 close the terminal"]; break;
      case "whoami": lines = ["Ali Louhab · software developer", "Building full-stack products and exploring distributed systems."]; break;
      case "ls": lines = projects.map((p) => `${p.slug.padEnd(18)} ${p.name}`); break;
      case "top": lines = projects.filter((p) => p.isFlagship).map((p) => `#${p.rank}  ${p.name}  ·  ${p.match} match`); break;
      case "stack": lines = ["Java · Spring Boot · Angular · TypeScript · Go · Docker · Kubernetes · PostgreSQL · Neo4j · Kafka"]; break;
      case "contact": lines = ["GitHub: github.com/louhabali"]; break;
      case "open": { const project = projects.find((p) => p.slug === arg.toLowerCase()); if (project) { onClose(); onInspect(project); } else lines = [`No project found for '${arg}'. Try 'ls'.`]; break; }
      case "clear": setOutputs([]); setValue(""); return;
      case "exit": onClose(); setValue(""); return;
      case "": return;
      default: lines = [`command not found: ${verb}. Type 'help' to see available commands.`];
    }
    setOutputs((prev) => [...prev, { command, lines }]); setValue("");
  };

  return <div className="modal-backdrop terminal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="terminal-modal" role="dialog" aria-modal="true" aria-labelledby="terminal-title">
    <div className="terminal-head"><div className="window-dots"><i /><i /><i /></div><span id="terminal-title">ali@alilo: ~/portfolio</span><button className="icon-button" onClick={onClose} aria-label="Close terminal"><X size={19} /></button></div>
    <div className="terminal-body" onClick={() => input.current?.focus()}>{outputs.map((output, index) => <div className="terminal-output" key={`${output.command}-${index}`}>{output.command && <div><span className="cli-prompt">ali@alilo:~$</span> {output.command}</div>}{output.lines.map((line) => <p key={line}>{line}</p>)}</div>)}<div ref={end} />
      <form className="terminal-form" onSubmit={submit}><label className="cli-prompt" htmlFor="terminal-input">ali@alilo:~$</label><input ref={input} id="terminal-input" value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal command" /><span className="cursor">▋</span></form>
    </div>
    <div className="terminal-hint">TRY <code>top</code> · <code>open engineo</code> · <code>stack</code> <span>ESC TO CLOSE</span></div>
  </section></div>;
}
