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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-foreground/30" />
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Developer Playbook</span>
            </div>
            <h1
              className="text-4xl font-normal text-foreground mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "oklch(0.78 0.08 80)"}}
            > Complex concepts,{" "}
              <em className="italic text-muted-foreground/70">drawn simply.</em>
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Visual guides and mental models for developers. Understand the fundamentals deeply.
            </p>
          </div>
          <PlaybookSection />
        </main>
      </div>
    </div>
  );
}
