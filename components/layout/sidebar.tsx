"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Wrench, ArrowLeftRight, AlignLeft, Sparkles,
  Globe, Wand2, Database, Settings, Focus, BookOpen,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const topNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/tools", icon: Wrench, label: "All Tools" },
  { href: "/ai", icon: Wand2, label: "AI Career Suite" },
  { href: "/playbook", icon: BookOpen, label: "Playbook" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

// Only shown when on /tools route
const toolSubItems = [
  { href: "/tools?category=converters", icon: ArrowLeftRight, label: "Converters" },
  { href: "/tools?category=formatters", icon: AlignLeft, label: "Formatters" },
  { href: "/tools?category=generators", icon: Sparkles, label: "Generators" },
  { href: "/tools?category=web", icon: Globe, label: "Web Tools" },
  { href: "/tools?category=data", icon: Database, label: "Data Tools" },
];

export function Sidebar() {
  const pathname = usePathname();
  const isToolsRoute = pathname === "/tools" || pathname.startsWith("/tools");

  const [focusMode, setFocusMode] = useState(() => {
    if (typeof globalThis.window === "undefined") return false;
    return localStorage.getItem("focusMode") === "true";
  });

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("?")[0];
    return pathname === base || pathname.startsWith(base + "/");
  };

  const isSubActive = (href: string) => {
    const url = new URL(href, "http://x");
    const cat = url.searchParams.get("category");
    if (!cat) return false;
    if (typeof globalThis.window !== "undefined") {
      const params = new URLSearchParams(globalThis.window.location.search);
      return params.get("category") === cat;
    }
    return false;
  };

  return (
    <aside
      className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0 z-40 overflow-hidden"
      style={{
        width: 220,
        background: "linear-gradient(175deg, oklch(0.12 0.022 95) 0%, oklch(0.15 0.028 100) 30%, oklch(0.18 0.030 105) 65%, oklch(0.20 0.025 100) 100%)",
        borderRight: "1px solid oklch(1 0 0 / 0.08)",
        transition: "width 0.25s ease",
      }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center gap-3 px-5 py-5 shrink-0"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
          style={{ border: "1px solid oklch(1 0 0 / 0.20)", background: "oklch(0.22 0.008 60)" }}
        >
          <Image
            src="/favicon.png"
            alt="Kaizen"
            width={36}
            height={36}
            className="w-full h-full object-cover object-center"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="sidebar-logo-text">
          <div style={{ color: "oklch(0.92 0.008 85)", fontFamily: "var(--font-heading)", letterSpacing: "0.18em", fontSize: 17, fontWeight: 700, lineHeight: 1 }}>
            KAIZEN
          </div>
          <div className="sidebar-tagline" style={{ color: "oklch(0.42 0.008 60)", fontSize: 11, letterSpacing: "0.04em", marginTop: 3 }}>
            microtools for developers
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 py-3 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <ul className="space-y-0.5 px-3">
          {topNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative"
                  style={{
                    color: active ? "oklch(0.95 0.008 85)" : "oklch(0.55 0.008 65)",
                    background: active ? "oklch(1 0 0 / 0.10)" : "transparent",
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.82 0.008 85)";
                      (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.55 0.008 65)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "oklch(1 0 0 / 0.10)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className="w-4 h-4 shrink-0 relative z-10"
                    style={{ color: active ? "oklch(0.88 0.010 85)" : "oklch(0.40 0.008 65)" }}
                  />
                  <span className="relative z-10 sidebar-label">{item.label}</span>
                </Link>

                {/* Sub-items — only for All Tools, only on /tools route */}
                {item.href === "/tools" && (
                  <AnimatePresence initial={false}>
                    {isToolsRoute && (
                      <motion.ul
                        key="tool-subnav"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden mt-0.5 space-y-0.5"
                        style={{ paddingLeft: 12 }}
                      >
                        {toolSubItems.map((sub, idx) => {
                          const subActive = isSubActive(sub.href);
                          return (
                            <motion.li
                              key={sub.label}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.2, delay: idx * 0.04 }}
                            >
                              <Link
                                href={sub.href}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150"
                                style={{
                                  color: subActive ? "oklch(0.90 0.008 85)" : "oklch(0.48 0.008 65)",
                                  background: subActive ? "oklch(1 0 0 / 0.08)" : "transparent",
                                  fontSize: 13,
                                  fontWeight: subActive ? 500 : 400,
                                }}
                                onMouseEnter={(e) => {
                                  if (!subActive) {
                                    (e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.008 85)";
                                    (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.04)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!subActive) {
                                    (e.currentTarget as HTMLElement).style.color = "oklch(0.48 0.008 65)";
                                    (e.currentTarget as HTMLElement).style.background = "transparent";
                                  }
                                }}
                              >
                                {/* Connector line */}
                                <span
                                  className="shrink-0"
                                  style={{
                                    width: 1,
                                    height: 14,
                                    background: subActive ? "oklch(0.55 0.008 65)" : "oklch(0.28 0.008 60)",
                                    borderRadius: 1,
                                    marginLeft: 2,
                                  }}
                                />
                                <sub.icon
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color: subActive ? "oklch(0.80 0.008 85)" : "oklch(0.38 0.008 65)" }}
                                />
                                <span className="sidebar-label">{sub.label}</span>
                              </Link>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Focus Mode ── */}
      <div
        className="sidebar-focus-section px-5 py-4 shrink-0"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="sidebar-label" style={{ color: "oklch(0.58 0.008 65)", fontSize: 13, fontWeight: 500 }}>
            Focus Mode
          </span>
          <button
            role="switch"
            aria-checked={focusMode}
            onClick={toggleFocus}
            className="relative shrink-0 transition-colors duration-200"
            style={{
              width: 36, height: 20, borderRadius: 10,
              background: focusMode ? "oklch(0.55 0.10 145)" : "oklch(0.25 0.008 60)",
              border: "1px solid oklch(1 0 0 / 0.10)",
            }}
            aria-label="Toggle focus mode"
          >
            <motion.div
              animate={{ x: focusMode ? 16 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-0.5"
              style={{ width: 14, height: 14, borderRadius: "50%", background: "oklch(0.92 0.008 85)", boxShadow: "0 1px 3px oklch(0 0 0 / 0.3)" }}
            />
          </button>
        </div>
        <p className="sidebar-label" style={{ color: "oklch(0.32 0.008 60)", fontSize: 12 }}>
          {focusMode ? "Distraction-free mode on" : "Distraction free experience"}
        </p>
        <button
          onClick={toggleFocus}
          className="focus-exit-pill items-center justify-center w-8 h-8 rounded-lg mt-1"
          style={{
            background: focusMode ? "oklch(0.55 0.10 145 / 0.3)" : "transparent",
            border: "1px solid oklch(1 0 0 / 0.12)",
            color: focusMode ? "oklch(0.72 0.10 145)" : "oklch(0.50 0.008 60)",
          }}
          aria-label={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
        >
          <Focus className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
