export type ToolCategory =
  | "converters"
  | "formatters"
  | "generators"
  | "web"
  | "ai-career";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  href: string;
  tags: string[];
  featured?: boolean;
}

export const tools: Tool[] = [
  // Formatters
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Beautify, minify, and validate JSON with syntax highlighting",
    category: "formatters",
    icon: "braces",
    href: "/tools/json-formatter",
    tags: ["json", "format", "validate", "beautify"],
    featured: true,
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify SQL queries for readability",
    category: "formatters",
    icon: "database",
    href: "/tools/sql-formatter",
    tags: ["sql", "database", "format", "query"],
  },
  {
    id: "markdown-preview",
    name: "Markdown Preview",
    description: "Write and preview Markdown with live rendering",
    category: "formatters",
    icon: "file-text",
    href: "/tools/markdown-preview",
    tags: ["markdown", "preview", "md", "text"],
    featured: true,
  },
  {
    id: "html-minifier",
    name: "HTML Minifier",
    description: "Minify HTML to reduce file size and improve load times",
    category: "formatters",
    icon: "code",
    href: "/tools/html-minifier",
    tags: ["html", "minify", "compress", "optimize"],
  },
  // Converters
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JWT tokens without verification",
    category: "converters",
    icon: "key",
    href: "/tools/jwt-decoder",
    tags: ["jwt", "token", "auth", "decode"],
    featured: true,
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    category: "converters",
    icon: "clock",
    href: "/tools/timestamp-converter",
    tags: ["timestamp", "unix", "date", "time", "convert"],
  },
  {
    id: "utc-ist-converter",
    name: "UTC ↔ IST Converter",
    description: "Convert between UTC and Indian Standard Time instantly",
    category: "converters",
    icon: "globe",
    href: "/tools/utc-ist-converter",
    tags: ["utc", "ist", "timezone", "india", "convert"],
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings and files",
    category: "converters",
    icon: "binary",
    href: "/tools/base64-encoder",
    tags: ["base64", "encode", "decode", "binary"],
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    description: "Encode and decode URL components and query strings",
    category: "converters",
    icon: "link",
    href: "/tools/url-encoder",
    tags: ["url", "encode", "decode", "uri", "percent"],
  },
  // Generators
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate v4 UUIDs for unique identifiers",
    category: "generators",
    icon: "fingerprint",
    href: "/tools/uuid-generator",
    tags: ["uuid", "guid", "unique", "id", "generate"],
    featured: true,
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords with custom rules",
    category: "generators",
    icon: "shield",
    href: "/tools/password-generator",
    tags: ["password", "security", "generate", "random"],
  },
  {
    id: "color-palette",
    name: "Color Palette Generator",
    description: "Generate harmonious color palettes from a base color",
    category: "generators",
    icon: "palette",
    href: "/tools/color-palette",
    tags: ["color", "palette", "design", "hex", "hsl"],
  },
  {
    id: "env-formatter",
    name: "Env Variable Formatter",
    description: "Format and validate .env files and environment variables",
    category: "generators",
    icon: "settings",
    href: "/tools/env-formatter",
    tags: ["env", "environment", "variables", "dotenv", "config"],
  },
  // Web Tools
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with live matching",
    category: "web",
    icon: "search-code",
    href: "/tools/regex-tester",
    tags: ["regex", "regexp", "pattern", "match", "test"],
    featured: true,
  },
  {
    id: "cron-visualizer",
    name: "Cron Visualizer",
    description: "Visualize and understand cron expressions in plain English",
    category: "web",
    icon: "timer",
    href: "/tools/cron-visualizer",
    tags: ["cron", "schedule", "job", "time", "linux"],
  },
  {
    id: "api-tester",
    name: "API Tester",
    description: "Test HTTP endpoints with custom headers and request bodies",
    category: "web",
    icon: "zap",
    href: "/tools/api-tester",
    tags: ["api", "http", "rest", "request", "test"],
  },
];

export const aiCareerTools = [
  {
    id: "resume-bullet",
    name: "Resume Bullet Generator",
    description:
      "Transform your work experience into powerful, ATS-optimized resume bullets using the STAR method",
    icon: "file-pen",
    href: "/ai/resume-bullet",
    accent: "moss",
  },
  {
    id: "star-answer",
    name: "STAR Answer Generator",
    description:
      "Craft compelling behavioral interview answers using the Situation, Task, Action, Result framework",
    icon: "star",
    href: "/ai/star-answer",
    accent: "gold",
  },
  {
    id: "resume-roast",
    name: "Resume Roast Analyzer",
    description:
      "Get brutally honest, actionable feedback on your resume from an AI hiring manager perspective",
    icon: "flame",
    href: "/ai/resume-roast",
    accent: "cedar",
  },
  {
    id: "linkedin-headline",
    name: "LinkedIn Headline Optimizer",
    description:
      "Generate magnetic LinkedIn headlines that attract recruiters and showcase your unique value",
    icon: "linkedin",
    href: "/ai/linkedin-headline",
    accent: "sage",
  },
  {
    id: "interview-prep",
    name: "Interview Prep Assistant",
    description:
      "Prepare for technical and behavioral interviews with personalized questions and model answers",
    icon: "message-square",
    href: "/ai/interview-prep",
    accent: "stone",
  },
  {
    id: "project-description",
    name: "Project Description Generator",
    description:
      "Turn your project details into compelling descriptions for portfolios, resumes, and GitHub",
    icon: "layout",
    href: "/ai/project-description",
    accent: "moss",
  },
];

export const playbookTopics = [
  {
    id: "aws",
    title: "AWS Explained Visually",
    description: "Core AWS services mapped simply",
    icon: "cloud",
    tags: ["cloud", "aws", "infrastructure"],
  },
  {
    id: "docker",
    title: "Docker Basics",
    description: "Containers from zero to deploy",
    icon: "box",
    tags: ["docker", "containers", "devops"],
  },
  {
    id: "kubernetes",
    title: "Kubernetes Simplified",
    description: "Orchestration without the overwhelm",
    icon: "layers",
    tags: ["k8s", "kubernetes", "orchestration"],
  },
  {
    id: "git-internals",
    title: "Git Internals",
    description: "How Git actually works under the hood",
    icon: "git-branch",
    tags: ["git", "version-control", "internals"],
  },
  {
    id: "auth-flow",
    title: "Authentication Flow",
    description: "JWT, OAuth, sessions explained clearly",
    icon: "lock",
    tags: ["auth", "jwt", "oauth", "security"],
  },
  {
    id: "networking",
    title: "Networking Basics",
    description: "TCP/IP, DNS, HTTP from first principles",
    icon: "network",
    tags: ["networking", "tcp", "dns", "http"],
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Scalable architecture patterns",
    icon: "server",
    tags: ["system-design", "architecture", "scale"],
  },
  {
    id: "api-architecture",
    title: "API Architecture",
    description: "REST, GraphQL, gRPC compared",
    icon: "plug",
    tags: ["api", "rest", "graphql", "grpc"],
  },
];

export const categoryLabels: Record<ToolCategory, string> = {
  converters: "Converters",
  formatters: "Formatters",
  generators: "Generators",
  web: "Web Tools",
  "ai-career": "AI Career Suite",
};

export const zenQuotes = [
  {
    text: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
  },
  {
    text: "In the beginner's mind there are many possibilities, in the expert's mind there are few.",
    author: "Shunryu Suzuki",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Do one thing, do it well.",
    author: "Unix Philosophy",
  },
  {
    text: "The best code is no code at all.",
    author: "Jeff Atwood",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
    author: "Antoine de Saint-Exupéry",
  },
  {
    text: "A complex system that works is invariably found to have evolved from a simple system that worked.",
    author: "John Gall",
  },
];

export const japaneseQuotes = [
  {
    text: "Fall seven times, stand up eight.",
    japanese: "七転び八起き",
    romaji: "Nanakorobi yaoki",
  },
  {
    text: "Even monkeys fall from trees.",
    japanese: "猿も木から落ちる",
    romaji: "Saru mo ki kara ochiru",
  },
  {
    text: "A journey of a thousand miles begins with a single step.",
    japanese: "千里の道も一歩から",
    romaji: "Senri no michi mo ippo kara",
  },
  {
    text: "Continuous improvement, small changes.",
    japanese: "改善",
    romaji: "Kaizen",
  },
  {
    text: "The nail that sticks out gets hammered down.",
    japanese: "出る杭は打たれる",
    romaji: "Deru kugi wa utareru",
  },
  {
    text: "One kind word can warm three winter months.",
    japanese: "一言の暖かさ三冬の寒さを忘れる",
    romaji: "Hitokoto no atatakasa sanfuyu no samusa wo wasureru",
  },
  {
    text: "Time flies like an arrow.",
    japanese: "光陰矢の如し",
    romaji: "Kōin ya no gotoshi",
  },
  {
    text: "Better to be a crystal and be broken, than to be a tile upon the housetop.",
    japanese: "玉砕瓦全",
    romaji: "Gyokusai gazen",
  },
];
