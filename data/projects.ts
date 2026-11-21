export type Project = {
  slug: string;
  name: string;
  rank?: number;
  match: string;
  year: string;
  environment: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  architecture: string[];
  github?: string;
  isFlagship: boolean;
  theme: string;
};

export const projects: Project[] = [
  {
    slug: "travel-plan", name: "LET'S TRAVEL", rank: 1, match: "99%", year: "2026", environment: "TRAVEL / MICROSERVICES", category: "Featured film · 01",
    tagline: "A journey through distributed systems.",
    description: "A travel discovery and administration platform with an Angular client, Spring Boot services, and a Spring Cloud Gateway. Travelers can browse listings and manage accounts; administrators can manage listings and users. The documented local setup includes PostgreSQL, Redis-backed rate limiting, Docker Compose, and a single-node k3s development environment. Neo4j, Jenkins, SonarQube, and Ansible are part of the wider development infrastructure; payment and recommendation services are not in the active deployment.",
    stack: ["Java 21", "Spring Boot", "Spring Cloud Gateway", "Angular 19", "TypeScript", "PostgreSQL", "Redis", "Neo4j", "Docker Compose", "K3s", "Ansible", "Jenkins", "SonarQube", "Prometheus", "Maven", "Vagrant"],
    highlights: ["Travel discovery and public listings", "Role-protected administration for listings and users", "JWT authentication and Redis-backed rate limiting", "Docker Compose and k3s development deployments", "Jenkins CI, SonarQube, and Prometheus infrastructure"],
    architecture: ["Angular + TypeScript client → Spring Cloud Gateway", "Gateway → User service → PostgreSQL", "Gateway → Travel service → PostgreSQL", "Gateway ↔ Redis (rate limiting)", "Development infrastructure: Docker Compose, k3s, Ansible, Jenkins, SonarQube, Prometheus"], github: "https://github.com/IsmailICHI/e-Journey/tree/ali_travel", isFlagship: true, theme: "travel",
  },
  {
    slug: "engineo", name: "NEO4FLIX", rank: 2, match: "98%", year: "2026", environment: "GRAPH / EVENTS", category: "Featured film · 02",
    tagline: "A film catalog with recommendations shaped by a graph.",
    description: "A movie-catalog and recommendation application built from Spring Boot services with an Angular frontend. PostgreSQL stores account, catalog, and rating data; Kafka carries rating events; Neo4j supports graph recommendations; Redis handles caching and rate limiting. Recommendation results are currently IDs and co-rating counts and are not yet loaded into the Angular UI.",
    stack: ["Java 21", "Spring Boot", "Spring Cloud Gateway", "Spring Security", "Angular 19", "TypeScript", "PostgreSQL", "Neo4j", "Kafka", "Redis", "Nginx", "Docker Compose", "Maven", "SCSS", "JWT"],
    highlights: ["Separate user, movie, rating, and recommendation services", "Rating events flow through Kafka to the recommendation service", "Neo4j graph computes co-rating-based candidate suggestions", "HTTPS frontend served behind Nginx", "Recommendations are not yet surfaced in the Angular UI"],
    architecture: ["Angular + Nginx → Spring Cloud Gateway", "Gateway → User / Movie / Rating / Recommendation services", "Rating service → Kafka → Recommendation service", "Services → PostgreSQL", "Recommendation service → Neo4j; Gateway ↔ Redis"], github: "https://github.com/louhabali/engineo4j", isFlagship: true, theme: "engineo",
  },
  {
    slug: "01-ecom", name: "01E-COM", rank: 3, match: "97%", year: "2026", environment: "COMMERCE / MICROSERVICES", category: "Featured film · 03",
    tagline: "Commerce, divided into focused services.",
    description: "A Spring Boot and Angular microservices commerce platform for accounts, products, and media. Its documented flows cover JWT authentication, role-based access, product management, image uploads, gateway routing, and asynchronous product events. Nginx provides the HTTPS reverse proxy, and Docker Compose runs the service stack.",
    stack: ["Java 21", "Spring Boot", "Spring Security", "Spring Cloud Gateway", "Spring Data MongoDB", "Angular 19", "TypeScript", "RxJS", "Tailwind CSS", "MongoDB", "Redis", "Apache Kafka", "Maven", "Docker Compose", "Nginx", "HTTPS / SSL"],
    highlights: ["User, product, and media service boundaries", "JWT authentication and role-based authorization", "Product image upload and management", "Kafka events between product services", "Angular frontend behind Nginx and an API gateway"],
    architecture: ["Angular + TypeScript client → Nginx HTTPS reverse proxy", "Nginx → Spring Cloud Gateway", "Gateway → User / Product / Media services", "Services → MongoDB; gateway uses Redis", "Kafka carries product events; Docker Compose runs the stack"], github: "https://github.com/louhabali/market02", isFlagship: true, theme: "market",
  },
  {
    slug: "01blog", name: "01BLOG", match: "94%", year: "2025", environment: "COMMUNITY / REAL TIME", category: "From the collection",
    tagline: "A learning community for sharing progress and ideas.",
    description: "A full-stack social blogging platform for learners. Users can publish posts, follow others, comment, and report content; administrators have moderation tools. The repository documents Spring Boot, Angular, PostgreSQL, JWT authentication, and SockJS notifications.",
    stack: ["Java 17", "Spring Boot", "Spring Security", "PostgreSQL", "Angular", "TypeScript", "Angular Material", "SockJS", "JWT", "Docker", "Maven"],
    highlights: ["Posts, comments, likes, follows, and reporting", "Admin moderation routes protected by roles", "JWT authentication and real-time SockJS notifications", "Separate Angular frontend and Spring backend"],
    architecture: ["Angular + TypeScript client ↔ Spring Boot REST API", "Spring Security → JWT authentication and role checks", "Backend → PostgreSQL", "SockJS notifications → connected clients"], github: "https://github.com/louhabali/01blog", isFlagship: false, theme: "blog",
  },
  {
    slug: "localserver", name: "LOCALSERVER HTTP/1.1", match: "95%", year: "2026", environment: "JAVA / NETWORKING", category: "From the collection",
    tagline: "A small web server built from the protocol upward.",
    description: "A Java HTTP server built around non-blocking I/O. The repository documents request parsing, chunked responses, sessions, static files, uploads, deletes, and CGI execution, alongside load-test scripts.",
    stack: ["Java", "NIO / Selector", "HTTP/1.1", "CGI", "Chunked encoding", "Session management", "Static files", "Multipart uploads", "HTML", "CSS", "Python", "Bash", "Make"],
    highlights: ["Non-blocking Java I/O and connection handling", "HTTP request parsing and chunked encoding", "Session management and CGI execution", "Static file, upload, and delete handlers", "Includes Siege load-test scripts"],
    architecture: ["Socket channel → selector-driven server", "Connection handler → HTTP request parser", "Request → static / upload / delete / CGI handler", "Handler → HTTP response serializer", "Session manager tracks client state"], github: "https://github.com/louhabali/java-localserver", isFlagship: false, theme: "server",
  },
  {
    slug: "social-network", name: "SOCIAL NETWORK", match: "93%", year: "2025", environment: "GO / REAL TIME", category: "From the collection",
    tagline: "A social world connected in real time.",
    description: "A full-stack social network with a Next.js and React interface backed by a Go server. The repository includes posts, follows, comments, groups, events, notifications, and private and group conversations, with SQLite migrations and WebSocket messaging.",
    stack: ["Go", "Next.js 15", "React 19", "JavaScript", "CSS Modules", "SQLite", "Gorilla WebSocket", "go-sqlite3", "SQL migrations", "Docker", "Docker Compose"],
    highlights: ["Posts, follows, comments, and privacy controls", "Groups, invitations, and events", "Private and group chats over WebSockets", "Notifications and image uploads", "Go backend with a Next.js frontend and SQLite migrations"],
    architecture: ["Next.js + React browser client → Go HTTP API", "Go handlers → SQLite models and migrations", "Go WebSocket hub → chat and notification events", "Docker Compose runs frontend and backend"], github: "https://github.com/louhabali/social-network", isFlagship: false, theme: "social",
  },
];

export const flagships = projects.filter((project) => project.isFlagship);
export const coreProjects = projects.filter((project) => !project.isFlagship);
