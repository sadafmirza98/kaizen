"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useState } from "react";
import { Check } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

function SettingRow({ label, description, children }: {
  readonly label: string;
  readonly description?: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
      <div>
        <p style={{ color: "oklch(0.88 0.008 85)", fontSize: 14, fontWeight: 500 }}>{label}</p>
        {description && <p style={{ color: "oklch(0.48 0.008 65)", fontSize: 12, marginTop: 2 }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { readonly checked: boolean; readonly onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative shrink-0 transition-colors duration-200"
      style={{
        width: 36, height: 20, borderRadius: 10,
        background: checked ? "oklch(0.55 0.10 145)" : "oklch(0.28 0.008 60)",
        border: "1px solid oklch(1 0 0 / 0.10)",
      }}
    >
      <div
        className="absolute top-0.5 transition-transform duration-200"
        style={{
          width: 14, height: 14, borderRadius: "50%",
          background: "oklch(0.92 0.008 85)",
          transform: checked ? "translateX(16px)" : "translateX(2px)",
          boxShadow: "0 1px 3px oklch(0 0 0 / 0.3)",
        }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [animations, setAnimations] = useState(true);
  const [particles, setParticles] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: "oklch(0.13 0.008 60)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* ai-bg hero banner */}
        <div className="relative overflow-hidden shrink-0" style={{ height: 180 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "url('/ai-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, oklch(0.10 0.018 90 / 0.55) 0%, oklch(0.12 0.015 85 / 0.30) 60%, oklch(0.10 0.012 80 / 0.10) 100%)" }} />
          <div className="absolute bottom-0 inset-x-0 h-16" style={{ background: "linear-gradient(to top, oklch(0.13 0.008 60) 0%, transparent 100%)" }} />
          <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px" style={{ background: "oklch(0.72 0.08 80 / 0.6)" }} />
              <span style={{ color: "oklch(0.72 0.08 80)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>Personal</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", color: "oklch(0.88 0.018 75)", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700, textShadow: "0 2px 16px oklch(0 0 0 / 0.35)" }}>
              Settings
            </h1>
          </div>
        </div>
        <MobileNav />
        <main className="flex-1 pb-20 lg:pb-0">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 py-10">

            {/* Appearance */}
            <div className="mb-8">
              <h2 style={{ color: "oklch(0.45 0.008 65)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Appearance</h2>
              <div className="rounded-xl px-5" style={{ background: "oklch(0.17 0.008 60)", border: "1px solid oklch(1 0 0 / 0.09)" }}>
                <SettingRow label="Theme" description="Choose your preferred color scheme">
                  <div className="flex gap-1.5">
                    {(["light", "dark"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all capitalize"
                        style={{
                          background: theme === t ? "oklch(0.88 0.010 85)" : "oklch(0.22 0.008 60)",
                          color: theme === t ? "oklch(0.14 0.008 60)" : "oklch(0.55 0.008 65)",
                          border: `1px solid ${theme === t ? "transparent" : "oklch(1 0 0 / 0.10)"}`,
                          fontWeight: theme === t ? 600 : 400,
                        }}
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
                <SettingRow label="Particle Effects" description="Show floating sakura particles">
                  <Toggle checked={particles} onChange={setParticles} />
                </SettingRow>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 style={{ color: "oklch(0.45 0.008 65)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>About</h2>
              <div className="rounded-xl px-5" style={{ background: "oklch(0.17 0.008 60)", border: "1px solid oklch(1 0 0 / 0.09)" }}>
                <SettingRow label="Version" description="Kaizen Developer Tools">
                  <span style={{ color: "oklch(0.48 0.008 65)", fontSize: 12, fontFamily: "var(--font-mono)" }}>v0.1.0</span>
                </SettingRow>
                <SettingRow label="Philosophy">
                  <span style={{ color: "oklch(0.48 0.008 65)", fontSize: 12, fontStyle: "italic", fontFamily: "var(--font-heading)" }}>
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
