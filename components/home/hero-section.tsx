"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { ZenScene } from "@/components/three/zen-scene-client";

function openSearch() {
  globalThis.window?.dispatchEvent(new Event("open-search"));
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden shrink-0" style={{ height: "clamp(340px, 42vh, 480px)" }}>

      {/* ── HERO BACKGROUND IMAGE ── */}
      {/* Hero background image — /public/hero.bg.png */}
      <Image
        src="/hero.bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay so text stays readable over any image */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(100deg, oklch(0.10 0.008 60 / 0.82) 0%, oklch(0.12 0.010 70 / 0.55) 45%, oklch(0.10 0.008 60 / 0.15) 100%)",
          zIndex: 1,
        }}
      />

      {/* Bottom fade — blends into the tools panel below */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, oklch(0.13 0.008 60) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          zIndex: 3,
        }}
      />

      {/* Three.js sakura particles on top */}
      <div className="absolute inset-0" style={{ zIndex: 4 }}>
        <ZenScene particleColor="#c8a87a" showSakura particleCount={28} />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative h-full flex flex-col justify-center px-10 lg:px-14 max-w-[52%]" style={{ zIndex: 5 }}>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-normal leading-[1.1] mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(32px, 4.5vw, 56px)",
            color: "oklch(0.95 0.008 85)",
            textShadow: "0 2px 20px oklch(0 0 0 / 0.4)",
          }}
        >
          Small tools.
          <br />
          <span style={{ color: "oklch(0.78 0.08 80)" }}>Big flow.</span>
          {" "}
          <span style={{ color: "oklch(0.62 0.08 55 / 0.8)", fontSize: "0.55em" }}>改</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-sm leading-relaxed mb-6 max-w-xs"
          style={{ color: "oklch(0.72 0.008 85)" }}
        >
          150+ microtools to simplify your developer workflow.
          Fast. Private. Beautiful.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="flex items-center gap-3 mb-6"
        >
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "oklch(0.92 0.008 85)",
              color: "oklch(0.14 0.008 60)",
              boxShadow: "0 2px 12px oklch(0 0 0 / 0.3)",
            }}
          >
            Explore all tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={openSearch}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "oklch(1 0 0 / 0.08)",
              color: "oklch(0.88 0.008 85)",
              border: "1px solid oklch(1 0 0 / 0.12)",
              backdropFilter: "blur(8px)",
            }}
            aria-label="Open search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            Quick Search
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: "oklch(1 0 0 / 0.10)", color: "oklch(0.60 0.008 60)" }}
            >
              ⌘K
            </span>
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-2"
        >
        </motion.div>
      </div>
    </section>
  );
}
