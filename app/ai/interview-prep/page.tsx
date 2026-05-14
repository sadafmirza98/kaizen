"use client";

import { useState } from "react";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { Sparkles, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface Question {
  question: string;
  type: "behavioral" | "technical" | "situational";
  hint: string;
  modelAnswer: string;
}

function InterviewPrep() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState("mid");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const generate = async () => {
    if (!role) {
      setError("Please enter the role you are preparing for.");
      return;
    }
    setLoading(true);
    setError("");
    setQuestions([]);
    setExpanded(null);

    try {
      const res = await fetch("/api/ai/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, level }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setQuestions(data.questions ?? []);
    } catch (e) {
      setError((e as Error).message || "Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  const TYPE_COLORS: Record<string, string> = {
    behavioral: "bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    technical: "bg-green-100/50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    situational: "bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Target Role *</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Senior Software Engineer"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
            aria-label="Target role"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Experience Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-ring/60 transition-colors"
            aria-label="Experience level"
          >
            <option value="junior">Junior (0–2 years)</option>
            <option value="mid">Mid (2–5 years)</option>
            <option value="senior">Senior (5+ years)</option>
            <option value="lead">Lead / Staff</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Key Skills / Tech Stack</label>
        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, TypeScript, Node.js, system design, AWS..."
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
          aria-label="Skills"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={generate}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Generating questions..." : "Generate Interview Questions"}
      </button>

      {questions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide">{questions.length} Questions</h3>
          {questions.map((q, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-accent/50 transition-colors"
              >
                <span className="text-[10px] text-muted-foreground/40 w-5 shrink-0 mt-0.5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${TYPE_COLORS[q.type] ?? ""}`}>
                      {q.type}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{q.question}</p>
                </div>
                {expanded === i
                  ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />}
              </button>
              {expanded === i && (
                <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Hint</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{q.hint}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Model Answer</p>
                    <p className="text-xs text-foreground/80 leading-relaxed">{q.modelAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InterviewPrepPage() {
  return (
    <AiToolLayout
      title="Interview Prep Assistant"
      description="Prepare for technical and behavioral interviews with personalized questions and model answers."
    >
      <InterviewPrep />
    </AiToolLayout>
  );
}
