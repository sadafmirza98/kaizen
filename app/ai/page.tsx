import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AiCareerSection } from "@/components/home/ai-career-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Career Suite",
  description: "AI-powered tools to craft your career with quiet precision.",
};

export default function AiPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          {/* <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-foreground/30" />
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">AI Career Suite</span>
            </div>
            <h1
              className="text-4xl font-normal text-foreground mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "oklch(0.78 0.08 80)" }}
            >
              Craft your career
            </h1>
            <p className="text-muted-foreground max-w-lg">
              AI-powered tools to help you present your best self — thoughtfully, clearly, and with craft.
            </p>
          </div> */}
          <AiCareerSection />
        </main>
      </div>
    </div>
  );
}
