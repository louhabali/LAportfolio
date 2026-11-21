import {
  siAnsible, siAngular, siApachekafka, siApachemaven, siBootstrap, siDocker,
  siElasticsearch, siGo, siGrafana, siHtml5, siJavascript, siJenkins, siJira,
  siK3s, siKubernetes, siLaravel, siMaterialdesign, siMongodb, siMysql, siNeo4j,
  siNextdotjs, siNginx, siOpenjdk, siPhp, siPostgresql, siPostman, siPrometheus,
  siPython, siReact, siRedis, siRust, siSonar, siSpringboot, siSpringsecurity,
  siSqlite, siSwagger, siTailwindcss, siUml, siVagrant,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { TechLogo } from "@/components/TechLogo";

type StackItem = { name: string; icon?: SimpleIcon; mark?: string };
const item = (name: string, icon?: SimpleIcon, mark?: string): StackItem => ({ name, icon, mark });

const groups: { title: string; id: string; items: StackItem[] }[] = [
  { title: "Frontend & UI", id: "01", items: [
    item("HTML", siHtml5), item("CSS", undefined, "CSS"), item("JavaScript", siJavascript), item("TypeScript", undefined, "TS"),
    item("React", siReact), item("Next.js", siNextdotjs), item("Angular", siAngular),
    item("Tailwind CSS", siTailwindcss), item("Bootstrap", siBootstrap), item("Angular Material", siMaterialdesign),
    item("RxJS", undefined, "Rx"), item("CSS Modules", undefined, "CSS"), item("SCSS", undefined, "SC"),
  ] },
  { title: "Languages & Frameworks", id: "02", items: [
    item("Java", siOpenjdk), item("Rust", siRust), item("Python", siPython), item("Go", siGo),
    item("PHP", siPhp), item("Spring Boot", siSpringboot), item("Laravel", siLaravel),
    item("Spring Security", siSpringsecurity), item("Spring Cloud Gateway", undefined, "SCG"), item("Spring Data MongoDB", undefined, "SD"),
  ] },
  { title: "Databases & Messaging", id: "03", items: [
    item("Elasticsearch", siElasticsearch), item("Redis", siRedis), item("PostgreSQL", siPostgresql),
    item("SQLite", siSqlite), item("go-sqlite3", undefined, "Go"), item("MongoDB", siMongodb), item("Neo4j", siNeo4j),
    item("SQL migrations", undefined, "SQL"),
    item("SQL Server", undefined, "SQL"), item("MySQL", siMysql), item("Kafka", siApachekafka),
  ] },
  { title: "Infrastructure & Delivery", id: "04", items: [
    item("Docker", siDocker), item("Kubernetes", siKubernetes), item("k3s", siK3s),
    item("Ansible", siAnsible), item("Jenkins", siJenkins), item("SonarQube", siSonar),
    item("Prometheus", siPrometheus), item("Grafana", siGrafana), item("Maven", siApachemaven),
    item("Vagrant", siVagrant), item("Nginx", siNginx), item("Docker Compose", undefined, "DC"),
    item("HTTPS / SSL", undefined, "SSL"),
  ] },
  { title: "Testing, APIs & Planning", id: "05", items: [
    item("REST", undefined, "API"), item("OpenFeign", undefined, "FE"),
    item("RestClient", undefined, "RC"), item("Playwright", undefined, "PW"),
    item("Postman", siPostman), item("Thunder Client", undefined, "TC"),
    item("Swagger", siSwagger), item("Jira", siJira), item("UML", siUml),
    item("JWT", undefined, "JWT"), item("WebSockets", undefined, "WS"), item("SockJS", undefined, "WS"),
    item("HTTP/1.1", undefined, "HTTP"), item("NIO / Selector", undefined, "NIO"), item("CGI", undefined, "CGI"),
    item("Maven", siApachemaven), item("Make", undefined, "MK"), item("Bash", undefined, "SH"),
  ] },
];

export function TechMatrix() {
  return <section id="stack" className="stack-section"><div className="section-heading"><div><div className="eyebrow">TECHNOLOGIES ACROSS MY PROJECTS</div><h2>Tools I work with</h2></div><span className="section-aside">The stack you shared, grouped by how you use it.</span></div>
    <div className="stack-grid">{groups.map(({ title, id, items }, groupIndex) => <article className="stack-module" key={title} style={{ animationDelay: `${groupIndex * 80}ms` }}><div className="module-top"><span>MODULE_{id}</span></div><h3>{title}</h3><div className="module-items">{items.map(({ name, icon, mark }) => <TechLogo key={name} icon={icon} name={name} mark={mark} />)}</div></article>)}</div>
  </section>;
}
