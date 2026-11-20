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
  command: string;
  highlights: string[];
  architecture: string[];
  github?: string;
  isFlagship: boolean;
  theme: string;
};

export const projects: Project[] = [
  {
    slug: "travel-plan", name: "LET'S TRAVEL", rank: 1, match: "99%", year: "2026", environment: "K3S / DEV", category: "Top 3 Flagship Systems",
    tagline: "Travel planning, built as a distributed system.",
    description: "A multi-role travel platform with an Angular client and Spring Boot microservices. The project combines Elasticsearch search-as-you-type travel autocomplete, Neo4j recommendations, and Stripe and PayPal payment integrations. Its development platform includes Docker Compose, a single-node k3s cluster, Ansible provisioning, Jenkins CI, and Prometheus metrics. The README notes that payment and recommendation services are implemented in the codebase but are not part of the current Compose or Kubernetes deployment.",
    stack: ["Java 21", "Spring Boot", "Angular", "PostgreSQL", "Redis", "Elasticsearch", "Neo4j", "Stripe", "PayPal", "K3s", "Ansible", "Jenkins", "Prometheus"], command: "kubectl get pods -A",
    highlights: ["Role-protected travel listing administration with JWT authentication", "Elasticsearch search and Neo4j recommendation integrations", "Stripe and PayPal payment integrations in the codebase", "Ansible, Jenkins, Prometheus, and k3s development infrastructure", "Payment and recommendation services are not included in the current Compose or Kubernetes deployment"],
    architecture: ["Angular client → Spring Cloud Gateway", "Gateway → User service → PostgreSQL", "Gateway → Travel service → PostgreSQL", "Gateway ↔ Redis (rate limiting)", "Development infrastructure: k3s, Jenkins, SonarQube, Prometheus"], github: "https://github.com/IsmailICHI/e-Journey", isFlagship: true, theme: "travel",
  },
  {
    slug: "engineo", name: "NEO4FLIX", rank: 2, match: "98%", year: "2026", environment: "GRAPH / EVENTS", category: "Top 3 Flagship Systems",
    tagline: "A film catalog with recommendations shaped by a graph.",
    description: "A movie catalog and recommendation application built from Spring Boot services and an Angular frontend. PostgreSQL stores account, catalog, and rating data; Kafka carries rating events; Neo4j supports graph recommendations; Redis handles caching and rate limiting. Recommendations currently return movie IDs and co-rating counts, and are not yet loaded into the Angular UI.",
    stack: ["Java 21", "Spring Boot", "Angular", "PostgreSQL", "Neo4j", "Kafka", "Redis", "Nginx", "Docker"], command: "docker compose -f docker-compose.yml up -d",
    highlights: ["Separate user, movie, rating, and recommendation services", "Rating events flow through Kafka to the recommendation service", "Neo4j graph computes co-rating based candidate suggestions", "HTTPS frontend served behind Nginx"],
    architecture: ["Angular + Nginx → Spring Cloud Gateway", "Gateway → User / Movie / Rating / Recommendation services", "Rating service → Kafka → Recommendation service", "Services → PostgreSQL", "Recommendation service → Neo4j; Gateway ↔ Redis"], github: "https://github.com/louhabali/engineo4j", isFlagship: true, theme: "engineo",
  },
  {
    slug: "01-ecom", name: "01E-COM", rank: 3, match: "97%", year: "2026", environment: "MICROSERVICES / CI", category: "Top 3 Flagship Systems",
    tagline: "An e-commerce platform split across focused services.",
    description: "A Spring Boot and Angular commerce platform with user, product, media, cart, and order service directories behind a gateway. Its documented stack includes MongoDB, Redis, Kafka, HTTPS, Nginx, and a Jenkins pipeline. The public project README also describes the current product and media flows, so features beyond those documented should be confirmed against the code before publishing.",
    stack: ["Java 21", "Spring Boot", "Spring Cloud Gateway", "Angular", "MongoDB", "Redis", "Kafka", "Jenkins", "Nginx"], command: "docker compose up --build -d",
    highlights: ["Service boundaries for users, products, media, cart, and orders", "Gateway routing with JWT validation", "Kafka event communication between services", "HTTPS reverse proxy and a Jenkins pipeline"],
    architecture: ["Angular client → Nginx HTTPS reverse proxy → Spring Cloud Gateway", "Gateway → User / Product / Media / Cart / Order services", "Services → MongoDB and Redis", "Kafka provides asynchronous service events", "Jenkins pipeline in repository"], github: "https://github.com/louhabali/market02", isFlagship: true, theme: "market",
  },
  {
    slug: "01blog", name: "01BLOG", match: "94%", year: "2025", environment: "JWT / WEBSOCKETS", category: "Core & Full-Stack Systems",
    tagline: "A learning community for sharing progress and ideas.",
    description: "A full-stack social blogging platform for learners. Users can publish posts, follow others, comment, and report content; administrators have moderation tools. The README documents Spring Boot, Angular, PostgreSQL, JWT authentication, and SockJS notifications.",
    stack: ["Java 17", "Spring Boot", "Spring Security", "PostgreSQL", "Angular", "SockJS", "Docker"], command: "docker compose up --build -d",
    highlights: ["Posts, comments, likes, follows, and reporting", "Admin moderation routes protected by roles", "JWT authentication and real-time SockJS notifications", "Separate Angular frontend and Spring backend"],
    architecture: ["Angular client ↔ Spring Boot REST API", "Spring Security → JWT authentication and role checks", "Backend → PostgreSQL", "SockJS notifications → connected clients"], github: "https://github.com/louhabali/01blog", isFlagship: false, theme: "blog",
  },
  {
    slug: "localserver", name: "LOCALSERVER HTTP/1.1", match: "95%", year: "2026", environment: "JAVA / NETWORKING", category: "Core & Full-Stack Systems",
    tagline: "A small web server built from the protocol upward.",
    description: "A Java server project with request parsing, response and status handling, connection management, and handlers for static files, uploads, and deletes. Its README shows an upload, fetch, and delete workflow. The available documentation does not establish the non-blocking NIO, Selector, CGI, or Siege claims in the original brief.",
    stack: ["Java", "HTTP/1.1", "Request parsing", "Static files", "Multipart uploads"], command: "curl http://localhost:8080/test.txt",
    highlights: ["Own HTTP request, response, and status code types", "Connection handling and static file serving", "Multipart upload and delete handlers", "Repository includes an implementation plan"],
    architecture: ["Socket connection → ConnectionHandler", "ConnectionHandler → HTTP request parser", "Request → static file / upload / delete handler", "Handler → HTTP response serializer"], github: "https://github.com/louhabali/LocalServer", isFlagship: false, theme: "server",
  },
  {
    slug: "social-network", name: "SOCIAL NETWORK", match: "93%", year: "2025", environment: "GO / REAL TIME", category: "Core & Full-Stack Systems",
    tagline: "A real-time social platform in Go.",
    description: "This project is listed in the portfolio brief, but I could not match it to an accessible repository in the connected GitHub account. The details below reflect the supplied brief and should be verified against its source before publishing as confirmed features.",
    stack: ["Golang", "WebSockets", "SQLite", "JavaScript", "HTML/CSS", "Docker"], command: "go run ./cmd/server --port=8080",
    highlights: ["Portfolio brief describes live private and group messaging", "Brief lists notifications and SQLite migrations", "Source repository could not be matched in GitHub"],
    architecture: ["Browser client → Go HTTP server", "Go server → SQLite", "WebSocket connections → messaging and notifications"], isFlagship: false, theme: "social",
  },
];

export const flagships = projects.filter((project) => project.isFlagship);
export const coreProjects = projects.filter((project) => !project.isFlagship);
