"use client";

import { useState } from "react";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { Sparkles, Copy, Check, RefreshCw } from "lucide-react";

function LinkedInHeadlineOptimizer() {
  const [currentRole, setCurrentRole] = useState("");
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [currentHeadline, setCurrentHeadline] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = async () => {
    if (!currentRole || !skills) {
      setError("Please fill in your role and key skills.");
      return;
    }
    setLoading(true);
    setError("");
    setHeadlines([]);

    try {
      const res = await fetch("/api/ai/linkedin-headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentRole, skills, goal, currentHeadline }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setHeadlines(data.headlines ?? []);
    } catch (e) {
      setError((e as Error).message || "Failed to generate headlines.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Current Role / Title *</label>
          <input
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            placeholder="Full Stack Developer"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
            aria-label="Current role"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Career Goal</label>
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Open to senior roles, startup CTO..."
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
            aria-label="Career goal"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Key Skills & Technologies *</label>
        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, Node.js, TypeScript, AWS, system design..."
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
          aria-label="Skills"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Current Headline (optional)</label>
        <input
          value={currentHeadline}
          onChange={(e) => setCurrentHeadline(e.target.value)}
          placeholder="Software Developer at Company"
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
          aria-label="Current headline"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={generate}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Generating..." : "Generate Headlines"}
      </button>

      {headlines.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide">Generated Headlines</h3>
          {headlines.map((headline, i) => (
            <div key={i} className="group flex items-center gap-3 bg-card border border-border rounded-xl p-4">
              <p className="flex-1 text-sm text-foreground leading-relaxed">{headline}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-muted-foreground/40">{headline.length} chars</span>
                <button
                  onClick={() => copy(headline, i)}
                  className="p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-accent transition-all"
                  aria-label="Copy headline"
                >
                  {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LinkedInHeadlinePage() {
  return (
    <AiToolLayout
      title="LinkedIn Headline Optimizer"
      description="Generate magnetic LinkedIn headlines that attract recruiters and showcase your unique value."
    >
      <LinkedInHeadlineOptimizer />
    </AiToolLayout>
  );
}
