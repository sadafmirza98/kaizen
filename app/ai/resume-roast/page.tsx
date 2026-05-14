"use client";

import { useState } from "react";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { Flame, RefreshCw, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface RoastResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

function ResumeRoast() {
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [result, setResult] = useState<RoastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roast = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/resume-roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data.result);
    } catch (e) {
      setError((e as Error).message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = result
    ? result.score >= 75 ? "text-green-500"
    : result.score >= 50 ? "text-amber-500"
    : "text-red-500"
    : "";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Target Role (optional)</label>
        <input
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="Senior Frontend Engineer at a Series B startup"
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
          aria-label="Target role"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Resume Text *</label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume content here (plain text)..."
          rows={12}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none font-mono"
          spellCheck={false}
          aria-label="Resume text"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={roast}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
        {loading ? "Analyzing..." : "Roast My Resume"}
      </button>

      {result && (
        <div className="space-y-4">
          {/* Score */}
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-6">
            <div className="text-center">
              <div className={`text-5xl font-light ${scoreColor}`} style={{ fontFamily: "var(--font-heading)" }}>
                {result.score}
              </div>
              <div className="text-xs text-muted-foreground mt-1">/ 100</div>
            </div>
            <div className="flex-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.score >= 75 ? "bg-green-400" : result.score >= 50 ? "bg-amber-400" : "bg-red-400"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <p className="text-sm text-foreground leading-relaxed">{result.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-card border border-green-500/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Strengths</span>
              </div>
              {result.strengths.map((s, i) => (
                <p key={i} className="text-xs text-foreground/80 leading-relaxed">• {s}</p>
              ))}
            </div>

            {/* Weaknesses */}
            <div className="bg-card border border-red-500/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide">Weaknesses</span>
              </div>
              {result.weaknesses.map((w, i) => (
                <p key={i} className="text-xs text-foreground/80 leading-relaxed">• {w}</p>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">Actionable Suggestions</span>
            </div>
            {result.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-amber-500/60 text-xs mt-0.5 shrink-0">{i + 1}.</span>
                <p className="text-xs text-foreground/80 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResumeRoastPage() {
  return (
    <AiToolLayout
      title="Resume Roast Analyzer"
      description="Get brutally honest, actionable feedback on your resume from an AI hiring manager perspective."
    >
      <ResumeRoast />
    </AiToolLayout>
  );
}
