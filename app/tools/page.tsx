"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Braces, Database, FileText, Code, Key, Clock, Globe, Binary,
  Link as LinkIcon, Fingerprint, Shield, Palette, Settings,
  SearchCode, Timer, Zap, Search, ArrowRight,
} from "lucide-react";
import { tools, categoryLabels, type ToolCategory } from "@/lib/tools-data";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

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
  { id: "web", label: "Web Tools" },
];

function ToolsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive active category directly from URL — no setState-in-effect
  const categoryParam = searchParams.get("category") as ToolCategory | null;
  const activeCategory: ToolCategory | "all" = categoryParam || "all";

  const [query, setQuery] = useState("");

  const handleCategoryChange = (category: ToolCategory | "all") => {
    setQuery("");
    if (category === "all") {
      router.push("/tools");
    } else {
      router.push(`/tools?category=${category}`);
    }
  };

  const filtered = tools.filter((t) => {
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    const matchesQuery =
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some((tag) => tag.includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      {/* ── Hero header with jp-bg ── */}
      <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
        <Image
          src="/jp-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, oklch(0.10 0.018 90 / 0.88) 0%, oklch(0.12 0.015 85 / 0.70) 60%, oklch(0.10 0.012 80 / 0.50) 100%)" }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-16"
          style={{ background: "linear-gradient(to top, oklch(0.13 0.008 60) 0%, transparent 100%)" }}
        />
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px" style={{ background: "oklch(0.72 0.08 80 / 0.6)" }} />
            <span style={{ color: "oklch(0.72 0.08 80)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
              Developer Tools
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              color: "oklch(0.96 0.008 85)",
              fontSize: "clamp(36px, 4.5vw, 54px)",
              fontWeight: 700,
              lineHeight: 1.05,
              textShadow: "0 2px 20px oklch(0 0 0 / 0.5)",
            }}
          >
            All Tools
          </h1>
          <p style={{ color: "oklch(0.72 0.008 80)", fontSize: 15, marginTop: 6, fontWeight: 400 }}>
            Fast, focused, and distraction-free developer utilities.
          </p>
        </div>
      </div>

      {/* ── Search + Filter bar ── */}
      <div className="px-8 lg:px-12 py-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "oklch(0.42 0.008 60)" }} />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none transition-colors"
            style={{
              background: "oklch(0.18 0.008 60)",
              border: "1px solid oklch(1 0 0 / 0.10)",
              color: "oklch(0.88 0.008 85)",
              fontSize: 14,
            }}
            aria-label="Search tools"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className="relative px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium"
                style={{
                  background: active ? "oklch(0.88 0.010 85)" : "oklch(0.18 0.008 60)",
                  color: active ? "oklch(0.14 0.008 60)" : "oklch(0.55 0.008 65)",
                  border: `1px solid ${active ? "transparent" : "oklch(1 0 0 / 0.10)"}`,
                  fontWeight: active ? 600 : 400,
                  fontSize: 14,
                }}
              >
                {cat.label}
                {active && (
                  <motion.div
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "oklch(0.88 0.010 85)", zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tool count ── */}
      <div className="px-8 lg:px-12 mb-4">
        <p style={{ color: "oklch(0.42 0.008 60)", fontSize: 13 }}>
          {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && ` in ${categoryLabels[activeCategory as ToolCategory] ?? activeCategory}`}
          {query && ` matching "${query}"`}
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="px-8 lg:px-12 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${query}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((tool, i) => {
              const Icon = iconMap[tool.icon] ?? Zap;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.025 }}
                >
                  <Link href={tool.href} className="group block h-full">
                    <div
                      className="relative h-full rounded-2xl p-6 transition-all duration-250 hover:-translate-y-1"
                      style={{
                        background: "oklch(0.17 0.008 60)",
                        border: "1px solid oklch(1 0 0 / 0.09)",
                        boxShadow: "0 2px 12px oklch(0 0 0 / 0.18)",
                        minHeight: 170,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.20 0.010 65)";
                        (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.15)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px oklch(0 0 0 / 0.28)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.17 0.008 60)";
                        (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.09)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px oklch(0 0 0 / 0.18)";
                      }}
                    >
                      {tool.featured && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: "oklch(0.72 0.08 80 / 0.8)" }} />
                      )}
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at 30% 20%, oklch(0.72 0.06 80 / 0.07) 0%, transparent 65%)" }}
                      />
                      {/* Icon */}
                      <div
                        className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "oklch(0.22 0.010 68)", border: "1px solid oklch(1 0 0 / 0.10)" }}
                      >
                        <div style={{ color: "oklch(0.62 0.008 65)" }}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      {/* Text */}
                      <div className="relative">
                        <h3 style={{ color: "oklch(0.92 0.008 85)", fontSize: 16, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
                          {tool.name}
                        </h3>
                        <p className="line-clamp-2" style={{ color: "oklch(0.52 0.008 62)", fontSize: 13.5, lineHeight: 1.65 }}>
                          {tool.description}
                        </p>
                      </div>
                      <div className="relative mt-4 flex items-center justify-between">
                        <span style={{ color: "oklch(0.40 0.008 65)", fontSize: 11.5, letterSpacing: "0.09em", textTransform: "uppercase", fontWeight: 500 }}>
                          {categoryLabels[tool.category]}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-all duration-250 translate-x-1 group-hover:translate-x-0"
                          style={{ color: "oklch(0.65 0.008 65)" }}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p style={{ color: "oklch(0.42 0.008 60)", fontSize: 16 }}>
              No tools found{query ? ` for "${query}"` : ""}.
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
        >
          <p style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}>
            Developed by <span style={{ color: "oklch(0.52 0.008 60)", fontWeight: 600 }}>Sadaf Mirza</span>
          </p>
          <p style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}>
            © {new Date().getFullYear()} Kaizen. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen" style={{ background: "oklch(0.13 0.008 60)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto" style={{ background: "oklch(0.13 0.008 60)" }}>
        <MobileNav />
        <main className="flex-1">
          <Suspense>
            <ToolsContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
