import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Bookmark } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bookmarks" };

export default function BookmarksPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-foreground/30" />
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Personal</span>
            </div>
            <h1
              className="text-4xl font-normal text-foreground mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bookmarks
            </h1>

            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center mb-4">
                <Bookmark className="w-7 h-7 text-muted-foreground/50" />
              </div>
              <h2 className="text-lg font-normal text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                No bookmarks yet
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs">
                Bookmark your favourite tools and they will appear here for quick access.
              </p>
              <p className="text-xs text-muted-foreground/50 mt-4">
                Sign in to sync bookmarks across devices.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
