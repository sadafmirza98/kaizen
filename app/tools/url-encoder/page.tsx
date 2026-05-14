"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, ArrowUpDown } from "lucide-react";

function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError("");
    } catch {
      setError("Invalid URL-encoded string.");
      setOutput("");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setError("");
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm transition-colors capitalize ${
              mode === m
                ? "bg-foreground text-background"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">
            {mode === "encode" ? "Plain URL / Text" : "Encoded String"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "https://example.com/path?q=hello world&lang=en" : "https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world"}
            className="w-full h-40 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
            spellCheck={false}
            aria-label="URL input"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Output</label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          {error ? (
            <div className="h-40 bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 rounded-xl p-4 flex items-center">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <pre className="w-full h-40 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto whitespace-pre-wrap break-all">
              {output || <span className="text-muted-foreground/40">Output will appear here...</span>}
            </pre>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={convert}
          className="px-6 py-2.5 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        {output && (
          <button
            onClick={swap}
            className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border text-muted-foreground rounded-xl text-sm hover:text-foreground transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Swap
          </button>
        )}
      </div>
    </div>
  );
}

export default function UrlEncoderPage() {
  return (
    <ToolLayout
      title="URL Encoder / Decoder"
      description="Encode and decode URL components and query strings using percent-encoding."
      category="converters"
    >
      <UrlEncoder />
    </ToolLayout>
  );
}
