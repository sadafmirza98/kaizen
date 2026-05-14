"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { AlertCircle } from "lucide-react";

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every day at noon", value: "0 12 * * *" },
  { label: "Every Monday 9am", value: "0 9 * * 1" },
  { label: "Every weekday 8am", value: "0 8 * * 1-5" },
  { label: "Every Sunday midnight", value: "0 0 * * 0" },
  { label: "1st of every month", value: "0 0 1 * *" },
  { label: "Every 15 minutes", value: "*/15 * * * *" },
  { label: "Every 6 hours", value: "0 */6 * * *" },
];

function parseCron(expr: string): { valid: boolean; description: string; next: Date[] } {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return { valid: false, description: "Must have exactly 5 fields", next: [] };

  const [min, hour, dom, month, dow] = parts;

  const describeField = (val: string, unit: string, names?: string[]): string => {
    if (val === "*") return `every ${unit}`;
    if (val.startsWith("*/")) return `every ${val.slice(2)} ${unit}s`;
    if (val.includes("-")) {
      const [a, b] = val.split("-");
      const na = names ? names[Number(a)] : a;
      const nb = names ? names[Number(b)] : b;
      return `${unit}s ${na}–${nb}`;
    }
    if (val.includes(",")) {
      const parts = val.split(",").map((v) => (names ? names[Number(v)] ?? v : v));
      return `${unit}s ${parts.join(", ")}`;
    }
    return names ? `${unit} ${names[Number(val)] ?? val}` : `${unit} ${val}`;
  };

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const parts2 = [
    describeField(min, "minute"),
    describeField(hour, "hour"),
    describeField(dom, "day-of-month"),
    describeField(month, "month", months),
    describeField(dow, "weekday", days),
  ];

  const description = `Runs at ${parts2[0]}, ${parts2[1]}, ${parts2[2]}, ${parts2[3]}, ${parts2[4]}`;

  // Generate next 5 occurrences (simplified)
  const next: Date[] = [];
  const now = new Date();
  let d = new Date(now);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);

  const matchField = (val: string, current: number, max: number): boolean => {
    if (val === "*") return true;
    if (val.startsWith("*/")) {
      const step = parseInt(val.slice(2));
      return current % step === 0;
    }
    if (val.includes("-")) {
      const [a, b] = val.split("-").map(Number);
      return current >= a && current <= b;
    }
    if (val.includes(",")) return val.split(",").map(Number).includes(current);
    return parseInt(val) === current;
  };

  let attempts = 0;
  while (next.length < 5 && attempts < 100000) {
    attempts++;
    if (
      matchField(month, d.getMonth() + 1, 12) &&
      matchField(dom, d.getDate(), 31) &&
      matchField(dow, d.getDay(), 6) &&
      matchField(hour, d.getHours(), 23) &&
      matchField(min, d.getMinutes(), 59)
    ) {
      next.push(new Date(d));
    }
    d.setMinutes(d.getMinutes() + 1);
  }

  return { valid: true, description, next };
}

function CronVisualizer() {
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const result = useMemo(() => parseCron(expr), [expr]);

  const fields = expr.trim().split(/\s+/);
  const fieldLabels = ["Minute", "Hour", "Day", "Month", "Weekday"];

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Cron Expression</label>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 font-mono text-lg text-foreground outline-none focus:border-ring/60 transition-colors tracking-widest"
          placeholder="* * * * *"
          spellCheck={false}
          aria-label="Cron expression"
        />
        {/* Field labels */}
        <div className="grid grid-cols-5 gap-2 px-1">
          {fieldLabels.map((label, i) => (
            <div key={label} className="text-center">
              <div className="font-mono text-sm text-foreground/80 mb-0.5">{fields[i] ?? "*"}</div>
              <div className="text-[10px] text-muted-foreground/50">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Presets</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              onClick={() => setExpr(p.value)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                expr === p.value
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {result.valid ? (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-foreground leading-relaxed">{result.description}</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Next 5 Occurrences</label>
            <div className="space-y-1.5">
              {result.next.map((d, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-2.5">
                  <span className="text-[10px] text-muted-foreground/40 w-4">{i + 1}</span>
                  <span className="font-mono text-xs text-foreground">{d.toLocaleString()}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground/50">{d.toISOString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-xs text-red-600 dark:text-red-400">{result.description}</p>
        </div>
      )}
    </div>
  );
}

export default function CronVisualizerPage() {
  return (
    <ToolLayout
      title="Cron Visualizer"
      description="Visualize and understand cron expressions in plain English with next run times."
      category="web"
      toolId="cron-visualizer"
    >
      <CronVisualizer />
    </ToolLayout>
  );
}
