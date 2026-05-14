"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, Trash2 } from "lucide-react";

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "IS", "NULL",
  "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "FULL", "CROSS", "ON",
  "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION", "ALL",
  "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE",
  "DROP TABLE", "ALTER TABLE", "ADD", "COLUMN", "PRIMARY KEY", "FOREIGN KEY",
  "REFERENCES", "INDEX", "UNIQUE", "NOT NULL", "DEFAULT", "AS", "DISTINCT",
  "COUNT", "SUM", "AVG", "MIN", "MAX", "CASE", "WHEN", "THEN", "ELSE", "END",
  "EXISTS", "BETWEEN", "LIKE", "ASC", "DESC",
];

function formatSQL(sql: string): string {
  let result = sql.trim();

  // Normalize whitespace
  result = result.replace(/\s+/g, " ");

  // Uppercase keywords
  KEYWORDS.forEach((kw) => {
    const re = new RegExp("\\b" + kw + "\\b", "gi");
    result = result.replace(re, kw);
  });

  // Add newlines before major clauses
  const clauses = [
    "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
    "OUTER JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "UNION", "UNION ALL",
    "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM",
  ];
  clauses.forEach((clause) => {
    const re = new RegExp("\\b" + clause + "\\b", "g");
    result = result.replace(re, "\n" + clause);
  });

  // Indent AND/OR inside WHERE
  result = result.replace(/\n(AND|OR)\b/g, "\n  $1");

  // Indent SELECT columns
  result = result.replace(/SELECT\s+(.+?)\s+FROM/, (_, cols) => {
    const formatted = cols.split(",").map((c: string, i: number) =>
      i === 0 ? c.trim() : `  , ${c.trim()}`
    ).join("\n");
    return `SELECT ${formatted}\nFROM`;
  });

  return result.trim();
}

function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const format = useCallback(() => {
    if (!input.trim()) { setOutput(""); return; }
    setOutput(formatSQL(input));
  }, [input]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(""); setOutput(""); };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={clear}
          className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border text-muted-foreground rounded-xl text-xs hover:text-foreground transition-colors"
          aria-label="Clear"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
        <button
          onClick={format}
          className="px-5 py-2 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Format SQL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Input SQL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"select id, name, email from users where active = 1 and role = 'admin' order by created_at desc limit 10"}
            className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-ring/60 transition-colors resize-none"
            spellCheck={false}
            aria-label="SQL input"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Formatted Output</label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <pre className="w-full h-80 bg-card border border-border rounded-xl p-4 font-mono text-xs text-foreground overflow-auto whitespace-pre">
            {output || <span className="text-muted-foreground/40">Formatted SQL will appear here...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function SqlFormatterPage() {
  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format and beautify SQL queries for readability with keyword highlighting."
      category="formatters"
    >
      <SqlFormatter />
    </ToolLayout>
  );
}
