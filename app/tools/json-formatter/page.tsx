"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, Minimize2, Maximize2, Trash2, AlertCircle } from "lucide-react";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const format = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, indent]);

  const minify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, [input]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(""); setOutput(""); setError(""); };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Indent:</span>
          {[2, 4].map((n) => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                indent === n
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {n} spaces
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={format}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-foreground text-background rounded-lg text-xs font-medium hover:bg-foreground/90 transition-colors"
          >
            <Maximize2 className="w-3 h-3" />
            Beautify
          </button>
          <button
            onClick={minify}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-card border border-border text-muted-foreground rounded-lg text-xs hover:text-foreground transition-colors"
          >
            <Minimize2 className="w-3 h-3" />
            Minify
          </button>
          <button
            onClick={clear}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-muted-foreground rounded-lg text-xs hover:text-foreground transition-colors"
            aria-label="Clear"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Editor panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
            spellCheck={false}
            aria-label="JSON input"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Output</label>
            {output && (
              <button
                onClick={copy}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          {error ? (
            <div className="h-80 bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 rounded-xl p-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 dark:text-red-400 font-mono">{error}</p>
            </div>
          ) : (
            <pre className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto">
              {output || <span className="text-muted-foreground/40">Formatted JSON will appear here...</span>}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter"
      description="Beautify, minify, and validate JSON with instant feedback."
      category="formatters"
    >
      <JsonFormatter />
    </ToolLayout>
  );
}
