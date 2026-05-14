"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Braces, Database, FileText, Code, Key, Clock, Globe, Binary,
  Link as LinkIcon, Fingerprint, Shield, Palette, Settings,
  SearchCode, Timer, Zap, ArrowRight, TrendingUp,
} from "lucide-react";
import { tools } from "@/lib/tools-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  braces: Braces, database: Database, "file-text": FileText, code: Code,
  key: Key, clock: Clock, globe: Globe, binary: Binary, link: LinkIcon,
  fingerprint: Fingerprint, shield: Shield, palette: Palette,
  settings: Settings, "search-code": SearchCode, timer: Timer, zap: Zap,
};

export function ToolsPanel() {
  return (
    <div className="px-4 pb-4 relative z-10" style={{ marginTop: '-19px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="tools-panel-container rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.82 0.03 70)",
          border: "1px solid oklch(0.72 0.025 70 / 0.8)",
          boxShadow: "0 4px 32px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.08)",
        }}
      >
        {/* Panel header — ai-bg image, consistent with other widget headers */}
        <div className="relative overflow-hidden px-5" style={{ minHeight: 90 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "url('/ai-bg.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, oklch(0.10 0.018 90 / 0.88) 0%, oklch(0.13 0.020 100 / 0.72) 60%, oklch(0.10 0.015 85 / 0.50) 100%)", zIndex: 1 }} />
          <div className="absolute right-4 top-0 bottom-0 w-32 pointer-events-none" style={{ background: "radial-gradient(ellipse at right, oklch(0.72 0.08 80 / 0.18) 0%, transparent 70%)", zIndex: 2 }} />
          <div className="relative flex flex-col justify-center h-full py-4" style={{ zIndex: 3 }}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" style={{ color: "oklch(0.72 0.08 80)" }} />
              <span className="panel-title" style={{ color: "oklch(0.88 0.018 75)", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-heading)", textShadow: "0 1px 8px oklch(0 0 0 / 0.5)" }}>
                Popular Tools
              </span>
            </div>
            <p style={{ color: "oklch(0.68 0.008 80)", fontSize: 13, textShadow: "0 1px 6px oklch(0 0 0 / 0.4)" }}>A curated suite of developer tools crafted to reduce friction, increase pace and keep developers in ZEN.</p>
            <Link
              href="/tools"
              className="panel-link absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-colors hover:opacity-70"
              style={{ color: "oklch(0.72 0.008 80)", fontSize: 13 }}
            >
              View all tools
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tools grid — 5 columns per row on desktop */}
        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tools.slice(0, 10).map((tool, i) => {
            const Icon = iconMap[tool.icon] ?? Zap;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 + i * 0.03 }}
              >
                <Link
                  href={tool.href}
                  className="tool-card group flex flex-col items-start gap-3 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "oklch(0.99 0.006 85)",
                    border: "1px solid oklch(0.90 0.008 82 / 0.7)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.97 0.010 82)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px oklch(0.18 0.008 60 / 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.99 0.006 85)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Icon */}
                  <div
                    className="tool-icon-bg w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{
                      background: "oklch(0.93 0.010 82)",
                      border: "1px solid oklch(0.86 0.010 80 / 0.5)",
                    }}
                  >
                    <span style={{ color: "oklch(0.38 0.008 60)" }}>
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>
                  {/* Name */}
                  <div>
                    <p className="tool-name" style={{ color: "oklch(0.22 0.008 60)", fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>
                      {tool.name}
                    </p>
                    <p className="tool-desc line-clamp-1" style={{ color: "oklch(0.55 0.008 60)", fontSize: 12, lineHeight: 1.4, marginTop: 3 }}>
                      {tool.description.split(" ").slice(0, 4).join(" ")}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
