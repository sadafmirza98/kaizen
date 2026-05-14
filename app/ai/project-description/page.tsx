"use client";

import { useState } from "react";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";

interface Descriptions {
  resume: string;
  github: string;
  portfolio: string;
}

function ProjectDescriptionGenerator() {
  const [projectName, setProjectName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [whatItDoes, setWhatItDoes] = useState("");
  const [impact, setImpact] = useState("");
  const [descriptions, setDescriptions] = useState<Descriptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generate = async () => {
    if (!projectName || !whatItDoes) {
      setError("Please fill in the project name and what it does.");
      return;
    }
    setLoading(true);
    setError("");
    setDescriptions(null);

    try {
      const res = await fetch("/api/ai/project-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName, techStack, whatItDoes, impact }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setDescriptions(data.descriptions);
    } catch (e) {
      setError((e as Error).message || "Failed to generate descriptions.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const VARIANTS = [
    { key: "resume" as const, label: "Resume", desc: "Concise, ATS-optimized bullet" },
    { key: "github" as const, label: "GitHub README", desc: "Technical, developer-focused" },
    { key: "portfolio" as const, label: "Portfolio", desc: "Engaging, story-driven" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Project Name *</label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Kaizen Dev Tools"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
            aria-label="Project name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Tech Stack</label>
          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Next.js, TypeScript, Supabase, OpenAI"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
            aria-label="Tech stack"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">What does it do? *</label>
        <textarea
          value={whatItDoes}
          onChange={(e) => setWhatItDoes(e.target.value)}
          placeholder="A zen workspace for developers with 16+ micro-tools, AI career suite, and developer playbook..."
          rows={3}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
          aria-label="Project description"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Impact / Results (optional)</label>
        <input
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
          placeholder="500+ users, reduced dev workflow time by 30%..."
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors"
          aria-label="Impact"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={generate}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Generating..." : "Generate Descriptions"}
      </button>

      {descriptions && (
        <div className="space-y-4">
          {VARIANTS.map(({ key, label, desc }) => (
            <div key={key} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs font-medium text-foreground">{label}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{desc}</span>
                </div>
                <button
                  onClick={() => copy(descriptions[key], key)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedKey === key ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === key ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{descriptions[key]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDescriptionPage() {
  return (
    <AiToolLayout
      title="Project Description Generator"
      description="Turn your project details into compelling descriptions for portfolios, resumes, and GitHub."
    >
      <ProjectDescriptionGenerator />
    </AiToolLayout>
  );
}
