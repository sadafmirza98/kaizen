"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FilePen, Star, Flame, MessageSquare, Layout, ArrowRight,
  Cloud, Box, Layers, GitBranch, Lock, Network, Server, Plug, Plus,
} from "lucide-react";
import { aiCareerTools, playbookTopics } from "@/lib/tools-data";

const aiIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "file-pen": FilePen, star: Star, flame: Flame,
  linkedin: Star, "message-square": MessageSquare, layout: Layout,
};

const playbookIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud, box: Box, layers: Layers, "git-branch": GitBranch,
  lock: Lock, network: Network, server: Server, plug: Plug,
};

const panelStyle: React.CSSProperties = {
  background: "oklch(0.97 0.010 85)",
  borderRadius: 16,
  boxShadow: "0 2px 16px oklch(0 0 0 / 0.20)",
  overflow: "hidden",
};

const headerStyle: React.CSSProperties = {
  borderBottom: "1px solid oklch(0.88 0.010 82 / 0.6)",
};

export function BottomSections() {
  return (
    <div className="px-4 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* ── AI Career Suite ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={panelStyle}
      >
        {/* Dark atmospheric header */}
        <div
          className="relative overflow-hidden px-5 py-4"
          style={{
            background: "linear-gradient(135deg, oklch(0.18 0.015 80) 0%, oklch(0.22 0.020 90) 60%, oklch(0.26 0.018 100) 100%)",
            minHeight: 80,
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute right-4 top-0 bottom-0 w-32 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at right, oklch(0.55 0.08 75 / 0.15) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: "oklch(0.92 0.008 85)", fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 500 }}>
                AI Career Suite
              </span>
              <span
                className="px-1.5 py-0.5 rounded font-medium"
                style={{ background: "oklch(0.42 0.08 145 / 0.3)", color: "oklch(0.72 0.08 145)", border: "1px solid oklch(0.42 0.08 145 / 0.3)", fontSize: 11 }}
              >
                New
              </span>
            </div>
            <p style={{ color: "oklch(0.58 0.008 70)", fontSize: 13 }}>
              AI-powered tools to accelerate your career growth.
            </p>
          </div>
        </div>

        {/* Tool list */}
        <div className="p-3 space-y-0.5">
          {aiCareerTools.slice(0, 4).map((tool) => {
            const Icon = aiIconMap[tool.icon] ?? Star;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group"
                onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.93 0.010 82)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.92 0.010 82)", border: "1px solid oklch(0.86 0.010 80 / 0.5)" }}
                >
                  <span style={{ color: "oklch(0.42 0.008 60)" }}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p style={{ color: "oklch(0.22 0.008 60)", fontSize: 13, fontWeight: 500 }}>{tool.name}</p>
                  <p className="truncate" style={{ color: "oklch(0.55 0.008 60)", fontSize: 12 }}>{tool.description.slice(0, 48)}…</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3" style={{ borderTop: "1px solid oklch(0.88 0.010 82 / 0.5)" }}>
          <Link
            href="/ai"
            className="flex items-center gap-1.5 font-medium transition-colors hover:opacity-70"
            style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}
          >
            Explore AI tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* ── Developer Playbook ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        style={panelStyle}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5" style={headerStyle}>
          <div className="flex items-center gap-2">
            <span style={{ color: "oklch(0.22 0.008 60)", fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 500 }}>
              Developer Playbook
            </span>
            <span style={{ color: "oklch(0.55 0.008 60)", fontSize: 13 }}>✦</span>
          </div>
          <span style={{ color: "oklch(0.55 0.008 60)", fontSize: 13 }}>
            Visual guides to complex developer topics.
          </span>
        </div>

        {/* Topics grid */}
        <div className="p-4 grid grid-cols-3 gap-2">
          {playbookTopics.slice(0, 5).map((topic) => {
            const Icon = playbookIconMap[topic.icon] ?? Server;
            return (
              <Link
                key={topic.id}
                href={`/playbook/${topic.id}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: "oklch(0.94 0.010 82)", border: "1px solid oklch(0.88 0.010 80 / 0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.91 0.012 80)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(0.94 0.010 82)")}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "oklch(0.88 0.012 80)", border: "1px solid oklch(0.82 0.010 78 / 0.5)" }}
                >
                  <span style={{ color: "oklch(0.42 0.008 60)" }}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <p style={{ color: "oklch(0.22 0.008 60)", fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>
                    {topic.title.replace(" Explained Visually", "").replace(" Simplified", "").replace(" Basics", "")}
                  </p>
                  <p style={{ color: "oklch(0.55 0.008 60)", fontSize: 11, marginTop: 2 }}>
                    {topic.description.split(" ").slice(0, 3).join(" ")}
                  </p>
                </div>
              </Link>
            );
          })}
          {/* Add more tile */}
          <Link
            href="/playbook"
            className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all duration-150 hover:-translate-y-0.5"
            style={{
              background: "oklch(0.94 0.010 82)",
              border: "1px dashed oklch(0.82 0.010 80 / 0.6)",
            }}
          >
            <Plus className="w-4 h-4" style={{ color: "oklch(0.55 0.008 60)" }} />
            <span className="text-[10px]" style={{ color: "oklch(0.55 0.008 60)" }}>More</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="px-5 py-3" style={{ borderTop: "1px solid oklch(0.88 0.010 82 / 0.5)" }}>
          <Link
            href="/playbook"
            className="flex items-center gap-1.5 font-medium transition-colors hover:opacity-70"
            style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}
          >
            Explore playbook
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
