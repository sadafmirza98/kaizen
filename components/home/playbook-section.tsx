"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cloud, Box, Layers, GitBranch, Lock, Network, Server, Plug, ArrowRight,
} from "lucide-react";
import { playbookTopics } from "@/lib/tools-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud,
  box: Box,
  layers: Layers,
  "git-branch": GitBranch,
  lock: Lock,
  network: Network,
  server: Server,
  plug: Plug,
};

export function PlaybookSection() {
  return (
    <section className="max-w-7xl mx-auto">
      {/* Topics grid */}
      <div className="px-6 lg:px-8 pt-6 pb-12">
        <div className="flex justify-end mb-6">
          <Link href="/playbook" className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70" style={{ color: "oklch(0.55 0.008 65)" }}>
            View all topics <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {playbookTopics.map((topic, i) => {
            const Icon = iconMap[topic.icon] ?? Server;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link href={`/playbook/${topic.id}`} className="group block">
                  <div className="relative bg-card border border-border rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 group-hover:from-amber-50/20 to-transparent transition-all duration-500 rounded-xl" />
                    <div className="relative w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center mb-3 group-hover:bg-accent transition-colors">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div className="relative">
                      <h3 className="text-xs font-medium text-foreground mb-1 leading-snug">{topic.title}</h3>
                      <p className="text-[10px] text-muted-foreground/70 leading-relaxed">{topic.description}</p>
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
