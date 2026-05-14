"use client";

import { useState } from "react";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { Sparkles, Copy, Check, RefreshCw } from "lucide-react";

function ResumeBulletGenerator() {
  const [role, setRole] = useState("");
  const [task, setTask] = useState("");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = async () => {
    if (!role || !task || !action) {
      setError("Please fill in Role, Task, and Action fields.");
      return;
    }
    setLoading(true);
    setError("");
    setBullets([]);

    try {
      const res = await fetch("/api/ai/resume-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, task, action, result }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setBullets(data.bullets ?? []);
    } catch (e) {
      setError((e as Error).message || "Failed to generate bullets. Check your API key.");
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
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Your Role / Title *</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Senior Software Engineer"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
            aria-label="Role"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Company / Context</label>
          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Fintech startup, 50-person team"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
            aria-label="Context"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Task / Situation *</label>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Describe what you were responsible for or the problem you faced..."
          rows={3}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
          aria-label="Task"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Action you took *</label>
        <textarea
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="What did you specifically do? What technologies, methods, or approaches did you use?"
          rows={3}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
          aria-label="Action"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      <button
        onClick={generate}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Generating..." : "Generate Bullets"}
      </button>

      {bullets.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide">Generated Bullets</h3>
          {bullets.map((bullet, i) => (
            <div key={i} className="group flex items-start gap-3 bg-card border border-border rounded-xl p-4">
              <span className="text-amber-500/60 mt-0.5 shrink-0">•</span>
              <p className="flex-1 text-sm text-foreground leading-relaxed">{bullet}</p>
              <button
                onClick={() => copy(bullet, i)}
                className="shrink-0 p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-accent transition-all"
                aria-label="Copy bullet"
              >
                {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResumeBulletPage() {
  return (
    <AiToolLayout
      title="Resume Bullet Generator"
      description="Transform your work experience into powerful, ATS-optimized resume bullets using the STAR method."
    >
      <ResumeBulletGenerator />
    </AiToolLayout>
  );
}
