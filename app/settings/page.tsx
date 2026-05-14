"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useState } from "react";
import { Check } from "lucide-react";

function SettingRow({ label, description, children }: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
      <div>
        <p className="text-sm text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5.5 rounded-full transition-colors ${checked ? "bg-foreground" : "bg-muted border border-border"}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [animations, setAnimations] = useState(true);
  const [particles, setParticles] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-foreground/30" />
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Personal</span>
            </div>
            <h1
              className="text-4xl font-normal text-foreground mb-10"
              style={{ fontFamily: "var(--font-heading)", color: "oklch(0.78 0.08 80)" }}
            >
              Settings
            </h1>

            {/* Appearance */}
            <div className="mb-8">
              <h2 className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Appearance</h2>
              <div className="bg-card border border-border rounded-xl px-5">
                <SettingRow label="Theme" description="Choose your preferred color scheme">
                  <div className="flex gap-1">
                    {(["light", "dark", "system"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors capitalize ${
                          theme === t
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {theme === t && <Check className="w-3 h-3" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </SettingRow>
                <SettingRow label="Animations" description="Enable smooth transitions and motion">
                  <Toggle checked={animations} onChange={setAnimations} />
                </SettingRow>
                <SettingRow label="Particle Effects" description="Show floating dust and sakura particles">
                  <Toggle checked={particles} onChange={setParticles} />
                </SettingRow>
                <SettingRow label="Compact Mode" description="Reduce spacing for more content density">
                  <Toggle checked={compactMode} onChange={setCompactMode} />
                </SettingRow>
              </div>
            </div>

            {/* Account
            <div className="mb-8">
              <h2 className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Account</h2>
              <div className="bg-card border border-border rounded-xl px-5">
                <SettingRow label="Sign In" description="Sync bookmarks, history, and preferences">
                  <button className="px-4 py-2 bg-foreground text-background rounded-lg text-xs font-medium hover:bg-foreground/90 transition-colors">
                    Sign in
                  </button>
                </SettingRow>
              </div>
            </div> */}

            {/* About */}
            <div>
              <h2 className="text-xs text-muted-foreground uppercase tracking-wide mb-4">About</h2>
              <div className="bg-card border border-border rounded-xl px-5">
                <SettingRow label="Version" description="Kaizen Developer Tools">
                  <span className="text-xs font-mono text-muted-foreground">0.1.0</span>
                </SettingRow>
                <SettingRow label="Philosophy">
                  <span className="text-xs text-muted-foreground italic" style={{ fontFamily: "var(--font-heading)" }}>
                    改善 · Continuous Improvement
                  </span>
                </SettingRow>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
