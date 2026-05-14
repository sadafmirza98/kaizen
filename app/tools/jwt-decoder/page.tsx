"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, AlertCircle, ShieldCheck, ShieldAlert } from "lucide-react";

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
  try {
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return atob(padded);
  }
}

interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState("");

  const decode = () => {
    const trimmed = token.trim();
    if (!trimmed) { setDecoded(null); setError(""); return; }
    const parts = trimmed.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT: must have 3 parts separated by dots.");
      setDecoded(null);
      return;
    }
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      setDecoded({ header, payload, signature: parts[2] });
      setError("");
    } catch {
      setError("Failed to decode JWT. Make sure it is a valid token.");
      setDecoded(null);
    }
  };

  const isExpired = decoded?.payload?.exp
    ? (decoded.payload.exp as number) * 1000 < Date.now()
    : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wide">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full h-28 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none break-all"
          spellCheck={false}
          aria-label="JWT token input"
        />
      </div>

      <button
        onClick={decode}
        className="px-6 py-2.5 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
      >
        Decode Token
      </button>

      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {decoded && (
        <div className="space-y-4">
          {/* Expiry status */}
          {isExpired !== null && (
            <div className={`flex items-center gap-2 p-3 rounded-xl text-xs ${
              isExpired
                ? "bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 text-red-600 dark:text-red-400"
                : "bg-green-50/50 dark:bg-green-950/20 border border-green-200/60 dark:border-green-800/30 text-green-700 dark:text-green-400"
            }`}>
              {isExpired
                ? <ShieldAlert className="w-4 h-4" />
                : <ShieldCheck className="w-4 h-4" />}
              {isExpired ? "Token is expired" : "Token is valid (not expired)"}
            </div>
          )}

          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-600/80 uppercase tracking-wide">Header</span>
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            </div>
            <pre className="bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-green-600/80 uppercase tracking-wide">Payload</span>
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            </div>
            <pre className="bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {/* Signature */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wide">Signature (not verified)</span>
            <div className="bg-card border border-border rounded-xl p-4 font-mono text-xs text-muted-foreground break-all">
              {decoded.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JwtDecoderPage() {
  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and inspect JWT tokens. Header, payload, and expiry status — all at a glance."
      category="converters"
    >
      <JwtDecoder />
    </ToolLayout>
  );
}
