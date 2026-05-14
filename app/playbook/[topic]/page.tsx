import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { playbookTopics } from "@/lib/tools-data";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const found = playbookTopics.find((t) => t.id === topic);
  return {
    title: found?.title ?? "Playbook",
    description: found?.description,
  };
}

export function generateStaticParams() {
  return playbookTopics.map((t) => ({ topic: t.id }));
}

const CONTENT: Record<string, { sections: Array<{ title: string; body: string }> }> = {
  aws: {
    sections: [
      { title: "What is AWS?", body: "Amazon Web Services is a cloud platform offering 200+ services from data centers globally. Think of it as renting computing infrastructure instead of owning it." },
      { title: "Core Services", body: "EC2 (virtual servers), S3 (object storage), RDS (managed databases), Lambda (serverless functions), CloudFront (CDN), Route 53 (DNS), IAM (identity & access management)." },
      { title: "The Mental Model", body: "AWS is organized into Regions (geographic areas) → Availability Zones (isolated data centers) → Services. High availability means deploying across multiple AZs." },
      { title: "Getting Started", body: "Start with S3 for storage, EC2 or Lambda for compute, and RDS for databases. Use IAM roles instead of access keys. Enable CloudTrail for audit logs." },
    ],
  },
  docker: {
    sections: [
      { title: "What is Docker?", body: "Docker packages your application and all its dependencies into a container — a lightweight, portable, self-sufficient unit that runs consistently everywhere." },
      { title: "Key Concepts", body: "Image: a read-only template. Container: a running instance of an image. Dockerfile: instructions to build an image. Registry: where images are stored (Docker Hub, ECR)." },
      { title: "The Mental Model", body: "Think of an image as a class and a container as an instance. The Dockerfile is the blueprint. Layers are cached, making builds fast." },
      { title: "Essential Commands", body: "docker build -t myapp . → build image. docker run -p 3000:3000 myapp → run container. docker-compose up → start multi-container apps. docker ps → list running containers." },
    ],
  },
  kubernetes: {
    sections: [
      { title: "What is Kubernetes?", body: "Kubernetes (K8s) is a container orchestration platform. It automates deployment, scaling, and management of containerized applications across a cluster of machines." },
      { title: "Core Objects", body: "Pod: smallest deployable unit (1+ containers). Deployment: manages pod replicas. Service: stable network endpoint. Ingress: HTTP routing. ConfigMap/Secret: configuration." },
      { title: "The Mental Model", body: "You declare desired state (YAML manifests), and K8s continuously works to match reality to that state. The control plane manages worker nodes where pods run." },
      { title: "Key Concepts", body: "Namespaces for isolation. Labels and selectors for grouping. Rolling updates for zero-downtime deploys. Horizontal Pod Autoscaler for automatic scaling." },
    ],
  },
  "git-internals": {
    sections: [
      { title: "Git's Object Model", body: "Git stores everything as objects: blobs (file content), trees (directories), commits (snapshots), and tags. Each object is identified by its SHA-1 hash." },
      { title: "How Commits Work", body: "A commit points to a tree (snapshot of your project), has parent commit(s), and stores metadata. Branches are just pointers to commits. HEAD points to the current branch." },
      { title: "The Staging Area", body: "The index (staging area) is a middle layer between your working directory and the repository. git add moves changes to the index. git commit saves the index as a new commit." },
      { title: "Merging vs Rebasing", body: "Merge creates a merge commit preserving history. Rebase replays commits on top of another branch, creating a linear history. Use merge for shared branches, rebase for local cleanup." },
    ],
  },
  "auth-flow": {
    sections: [
      { title: "Session-Based Auth", body: "Server creates a session, stores it server-side, sends a session ID cookie to the client. Every request sends the cookie; server looks up the session. Simple but doesn't scale horizontally without shared session store." },
      { title: "JWT Auth", body: "Server creates a signed token containing claims (user ID, roles, expiry). Client stores it (localStorage or httpOnly cookie). Server verifies signature on each request — stateless, scales well." },
      { title: "OAuth 2.0", body: "Authorization framework for delegated access. User authorizes a third-party app to access their data without sharing credentials. Flows: Authorization Code (web apps), PKCE (SPAs/mobile), Client Credentials (server-to-server)." },
      { title: "Best Practices", body: "Use httpOnly cookies for tokens (prevents XSS). Implement CSRF protection. Short-lived access tokens + refresh tokens. Always use HTTPS. Hash passwords with bcrypt/argon2." },
    ],
  },
  networking: {
    sections: [
      { title: "The OSI Model", body: "7 layers: Physical → Data Link → Network → Transport → Session → Presentation → Application. TCP/IP simplifies to 4: Link → Internet → Transport → Application." },
      { title: "DNS Resolution", body: "Browser checks cache → OS cache → Recursive resolver → Root nameserver → TLD nameserver → Authoritative nameserver → IP address returned. TTL controls caching duration." },
      { title: "TCP vs UDP", body: "TCP: reliable, ordered, connection-oriented (3-way handshake). Used for HTTP, email, file transfer. UDP: fast, connectionless, no guarantee. Used for video streaming, DNS, gaming." },
      { title: "HTTP/HTTPS", body: "HTTP is stateless request-response protocol. HTTPS adds TLS encryption. HTTP/2 adds multiplexing (multiple requests over one connection). HTTP/3 uses QUIC (UDP-based) for lower latency." },
    ],
  },
  "system-design": {
    sections: [
      { title: "Scalability Patterns", body: "Vertical scaling (bigger machine) vs horizontal scaling (more machines). Load balancers distribute traffic. Stateless services scale horizontally. Databases are often the bottleneck." },
      { title: "Caching", body: "Cache at every layer: CDN (static assets), application cache (Redis/Memcached), database query cache. Cache invalidation is hard — use TTL, write-through, or event-driven invalidation." },
      { title: "Database Design", body: "SQL for structured data with ACID guarantees. NoSQL for flexible schemas, high write throughput. Read replicas for read scaling. Sharding for write scaling. Eventual consistency trade-offs." },
      { title: "Async Processing", body: "Message queues (RabbitMQ, SQS) decouple producers from consumers. Event streaming (Kafka) for high-throughput event processing. Background jobs for non-critical work." },
    ],
  },
  "api-architecture": {
    sections: [
      { title: "REST", body: "Representational State Transfer. Resources identified by URLs. HTTP verbs (GET, POST, PUT, DELETE) define operations. Stateless. JSON responses. Simple, widely understood, great for CRUD." },
      { title: "GraphQL", body: "Query language for APIs. Client specifies exactly what data it needs. Single endpoint. Solves over-fetching and under-fetching. Great for complex, nested data. Adds complexity on the server." },
      { title: "gRPC", body: "Google's RPC framework using Protocol Buffers (binary serialization). Strongly typed contracts. Bidirectional streaming. 10x faster than REST for internal services. Requires code generation." },
      { title: "Choosing the Right One", body: "REST: public APIs, simple CRUD, broad compatibility. GraphQL: complex data requirements, mobile apps, rapid frontend iteration. gRPC: internal microservices, high performance, polyglot environments." },
    ],
  },
};

export default async function PlaybookTopicPage({ params }: Props) {
  const { topic } = await params;
  const found = playbookTopics.find((t) => t.id === topic);
  if (!found) notFound();

  const content = CONTENT[topic];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-10">
            <Link
              href="/playbook"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-3 h-3" />
              Developer Playbook
            </Link>

            <div className="flex items-start gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h1
                  className="text-3xl font-normal text-foreground mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {found.title}
                </h1>
                <p className="text-muted-foreground">{found.description}</p>
              </div>
            </div>

            {content ? (
              <div className="space-y-6">
                {content.sections.map((section, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-6">
                    <h2
                      className="text-lg font-normal text-foreground mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">Content coming soon.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
