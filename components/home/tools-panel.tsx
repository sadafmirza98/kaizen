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
          background: "oklch(0.97 0.010 85)",
          boxShadow: "0 4px 32px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.08)",
        }}
      >
        {/* Panel header */}
        <div
          className="panel-header flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid oklch(0.88 0.010 82 / 0.6)" }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: "oklch(0.52 0.008 60)" }} />
            <span className="panel-title" style={{ color: "oklch(0.22 0.008 60)", fontSize: 15, fontWeight: 500 }}>
              Popular Tools
            </span>
          </div>
          <Link
            href="/tools"
            className="panel-link flex items-center gap-1.5 transition-colors hover:opacity-70"
            style={{ color: "oklch(0.52 0.008 60)", fontSize: 13 }}
          >
            View all tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
