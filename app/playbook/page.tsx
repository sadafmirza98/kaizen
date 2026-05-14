import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PlaybookSection } from "@/components/home/playbook-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Playbook",
  description: "Complex concepts drawn simply. Visual guides for developers.",
};

export default function PlaybookPage() {
  return (
    <div className="flex min-h-screen" style={{ background: "oklch(0.13 0.008 60)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          {/* ai-bg hero banner */}
          <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
            <div className="absolute inset-0" style={{ backgroundImage: "url('/ai-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, oklch(0.10 0.018 90 / 0.55) 0%, oklch(0.12 0.015 85 / 0.30) 60%, oklch(0.10 0.012 80 / 0.10) 100%)" }} />
            <div className="absolute bottom-0 inset-x-0 h-16" style={{ background: "linear-gradient(to top, oklch(0.13 0.008 60) 0%, transparent 100%)" }} />
            <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-px" style={{ background: "oklch(0.72 0.08 80 / 0.6)" }} />
                <span style={{ color: "oklch(0.72 0.08 80)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>Developer Playbook</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-heading)", color: "oklch(0.88 0.018 75)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, textShadow: "0 2px 16px oklch(0 0 0 / 0.35)", lineHeight: 1.1 }}>
                Complex concepts,{" "}
                <em style={{ color: "oklch(0.78 0.08 80)", fontStyle: "italic" }}>drawn simply.</em>
              </h1>
              <p style={{ color: "oklch(0.68 0.008 80)", fontSize: 14, marginTop: 8 }}>
                Visual guides and mental models for developers.
              </p>
            </div>
          </div>
          <PlaybookSection />
        </main>
      </div>
    </div>
  );
}
