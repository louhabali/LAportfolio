"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Code2, Cpu, X } from "lucide-react";

const profiles = [
  { name: "Recruiter", detail: "Product thinking & delivery", icon: BriefcaseBusiness },
  { name: "Tech Lead", detail: "Architecture & systems", icon: Cpu },
  { name: "Peer Dev", detail: "Code & implementation", icon: Code2 },
];

export function ProfileGate() {
  const [visible, setVisible] = useState<boolean | null>(null);
  useEffect(() => { const frame = requestAnimationFrame(() => setVisible(!(sessionStorage.getItem("alilo-entered") || sessionStorage.getItem("aliflix-entered")))); return () => cancelAnimationFrame(frame); }, []);
  const enter = () => { sessionStorage.setItem("alilo-entered", "yes"); sessionStorage.removeItem("aliflix-entered"); setVisible(false); };
  if (!visible) return null;
  return <div className="gate-overlay" role="dialog" aria-modal="true" aria-labelledby="gate-title">
    <button className="gate-skip" onClick={enter}><X size={16} /> Skip / Enter</button>
    <div className="gate-content">
      <div className="eyebrow">A L I L O _ &nbsp; · &nbsp; PORTFOLIO OS</div>
      <h1 id="gate-title">Who&apos;s watching?</h1>
      <p>Choose a lens. Explore the same work from a different angle.</p>
      <div className="profile-grid">{profiles.map(({ name, detail, icon: Icon }) => <button className="profile-choice" key={name} onClick={enter}>
        <span className="profile-icon"><Icon size={30} /></span><strong>{name}</strong><small>{detail}</small>
      </button>)}</div>
      <button className="gate-enter" onClick={enter}>Enter portfolio <span>→</span></button>
    </div>
  </div>;
}
