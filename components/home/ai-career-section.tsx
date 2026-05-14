"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FilePen, Star, Flame, MessageSquare, Layout, ArrowRight,
} from "lucide-react";
import { aiCareerTools } from "@/lib/tools-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "file-pen": FilePen,
  star: Star,
  flame: Flame,
  linkedin: Star,
  "message-square": MessageSquare,
  layout: Layout,
};

export function AiCareerSection() {
  return (
<section className="relative py-24 overflow-hidden">
  {/* ai-bg background image */}
  <div
    className="absolute inset-0"
    style={{ backgroundImage: "url('/ai-bg.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }}
  />
  {/* Dark overlay */}
  <div
    className="absolute inset-0"
    style={{ background: "linear-gradient(135deg, oklch(0.10 0.018 100 / 0.90) 0%, oklch(0.13 0.020 110 / 0.82) 50%, oklch(0.10 0.015 90 / 0.88) 100%)", zIndex: 1 }}
  />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-amber-600/40" />
            <span className="text-xs tracking-[0.25em] uppercase text-amber-600/60 font-medium">
              AI Career Suite
            </span>
            <div className="w-8 h-px bg-amber-600/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-normal text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "oklch(0.78 0.08 80)" }}
          >
            Craft your career
            <br />
            <em className="italic text-muted-foreground/60">with quiet precision.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "oklch(0.68 0.008 80)", maxWidth: "28rem", margin: "0 auto" }}
          >
            AI-powered tools to help you present your best self — thoughtfully,
            clearly, and with craft.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiCareerTools.map((tool, i) => {
            const Icon = iconMap[tool.icon] ?? Star;

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={tool.href} className="group block h-full">
                  <div
                    className="relative h-full rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    style={{
                      background: "oklch(1 0 0 / 0.08)",
                      border: "1px solid oklch(1 0 0 / 0.18)",
                      boxShadow: "0 4px 24px oklch(0 0 0 / 0.25)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {/* Hover shimmer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      style={{ background: "linear-gradient(135deg, oklch(1 0 0 / 0.08) 0%, transparent 60%)" }} />
                    {/* Icon */}
                    <div
                      className="relative w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "oklch(1 0 0 / 0.12)", border: "1px solid oklch(1 0 0 / 0.20)" }}
                    >
                      <div style={{ color: "oklch(0.85 0.008 85)" }}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Text */}
                    <div className="relative">
                      <h3 style={{ color: "oklch(0.96 0.008 85)", fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.3, textShadow: "0 1px 8px oklch(0 0 0 / 0.3)" }}>
                        {tool.name}
                      </h3>
                      <p style={{ color: "oklch(0.75 0.008 80)", fontSize: 13, lineHeight: 1.65 }}>
                        {tool.description}
                      </p>
                    </div>
                    <div className="relative mt-4 flex items-center gap-1" style={{ color: "oklch(0.65 0.008 80)", fontSize: 12 }}>
                      <span>Open tool</span>
                      <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
