"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, RefreshCw } from "lucide-react";

const IST_OFFSET = 5.5 * 60; // minutes

function toIST(date: Date): Date {
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utcMs + IST_OFFSET * 60000);
}

function toUTC(istDate: Date): Date {
  return new Date(istDate.getTime() - IST_OFFSET * 60000);
}

function formatDateTime(date: Date): string {
  return date.toISOString().slice(0, 16);
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded hover:bg-accent transition-colors" aria-label="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
}

function UtcIstConverter() {
  const [now, setNow] = useState(new Date());
  const [utcInput, setUtcInput] = useState(() => formatDateTime(new Date()));
  const [istInput, setIstInput] = useState(() => formatDateTime(toIST(new Date())));
  const [mode, setMode] = useState<"utc-to-ist" | "ist-to-utc">("utc-to-ist");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleUtcChange = (val: string) => {
    setUtcInput(val);
    const d = new Date(val + ":00Z");
    if (!isNaN(d.getTime())) setIstInput(formatDateTime(toIST(d)));
  };

  const handleIstChange = (val: string) => {
    setIstInput(val);
    const istMs = new Date(val + ":00").getTime();
    const utcDate = new Date(istMs - IST_OFFSET * 60000);
    if (!isNaN(utcDate.getTime())) setUtcInput(formatDateTime(utcDate));
  };

  const useNow = () => {
    const n = new Date();
    setUtcInput(formatDateTime(n));
    setIstInput(formatDateTime(toIST(n)));
  };

  const currentUTC = now.toUTCString();
  const currentIST = toIST(now).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return (
    <div className="space-y-6">
      {/* Live clocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Current UTC</span>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm text-foreground">{currentUTC}</p>
            <CopyBtn text={currentUTC} />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Current IST (UTC+5:30)</span>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm text-foreground">{currentIST}</p>
            <CopyBtn text={currentIST} />
          </div>
        </div>
      </div>

      {/* Converter */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Convert a specific time</h3>
          <button
            onClick={useNow}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Use now
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">UTC Time</label>
            <input
              type="datetime-local"
              value={utcInput}
              onChange={(e) => handleUtcChange(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-ring/60 transition-colors"
              aria-label="UTC datetime input"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">IST Time (UTC+5:30)</label>
            <input
              type="datetime-local"
              value={istInput}
              onChange={(e) => handleIstChange(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-ring/60 transition-colors"
              aria-label="IST datetime input"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60">
          IST is UTC+5:30. Editing either field updates the other automatically.
        </p>
      </div>
    </div>
  );
}

export default function UtcIstConverterPage() {
  return (
    <ToolLayout
      title="UTC ↔ IST Converter"
      description="Convert between UTC and Indian Standard Time (UTC+5:30) instantly."
      category="converters"
      toolId="utc-ist-converter"
    >
      <UtcIstConverter />
    </ToolLayout>
  );
}
