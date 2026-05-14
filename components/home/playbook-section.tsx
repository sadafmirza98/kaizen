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
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <div className="w-4 h-px bg-foreground/30" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Developer Playbook
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-normal text-foreground"
            style={{ fontFamily: "var(--font-heading)", color: "oklch(0.78 0.08 80)" }}
          >
            Complex concepts,
            <br />
            <em className="italic text-muted-foreground/70">drawn simply.</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/playbook"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all topics
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
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
                <div className="relative bg-card border border-border rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:ink-shadow-md ink-shadow paper-texture overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 group-hover:from-amber-50/20 to-transparent transition-all duration-500 rounded-xl" />
                  <div className="relative w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center mb-3 group-hover:bg-accent transition-colors">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <div className="relative">
                    <h3 className="text-xs font-medium text-foreground mb-1 leading-snug">{topic.title}</h3>
                    <p className="text-[10px] text-muted-foreground/70 leading-relaxed">{topic.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-border/50" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
