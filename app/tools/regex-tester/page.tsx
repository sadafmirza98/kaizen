"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FLAG_OPTIONS = [
  { flag: "g", label: "Global", desc: "Find all matches" },
  { flag: "i", label: "Case insensitive", desc: "Ignore case" },
  { flag: "m", label: "Multiline", desc: "^ and $ match line boundaries" },
  { flag: "s", label: "Dot all", desc: ". matches newlines" },
];

function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Set<string>>(new Set(["g"]));
  const [testString, setTestString] = useState(
    "The quick brown fox jumps over the lazy dog.\nPack my box with five dozen liquor jugs."
  );

  const toggleFlag = (f: string) => {
    setFlags((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  };

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [], error: "", highlighted: testString };
    try {
      const re = new RegExp(pattern, Array.from(flags).join(""));
      const allMatches: RegExpExecArray[] = [];
      if (flags.has("g")) {
        let m: RegExpExecArray | null;
        const reCopy = new RegExp(pattern, Array.from(flags).join(""));
        while ((m = reCopy.exec(testString)) !== null) {
          allMatches.push(m);
          if (m.index === reCopy.lastIndex) reCopy.lastIndex++;
        }
      } else {
        const m = re.exec(testString);
        if (m) allMatches.push(m);
      }

      // Build highlighted HTML
      let result = "";
      let lastIndex = 0;
      for (const m of allMatches) {
        result += escapeHtml(testString.slice(lastIndex, m.index));
        result += `<mark class="bg-amber-200/60 dark:bg-amber-700/40 rounded px-0.5">${escapeHtml(m[0])}</mark>`;
        lastIndex = m.index + m[0].length;
        if (m[0].length === 0) lastIndex++;
      }
      result += escapeHtml(testString.slice(lastIndex));

      return { matches: allMatches, error: "", highlighted: result };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: testString };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="space-y-5">
      {/* Pattern input */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Pattern</label>
        <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden focus-within:border-ring/60 transition-colors">
          <span className="px-4 text-muted-foreground/60 text-lg font-mono select-none">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="[a-z]+"
            className="flex-1 bg-transparent py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
            aria-label="Regex pattern"
            spellCheck={false}
          />
          <span className="px-4 text-muted-foreground/60 text-lg font-mono select-none">
            /{Array.from(flags).join("")}
          </span>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-xs text-red-500">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-2">
        {FLAG_OPTIONS.map(({ flag, label }) => (
          <button
            key={flag}
            onClick={() => toggleFlag(flag)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs transition-colors",
              flags.has(flag)
                ? "bg-foreground text-background"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="font-mono mr-1">{flag}</span>
            <span className="opacity-70">{label}</span>
          </button>
        ))}
      </div>

      {/* Test string */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="w-full h-32 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground outline-none focus:border-ring/60 transition-colors resize-none"
          spellCheck={false}
          aria-label="Test string"
        />
      </div>

      {/* Highlighted result */}
      {pattern && !error && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Matches</label>
            <span className="text-xs text-muted-foreground">
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div
            className="bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      )}

      {/* Match details */}
      {matches.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Match Details</label>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {matches.slice(0, 20).map((m, i) => (
              <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-lg px-3 py-2">
                <span className="text-[10px] text-muted-foreground/50 w-6 text-right">{i + 1}</span>
                <code className="text-xs font-mono text-foreground flex-1">{JSON.stringify(m[0])}</code>
                <span className="text-[10px] text-muted-foreground/50">index: {m.index}</span>
              </div>
            ))}
            {matches.length > 20 && (
              <p className="text-xs text-muted-foreground/50 text-center py-1">
                +{matches.length - 20} more matches
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
}

export default function RegexTesterPage() {
  return (
    <ToolLayout
      title="Regex Tester"
      description="Test and debug regular expressions with live matching and match details."
      category="web"
      toolId="regex-tester"
    >
      <RegexTester />
    </ToolLayout>
  );
}
