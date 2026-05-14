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
  linkedin: Star, // fallback — lucide-react v1 doesn't include Linkedin
  "message-square": MessageSquare,
  layout: Layout,
};

const accentColors: Record<string, string> = {
  moss: "from-green-900/20 to-transparent border-green-800/30",
  gold: "from-amber-900/20 to-transparent border-amber-800/30",
  cedar: "from-orange-900/20 to-transparent border-orange-800/30",
  sage: "from-emerald-900/20 to-transparent border-emerald-800/30",
  stone: "from-stone-800/20 to-transparent border-stone-700/30",
};

const iconAccents: Record<string, string> = {
  moss: "text-green-400/70",
  gold: "text-amber-400/70",
  cedar: "text-orange-400/70",
  sage: "text-emerald-400/70",
  stone: "text-stone-400/70",
};

export function AiCareerSection() {
  return (
<section className="relative py-24 overflow-hidden bg-white dark:bg-black">
  
  <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-100/40 to-white dark:from-black dark:via-zinc-950 dark:to-black" />
  
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />

  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-900/10 dark:bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
  
  <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-900/10 dark:bg-green-700/10 rounded-full blur-3xl pointer-events-none" />
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
            className="text-muted-foreground max-w-md mx-auto"
          >
            AI-powered tools to help you present your best self — thoughtfully,
            clearly, and with craft.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiCareerTools.map((tool, i) => {
            const Icon = iconMap[tool.icon] ?? Star;
            const accentClass = accentColors[tool.accent] ?? accentColors.stone;
            const iconClass = iconAccents[tool.accent] ?? iconAccents.stone;

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
                    className={`relative h-full bg-gradient-to-br ${accentClass} border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.03] to-transparent rounded-xl" />
                    <div className="relative w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <Icon className={`w-4 h-4 ${iconClass}`} />
                    </div>
                    <div className="relative">
                      <h3 className="text-sm font-medium text-foreground/90 mb-2">{tool.name}</h3>
                      <p className="text-xs text-muted-foreground/70 leading-relaxed">{tool.description}</p>
                    </div>
                    <div className="relative mt-4 flex items-center gap-1 text-xs text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors">
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
