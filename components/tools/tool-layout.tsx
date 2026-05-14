"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ToolSeoContent } from "@/components/tools/tool-seo-content";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  toolId?: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, category, toolId, children }: ToolLayoutProps) {
  return (
    <div
      className="flex min-h-screen"
      style={{ background: "oklch(0.13 0.008 60)" }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main
          className="flex-1 pb-20 lg:pb-0 overflow-y-auto"
          style={{ background: "oklch(0.13 0.008 60)" }}
        >
          {/* Top bar — breadcrumb + title */}
          <div
            className="sticky top-0 z-10 px-8 py-4"
            style={{
              background: "oklch(0.13 0.008 60)",
              borderBottom: "1px solid oklch(1 0 0 / 0.07)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2"
            >
              <Link
                href="/tools"
                className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                style={{ color: "oklch(0.48 0.008 60)", fontSize: 13 }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Tools
              </Link>
              <span style={{ color: "oklch(0.32 0.008 60)", fontSize: 13 }}>/</span>
              <span style={{ color: "oklch(0.40 0.008 60)", fontSize: 13, textTransform: "capitalize" }}>
                {category}
              </span>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto px-8 lg:px-12 py-10">
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-10"
            >
              <h1
                className="font-normal mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "oklch(0.92 0.008 85)",
                  fontSize: "clamp(28px, 3vw, 38px)",
                  lineHeight: 1.15,
                }}
              >
                {title}
              </h1>
              <p style={{ color: "oklch(0.55 0.008 60)", fontSize: 16, lineHeight: 1.6 }}>
                {description}
              </p>
            </motion.div>

            {/* Tool content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <ToolContentTheme>
                {children}
              </ToolContentTheme>
            </motion.div>

            {/* SEO content — use cases, FAQs, related tools */}
            {toolId && <ToolSeoContent toolId={toolId} />}
          </div>

          {/* Footer */}
          <div
            className="max-w-4xl mx-auto px-8 lg:px-12 py-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-2"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
          >
            <p style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}>
              Developed by <span style={{ color: "oklch(0.50 0.008 60)", fontWeight: 500 }}>Sadaf Mirza</span>
            </p>
            <p style={{ color: "oklch(0.38 0.008 60)", fontSize: 13 }}>
              © {new Date().getFullYear()} Kaizen. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

// Wraps tool content with dark-theme-aware styles
function ToolContentTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="tool-content-dark">
      {children}
    </div>
  );
}
