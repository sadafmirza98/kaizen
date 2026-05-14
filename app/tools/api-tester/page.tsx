"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Plus, Trash2, Send, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface Header { key: string; value: string; enabled: boolean; }

const METHOD_COLORS: Record<Method, string> = {
  GET: "text-green-500",
  POST: "text-blue-500",
  PUT: "text-amber-500",
  PATCH: "text-purple-500",
  DELETE: "text-red-500",
};

function ApiTester() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [method, setMethod] = useState<Method>("GET");
  const [headers, setHeaders] = useState<Header[]>([
    { key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
    time: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"body" | "headers" | "response">("response");

  const addHeader = () => setHeaders((h) => [...h, { key: "", value: "", enabled: true }]);
  const removeHeader = (i: number) => setHeaders((h) => h.filter((_, idx) => idx !== i));
  const updateHeader = (i: number, field: keyof Header, val: string | boolean) =>
    setHeaders((h) => h.map((hdr, idx) => idx === i ? { ...hdr, [field]: val } : hdr));

  const send = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResponse(null);
    const start = Date.now();
    try {
      const hdrs: Record<string, string> = {};
      headers.filter((h) => h.enabled && h.key).forEach((h) => { hdrs[h.key] = h.value; });

      const res = await fetch(url, {
        method,
        headers: hdrs,
        body: ["POST", "PUT", "PATCH"].includes(method) && body ? body : undefined,
      });

      const resHeaders: Record<string, string> = {};
      res.headers.forEach((v, k) => { resHeaders[k] = v; });

      const text = await res.text();
      let formatted = text;
      try { formatted = JSON.stringify(JSON.parse(text), null, 2); } catch { /* not JSON */ }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: resHeaders,
        body: formatted,
        time: Date.now() - start,
      });
      setActiveTab("response");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColor = response
    ? response.status < 300 ? "text-green-500"
    : response.status < 400 ? "text-amber-500"
    : "text-red-500"
    : "";

  return (
    <div className="space-y-4">
      {/* URL bar */}
      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as Method)}
          className={cn(
            "bg-card border border-border rounded-xl px-3 py-2.5 text-sm font-mono font-medium outline-none focus:border-ring/60 transition-colors",
            METHOD_COLORS[method]
          )}
          aria-label="HTTP method"
        >
          {(["GET", "POST", "PUT", "PATCH", "DELETE"] as Method[]).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors font-mono"
          aria-label="Request URL"
        />
        <button
          onClick={send}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {(["headers", "body", "response"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs transition-colors capitalize",
              activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {tab === "response" && response && (
              <span className={cn("ml-1.5 font-mono", statusColor)}>{response.status}</span>
            )}
          </button>
        ))}
      </div>

      {/* Headers tab */}
      {activeTab === "headers" && (
        <div className="space-y-2">
          {headers.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={h.enabled}
                onChange={(e) => updateHeader(i, "enabled", e.target.checked)}
                className="accent-foreground"
                aria-label="Enable header"
              />
              <input
                value={h.key}
                onChange={(e) => updateHeader(i, "key", e.target.value)}
                placeholder="Header name"
                className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60"
                aria-label="Header name"
              />
              <input
                value={h.value}
                onChange={(e) => updateHeader(i, "value", e.target.value)}
                placeholder="Value"
                className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60"
                aria-label="Header value"
              />
              <button onClick={() => removeHeader(i)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Remove header">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button onClick={addHeader} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add header
          </button>
        </div>
      )}

      {/* Body tab */}
      {activeTab === "body" && (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={'{\n  "key": "value"\n}'}
          className="w-full h-48 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
          spellCheck={false}
          aria-label="Request body"
        />
      )}

      {/* Response tab */}
      {activeTab === "response" && (
        <div className="space-y-3">
          {error && (
            <div className="p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-800/30 rounded-xl text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          {response && (
            <>
              <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-3">
                <span className={cn("font-mono text-sm font-medium", statusColor)}>
                  {response.status} {response.statusText}
                </span>
                <span className="text-xs text-muted-foreground">{response.time}ms</span>
                <button onClick={copy} className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto max-h-96">
                {response.body}
              </pre>
            </>
          )}
          {!response && !error && !loading && (
            <div className="text-center py-12 text-muted-foreground/50 text-sm">
              Send a request to see the response
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ApiTesterPage() {
  return (
    <ToolLayout
      title="API Tester"
      description="Test HTTP endpoints with custom headers, request bodies, and response inspection."
      category="web"
    >
      <ApiTester />
    </ToolLayout>
  );
}
