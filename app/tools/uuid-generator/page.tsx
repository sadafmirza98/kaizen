"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, RefreshCw, Trash2 } from "lucide-react";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>(() => [generateUUID()]);
  const [count, setCount] = useState(1);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, generateUUID));
  }, [count]);

  const copyOne = async (uuid: string, idx: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs text-muted-foreground">Count:</label>
          <div className="flex gap-1">
            {[1, 5, 10, 25].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  count === n
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          {uuids.length > 1 && (
            <button
              onClick={copyAll}
              className="flex items-center gap-1.5 px-4 py-2 bg-card border border-border text-muted-foreground rounded-xl text-xs hover:text-foreground transition-colors"
            >
              {copiedAll ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              Copy All
            </button>
          )}
          <button
            onClick={() => setUuids([])}
            className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border text-muted-foreground rounded-xl text-xs hover:text-foreground transition-colors"
            aria-label="Clear"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <button
            onClick={generate}
            className="flex items-center gap-1.5 px-5 py-2 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Generate
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 group"
          >
            <span className="text-[10px] text-muted-foreground/40 w-6 text-right shrink-0">{i + 1}</span>
            <code className="flex-1 font-mono text-sm text-foreground tracking-wide">{uuid}</code>
            <button
              onClick={() => copyOne(uuid, i)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-accent"
              aria-label="Copy UUID"
            >
              {copiedIdx === i
                ? <Check className="w-3.5 h-3.5 text-green-500" />
                : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
            </button>
          </div>
        ))}
        {uuids.length === 0 && (
          <div className="text-center py-12 text-muted-foreground/50 text-sm">
            Click Generate to create UUIDs
          </div>
        )}
      </div>
    </div>
  );
}

export default function UuidGeneratorPage() {
  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate cryptographically random v4 UUIDs for unique identifiers."
      category="generators"
      toolId="uuid-generator"
    >
      <UuidGenerator />
    </ToolLayout>
  );
}
