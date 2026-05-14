"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { ZenScene } from "@/components/three/zen-scene-client";
import { WorkspaceScene } from "./workspace-scene";

function openSearch() {
  window.dispatchEvent(new Event("open-search"));
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden shrink-0" style={{ height: "clamp(340px, 42vh, 480px)" }}>

      {/* ── CINEMATIC BACKGROUND ── */}
      {/* Deep atmospheric base — dark forest/garden tones */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, oklch(0.18 0.015 80) 0%, oklch(0.22 0.020 90) 30%, oklch(0.28 0.018 100) 60%, oklch(0.20 0.012 75) 100%)",
        }}
      />

      {/* Layered atmospheric depth */}
      {/* Far background — misty forest green */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 65% 30%, oklch(0.35 0.04 140 / 0.5) 0%, oklch(0.22 0.02 120 / 0.3) 40%, transparent 70%)",
        }}
      />
      {/* Mid — warm amber light source (lantern/sun) */}
      <div
        className="absolute"
        style={{
          top: "5%", right: "18%",
          width: 320, height: 320,
          background: "radial-gradient(circle, oklch(0.72 0.10 80 / 0.22) 0%, oklch(0.55 0.08 75 / 0.12) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* Shoji circle glow */}
      <div
        className="absolute"
        style={{
          top: "-10%", right: "10%",
          width: 420, height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.60 0.06 90 / 0.18) 0%, oklch(0.40 0.04 100 / 0.10) 50%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Shoji circle border */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-8%", right: "11%",
          width: 400, height: 400,
          borderRadius: "50%",
          border: "1px solid oklch(1 0 0 / 0.08)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-4%", right: "13%",
          width: 360, height: 360,
          borderRadius: "50%",
          border: "1px solid oklch(1 0 0 / 0.05)",
        }}
      />

      {/* Ground/desk shadow at bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-32"
        style={{
          background: "linear-gradient(to top, oklch(0.10 0.008 60 / 0.8) 0%, transparent 100%)",
        }}
      />

      {/* Fog layers */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, oklch(0.14 0.010 70 / 0.6) 0%, oklch(0.20 0.012 80 / 0.2) 50%, transparent 100%)",
        }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Three.js particles */}
      <ZenScene particleColor="#a09070" showSakura particleCount={35} />

      {/* Workspace scene — right side, blended in */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none">
        <WorkspaceScene />
        {/* Left blend */}
        <div
          className="absolute inset-y-0 left-0 w-48 pointer-events-none"
          style={{ background: "linear-gradient(to right, oklch(0.18 0.015 80) 0%, transparent 100%)" }}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-10 lg:px-14 max-w-[52%]">

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
