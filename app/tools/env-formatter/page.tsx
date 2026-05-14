"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, AlertCircle, Trash2 } from "lucide-react";

interface EnvVar {
  key: string;
  value: string;
  comment?: string;
  error?: string;
}

function parseEnv(raw: string): EnvVar[] {
  return raw.split("\n").map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return { key: "", value: "", comment: trimmed };
    }
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) {
      return { key: trimmed, value: "", error: "Missing = sign" };
    }
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();

    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    const keyError = /^[A-Z_][A-Z0-9_]*$/.test(key) ? undefined : "Key should be UPPER_SNAKE_CASE";

    return { key, value, error: keyError };
  });
}

function formatEnv(vars: EnvVar[]): string {
  return vars
    .map((v) => {
      if (v.comment !== undefined) return v.comment;
      if (!v.key) return "";
      const needsQuotes = v.value.includes(" ") || v.value.includes("#") || v.value === "";
      const val = needsQuotes ? `"${v.value}"` : v.value;
      return `${v.key.toUpperCase()}=${val}`;
    })
    .join("\n");
}

function EnvFormatter() {
  const [input, setInput] = useState(
    `# Database\nDATABASE_URL=postgres://user:pass@localhost:5432/mydb\n\n# API Keys\nOPENAI_API_KEY=sk-...\nNEXT_PUBLIC_APP_URL=http://localhost:3000\n\n# Feature flags\nENABLE_ANALYTICS=true\nDEBUG=false`
  );
  const [copied, setCopied] = useState(false);

  const parsed = parseEnv(input);
  const formatted = formatEnv(parsed);
  const errors = parsed.filter((v) => v.error);

  const copy = async () => {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => setInput("");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 justify-end">
        <button onClick={clear} className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border text-muted-foreground rounded-xl text-xs hover:text-foreground transition-colors">
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
        <button onClick={copy} className="flex items-center gap-1.5 px-5 py-2 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy Formatted"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Raw .env</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground outline-none focus:border-ring/60 transition-colors resize-none"
            spellCheck={false}
            aria-label=".env input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Parsed Variables</label>
          <div className="h-80 bg-card border border-border rounded-xl overflow-auto">
            {parsed.map((v, i) => {
              if (v.comment !== undefined) {
                return (
                  <div key={i} className="px-4 py-1.5 text-xs font-mono text-muted-foreground/50 border-b border-border/30">
                    {v.comment || <span className="opacity-30">empty line</span>}
                  </div>
                );
              }
              return (
                <div key={i} className={`flex items-start gap-2 px-4 py-2 border-b border-border/30 ${v.error ? "bg-amber-50/30 dark:bg-amber-950/10" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-600/80 dark:text-amber-400/70 font-medium">{v.key}</span>
                      {v.error && <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />}
                    </div>
                    <span className="font-mono text-xs text-foreground/70 break-all">{v.value || <span className="text-muted-foreground/40">empty</span>}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Warnings</label>
          {errors.map((v, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span className="font-mono">{v.key}</span>
              <span className="text-muted-foreground">—</span>
              <span>{v.error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EnvFormatterPage() {
  return (
    <ToolLayout
      title="Env Variable Formatter"
      description="Parse, validate, and format .env files. Highlights issues and normalizes formatting."
      category="generators"
    >
      <EnvFormatter />
    </ToolLayout>
  );
}
