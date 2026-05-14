"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Braces, Database, FileText, Code, Key, Clock, Globe, Binary,
  Link as LinkIcon, Fingerprint, Shield, Palette, Settings,
  SearchCode, Timer, Zap, ArrowRight,
} from "lucide-react";
import { tools, categoryLabels, type ToolCategory } from "@/lib/tools-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  braces: Braces, database: Database, "file-text": FileText, code: Code,
  key: Key, clock: Clock, globe: Globe, binary: Binary, link: LinkIcon,
  fingerprint: Fingerprint, shield: Shield, palette: Palette,
  settings: Settings, "search-code": SearchCode, timer: Timer, zap: Zap,
};

const categories: Array<{ id: ToolCategory | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "formatters", label: "Formatters" },
  { id: "converters", label: "Converters" },
  { id: "generators", label: "Generators" },
  { id: "web", label: "Web" },
];

export function ToolsGrid() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Section background — slightly different from hero to create depth */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.82 0.03 70)" }}
      />
      {/* Subtle top texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Ambient glow — top right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, oklch(0.85 0.05 75 / 0.10) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">

        {/* ── Asymmetric header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-4"
            >
              {/* Ink dash */}
              <div
                className="w-6 h-px"
                style={{ background: "oklch(0.18 0.008 60 / 0.3)" }}
              />
              <span
                className="text-[10px] tracking-[0.25em] uppercase font-medium"
                style={{ color: "oklch(0.55 0.008 60)" }}
              >
                Developer Tools
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-heading)", color: "oklch(0.18 0.008 60)" }}
            >
              Every tool you need,
              <br />
              <em className="italic" style={{ color: "oklch(0.48 0.008 60)" }}>
                nothing you don&apos;t.
              </em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start lg:items-end gap-4"
          >
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-1.5 rounded-full text-xs transition-all duration-300"
                  style={
                    activeCategory === cat.id
                      ? {
                          background: "oklch(0.18 0.008 60)",
                          color: "oklch(0.96 0.010 85)",
                          boxShadow: "0 1px 6px oklch(0.18 0.008 60 / 0.2)",
                        }
                      : {
                          background: "oklch(0.99 0.006 85 / 0.8)",
                          color: "oklch(0.48 0.008 60)",
                          border: "1px solid oklch(0.82 0.010 80 / 0.5)",
                        }
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs transition-colors hover:opacity-80"
              style={{ color: "oklch(0.52 0.008 60)" }}
            >
              View all tools
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>

        {/* ── Tool cards grid ── */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        >
          {filtered.map((tool, i) => {
            const Icon = iconMap[tool.icon] ?? Zap;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.04 }}
              >
                <Link href={tool.href} className="group block h-full">
                  <div
                    className="relative h-full rounded-2xl p-5 overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5"
                    style={{
                      background:
                        "linear-gradient(145deg, oklch(0.99 0.008 85) 0%, oklch(0.96 0.010 82) 100%)",
                      border: "1px solid oklch(0.88 0.010 82 / 0.7)",
                      boxShadow:
                        "0 1px 3px oklch(0.18 0.008 60 / 0.05), 0 4px 16px oklch(0.18 0.008 60 / 0.04), inset 0 1px 0 oklch(1 0 0 / 0.6)",
                    }}
                  >
                    {/* Paper grain */}
                    <div
                      className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Hover warm glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 30% 20%, oklch(0.88 0.06 75 / 0.12) 0%, transparent 60%)",
                      }}
                    />

                    {/* Featured dot */}
                    {tool.featured && (
                      <div
                        className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full"
                        style={{ background: "oklch(0.72 0.08 80 / 0.7)" }}
                      />
                    )}

                    {/* Icon container */}
                    <div
                      className="relative w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.94 0.012 82), oklch(0.90 0.014 80))",
                        border: "1px solid oklch(0.84 0.012 80 / 0.6)",
                        boxShadow: "0 1px 4px oklch(0.18 0.008 60 / 0.08), inset 0 1px 0 oklch(1 0 0 / 0.5)",
                      }}
                    >
                      <span style={{ color: "oklch(0.42 0.008 60)" }}>
                        <Icon className="w-4 h-4 transition-colors duration-300" />
                      </span>
                    </div>

                    {/* Text */}
                    <div className="relative">
                      <h3
                        className="text-sm font-medium mb-1.5 leading-snug"
                        style={{ color: "oklch(0.22 0.008 60)" }}
                      >
                        {tool.name}
                      </h3>
                      <p
                        className="text-xs leading-relaxed line-clamp-2"
                        style={{ color: "oklch(0.52 0.008 60)" }}
                      >
                        {tool.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="relative mt-4 flex items-center justify-between">
                      <span
                        className="text-[10px] tracking-wide uppercase"
                        style={{ color: "oklch(0.62 0.008 60 / 0.6)" }}
                      >
                        {categoryLabels[tool.category]}
                      </span>
                      <ArrowRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
                        style={{ color: "oklch(0.42 0.008 60)" }}
                      />
                    </div>

                    {/* Bottom edge shadow — tactile depth */}
                    <div
                      className="absolute bottom-0 inset-x-0 h-px rounded-b-2xl"
                      style={{ background: "oklch(0.18 0.008 60 / 0.06)" }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
