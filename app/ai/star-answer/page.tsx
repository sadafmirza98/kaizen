"use client";

import { useState } from "react";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { Sparkles, Copy, Check, RefreshCw } from "lucide-react";

interface StarAnswer {
  situation: string;
  task: string;
  action: string;
  result: string;
  fullAnswer: string;
}

function StarAnswerGenerator() {
  const [question, setQuestion] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [answer, setAnswer] = useState<StarAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!question || !experience) {
      setError("Please fill in the question and your experience.");
      return;
    }
    setLoading(true);
    setError("");
    setAnswer(null);

    try {
      const res = await fetch("/api/ai/star-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, experience, role }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAnswer(data.answer);
    } catch (e) {
      setError((e as Error).message || "Failed to generate answer.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!answer) return;
    await navigator.clipboard.writeText(answer.fullAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STAR_COLORS = {
    situation: "border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/10",
    task: "border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10",
    action: "border-green-500/30 bg-green-50/30 dark:bg-green-950/10",
    result: "border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/10",
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Interview Question *</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Tell me about a time you had to deal with a difficult team member..."
          rows={2}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
          aria-label="Interview question"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Your Experience / Story *</label>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Describe the experience you want to use for this answer. Include what happened, what you did, and the outcome..."
          rows={5}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
          aria-label="Your experience"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Your Role (optional)</label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Software Engineer, Team Lead..."
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
          aria-label="Role"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={generate}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Crafting answer..." : "Generate STAR Answer"}
      </button>

      {answer && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs text-muted-foreground uppercase tracking-wide">Your STAR Answer</h3>
            <button onClick={copy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy full answer"}
            </button>
          </div>
          {(["situation", "task", "action", "result"] as const).map((key) => (
            <div key={key} className={`border rounded-xl p-4 ${STAR_COLORS[key]}`}>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{key}</div>
              <p className="text-sm text-foreground leading-relaxed">{answer[key]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StarAnswerPage() {
  return (
    <AiToolLayout
      title="STAR Answer Generator"
      description="Craft compelling behavioral interview answers using the Situation, Task, Action, Result framework."
    >
      <StarAnswerGenerator />
    </AiToolLayout>
  );
}
