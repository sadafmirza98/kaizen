"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { HeroSection } from "./hero-section";
import { ToolsPanel } from "./tools-panel";
import { BottomSections } from "./bottom-sections";
import { RightWidgets } from "./right-widgets";
import { TopBar } from "./top-bar";

export function HomePage() {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "oklch(0.13 0.008 60)" }}
    >
      {/* Left sidebar */}
      <Sidebar />

      {/* Center scrollable content */}
      <div
        className="flex-1 flex flex-col min-w-0 overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "oklch(0.28 0.008 60) transparent" }}
      >
        {/* Mobile nav */}
        <MobileNav />

        {/* Top search bar */}
        <TopBar />

        {/* Hero — full bleed cinematic */}
        <HeroSection />

        {/* Floating tools panel */}
        <ToolsPanel />

        {/* AI Career + Playbook */}
        <BottomSections />

        {/* Footer */}
        <footer
          className="px-6 py-5 mt-2 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid oklch(0.88 0.010 82 / 0.5)" }}
        >
          <p style={{ color: "oklch(0.50 0.008 60)", fontSize: 13 }}>
            Developed by{" "}
            <span style={{ color: "oklch(0.38 0.008 60)", fontWeight: 500 }}>Sadaf Mirza</span>
          </p>
          <p style={{ color: "oklch(0.50 0.008 60)", fontSize: 13 }}>
            © {new Date().getFullYear()} Kaizen. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Right widgets column */}
      <RightWidgets />
    </div>
  );
}
