// Central SEO data for all tool pages
// Used by generateMetadata() in each tool's server wrapper

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
  faqs: Array<{ q: string; a: string }>;
  useCases: string[];
  relatedTools: string[]; // tool ids
}

const BASE_URL = "https://kaizen.tools";

export const SITE_URL = BASE_URL;

export const toolSEO: Record<string, ToolSEO> = {
  "json-formatter": {
    title: "JSON Formatter & Validator — Beautify and Minify JSON Online",
    description:
      "Free online JSON formatter, beautifier, and validator. Instantly format, minify, and validate JSON with syntax highlighting. No data leaves your browser.",
    keywords: [
      "json formatter", "json beautifier", "json validator", "format json online",
      "json minifier", "pretty print json", "json parser", "json lint",
    ],
    useCases: [
      "Beautify minified API responses for debugging",
      "Validate JSON config files before deployment",
      "Minify JSON to reduce payload size",
      "Inspect nested JSON structures clearly",
    ],
    faqs: [
      { q: "Is my JSON data sent to a server?", a: "No. All processing happens entirely in your browser. Your data never leaves your device." },
      { q: "What JSON standards does this support?", a: "Supports JSON as defined by RFC 8259, including nested objects, arrays, strings, numbers, booleans, and null." },
      { q: "Can I format large JSON files?", a: "Yes. The formatter handles large JSON files efficiently in the browser without any size limits." },
      { q: "What is the difference between Beautify and Minify?", a: "Beautify adds indentation and line breaks for readability. Minify removes all whitespace to reduce file size." },
    ],
    relatedTools: ["jwt-decoder", "base64-encoder", "url-encoder"],
  },

  "sql-formatter": {
    title: "SQL Formatter — Format & Beautify SQL Queries Online",
    description:
      "Free online SQL formatter and beautifier. Format messy SQL queries into clean, readable code instantly. Supports SELECT, INSERT, UPDATE, DELETE, and more.",
    keywords: [
      "sql formatter", "sql beautifier", "format sql online", "sql pretty print",
      "sql query formatter", "mysql formatter", "postgresql formatter", "sql lint",
    ],
    useCases: [
      "Format auto-generated ORM queries for readability",
      "Clean up minified SQL from logs",
      "Standardize SQL style across a team",
      "Debug complex JOIN queries with proper indentation",
    ],
    faqs: [
      { q: "Which SQL dialects are supported?", a: "The formatter supports standard SQL and is compatible with MySQL, PostgreSQL, SQLite, and SQL Server syntax." },
      { q: "Does this store my SQL queries?", a: "No. All formatting is done client-side. Your queries are never sent to any server." },
      { q: "Can I format stored procedures?", a: "Yes. The formatter handles complex SQL including stored procedures, CTEs, and subqueries." },
    ],
    relatedTools: ["json-formatter", "env-formatter"],
  },

  "markdown-preview": {
    title: "Markdown Preview — Live Markdown Editor & Renderer Online",
    description:
      "Free online Markdown editor with live preview. Write Markdown and see the rendered HTML instantly. Supports GitHub Flavored Markdown, tables, code blocks, and more.",
    keywords: [
      "markdown preview", "markdown editor online", "markdown renderer", "live markdown",
      "github flavored markdown", "md preview", "markdown to html", "markdown viewer",
    ],
    useCases: [
      "Preview README files before pushing to GitHub",
      "Write documentation with live feedback",
      "Convert Markdown to HTML for web publishing",
      "Draft blog posts in Markdown format",
    ],
    faqs: [
      { q: "Does this support GitHub Flavored Markdown?", a: "Yes. Tables, task lists, strikethrough, and fenced code blocks are all supported." },
      { q: "Can I export the rendered HTML?", a: "Yes. You can copy the rendered HTML output directly from the preview panel." },
      { q: "Are code blocks syntax highlighted?", a: "Yes. Code blocks with language identifiers receive syntax highlighting automatically." },
    ],
    relatedTools: ["html-minifier", "json-formatter"],
  },

  "html-minifier": {
    title: "HTML Minifier — Compress & Minify HTML Online Free",
    description:
      "Free online HTML minifier. Remove whitespace, comments, and redundant attributes to reduce HTML file size and improve page load speed. Instant, browser-based.",
    keywords: [
      "html minifier", "minify html online", "html compressor", "html optimizer",
      "reduce html size", "html whitespace remover", "html compress", "web performance",
    ],
    useCases: [
      "Reduce HTML payload size for faster page loads",
      "Minify HTML templates before deployment",
      "Optimize email HTML for faster delivery",
      "Remove development comments from production HTML",
    ],
    faqs: [
      { q: "Will minifying HTML break my page?", a: "No. The minifier only removes whitespace and comments that have no effect on rendering." },
      { q: "How much can HTML minification reduce file size?", a: "Typically 10–30% reduction depending on how much whitespace and comments exist in the original." },
      { q: "Does it minify inline CSS and JavaScript?", a: "The tool focuses on HTML structure. For inline scripts and styles, use dedicated CSS/JS minifiers." },
    ],
    relatedTools: ["markdown-preview", "url-encoder"],
  },

  "jwt-decoder": {
    title: "JWT Decoder — Decode & Inspect JWT Tokens Online",
    description:
      "Free online JWT decoder. Instantly decode and inspect JSON Web Token headers, payloads, and signatures. No verification required. 100% client-side.",
    keywords: [
      "jwt decoder", "decode jwt online", "jwt inspector", "json web token decoder",
      "jwt parser", "jwt viewer", "jwt token decode", "jwt header payload",
    ],
    useCases: [
      "Debug authentication issues by inspecting token claims",
      "Verify token expiry (exp) and issued-at (iat) timestamps",
      "Inspect custom claims in access tokens",
      "Understand JWT structure for learning purposes",
    ],
    faqs: [
      { q: "Is it safe to paste my JWT here?", a: "All decoding is done in your browser. Your token is never sent to any server. However, avoid pasting production tokens in shared environments." },
      { q: "Does this verify the JWT signature?", a: "No. This tool only decodes the Base64-encoded header and payload. Signature verification requires the secret key." },
      { q: "What JWT algorithms are supported?", a: "The decoder works with all JWT algorithms (HS256, RS256, ES256, etc.) since it only decodes the payload, not verifies the signature." },
      { q: "Why is my token showing as expired?", a: "The exp claim is a Unix timestamp. If the current time is past that value, the token is expired." },
    ],
    relatedTools: ["base64-encoder", "json-formatter", "url-encoder"],
  },

  "timestamp-converter": {
    title: "Unix Timestamp Converter — Convert Timestamps to Dates Online",
    description:
      "Free online Unix timestamp converter. Convert between Unix timestamps and human-readable dates instantly. Supports seconds, milliseconds, and multiple timezones.",
    keywords: [
      "unix timestamp converter", "timestamp to date", "epoch converter", "unix time converter",
      "convert timestamp online", "epoch to date", "date to timestamp", "unix epoch",
    ],
    useCases: [
      "Convert API response timestamps to readable dates",
      "Debug log entries with Unix timestamps",
      "Calculate time differences between timestamps",
      "Convert database epoch values for display",
    ],
    faqs: [
      { q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch)." },
      { q: "Does this support millisecond timestamps?", a: "Yes. The converter automatically detects whether the input is in seconds or milliseconds based on its magnitude." },
      { q: "Which timezones are supported?", a: "The converter supports all standard IANA timezones and displays both UTC and local time." },
    ],
    relatedTools: ["utc-ist-converter", "cron-visualizer"],
  },

  "utc-ist-converter": {
    title: "UTC to IST Converter — Convert UTC Time to India Standard Time",
    description:
      "Free online UTC to IST converter. Instantly convert between Coordinated Universal Time and Indian Standard Time (UTC+5:30). Perfect for developers working with Indian teams.",
    keywords: [
      "utc to ist converter", "ist to utc", "india standard time converter",
      "utc ist time difference", "convert utc to india time", "timezone converter india",
      "utc+5:30", "ist timezone",
    ],
    useCases: [
      "Schedule meetings between UTC and IST timezones",
      "Convert server log timestamps to IST",
      "Coordinate deployments across UTC and Indian teams",
      "Convert API timestamps for Indian users",
    ],
    faqs: [
      { q: "What is the difference between UTC and IST?", a: "IST (Indian Standard Time) is UTC+5:30, meaning it is 5 hours and 30 minutes ahead of UTC." },
      { q: "Does India observe daylight saving time?", a: "No. India does not observe daylight saving time, so the UTC+5:30 offset is constant year-round." },
    ],
    relatedTools: ["timestamp-converter", "cron-visualizer"],
  },

  "base64-encoder": {
    title: "Base64 Encoder & Decoder — Encode and Decode Base64 Online",
    description:
      "Free online Base64 encoder and decoder. Instantly encode text or files to Base64 and decode Base64 strings back to plain text. 100% client-side, no data stored.",
    keywords: [
      "base64 encoder", "base64 decoder", "encode base64 online", "decode base64",
      "base64 converter", "base64 string encoder", "base64 file encoder", "base64 online tool",
    ],
    useCases: [
      "Encode API credentials for Basic Auth headers",
      "Encode binary data for JSON transmission",
      "Decode Base64-encoded JWT payloads",
      "Embed images as Base64 data URIs in CSS",
    ],
    faqs: [
      { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters, making it safe for text-based protocols." },
      { q: "Is Base64 the same as encryption?", a: "No. Base64 is encoding, not encryption. It is easily reversible and provides no security. Never use it to protect sensitive data." },
      { q: "What is the size increase from Base64 encoding?", a: "Base64 encoding increases data size by approximately 33% compared to the original binary." },
    ],
    relatedTools: ["jwt-decoder", "url-encoder", "json-formatter"],
  },

  "url-encoder": {
    title: "URL Encoder & Decoder — Encode and Decode URLs Online",
    description:
      "Free online URL encoder and decoder. Percent-encode special characters in URLs and decode percent-encoded strings instantly. Essential for web developers.",
    keywords: [
      "url encoder", "url decoder", "percent encoding", "url encode online",
      "uri encoder", "url encode decode", "percent encode url", "query string encoder",
    ],
    useCases: [
      "Encode query string parameters with special characters",
      "Decode percent-encoded URLs from logs",
      "Prepare URLs for API requests",
      "Debug URL encoding issues in web applications",
    ],
    faqs: [
      { q: "What is URL encoding?", a: "URL encoding (percent encoding) replaces unsafe ASCII characters with a % followed by two hexadecimal digits, making them safe for use in URLs." },
      { q: "What is the difference between encodeURI and encodeURIComponent?", a: "encodeURI encodes a full URL, preserving characters like / and ?. encodeURIComponent encodes a URL component, encoding those characters too." },
      { q: "When should I URL encode?", a: "Encode query parameter values, form data, and any URL component that may contain spaces, special characters, or non-ASCII characters." },
    ],
    relatedTools: ["base64-encoder", "jwt-decoder", "html-minifier"],
  },

  "uuid-generator": {
    title: "UUID Generator — Generate v4 UUIDs Online Free",
    description:
      "Free online UUID v4 generator. Generate cryptographically random UUIDs (Universally Unique Identifiers) instantly. Bulk generation supported. No server required.",
    keywords: [
      "uuid generator", "generate uuid online", "uuid v4 generator", "guid generator",
      "random uuid", "unique id generator", "uuid creator", "bulk uuid generator",
    ],
    useCases: [
      "Generate primary keys for database records",
      "Create unique identifiers for distributed systems",
      "Generate request IDs for API tracing",
      "Create unique filenames for uploaded assets",
    ],
    faqs: [
      { q: "What is a UUID?", a: "A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems, formatted as 8-4-4-4-12 hexadecimal characters." },
      { q: "How unique is a UUID v4?", a: "UUID v4 uses random generation. The probability of generating a duplicate is astronomically low — approximately 1 in 5.3 × 10^36." },
      { q: "What is the difference between UUID and GUID?", a: "GUID (Globally Unique Identifier) is Microsoft's implementation of the UUID standard. They are functionally identical." },
    ],
    relatedTools: ["password-generator", "base64-encoder"],
  },

  "password-generator": {
    title: "Password Generator — Generate Strong Secure Passwords Online",
    description:
      "Free online secure password generator. Create strong, random passwords with custom length, uppercase, lowercase, numbers, and symbols. Passwords generated locally.",
    keywords: [
      "password generator", "strong password generator", "secure password generator",
      "random password generator", "password creator online", "complex password generator",
      "generate password", "password strength",
    ],
    useCases: [
      "Generate strong passwords for new accounts",
      "Create master passwords for password managers",
      "Generate API keys and secrets",
      "Create temporary passwords for user onboarding",
    ],
    faqs: [
      { q: "Are generated passwords stored anywhere?", a: "No. Passwords are generated entirely in your browser using the Web Crypto API and are never transmitted or stored." },
      { q: "What makes a password strong?", a: "A strong password is long (16+ characters), random, and uses a mix of uppercase, lowercase, numbers, and symbols." },
      { q: "How random are the generated passwords?", a: "Passwords use the browser's cryptographically secure random number generator (crypto.getRandomValues), making them suitable for security-sensitive use." },
    ],
    relatedTools: ["uuid-generator", "base64-encoder"],
  },

  "color-palette": {
    title: "Color Palette Generator — Generate Harmonious Color Schemes Online",
    description:
      "Free online color palette generator. Create beautiful, harmonious color palettes from any base color. Export as HEX, RGB, or HSL. Perfect for designers and developers.",
    keywords: [
      "color palette generator", "color scheme generator", "color palette online",
      "hex color palette", "complementary colors", "color harmony", "design color palette",
      "color picker palette",
    ],
    useCases: [
      "Generate brand color palettes for new projects",
      "Create accessible color schemes with sufficient contrast",
      "Find complementary and analogous colors",
      "Export color values for CSS variables",
    ],
    faqs: [
      { q: "What color harmony types are supported?", a: "The generator supports complementary, analogous, triadic, tetradic, and monochromatic color harmonies." },
      { q: "Can I export colors as CSS variables?", a: "Yes. Colors can be copied as HEX, RGB, HSL, or formatted as CSS custom properties." },
      { q: "How do I check color accessibility?", a: "Use the contrast ratio display to ensure your color combinations meet WCAG AA (4.5:1) or AAA (7:1) standards." },
    ],
    relatedTools: ["env-formatter", "uuid-generator"],
  },

  "env-formatter": {
    title: "Env Variable Formatter — Format and Validate .env Files Online",
    description:
      "Free online .env file formatter and validator. Format, sort, and validate environment variables. Detect duplicates, missing values, and syntax errors instantly.",
    keywords: [
      "env formatter", "dotenv formatter", "env file validator", "environment variables formatter",
      ".env file tool", "env variable parser", "dotenv validator", "env file online",
    ],
    useCases: [
      "Format .env files for consistent team style",
      "Detect duplicate environment variable keys",
      "Validate .env syntax before deployment",
      "Sort and organize large .env files",
    ],
    faqs: [
      { q: "Is my .env data sent to a server?", a: "No. All processing is done in your browser. Your environment variables never leave your device." },
      { q: "What .env syntax is supported?", a: "Supports standard dotenv format including KEY=VALUE pairs, quoted values, comments (#), and multiline values." },
      { q: "Can this detect secrets or sensitive values?", a: "The tool can flag common patterns like API keys and tokens, but always review your .env files manually before sharing." },
    ],
    relatedTools: ["json-formatter", "sql-formatter"],
  },

  "regex-tester": {
    title: "Regex Tester — Test Regular Expressions Online with Live Matching",
    description:
      "Free online regex tester and debugger. Test regular expressions with live match highlighting, capture groups, and flags. Supports JavaScript regex syntax.",
    keywords: [
      "regex tester", "regular expression tester", "regex online", "regex debugger",
      "test regex online", "regex matcher", "regexp tester", "regex validator",
    ],
    useCases: [
      "Test and debug regex patterns before adding to code",
      "Validate input formats like emails, phone numbers, URLs",
      "Extract data from strings using capture groups",
      "Learn regex syntax with live feedback",
    ],
    faqs: [
      { q: "Which regex flavor does this use?", a: "This tester uses JavaScript's built-in RegExp engine, which follows the ECMAScript regex specification." },
      { q: "What flags are supported?", a: "Supports all JavaScript regex flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), and y (sticky)." },
      { q: "Can I test capture groups?", a: "Yes. Named and unnamed capture groups are displayed with their matched values highlighted in the test string." },
    ],
    relatedTools: ["json-formatter", "url-encoder", "html-minifier"],
  },

  "cron-visualizer": {
    title: "Cron Expression Visualizer — Understand Cron Jobs in Plain English",
    description:
      "Free online cron expression visualizer. Translate cron schedules into plain English and see the next run times. Supports standard 5-field and extended 6-field cron syntax.",
    keywords: [
      "cron visualizer", "cron expression parser", "cron to english", "cron job visualizer",
      "cron schedule visualizer", "cron expression explainer", "cron generator", "cron syntax",
    ],
    useCases: [
      "Understand complex cron expressions in CI/CD pipelines",
      "Verify cron schedules before deploying to production",
      "Debug unexpected cron job timing",
      "Learn cron syntax with visual feedback",
    ],
    faqs: [
      { q: "What cron syntax is supported?", a: "Supports standard 5-field Unix cron (minute, hour, day, month, weekday) and extended 6-field syntax with seconds." },
      { q: "What do the special characters mean?", a: "* means any value, , separates values, - defines ranges, / specifies step values, and ? means no specific value (day fields)." },
      { q: "How many next run times are shown?", a: "The visualizer shows the next 10 scheduled run times based on the current time." },
    ],
    relatedTools: ["timestamp-converter", "utc-ist-converter"],
  },

  "api-tester": {
    title: "API Tester — Test HTTP Endpoints Online Free",
    description:
      "Free online API tester. Send HTTP requests (GET, POST, PUT, DELETE) with custom headers, authentication, and request bodies. Inspect responses with syntax highlighting.",
    keywords: [
      "api tester", "http client online", "rest api tester", "test api online",
      "http request tester", "api testing tool", "rest client online", "postman alternative",
    ],
    useCases: [
      "Test REST API endpoints during development",
      "Debug API authentication and headers",
      "Inspect API response formats and status codes",
      "Test webhooks and third-party API integrations",
    ],
    faqs: [
      { q: "What HTTP methods are supported?", a: "Supports GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS requests." },
      { q: "Can I send JSON request bodies?", a: "Yes. Set the Content-Type header to application/json and paste your JSON body in the request body field." },
      { q: "Are there CORS limitations?", a: "Yes. Browser-based API testers are subject to CORS restrictions. APIs that don't allow cross-origin requests from browsers cannot be tested directly." },
      { q: "Can I save and reuse requests?", a: "Request history is saved in your browser's local storage for quick access to recent requests." },
    ],
    relatedTools: ["json-formatter", "jwt-decoder", "url-encoder"],
  },
};

// Generate full metadata for a tool page
export function getToolMetadata(toolId: string) {
  const seo = toolSEO[toolId];
  if (!seo) return null;

  const url = `${BASE_URL}/tools/${toolId}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Kaizen — Developer Microtools",
      type: "website" as const,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large" as const,
        "max-video-preview": -1,
      },
    },
  };
}
