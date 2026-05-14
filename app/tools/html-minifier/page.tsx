"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, Trash2 } from "lucide-react";

function minifyHTML(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // remove comments
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/>\s+</g, "><") // remove whitespace between tags
    .replace(/\s+>/g, ">") // remove whitespace before >
    .replace(/<\s+/g, "<") // remove whitespace after <
    .trim();
}

function HtmlMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const minify = useCallback(() => {
    if (!input.trim()) { setOutput(""); return; }
    setOutput(minifyHTML(input));
  }, [input]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(""); setOutput(""); };

  const savings = input.length > 0 && output.length > 0
    ? Math.round((1 - output.length / input.length) * 100)
    : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 justify-end">
        <button onClick={clear} className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border text-muted-foreground rounded-xl text-xs hover:text-foreground transition-colors">
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
        <button onClick={minify} className="px-5 py-2 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
          Minify HTML
        </button>
      </div>

      {savings !== null && (
        <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-3">
          <div className="text-center">
            <div className="text-lg font-mono text-foreground">{input.length}</div>
            <div className="text-[10px] text-muted-foreground">Original</div>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="text-center">
            <div className="text-lg font-mono text-green-500">{savings}%</div>
            <div className="text-[10px] text-muted-foreground">Saved</div>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="text-center">
            <div className="text-lg font-mono text-foreground">{output.length}</div>
            <div className="text-[10px] text-muted-foreground">Minified</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Input HTML</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"<html>\n  <head>\n    <!-- comment -->\n    <title>Hello</title>\n  </head>\n  <body>\n    <h1>World</h1>\n  </body>\n</html>"}
            className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
            spellCheck={false}
            aria-label="HTML input"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Minified Output</label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <pre className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto whitespace-pre-wrap break-all">
            {output || <span className="text-muted-foreground/40">Minified HTML will appear here...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function HtmlMinifierPage() {
  return (
    <ToolLayout
      title="HTML Minifier"
      description="Minify HTML by removing comments, collapsing whitespace, and reducing file size."
      category="formatters"
      toolId="html-minifier"
    >
      <HtmlMinifier />
    </ToolLayout>
  );
}
