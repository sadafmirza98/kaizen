"use client";

import { motion } from "framer-motion";
import { Flame, Quote, TrendingUp, Zap } from "lucide-react";
import { zenQuotes, tools } from "@/lib/tools-data";
import Link from "next/link";
import { useMemo } from "react";

// Shared paper note card style
const noteStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, oklch(0.99 0.010 85) 0%, oklch(0.96 0.012 82) 100%)",
  border: "1px solid oklch(0.86 0.010 82 / 0.7)",
  boxShadow:
    "0 2px 8px oklch(0.18 0.008 60 / 0.07), 0 8px 24px oklch(0.18 0.008 60 / 0.04), inset 0 1px 0 oklch(1 0 0 / 0.7)",
  borderRadius: "16px",
};

// Tiny pin dot at top
function PinDot() {
  return (
    <div
      className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
      style={{
        background: "linear-gradient(135deg, oklch(0.62 0.06 55), oklch(0.48 0.05 55))",
        boxShadow: "0 1px 4px oklch(0.18 0.008 60 / 0.25)",
      }}
    />
  );
}

function DailyFlowPanel() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const streak = (dayOfYear % 14) + 1;

  return (
    <div className="relative p-5" style={noteStyle}>
      <PinDot />
      {/* Paper grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-3.5 h-3.5" style={{ color: "oklch(0.65 0.10 55)" }} />
        <span
          className="text-[10px] font-medium tracking-[0.18em] uppercase"
          style={{ color: "oklch(0.52 0.008 60)" }}
        >
          Daily Flow
        </span>
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span
          className="text-5xl font-light leading-none"
          style={{ fontFamily: "var(--font-heading)", color: "oklch(0.22 0.008 60)" }}
        >
          {streak}
        </span>
        <span className="text-xs mb-1.5" style={{ color: "oklch(0.55 0.008 60)" }}>
          day streak
        </span>
      </div>
      <div className="flex gap-1 mb-2">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-colors"
            style={{
              background:
                i < streak % 7
                  ? "oklch(0.68 0.10 75)"
                  : "oklch(0.88 0.008 60)",
            }}
          />
        ))}
      </div>
      <p
        className="text-[10px] italic"
        style={{ fontFamily: "var(--font-heading)", color: "oklch(0.60 0.008 60 / 0.7)" }}
      >
        Keep building. Keep improving.
      </p>
    </div>
  );
}

function QuotePanel() {
  const quote = useMemo(() => {
    const idx = new Date().getDate() % zenQuotes.length;
    return zenQuotes[idx];
  }, []);

  return (
    <div className="relative p-5" style={{ ...noteStyle, transform: "rotate(-0.8deg)" }}>
      <PinDot />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="flex items-center gap-2 mb-4">
        <Quote className="w-3.5 h-3.5" style={{ color: "oklch(0.55 0.008 60 / 0.6)" }} />
        <span
          className="text-[10px] font-medium tracking-[0.18em] uppercase"
          style={{ color: "oklch(0.52 0.008 60)" }}
        >
          Today&apos;s Thought
        </span>
      </div>
      {/* Ruled lines behind quote */}
      <div className="relative">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-x-0 h-px"
            style={{
              top: `${i * 22 + 4}px`,
              background: "oklch(0.72 0.008 60 / 0.12)",
            }}
          />
        ))}
        <blockquote
          className="relative text-sm leading-[1.7] mb-3 italic"
          style={{
            fontFamily: "var(--font-heading)",
            color: "oklch(0.28 0.008 60)",
            minHeight: "88px",
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>
      </div>
      <cite
        className="text-[10px] not-italic"
        style={{ color: "oklch(0.58 0.008 60 / 0.6)" }}
      >
        — {quote.author}
      </cite>
    </div>
  );
}

function TrendingPanel() {
  const trending = tools.filter((t) => t.featured).slice(0, 5);

  return (
    <div className="relative p-5" style={{ ...noteStyle, transform: "rotate(0.5deg)" }}>
      <PinDot />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-3.5 h-3.5" style={{ color: "oklch(0.55 0.008 60 / 0.6)" }} />
        <span
          className="text-[10px] font-medium tracking-[0.18em] uppercase"
          style={{ color: "oklch(0.52 0.008 60)" }}
        >
          Popular Tools
        </span>
      </div>
      <ul className="space-y-2.5">
        {trending.map((tool, i) => (
          <li key={tool.id}>
            <Link href={tool.href} className="flex items-center gap-3 group">
              <span
                className="text-[10px] w-4 text-right shrink-0 tabular-nums"
                style={{ color: "oklch(0.68 0.008 60 / 0.5)" }}
              >
                {i + 1}
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "oklch(0.72 0.008 60 / 0.15)" }}
              />
              <span
                className="text-xs transition-colors group-hover:opacity-100 opacity-75"
                style={{ color: "oklch(0.28 0.008 60)" }}
              >
                {tool.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickAccessPanel() {
  const quickTools = tools.slice(0, 6);

  return (
    <div className="relative p-5" style={{ ...noteStyle, transform: "rotate(-0.4deg)" }}>
      <PinDot />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* <div className="flex items-center gap-2 mb-4">
        <Zap className="w-3.5 h-3.5" style={{ color: "oklch(0.55 0.008 60 / 0.6)" }} />
        <span
          className="text-[10px] font-medium tracking-[0.18em] uppercase"
          style={{ color: "oklch(0.52 0.008 60)" }}
        >
          Quick Access
        </span>
      </div> */}
      <div className="grid grid-cols-3 gap-2">
        {quickTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
            style={{
              background: "oklch(0.94 0.010 82 / 0.6)",
              border: "1px solid oklch(0.86 0.010 80 / 0.4)",
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(0.90 0.012 80)",
                border: "1px solid oklch(0.82 0.010 78 / 0.5)",
              }}
            >
              <Zap className="w-3 h-3" style={{ color: "oklch(0.48 0.008 60)" }} />
            </div>
            <span
              className="text-[9px] text-center leading-tight"
              style={{ color: "oklch(0.48 0.008 60)" }}
            >
              {tool.name.split(" ")[0]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FloatingPanels() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background — warm parchment, slightly darker than tools section */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.95 0.012 82)" }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/3 w-96 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, oklch(0.82 0.06 75 / 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-6 h-px" style={{ background: "oklch(0.18 0.008 60 / 0.25)" }} />
          <span
            className="text-[10px] tracking-[0.25em] uppercase font-medium"
            style={{ color: "oklch(0.55 0.008 60)" }}
          >
            Your Workspace
          </span>
        </motion.div>

        {/* Pinned notes — slightly staggered heights for organic feel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {[
            { component: <DailyFlowPanel />, delay: 0, mt: "mt-0" },
            { component: <QuotePanel />, delay: 0.08, mt: "lg:mt-4" },
            { component: <TrendingPanel />, delay: 0.16, mt: "lg:mt-2" },
            { component: <QuickAccessPanel />, delay: 0.24, mt: "lg:mt-6" },
          ].map(({ component, delay, mt }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay, ease: "easeOut" }}
              className={mt}
            >
              {component}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
