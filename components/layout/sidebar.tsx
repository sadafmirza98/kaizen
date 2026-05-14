"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home, Wrench, ArrowLeftRight, AlignLeft, Sparkles,
  Globe, Wand2, Database, Settings, Focus,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/tools", icon: Wrench, label: "All Tools" },
  { href: "/tools?category=converters", icon: ArrowLeftRight, label: "Converters" },
  { href: "/tools?category=formatters", icon: AlignLeft, label: "Formatters" },
  { href: "/tools?category=generators", icon: Sparkles, label: "Generators" },
  { href: "/tools?category=web", icon: Globe, label: "Web Tools" },
  { href: "/tools?category=web", icon: Database, label: "Data Tools" },
  { href: "/ai", icon: Wand2, label: "AI Career Suite" },
];

export function Sidebar() {
  const pathname = usePathname();
  // Initialise from localStorage synchronously to avoid flash
  const [focusMode, setFocusMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("focusMode") === "true";
  });

  // Sync body class and localStorage whenever focusMode changes
  useEffect(() => {
    if (focusMode) {
      document.body.classList.add("focus-mode");
      localStorage.setItem("focusMode", "true");
    } else {
      document.body.classList.remove("focus-mode");
      localStorage.setItem("focusMode", "false");
    }
  }, [focusMode]);

  const toggleFocus = useCallback(() => setFocusMode((v) => !v), []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <aside
      className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0 z-40 overflow-hidden transition-all duration-250"
      style={{
        width: 220,
        background: "oklch(0.13 0.008 60)",
        borderRight: "1px solid oklch(1 0 0 / 0.07)",
      }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.22 0.008 60)", border: "1px solid oklch(1 0 0 / 0.14)" }}
        >
          <div className="w-3.5 h-3.5 rounded-full" style={{ background: "oklch(0.88 0.008 85)" }} />
        </div>
        <div className="sidebar-logo-text">
          <div
            style={{ color: "oklch(0.92 0.008 85)", fontFamily: "var(--font-heading)", letterSpacing: "0.18em", fontSize: 16, fontWeight: 600, lineHeight: 1 }}
          >
            KAZE
          </div>
          <div className="sidebar-tagline" style={{ color: "oklch(0.45 0.008 60)", fontSize: 11, letterSpacing: "0.04em", marginTop: 3 }}>
            microtools for developers
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 py-3 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <ul className="space-y-0.5 px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative"
                  style={{
                    color: active ? "oklch(0.93 0.008 85)" : "oklch(0.50 0.008 60)",
                    background: active ? "oklch(1 0 0 / 0.08)" : "transparent",
                    fontSize: 14,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.008 85)";
                      (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.50 0.008 60)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "oklch(1 0 0 / 0.08)" }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon
                    className="w-4 h-4 shrink-0 relative z-10"
                    style={{ color: active ? "oklch(0.88 0.008 85)" : "oklch(0.42 0.008 60)" }}
                  />
                  <span className="relative z-10 sidebar-label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Focus Mode — always accessible ── */}
      <div
        className="sidebar-focus-section px-5 py-4"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="sidebar-label" style={{ color: "oklch(0.62 0.008 60)", fontSize: 13, fontWeight: 500 }}>
            Focus Mode
          </span>
          {/* Toggle — always rendered, always clickable */}
          <button
            role="switch"
            aria-checked={focusMode}
            onClick={toggleFocus}
            className="relative shrink-0 transition-colors duration-200"
            style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: focusMode ? "oklch(0.55 0.10 145)" : "oklch(0.28 0.008 60)",
              border: "1px solid oklch(1 0 0 / 0.10)",
            }}
            aria-label="Toggle focus mode"
            title={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
            <motion.div
              animate={{ x: focusMode ? 16 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-0.5"
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "oklch(0.92 0.008 85)",
                boxShadow: "0 1px 3px oklch(0 0 0 / 0.3)",
              }}
            />
          </button>
        </div>
        <p className="sidebar-label" style={{ color: "oklch(0.36 0.008 60)", fontSize: 12 }}>
          {focusMode ? "Distraction-free mode on" : "Distraction free experience"}
        </p>
        {/* Icon-only focus button shown when sidebar is collapsed in focus mode */}
        <button
          onClick={toggleFocus}
          className="focus-exit-pill items-center justify-center w-8 h-8 rounded-lg mt-1"
          style={{
            background: focusMode ? "oklch(0.55 0.10 145 / 0.3)" : "transparent",
            border: "1px solid oklch(1 0 0 / 0.12)",
            color: focusMode ? "oklch(0.72 0.10 145)" : "oklch(0.50 0.008 60)",
          }}
          aria-label={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          title={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
        >
          <Focus className="w-4 h-4" />
        </button>
      </div>

      {/* ── Japanese accent ── */}
      <div
        className="sidebar-quote px-5 py-4"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)" }}
      >
        <p style={{ color: "oklch(0.36 0.008 60)", fontSize: 13, fontFamily: "var(--font-heading)", marginBottom: 4 }}>
          継続は力なり
        </p>
        <p style={{ color: "oklch(0.28 0.008 60)", fontSize: 12, lineHeight: 1.6 }}>
          Keizoku wa chikara nari.<br />Consistency is power.
        </p>
      </div>

      {/* ── Settings ── */}
      <div
        className="sidebar-settings px-3 py-3"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
      >
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
          style={{
            color: pathname === "/settings" ? "oklch(0.93 0.008 85)" : "oklch(0.50 0.008 60)",
            background: pathname === "/settings" ? "oklch(1 0 0 / 0.08)" : "transparent",
            fontSize: 14,
          }}
          onMouseEnter={(e) => {
            if (pathname !== "/settings") {
              (e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.008 85)";
              (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.04)";
            }
          }}
          onMouseLeave={(e) => {
            if (pathname !== "/settings") {
              (e.currentTarget as HTMLElement).style.color = "oklch(0.50 0.008 60)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }
          }}
        >
          <Settings
            className="w-4 h-4 shrink-0"
            style={{ color: pathname === "/settings" ? "oklch(0.88 0.008 85)" : "oklch(0.42 0.008 60)" }}
          />
          <span className="sidebar-label">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
