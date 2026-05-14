"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Command, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "@/lib/tools-data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function TopBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  // Initialise from localStorage synchronously to avoid flash + setState-in-effect warning
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("theme");
    return saved !== "light"; // default dark
  });
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Apply dark-theme class on mount and whenever isDark changes
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((v) => !v), []);

  // Cmd+K / Ctrl+K — focus the search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for custom "open-search" event dispatched by the Quick Search button
  useEffect(() => {
    const handleOpenSearch = () => {
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  const filtered =
    query.length > 1
      ? tools
          .filter(
            (t) =>
              t.name.toLowerCase().includes(query.toLowerCase()) ||
              t.tags.some((tag) => tag.includes(query.toLowerCase()))
          )
          .slice(0, 6)
      : [];

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 shrink-0"
      style={{
        background: "oklch(0.13 0.008 60)",
        borderBottom: "1px solid oklch(1 0 0 / 0.06)",
      }}
    >
      {/* Search — centered, takes most space */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <div
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all duration-200"
            style={{
              background: focused ? "oklch(0.20 0.008 60)" : "oklch(0.18 0.008 60)",
              border: `1px solid ${focused ? "oklch(1 0 0 / 0.15)" : "oklch(1 0 0 / 0.08)"}`,
            }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.48 0.008 60)" }} />
            <input
              ref={inputRef}
              type="text"
              placeholder='Find any tool... (try "json formatter")'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filtered.length > 0) router.push(filtered[0].href);
                if (e.key === "Escape") {
                  setQuery("");
                  inputRef.current?.blur();
                }
              }}
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/40"
              style={{ color: "oklch(0.88 0.008 85)", fontSize: 14 }}
              aria-label="Search tools"
            />
            <div className="flex items-center gap-1 shrink-0" style={{ color: "oklch(0.38 0.008 60)" }}>
              <Command className="w-3 h-3" />
              <span className="text-xs">K</span>
            </div>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {focused && filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden z-50"
                style={{
                  background: "oklch(0.18 0.008 60)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                  boxShadow: "0 8px 32px oklch(0 0 0 / 0.4)",
                }}
              >
                {filtered.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="flex items-center gap-3 px-4 py-3 transition-colors"
                    style={{ color: "oklch(0.78 0.008 85)", fontSize: 14 }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(1 0 0 / 0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span>{tool.name}</span>
                    <span className="ml-auto capitalize" style={{ color: "oklch(0.45 0.008 60)", fontSize: 12 }}>
                      {tool.category}
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105"
          style={{
            background: "oklch(0.18 0.008 60)",
            border: "1px solid oklch(1 0 0 / 0.08)",
            color: "oklch(0.60 0.008 60)",
          }}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          {isDark ? "Light" : "Dark"}
        </button>
        {/* <a
          href="https://github.com/sadafmirza98/kaizen"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105"
          style={{
            background: "oklch(0.18 0.008 60)",
            border: "1px solid oklch(1 0 0 / 0.08)",
            color: "oklch(0.60 0.008 60)",
          }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub
        </a> */}
      </div>
    </div>
  );
}
