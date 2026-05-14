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
    <div className="flex min-h-screen" style={{ background: "oklch(0.13 0.008 60)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          <AiCareerSection />
        </main>
      </div>
    </div>
  );
}
