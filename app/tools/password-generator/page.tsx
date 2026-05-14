"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, RefreshCw, ShieldCheck } from "lucide-react";

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function getStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
  if (score <= 3) return { label: "Fair", color: "bg-amber-400", width: "w-2/4" };
  if (score <= 4) return { label: "Good", color: "bg-yellow-400", width: "w-3/4" };
  return { label: "Strong", color: "bg-green-400", width: "w-full" };
}

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  });
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = useCallback(() => {
    const charset = Object.entries(options)
      .filter(([, v]) => v)
      .map(([k]) => CHARS[k as keyof typeof CHARS])
      .join("");

    if (!charset) return;

    const arr = Array.from({ length: 5 }, () => {
      const bytes = new Uint8Array(length);
      crypto.getRandomValues(bytes);
      return Array.from(bytes).map((b) => charset[b % charset.length]).join("");
    });
    setPasswords(arr);
  }, [length, options]);

  const copy = async (pw: string, idx: number) => {
    await navigator.clipboard.writeText(pw);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const anyOn = Object.values(next).some(Boolean);
      return anyOn ? next : prev;
    });
  };

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Length</label>
            <span className="text-sm font-mono text-foreground">{length}</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-foreground"
            aria-label="Password length"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground/50">
            <span>8</span><span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(options) as Array<keyof typeof options>).map((key) => (
            <button
              key={key}
              onClick={() => toggleOption(key)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs transition-colors text-left ${
                options[key]
                  ? "bg-foreground/10 border border-foreground/20 text-foreground"
                  : "bg-muted border border-border text-muted-foreground"
              }`}
            >
              <div className={`w-3 h-3 rounded border flex items-center justify-center ${
                options[key] ? "bg-foreground border-foreground" : "border-muted-foreground/40"
              }`}>
                {options[key] && <div className="w-1.5 h-1.5 bg-background rounded-sm" />}
              </div>
              <span className="capitalize">{key}</span>
              <span className="ml-auto font-mono text-[9px] text-muted-foreground/50">
                {CHARS[key].slice(0, 6)}…
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Generate Passwords
      </button>

      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pw, i) => {
            const strength = getStrength(pw);
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-4 group">
                <div className="flex items-center gap-3 mb-2">
                  <code className="flex-1 font-mono text-sm text-foreground break-all">{pw}</code>
                  <button
                    onClick={() => copy(pw, i)}
                    className="shrink-0 p-1.5 rounded hover:bg-accent transition-colors"
                    aria-label="Copy password"
                  >
                    {copiedIdx === i
                      ? <Check className="w-4 h-4 text-green-500" />
                      : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-muted-foreground/50" />
                    <span className="text-[10px] text-muted-foreground/60">{strength.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, cryptographically random passwords with custom rules."
      category="generators"
      toolId="password-generator"
    >
      <PasswordGenerator />
    </ToolLayout>
  );
}
