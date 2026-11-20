import { ArrowUpRight, BriefcaseBusiness, GraduationCap } from "lucide-react";

const entries = [
  {
    type: "PROJECT EXPERIENCE",
    title: "Full-Stack & Systems Development",
    organization: "Independent and collaborative projects",
    description: "Built full-stack applications and backend systems across travel, streaming, e-commerce, social publishing, and low-level networking projects.",
    icon: BriefcaseBusiness,
  },
  {
    type: "TRAINING",
    title: "Java Full-Stack Development",
    organization: "Zone01 Oujda · Morocco",
    description: "Project-based software development training through peer learning, collaboration, and self-directed problem solving.",
    icon: GraduationCap,
  },
];

export function CareerSection() {
  return <section id="experience" className="career-section" aria-labelledby="career-title">
    <div className="section-heading"><div><div className="eyebrow">HOW I LEARN AND BUILD</div><h2 id="career-title">Experience & education</h2></div><a className="career-profile-link" href="https://www.linkedin.com/in/louhabali/" target="_blank" rel="noreferrer">View LinkedIn <ArrowUpRight size={15} /></a></div>
    <div className="career-grid">{entries.map(({ type, title, organization, description, icon: Icon }) => <article className="career-card" key={title}>
      <div className="career-card-top"><span>{type}</span><Icon size={19} /></div><h3>{title}</h3><div className="career-organization">{organization}</div><p>{description}</p>
      {type === "TRAINING" && <a className="career-source" href="https://dev.zone01oujda.ma/en" target="_blank" rel="noreferrer">Zone01 Oujda <ArrowUpRight size={13} /></a>}
    </article>)}</div>
  </section>;
}
