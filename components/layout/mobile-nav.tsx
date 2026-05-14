"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, Wand2, BookOpen, Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mobileNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/tools", icon: Wrench, label: "Tools" },
  { href: "/ai", icon: Wand2, label: "AI Suite" },
  { href: "/playbook", icon: BookOpen, label: "Playbook" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar for mobile */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-sidebar border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sidebar-primary/20 border border-sidebar-primary/30 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-sidebar-primary" />
          </div>
          <span className="text-sidebar-foreground font-semibold text-sm tracking-wide">
            Kaizen
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[57px] z-40 bg-sidebar border-b border-sidebar-border shadow-xl"
          >
            <nav className="p-4 space-y-1">
              {mobileNavItems.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-sidebar border-t border-sidebar-border">
        <ul className="flex">
          {mobileNavItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 py-3 text-[10px] transition-colors",
                    isActive
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/40 hover:text-sidebar-foreground/70"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
