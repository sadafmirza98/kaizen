"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, Eye, Code } from "lucide-react";

const SAMPLE = `# Welcome to Markdown Preview

A **live** markdown editor with *instant* rendering.

## Features

- Real-time preview
- GitHub Flavored Markdown
- Code syntax support
- Tables and more

## Code Example

\`\`\`javascript
const kaizen = () => {
  return "continuous improvement";
};
\`\`\`

## Table

| Tool | Category | Status |
|------|----------|--------|
| JSON Formatter | Formatters | ✅ |
| JWT Decoder | Converters | ✅ |
| Regex Tester | Web Tools | ✅ |

> *"Simplicity is the ultimate sophistication."* — Leonardo da Vinci

---

Made with **Kaizen** 改善
`;

// Minimal markdown renderer (no external deps)
function renderMarkdown(md: string): string {
  let html = md
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `<pre class="bg-muted border border-border rounded-lg p-4 overflow-auto my-4"><code class="font-mono text-xs text-foreground">${code.trim()}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-foreground mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-foreground mt-8 mb-3 pb-1 border-b border-border">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-foreground mt-2 mb-4" style="font-family:var(--font-heading)">$1</h1>');

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Blockquote
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-2 border-border pl-4 my-3 text-muted-foreground italic">$1</blockquote>');

  // HR
  html = html.replace(/^---$/gm, '<hr class="border-border my-6" />');

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (line) => {
    const cells = line.split("|").filter((_, i, a) => i > 0 && i < a.length - 1);
    if (cells.every((c) => /^[-: ]+$/.test(c))) return ""; // separator row
    const tag = "td";
    return `<tr>${cells.map((c) => `<${tag} class="border border-border px-3 py-2 text-sm text-foreground">${c.trim()}</${tag}>`).join("")}</tr>`;
  });
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full border-collapse my-4 text-sm">$1</table>');

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-foreground text-sm">• $1</li>');
  html = html.replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="my-2 space-y-1">$1</ul>');

  // Paragraphs
  html = html.replace(/^(?!<[a-z]).+$/gm, (line) => {
    if (!line.trim()) return "";
    return `<p class="text-foreground text-sm leading-relaxed my-2">${line}</p>`;
  });

  return html;
}

function MarkdownPreview() {
  const [source, setSource] = useState(SAMPLE);
  const [view, setView] = useState<"split" | "preview" | "source">("split");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rendered = renderMarkdown(source);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(["split", "source", "preview"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors capitalize ${
                view === v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "source" ? <Code className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy source"}
        </button>
      </div>

      <div className={`grid gap-4 ${view === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {(view === "split" || view === "source") && (
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Markdown Source</label>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full h-[500px] bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground outline-none focus:border-ring/60 transition-colors resize-none"
              spellCheck={false}
              aria-label="Markdown source"
            />
          </div>
        )}
        {(view === "split" || view === "preview") && (
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Preview</label>
            <div
              className="w-full h-[500px] bg-card border border-border rounded-xl p-6 overflow-auto prose-sm"
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function MarkdownPreviewPage() {
  return (
    <ToolLayout
      title="Markdown Preview"
      description="Write and preview Markdown with live rendering. Split view or full preview."
      category="formatters"
    >
      <MarkdownPreview />
    </ToolLayout>
  );
}
