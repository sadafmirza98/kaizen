"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

interface AiToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AiToolLayout({ title, description, children }: AiToolLayoutProps) {
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
          {/* Atmospheric header */}
          <div
            className="relative overflow-hidden"
            style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
          >
            {/* Background atmosphere */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, oklch(0.16 0.012 75) 0%, oklch(0.18 0.015 85) 50%, oklch(0.14 0.008 60) 100%)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at top right, oklch(0.55 0.08 75 / 0.12) 0%, transparent 65%)",
                filter: "blur(20px)",
              }}
            />

            <div className="relative max-w-4xl mx-auto px-8 lg:px-12 py-8">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2 mb-6"
              >
                <Link
                  href="/ai"
                  className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                  style={{ color: "oklch(0.48 0.008 70)", fontSize: 13 }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  AI Career Suite
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1"
                  style={{
                    background: "oklch(0.55 0.08 75 / 0.15)",
                    border: "1px solid oklch(0.55 0.08 75 / 0.25)",
                  }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: "oklch(0.72 0.08 75)" }} />
                </div>
                <div>
                  <h1
                    className="font-normal mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.92 0.008 85)",
                      fontSize: "clamp(26px, 3vw, 36px)",
                      lineHeight: 1.15,
                    }}
                  >
                    {title}
                  </h1>
                  <p style={{ color: "oklch(0.55 0.008 70)", fontSize: 16, lineHeight: 1.6 }}>
                    {description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-8 lg:px-12 py-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {children}
            </motion.div>
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
