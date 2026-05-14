"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, Quote, TrendingUp, ArrowRight } from "lucide-react";
import { zenQuotes } from "@/lib/tools-data";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-context";

// 20 deep Japanese concepts & quotes — rotated every 60 seconds
const ZEN_QUOTES = [
  { japanese: "一期一会", romaji: "Ichi-go ichi-e", text: "One time, one meeting. Treasure every encounter — it will never recur." },
  { japanese: "侘び寂び", romaji: "Wabi-sabi", text: "Find beauty in imperfection, impermanence, and incompleteness." },
  { japanese: "金継ぎ", romaji: "Kintsugi", text: "Broken and repaired with gold — your scars are what make you precious." },
  { japanese: "生き甲斐", romaji: "Ikigai", text: "The reason you rise each morning. Where passion, mission, vocation, and profession meet." },
  { japanese: "木漏れ日", romaji: "Komorebi", text: "The interplay of light and leaves. Beauty lives in the spaces between." },
  { japanese: "物の哀れ", romaji: "Mono no aware", text: "The gentle sadness of passing things. Impermanence is not loss — it is life." },
  { japanese: "間", romaji: "Ma", text: "The pregnant pause. Negative space is not emptiness — it is potential." },
  { japanese: "改善", romaji: "Kaizen", text: "One percent better every day. Mastery is the sum of small, consistent acts." },
  { japanese: "諦め", romaji: "Akirame", text: "Clear-eyed acceptance. Not giving up — seeing clearly what is and is not yours to change." },
  { japanese: "森林浴", romaji: "Shinrin-yoku", text: "Forest bathing. Let nature absorb what the mind cannot process alone." },
  { japanese: "縁", romaji: "En", text: "The invisible thread connecting people across time. Some bonds are written before birth." },
  { japanese: "無常", romaji: "Mujō", text: "All things are transient. Clinging to permanence is the root of suffering." },
  { japanese: "道", romaji: "Dō", text: "The Way. Every craft, every discipline, is a path toward the self." },
  { japanese: "空", romaji: "Ku", text: "Emptiness as fullness. The bowl is useful precisely because it is hollow." },
  { japanese: "心", romaji: "Kokoro", text: "Heart-mind. In Japanese, thought and feeling are one word — one truth." },
  { japanese: "残心", romaji: "Zanshin", text: "Lingering awareness. The archer's mind stays with the arrow long after release." },
  { japanese: "不完全", romaji: "Fukanzen", text: "Incompleteness is not failure. The unfinished invites the viewer to complete it." },
  { japanese: "精進", romaji: "Shōjin", text: "Devoted effort. Progress is not talent — it is showing up with full attention." },
  { japanese: "自然", romaji: "Shizen", text: "Naturalness. The highest art conceals all effort and appears effortless." },
  { japanese: "無為", romaji: "Mui", text: "Non-action. Sometimes the most powerful move is to be still and let things unfold." },
];

function Sparkline({ isDark }: { readonly isDark: boolean }) {
  const points = [4, 8, 5, 12, 7, 15, 10, 18, 12, 16, 14, 20, 13, 22, 18, 20, 22, 24, 20, 26];
  const max = Math.max(...points);
  const w = 140, h = 32;
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <polyline
        points={pts}
        stroke={isDark ? "oklch(0.55 0.008 65)" : "oklch(0.42 0.008 60)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DailyFlowWidget() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Pick a random quote on mount, then rotate every 60 seconds
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * ZEN_QUOTES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => {
          let next = Math.floor(Math.random() * ZEN_QUOTES.length);
          // avoid repeating same quote
          while (next === prev) next = Math.floor(Math.random() * ZEN_QUOTES.length);
          return next;
        });
        setVisible(true);
      }, 400);
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const quote = ZEN_QUOTES[idx];

  const cardBg = isDark ? "oklch(0.17 0.008 60)" : "oklch(0.97 0.012 82)";
  const cardBorder = isDark ? "oklch(1 0 0 / 0.09)" : "oklch(0.88 0.012 80 / 0.7)";
  const titleColor = isDark ? "oklch(0.88 0.008 85)" : "oklch(0.22 0.008 60)";
  const jpColor = isDark ? "oklch(0.90 0.008 85)" : "oklch(0.18 0.008 60)";
  const romajiColor = isDark ? "oklch(0.55 0.008 65)" : "oklch(0.52 0.008 60)";
  const textColor = isDark ? "oklch(0.65 0.008 70)" : "oklch(0.32 0.008 60)";
  const innerBg = isDark ? "oklch(0.22 0.008 60)" : "oklch(0.93 0.010 82)";
  const innerBorder = isDark ? "oklch(1 0 0 / 0.10)" : "oklch(0.87 0.010 80 / 0.5)";
  const dividerColor = isDark ? "oklch(1 0 0 / 0.08)" : "oklch(0.88 0.010 82 / 0.4)";
  const footerColor = isDark ? "oklch(0.50 0.008 65)" : "oklch(0.52 0.008 60)";

  return (
    <div
      className="p-5"
      style={{ background: cardBg, borderRadius: 14, border: `1px solid ${cardBorder}`, boxShadow: "0 2px 12px oklch(0 0 0 / 0.12)", overflow: "hidden" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span style={{ color: titleColor, fontSize: 15, fontWeight: 600 }}>Daily Flow</span>
        <Flame className="w-4 h-4" style={{ color: "oklch(0.62 0.10 55)" }} />
      </div>

      <div className="mb-4">
        <Sparkline isDark={isDark} />
      </div>

      {/* Rotating Japanese quote */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="mb-4"
          >
            <div
              className="text-center py-3 px-4 rounded-lg mb-3"
              style={{ background: innerBg, border: `1px solid ${innerBorder}` }}
            >
              <p style={{ fontFamily: "var(--font-heading)", color: jpColor, fontSize: 22, letterSpacing: "0.02em", fontWeight: 600, marginBottom: 4 }}>
                {quote.japanese}
              </p>
              <p style={{ color: romajiColor, fontSize: 11, fontStyle: "italic" }}>
                {quote.romaji}
              </p>
            </div>
            <p style={{ color: textColor, fontSize: 12.5, lineHeight: 1.6, textAlign: "center" }}>
              {quote.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${dividerColor}` }}>
        <span style={{ color: footerColor, fontSize: 12 }}>Rotates every minute</span>
        <div
          className="w-8 h-8 rounded flex items-center justify-center font-bold shrink-0"
          style={{ background: "oklch(0.55 0.18 25 / 0.12)", border: "1px solid oklch(0.55 0.18 25 / 0.25)", color: "oklch(0.50 0.18 25)", fontFamily: "var(--font-heading)", fontSize: 13 }}
        >
          改
        </div>
      </div>
    </div>
  );
}

function QuoteWidget() {
  const quote = useMemo(() => {
    const i = new Date().getDate() % zenQuotes.length;
    return zenQuotes[i];
  }, []);

  return (
    <div className="p-4 relative overflow-hidden" style={{ borderRadius: 14, border: "1px solid oklch(1 0 0 / 0.10)", boxShadow: "0 2px 12px oklch(0 0 0 / 0.30)", minHeight: 140 }}>
      <div className="absolute inset-0" style={{ backgroundImage: "url('/jp-bg.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.14 0.015 120 / 0.82) 0%, oklch(0.18 0.020 130 / 0.70) 100%)", zIndex: 1 }} />
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="flex items-center gap-2 mb-3">
          <Quote className="w-3.5 h-3.5" style={{ color: "oklch(0.65 0.008 80)" }} />
          <span style={{ color: "oklch(0.65 0.008 80)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>Today&apos;s Quote</span>
        </div>
        <blockquote className="italic mb-3" style={{ fontFamily: "var(--font-heading)", color: "oklch(0.82 0.03 70)", fontSize: 14, lineHeight: 1.6 }}>
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <cite style={{ color: "oklch(0.65 0.008 80)", fontSize: 12 }} className="not-italic">— {quote.author}</cite>
      </div>
    </div>
  );
}

function TrendingWidget() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardBg = isDark ? "oklch(0.17 0.008 60)" : "oklch(0.97 0.012 82)";
  const cardBorder = isDark ? "oklch(1 0 0 / 0.09)" : "oklch(0.88 0.012 80 / 0.7)";
  const titleColor = isDark ? "oklch(0.88 0.008 85)" : "oklch(0.22 0.008 60)";
  const iconColor = isDark ? "oklch(0.55 0.008 65)" : "oklch(0.45 0.008 60)";
  const itemColor = isDark ? "oklch(0.78 0.008 80)" : "oklch(0.28 0.008 60)";
  const numColor = isDark ? "oklch(0.48 0.008 65)" : "oklch(0.62 0.008 60)";
  const countColor = isDark ? "oklch(0.50 0.008 65)" : "oklch(0.55 0.008 60)";
  const linkColor = isDark ? "oklch(0.52 0.008 65)" : "oklch(0.48 0.008 60)";

  const trending = [
    { name: "JSON Formatter", count: "98.4K", href: "/tools/json-formatter" },
    { name: "Regex Tester", count: "76.2K", href: "/tools/regex-tester" },
    { name: "Timestamp Converter", count: "60.1K", href: "/tools/timestamp-converter" },
    { name: "JWT Decoder", count: "44.7K", href: "/tools/jwt-decoder" },
    { name: "API Tester", count: "33.5K", href: "/tools/api-tester" },
  ];

  return (
    <div className="p-4" style={{ background: cardBg, borderRadius: 14, border: `1px solid ${cardBorder}`, boxShadow: "0 2px 12px oklch(0 0 0 / 0.10)", overflow: "hidden" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: iconColor }} />
          <span style={{ color: titleColor, fontSize: 14, fontWeight: 600 }}>Trending Tools</span>
        </div>
        <span style={{ color: countColor, fontSize: 13 }}>↗</span>
      </div>
      <ul className="space-y-2.5">
        {trending.map((item, i) => (
          <li key={item.name}>
            <Link href={item.href} className="flex items-center gap-2 group">
              <span className="tabular-nums text-right shrink-0" style={{ color: numColor, fontSize: 12, width: 18 }}>{i + 1}.</span>
              <span className="flex-1 transition-colors group-hover:opacity-80" style={{ color: itemColor, fontSize: 13 }}>{item.name}</span>
              <span className="tabular-nums" style={{ color: countColor, fontSize: 12 }}>{item.count}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/tools" className="flex items-center gap-1.5 mt-3 transition-colors hover:opacity-70" style={{ color: linkColor, fontSize: 12 }}>
        View all trending <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

function AdWidget() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className="p-4 flex flex-col items-center justify-center"
      style={{ borderRadius: 14, border: `1px solid ${isDark ? "oklch(1 0 0 / 0.09)" : "oklch(0.88 0.012 80 / 0.5)"}`, background: isDark ? "oklch(0.17 0.008 60)" : "oklch(0.97 0.010 82)", minHeight: 120 }}
    >
      <div
        className="w-full flex items-center justify-center rounded-lg"
        style={{ minHeight: 100, background: isDark ? "oklch(0.22 0.008 60)" : "oklch(0.93 0.008 80)", border: `1px dashed ${isDark ? "oklch(1 0 0 / 0.12)" : "oklch(0.80 0.010 78 / 0.6)"}`, color: isDark ? "oklch(0.42 0.008 65)" : "oklch(0.55 0.008 60)", fontSize: 12 }}
      >
        {/* AdSense slot — paste your <ins> tag here */}
        Ad
      </div>
    </div>
  );
}

export function RightWidgets() {
  return (
    <aside
      className="right-widgets hidden xl:flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0 gap-3 p-3"
      style={{ width: 256, background: "oklch(0.13 0.008 60)", borderLeft: "1px solid oklch(1 0 0 / 0.06)", scrollbarWidth: "none", transition: "opacity 0.3s ease, width 0.3s ease" }}
    >
      {[
        { component: <DailyFlowWidget />, delay: 0.1, key: "daily" },
        { component: <QuoteWidget />, delay: 0.18, key: "quote" },
        { component: <TrendingWidget />, delay: 0.26, key: "trending" },
        { component: <AdWidget />, delay: 0.34, key: "ad" },
      ].map(({ component, delay, key }) => (
        <motion.div key={key} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay }}>
          {component}
        </motion.div>
      ))}
    </aside>
  );
}
