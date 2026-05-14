"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FilePen, Star, Flame, MessageSquare, Layout, ArrowRight,
  Cloud, Box, Layers, GitBranch, Lock, Network, Server, Plus,
} from "lucide-react";
import { aiCareerTools, playbookTopics } from "@/lib/tools-data";
import { useTheme } from "@/lib/theme-context";

const aiIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "file-pen": FilePen, star: Star, flame: Flame,
  linkedin: Star, "message-square": MessageSquare, layout: Layout,
};

const playbookIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud, box: Box, layers: Layers, "git-branch": GitBranch,
  lock: Lock, network: Network, server: Server,
};

export function BottomSections() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Token sets
  const panelBg      = isDark ? "oklch(0.17 0.008 60)"        : "oklch(0.97 0.010 85)";
  const panelBorder  = isDark ? "oklch(1 0 0 / 0.09)"         : "oklch(0.88 0.010 82 / 0.6)";
  const headerBorder = isDark ? "oklch(1 0 0 / 0.08)"         : "oklch(0.88 0.010 82 / 0.6)";
  const titleColor   = isDark ? "oklch(0.90 0.008 85)"        : "oklch(0.22 0.008 60)";
  const subColor     = isDark ? "oklch(0.52 0.008 65)"        : "oklch(0.55 0.008 60)";
  const itemBg       = isDark ? "oklch(0.22 0.008 60)"        : "oklch(0.92 0.010 82)";
  const itemBorder   = isDark ? "oklch(1 0 0 / 0.10)"         : "oklch(0.86 0.010 80 / 0.5)";
  const itemHoverBg  = isDark ? "oklch(0.24 0.008 60)"        : "oklch(0.93 0.010 82)";
  const itemTitle    = isDark ? "oklch(0.88 0.008 85)"        : "oklch(0.22 0.008 60)";
  const itemDesc     = isDark ? "oklch(0.52 0.008 65)"        : "oklch(0.55 0.008 60)";
  const iconColor    = isDark ? "oklch(0.58 0.008 65)"        : "oklch(0.42 0.008 60)";
  const footerBorder = isDark ? "oklch(1 0 0 / 0.08)"         : "oklch(0.88 0.010 82 / 0.5)";
  const footerLink   = isDark ? "oklch(0.60 0.008 65)"        : "oklch(0.38 0.008 60)";
  const topicBg      = isDark ? "oklch(0.20 0.008 60)"        : "oklch(0.94 0.010 82)";
  const topicBorder  = isDark ? "oklch(1 0 0 / 0.10)"         : "oklch(0.88 0.010 80 / 0.5)";
  const topicHover   = isDark ? "oklch(0.23 0.008 60)"        : "oklch(0.91 0.012 80)";
  const topicIconBg  = isDark ? "oklch(0.25 0.008 60)"        : "oklch(0.88 0.012 80)";
  const topicIconBdr = isDark ? "oklch(1 0 0 / 0.10)"         : "oklch(0.82 0.010 78 / 0.5)";

  return (
    <div className="px-4 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* ── AI Career Suite ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ background: panelBg, borderRadius: 16, border: `1px solid ${panelBorder}`, boxShadow: "0 2px 16px oklch(0 0 0 / 0.20)", overflow: "hidden" }}
      >
        {/* ai-bg image header — always dark regardless of theme */}
        <div className="relative overflow-hidden px-5 py-4" style={{ minHeight: 90 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "url('/ai-bg.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, oklch(0.10 0.018 90 / 0.88) 0%, oklch(0.13 0.020 100 / 0.72) 60%, oklch(0.10 0.015 85 / 0.50) 100%)", zIndex: 1 }} />
          <div className="absolute right-4 top-0 bottom-0 w-32 pointer-events-none" style={{ background: "radial-gradient(ellipse at right, oklch(0.72 0.08 80 / 0.18) 0%, transparent 70%)", zIndex: 2 }} />
          <div className="relative" style={{ zIndex: 3 }}>
            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: "oklch(0.96 0.008 85)", fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, textShadow: "0 1px 8px oklch(0 0 0 / 0.5)" }}>
                AI Career Suite
              </span>
              <span className="px-1.5 py-0.5 rounded font-medium" style={{ background: "oklch(0.42 0.08 145 / 0.35)", color: "oklch(0.80 0.08 145)", border: "1px solid oklch(0.42 0.08 145 / 0.4)", fontSize: 11 }}>
                New
              </span>
            </div>
            <p style={{ color: "oklch(0.72 0.008 80)", fontSize: 13, textShadow: "0 1px 6px oklch(0 0 0 / 0.4)" }}>
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
                onMouseEnter={(e) => (e.currentTarget.style.background = itemHoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: itemBg, border: `1px solid ${itemBorder}` }}>
                  <span style={{ color: iconColor }}><Icon className="w-3.5 h-3.5" /></span>
                </div>
                <div className="min-w-0">
                  <p style={{ color: itemTitle, fontSize: 13, fontWeight: 500 }}>{tool.name}</p>
                  <p className="truncate" style={{ color: itemDesc, fontSize: 12 }}>{tool.description.slice(0, 48)}…</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${footerBorder}` }}>
          <Link href="/ai" className="flex items-center gap-1.5 font-medium transition-colors hover:opacity-70" style={{ color: footerLink, fontSize: 13 }}>
            Explore AI tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* ── Developer Playbook ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        style={{ background: panelBg, borderRadius: 16, border: `1px solid ${panelBorder}`, boxShadow: "0 2px 16px oklch(0 0 0 / 0.20)", overflow: "hidden" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: `1px solid ${headerBorder}` }}>
          <div className="flex items-center gap-2">
            <span style={{ color: titleColor, fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600 }}>Developer Playbook</span>
            <span style={{ color: subColor, fontSize: 13 }}>✦</span>
          </div>
          <span style={{ color: subColor, fontSize: 12 }}>Visual guides to complex topics.</span>
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
                style={{ background: topicBg, border: `1px solid ${topicBorder}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = topicHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = topicBg)}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: topicIconBg, border: `1px solid ${topicIconBdr}` }}>
                  <span style={{ color: iconColor }}><Icon className="w-3.5 h-3.5" /></span>
                </div>
                <div>
                  <p style={{ color: itemTitle, fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>
                    {topic.title.replace(" Explained Visually", "").replace(" Simplified", "").replace(" Basics", "")}
                  </p>
                  <p style={{ color: itemDesc, fontSize: 11, marginTop: 2 }}>
                    {topic.description.split(" ").slice(0, 3).join(" ")}
                  </p>
                </div>
              </Link>
            );
          })}
          <Link
            href="/playbook"
            className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all duration-150 hover:-translate-y-0.5"
            style={{ background: topicBg, border: `1px dashed ${topicBorder}` }}
          >
            <Plus className="w-4 h-4" style={{ color: subColor }} />
            <span style={{ color: subColor, fontSize: 10 }}>More</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${footerBorder}` }}>
          <Link href="/playbook" className="flex items-center gap-1.5 font-medium transition-colors hover:opacity-70" style={{ color: footerLink, fontSize: 13 }}>
            Explore playbook <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
