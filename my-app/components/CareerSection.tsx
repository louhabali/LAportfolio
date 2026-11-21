"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ArrowUpRight, Award, BookOpen, Clapperboard, GraduationCap, MapPin, X } from "lucide-react";

type Chapter = {
  id: string;
  year: string;
  title: string;
  organization: string;
  place: string;
  image: string;
  imageAlt: string;
  short: string;
  details: string;
  skills: string[];
  source?: { label: string; href: string };
};

const chapters: Chapter[] = [
  {
    id: "01", year: "2019—2020", title: "The First Frame", organization: "Lycée Zerktouni", place: "Guercif, Morocco", image: "/education-zektouni.jpg", imageAlt: "Entrance to Lycée Zerktouni", short: "Baccalaureate · Physical Sciences · French option", source: { label: "Lycée Zerktouni", href: "https://lycee-zerktouni-guercif.fr.gd/" },
    details: "My science foundation began at Lycée Zerktouni, where I completed the Physical Sciences baccalaureate in the French option.", skills: ["Physical sciences", "Mathematics", "Scientific reasoning", "French-language study"],
  },
  {
    id: "02", year: "2020—2021", title: "Out of the Coop", organization: "IRTSE Fouarat", place: "Kénitra, Morocco", image: "/education-irtse.jpg", imageAlt: "Royal emblem representing IRTSE", short: "Aviculture studies · Discipline, time management & deadlines",
    details: "At the Institut Royal des Techniciens Spécialisés en Élevage, I studied the aviculture option. The year taught me practical discipline, time management, and how to respect deadlines; I also explored introductory IT topics.", skills: ["Aviculture", "Discipline", "Time management", "Deadline ownership", "Introductory IT"], source: { label: "Ministry of Agriculture", href: "https://www.agriculture.gov.ma/" },
  },
  {
    id: "03", year: "2021—2023", title: "The Digital Turn", organization: "Centre Mixte de Formation Professionnelle · OFPPT", place: "Oujda, Morocco", image: "/education-ofppt.png", imageAlt: "OFPPT logo", short: "Digital Development · Web Full Stack foundations",
    details: "At OFPPT’s Centre Mixte in Oujda, I trained in digital development and built a broad foundation spanning programming fundamentals through full-stack web development. I also studied project methods and tools such as Jira, UML, and Docker.", skills: ["Algorithms & OOP", "Python", "JavaScript & React", "PHP & Laravel", "HTML, CSS & Bootstrap", "Jira, UML & Docker"], source: { label: "OFPPT", href: "https://www.ofppt.ma/" },
  },
  {
    id: "04", year: "2024—2026", title: "The Peer-Learning Years", organization: "Zone01 Oujda", place: "Oujda, Morocco", image: "/education-zone01.jpg", imageAlt: "Zone01 Oujda logo", short: "Software engineering · Project-based, peer-to-peer learning",
    details: "At Zone01 Oujda, I learn by building, researching independently, and collaborating with peers. The program’s project-driven rhythm has strengthened my problem solving, consistency, teamwork, and ability to deliver against deadlines.", skills: ["Peer learning", "Project-based development", "Problem solving", "Team collaboration", "Delivery discipline"], source: { label: "Zone01 Oujda", href: "https://zone01oujda.ma/" },
  },
];

type Certificate = { year: string; title: string; issuer: string; image: string; alt: string; details: string; source?: { label: string; href: string } };

const certificates: Certificate[] = [
  { year: "2025", title: "Entreprise Management", issuer: "Attijariwafa bank", image: "/certificate-attijari.png", alt: "Attijariwafa bank logo", details: "Certificate in entreprise management, completed in 2025.", source: { label: "Attijariwafa bank", href: "https://www.attijariwafabank.com/" } },
  { year: "2026", title: "Work Readiness", issuer: "EFE Maroc", image: "/certificate-efe.jpg", alt: "EFE logo", details: "Work readiness certificate from EFE Maroc, completed in 2026.", source: { label: "EFE Maroc", href: "https://efemaroc.org/" } },
  { year: "2021", title: "Entrepreneurial Innovation Programme", issuer: "PIE · OFPPT", image: "/certificate-pie.jpg", alt: "PIE entrepreneurial innovation programme logo", details: "PIE certificate from OFPPT, completed in 2021. The programme introduces entrepreneurial thinking through practical, learn-by-doing activities.", source: { label: "PIE · OFPPT", href: "https://pie.ofppt.ma/" } },
];

type Selection = { kind: "chapter"; item: Chapter } | { kind: "certificate"; item: Certificate };

export function CareerSection() {
  const [selected, setSelected] = useState<Selection | null>(null);
  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.body.classList.add("career-modal-open");
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; document.body.classList.remove("career-modal-open"); };
  }, [selected]);

  return <>
    <section id="experience" className="career-section" aria-labelledby="career-title">
      <div className="section-heading"><div><div className="eyebrow">A LIFE IN CHAPTERS · 2019—2026</div><h2 id="career-title">The story so far</h2></div><span className="section-aside">Education, experience & the turns that shaped me.</span></div>
      <div className="chapter-rail">{chapters.map((chapter) => <button className="chapter-card" key={chapter.id} onClick={() => setSelected({ kind: "chapter", item: chapter })} aria-label={`Open ${chapter.title} chapter`}>
        <span className={`chapter-poster chapter-poster-${chapter.id}`}><Image src={chapter.image} alt={chapter.imageAlt} fill sizes="(max-width: 640px) 104px, 120px" /><span className="chapter-image-light" /><span className="chapter-number">CHAPTER {chapter.id}</span><span className="chapter-play"><Clapperboard size={17} /></span></span>
        <span className="chapter-copy"><span className="chapter-year">{chapter.year} <i>·</i> {chapter.place}</span><strong>{chapter.title}</strong><span className="chapter-organization">{chapter.organization}</span><span className="chapter-synopsis">{chapter.short}</span><span className="chapter-more">VIEW CHAPTER <ArrowUpRight size={12} /></span></span>
      </button>)}</div>
      <div className="certificate-heading"><div><div className="eyebrow">BONUS FEATURES · 3 CERTIFICATES</div><h3>Recognitions</h3></div><Award size={19} /></div>
      <div className="certificate-grid">{certificates.map((certificate) => <button className="certificate-card" key={certificate.issuer} onClick={() => setSelected({ kind: "certificate", item: certificate })}>
        <span className="certificate-art"><Image src={certificate.image} alt={certificate.alt} fill sizes="(max-width: 640px) 82vw, 250px" /><span className="certificate-image-light" /></span><span className="certificate-copy"><span>{certificate.year} · CERTIFICATE</span><strong>{certificate.title}</strong><small>{certificate.issuer}</small><i>OPEN DETAILS <ArrowUpRight size={11} /></i></span>
      </button>)}</div>
    </section>
    {selected && typeof document !== "undefined" && createPortal(<div className="career-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className={`career-modal career-modal-${selected.kind}`} role="dialog" aria-modal="true" aria-labelledby="career-modal-title">
      <button className="icon-button career-modal-close" onClick={() => setSelected(null)} aria-label="Close details"><X size={19} /></button>
      <div className="career-modal-image"><span className="career-modal-kicker">{selected.kind === "chapter" ? `THE STORY · CHAPTER ${selected.item.id}` : "OFFICIAL RECOGNITION"}</span><span className="career-modal-index">{selected.item.year}</span><span className="career-image-frame"><Image src={selected.item.image} alt={selected.kind === "chapter" ? selected.item.imageAlt : selected.item.alt} fill sizes="(max-width: 640px) 58vw, 390px" /></span><i className="career-modal-sheen" /></div>
      <div className="career-modal-body"><div className="eyebrow">{selected.kind === "chapter" ? `CHAPTER ${selected.item.id} · ${selected.item.year}` : `${selected.item.year} · CERTIFICATE`}</div><h2 id="career-modal-title">{selected.item.title}</h2><div className="career-modal-org">{selected.kind === "chapter" ? selected.item.organization : selected.item.issuer}</div>
        {selected.kind === "chapter" && <div className="career-modal-place"><MapPin size={13} /> {selected.item.place}</div>}<p>{selected.item.details}</p>
        {selected.kind === "chapter" ? <><h3><BookOpen size={14} /> Skills & focus</h3><div className="career-skill-list">{selected.item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></> : <div className="certificate-note"><GraduationCap size={16} /> Credential added to the story</div>}
        {selected.item.source && <a className="career-modal-source" href={selected.item.source.href} target="_blank" rel="noreferrer">{selected.item.source.label} website <ArrowUpRight size={14} /></a>}
      </div>
    </section></div>, document.body)}
  </>;
}
