"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, RefreshCw } from "lucide-react";

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded hover:bg-accent transition-colors" aria-label="Copy">
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground w-40 shrink-0">{label}</span>
      <span className="text-xs font-mono text-foreground flex-1 text-right mr-2">{value}</span>
      <CopyBtn text={value} />
    </div>
  );
}

function TimestampConverter() {
  const [now, setNow] = useState(Date.now());
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"ts-to-date" | "date-to-ts">("ts-to-date");

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const currentTs = Math.floor(now / 1000);
  const currentTsMs = now;

  const getConvertedDate = () => {
    if (!input) return null;
    const num = Number(input);
    if (isNaN(num)) return null;
    // Auto-detect ms vs s
    const ms = num > 1e12 ? num : num * 1000;
    return new Date(ms);
  };

  const getConvertedTs = () => {
    if (!input) return null;
    const d = new Date(input);
    if (isNaN(d.getTime())) return null;
    return d;
  };

  const date = mode === "ts-to-date" ? getConvertedDate() : getConvertedTs();

  return (
    <div className="space-y-6">
      {/* Live clock */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Current Time</span>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </div>
        </div>
        <Row label="Unix (seconds)" value={String(currentTs)} />
        <Row label="Unix (milliseconds)" value={String(currentTsMs)} />
        <Row label="ISO 8601" value={new Date(now).toISOString()} />
        <Row label="UTC" value={new Date(now).toUTCString()} />
        <Row label="Local" value={new Date(now).toLocaleString()} />
      </div>

      {/* Converter */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <div className="flex gap-2">
          {(["ts-to-date", "date-to-ts"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(""); }}
              className={`px-4 py-1.5 rounded-lg text-xs transition-colors ${
                mode === m
                  ? "bg-foreground text-background"
                  : "bg-muted border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "ts-to-date" ? "Timestamp → Date" : "Date → Timestamp"}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            {mode === "ts-to-date" ? "Unix Timestamp (s or ms)" : "Date / ISO String"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "ts-to-date" ? "1700000000" : "2024-01-15T10:30:00Z"}
              className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
              aria-label="Timestamp or date input"
            />
            <button
              onClick={() => setInput(mode === "ts-to-date" ? String(currentTs) : new Date().toISOString())}
              className="px-3 py-2.5 bg-muted border border-border rounded-xl text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Use current time"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {date && (
          <div className="space-y-0 border-t border-border/50 pt-4">
            {mode === "ts-to-date" ? (
              <>
                <Row label="ISO 8601" value={date.toISOString()} />
                <Row label="UTC" value={date.toUTCString()} />
                <Row label="Local" value={date.toLocaleString()} />
                <Row label="Date only" value={date.toLocaleDateString()} />
                <Row label="Time only" value={date.toLocaleTimeString()} />
              </>
            ) : (
              <>
                <Row label="Unix (seconds)" value={String(Math.floor(date.getTime() / 1000))} />
                <Row label="Unix (milliseconds)" value={String(date.getTime())} />
                <Row label="ISO 8601" value={date.toISOString()} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TimestampConverterPage() {
  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates. Live clock included."
      category="converters"
    >
      <TimestampConverter />
    </ToolLayout>
  );
}
