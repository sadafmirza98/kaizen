"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, ArrowUpDown } from "lucide-react";

function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
      setError("");
    } catch {
      setError(mode === "decode" ? "Invalid Base64 string." : "Encoding failed.");
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
            {mode === "encode" ? "Plain Text" : "Base64 String"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="w-full h-48 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
            spellCheck={false}
            aria-label="Input"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          {error ? (
            <div className="h-48 bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 rounded-xl p-4 flex items-center">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <pre className="w-full h-48 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto whitespace-pre-wrap break-all">
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

export default function Base64EncoderPage() {
  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      description="Encode plain text to Base64 or decode Base64 strings back to text."
      category="converters"
      toolId="base64-encoder"
    >
      <Base64Encoder />
    </ToolLayout>
  );
}
