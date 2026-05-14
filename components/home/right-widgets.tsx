"use client";

import { motion } from "framer-motion";
import { Flame, Quote, TrendingUp, Zap, Plus, ArrowRight } from "lucide-react";
import { zenQuotes, japaneseQuotes, tools } from "@/lib/tools-data";
import Link from "next/link";
import { useMemo } from "react";

const widgetStyle: React.CSSProperties = {
  background: "oklch(0.97 0.010 85)",
  borderRadius: 14,
  border: "1px solid oklch(0.88 0.010 82 / 0.6)",
  boxShadow: "0 1px 8px oklch(0 0 0 / 0.12)",
  overflow: "hidden",
};

const darkWidgetStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, oklch(0.20 0.012 80), oklch(0.24 0.015 90))",
  borderRadius: 14,
  border: "1px solid oklch(1 0 0 / 0.07)",
  boxShadow: "0 1px 8px oklch(0 0 0 / 0.25)",
  overflow: "hidden",
};

function Sparkline() {
  const points = [4, 8, 5, 12, 7, 15, 10, 18, 12, 16, 14, 20, 13, 22, 18, 20, 22, 24, 20, 26];
  const max = Math.max(...points);
  const w = 140, h = 32;
  const pts = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - (v / max) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <polyline
        points={pts}
        stroke="oklch(0.42 0.008 60)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DailyFlowWidget() {
  const japaneseQuote = useMemo(() => {
    const idx = new Date().getDate() % japaneseQuotes.length;
    return japaneseQuotes[idx];
  }, []);

  return (
    <div style={widgetStyle} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4.5 h-4.5" style={{ color: "oklch(0.62 0.10 55)" }} />
          <span style={{ color: "oklch(0.28 0.008 60)", fontSize: 15, fontWeight: 500 }}>Daily Flow</span>
        </div>
      </div>

      <div className="mb-4">
        <Sparkline />
      </div>

      {/* Japanese Quote */}
      <div className="mb-4">
        <div
          className="text-center py-3 px-4 rounded-lg mb-3"
          style={{
            background: "oklch(0.93 0.010 82)",
            border: "1px solid oklch(0.87 0.010 80 / 0.5)",
          }}
        >
          <p
            className="font-medium mb-1"
            style={{
              fontFamily: "var(--font-heading)",
              color: "oklch(0.18 0.008 60)",
              fontSize: 20,
              letterSpacing: "0.02em",
            }}
          >
            {japaneseQuote.japanese}
          </p>
          <p style={{ color: "oklch(0.52 0.008 60)", fontSize: 11, fontStyle: "italic" }}>
            {japaneseQuote.romaji}
          </p>
        </div>
        <p style={{ color: "oklch(0.32 0.008 60)", fontSize: 13, lineHeight: 1.5, textAlign: "center" }}>
          {japaneseQuote.text}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid oklch(0.88 0.010 82 / 0.4)" }}>
        <span style={{ color: "oklch(0.52 0.008 60)", fontSize: 12 }}>
          Keep improving daily
        </span>
        <div
          className="w-8 h-8 rounded flex items-center justify-center font-bold"
          style={{
            background: "oklch(0.55 0.18 25 / 0.15)",
            border: "1px solid oklch(0.55 0.18 25 / 0.3)",
            color: "oklch(0.50 0.18 25)",
            fontFamily: "var(--font-heading)",
            fontSize: 12,
          }}
        >
          改
        </div>
      </div>
    </div>
  );
}

function QuoteWidget() {
  const quote = useMemo(() => {
    const idx = new Date().getDate() % zenQuotes.length;
    return zenQuotes[idx];
  }, []);

  return (
    <div style={darkWidgetStyle} className="p-4 relative overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse at bottom right, oklch(0.55 0.06 140) 0%, transparent 70%)" }}
      />
      <div className="flex items-center gap-2 mb-3">
        <Quote className="w-3.5 h-3.5" style={{ color: "oklch(0.50 0.008 70)" }} />
        <span style={{ color: "oklch(0.48 0.008 70)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          Today&apos;s Quote
        </span>
      </div>
      <blockquote
        className="italic relative z-10 mb-3"
        style={{ fontFamily: "var(--font-heading)", color: "oklch(0.88 0.008 85)", fontSize: 14, lineHeight: 1.6 }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <cite style={{ color: "oklch(0.50 0.008 70)", fontSize: 12 }} className="not-italic">
        — {quote.author}
      </cite>
    </div>
  );
}

function TrendingWidget() {
  const trending = [
    { name: "JSON Formatter", count: "98.4K", href: "/tools/json-formatter" },
    { name: "Regex Tester", count: "76.2K", href: "/tools/regex-tester" },
    { name: "Timestamp Converter", count: "60.1K", href: "/tools/timestamp-converter" },
    { name: "JWT Decoder", count: "44.7K", href: "/tools/jwt-decoder" },
    { name: "API Tester", count: "33.5K", href: "/tools/api-tester" },
  ];

  return (
    <div style={widgetStyle} className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: "oklch(0.45 0.008 60)" }} />
          <span style={{ color: "oklch(0.28 0.008 60)", fontSize: 14, fontWeight: 500 }}>Trending Tools</span>
        </div>
        <span style={{ color: "oklch(0.55 0.008 60)", fontSize: 13 }}>↗</span>
      </div>
      <ul className="space-y-2.5">
        {trending.map((item, i) => (
          <li key={item.name}>
            <Link href={item.href} className="flex items-center gap-2 group">
              <span
                className="tabular-nums text-right shrink-0"
                style={{ color: "oklch(0.62 0.008 60)", fontSize: 12, width: 18 }}
              >
                {i + 1}.
              </span>
              <span
                className="flex-1 transition-colors group-hover:opacity-80"
                style={{ color: "oklch(0.28 0.008 60)", fontSize: 13 }}
              >
                {item.name}
              </span>
              <span className="tabular-nums" style={{ color: "oklch(0.55 0.008 60)", fontSize: 12 }}>
                {item.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/tools"
        className="flex items-center gap-1.5 mt-3 transition-colors hover:opacity-70"
        style={{ color: "oklch(0.48 0.008 60)", fontSize: 12 }}
      >
        View all trending
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

function QuickAccessWidget() {
  const quickTools = tools.slice(0, 6);

  return (
    <div style={widgetStyle} className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: "oklch(0.45 0.008 60)" }} />
          <span style={{ color: "oklch(0.28 0.008 60)", fontSize: 14, fontWeight: 500 }}>Quick Access</span>
        </div>
        <button style={{ color: "oklch(0.48 0.008 60)" }} aria-label="Add tool">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <p style={{ color: "oklch(0.58 0.008 60)", fontSize: 12, marginBottom: 10 }}>
        Your recently used tools
      </p>
      <div className="grid grid-cols-5 gap-2">
        {quickTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-150 hover:-translate-y-0.5"
            style={{ background: "oklch(0.93 0.010 82)", border: "1px solid oklch(0.87 0.010 80 / 0.5)" }}
            title={tool.name}
          >
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "oklch(0.88 0.010 80)" }}
            >
              <Zap className="w-3.5 h-3.5" style={{ color: "oklch(0.42 0.008 60)" }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function RightWidgets() {
  return (
    <aside
      className="hidden xl:flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0 gap-3 p-3"
      style={{
        width: 256,
        background: "oklch(0.13 0.008 60)",
        borderLeft: "1px solid oklch(1 0 0 / 0.06)",
        scrollbarWidth: "none",
      }}
    >
      {[
        { component: <DailyFlowWidget />, delay: 0.1 },
        { component: <QuoteWidget />, delay: 0.18 },
        { component: <TrendingWidget />, delay: 0.26 },
        { component: <QuickAccessWidget />, delay: 0.34 },
      ].map(({ component, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay }}
        >
          {component}
        </motion.div>
      ))}
    </aside>
  );
}
