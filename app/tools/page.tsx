"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  { id: "all", label: "All Tools" },
  { id: "formatters", label: "Formatters" },
  { id: "converters", label: "Converters" },
  { id: "generators", label: "Generators" },
  { id: "web", label: "Web Tools" },
];

function ToolsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category") as ToolCategory | null;
  
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">(categoryParam || "all");
  const [query, setQuery] = useState("");

  // Sync with URL params on mount
  useEffect(() => {
    const urlCategory = categoryParam || "all";
    if (urlCategory !== activeCategory) {
      setActiveCategory(urlCategory);
    }
  }, [categoryParam]);

  const handleCategoryChange = (category: ToolCategory | "all") => {
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
    <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-px" style={{ background: "oklch(1 0 0 / 0.20)" }} />
          <span style={{ color: "oklch(0.48 0.008 60)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Developer Tools
          </span>
        </div>
        <h1
          className="font-normal mb-3"
          style={{ fontFamily: "var(--font-heading)", color: "oklch(0.92 0.008 85)", fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1 }}
        >
          All Tools
        </h1>
        <p style={{ color: "oklch(0.52 0.008 60)", fontSize: 16, lineHeight: 1.6, maxWidth: 480 }}>
          Every tool you need for your development workflow. Fast, focused, and distraction-free.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "oklch(0.42 0.008 60)" }} />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors"
            style={{
              background: "oklch(0.18 0.008 60)",
              border: "1px solid oklch(1 0 0 / 0.10)",
              color: "oklch(0.88 0.008 85)",
              fontSize: 14,
            }}
            aria-label="Search tools"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className="px-5 py-2.5 rounded-full transition-all duration-200"
              style={{
                background: activeCategory === cat.id ? "oklch(0.88 0.008 85)" : "oklch(0.18 0.008 60)",
                color: activeCategory === cat.id ? "oklch(0.14 0.008 60)" : "oklch(0.52 0.008 60)",
                border: `1px solid ${activeCategory === cat.id ? "transparent" : "oklch(1 0 0 / 0.10)"}`,
                fontSize: 15,
                fontWeight: activeCategory === cat.id ? 500 : 400,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        key={`${activeCategory}-${query}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((tool, i) => {
          const Icon = iconMap[tool.icon] ?? Zap;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <Link href={tool.href} className="group block h-full">
                <div
                  className="relative h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                  style={{
                    background: "oklch(0.18 0.008 60)",
                    border: "1px solid oklch(1 0 0 / 0.09)",
                    boxShadow: "0 2px 12px oklch(0 0 0 / 0.2)",
                    minHeight: "180px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.20 0.008 60)";
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.14)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.18 0.008 60)";
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.09)";
                  }}
                >
                  {tool.featured && (
                    <div
                      className="absolute top-4 right-4 w-2 h-2 rounded-full"
                      style={{ background: "oklch(0.72 0.08 80 / 0.8)" }}
                    />
                  )}
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 30% 20%, oklch(0.72 0.06 75 / 0.06) 0%, transparent 60%)" }}
                  />
                  {/* Icon */}
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "oklch(0.22 0.008 60)", border: "1px solid oklch(1 0 0 / 0.10)" }}
                  >
                    <div style={{ color: "oklch(0.58 0.008 60)" }}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Text */}
                  <div className="relative">
                    <h3 className="font-medium mb-2.5" style={{ color: "oklch(0.88 0.008 85)", fontSize: 17 }}>
                      {tool.name}
                    </h3>
                    <p className="line-clamp-2" style={{ color: "oklch(0.50 0.008 60)", fontSize: 14, lineHeight: 1.6 }}>
                      {tool.description}
                    </p>
                  </div>
                  <div className="relative mt-5 flex items-center justify-between">
                    <span style={{ color: "oklch(0.38 0.008 60)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {categoryLabels[tool.category]}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
                      style={{ color: "oklch(0.60 0.008 60)" }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p style={{ color: "oklch(0.45 0.008 60)", fontSize: 16 }}>
            No tools found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}

      {/* Footer */}
      <div
        className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
      >
        <p style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}>
          Developed by <span style={{ color: "oklch(0.50 0.008 60)", fontWeight: 500 }}>Sadaf Mirza</span>
        </p>
        <p style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}>
          © {new Date().getFullYear()} Kaizen. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen" style={{ background: "oklch(0.13 0.008 60)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0" style={{ background: "oklch(0.13 0.008 60)" }}>
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          <Suspense>
            <ToolsContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
