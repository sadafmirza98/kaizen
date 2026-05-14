import Link from "next/link";
import { tools } from "@/lib/tools-data";
import { toolSEO } from "@/lib/seo-data";

interface ToolSeoContentProps {
  readonly toolId: string;
}

// Renders SEO-rich content below the tool UI.
// Uses the existing dark aesthetic — no new styles introduced.
export function ToolSeoContent({ toolId }: ToolSeoContentProps) {
  const seo = toolSEO[toolId];
  if (!seo) return null;

  const relatedTools = seo.relatedTools
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as typeof tools;

  return (
    <section aria-label={`About this tool`} className="mt-16 space-y-10">
      {/* Divider */}
      <div style={{ height: 1, background: "oklch(1 0 0 / 0.07)" }} />

      {/* Use Cases */}
      {seo.useCases.length > 0 && (
        <div>
          <h2
            style={{
              color: "oklch(0.72 0.008 80)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Common Use Cases
          </h2>
          <ul className="space-y-2">
            {seo.useCases.map((uc) => (
              <li
                key={uc}
                className="flex items-start gap-2.5"
                style={{ color: "oklch(0.58 0.008 65)", fontSize: 14, lineHeight: 1.6 }}
              >
                <span style={{ color: "oklch(0.45 0.008 65)", marginTop: 2, flexShrink: 0 }}>›</span>
                {uc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ */}
      {seo.faqs.length > 0 && (
        <div>
          <h2
            style={{
              color: "oklch(0.72 0.008 80)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {seo.faqs.map((faq) => (
              <div key={faq.q}>
                <h3
                  style={{
                    color: "oklch(0.82 0.008 82)",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 6,
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </h3>
                <p style={{ color: "oklch(0.55 0.008 65)", fontSize: 14, lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div>
          <h2
            style={{
              color: "oklch(0.72 0.008 80)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: "oklch(0.20 0.008 60)",
                  border: "1px solid oklch(1 0 0 / 0.09)",
                  color: "oklch(0.68 0.008 75)",
                  fontSize: 13,
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* JSON-LD FAQ Schema */}
      {seo.faqs.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: seo.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      )}
    </section>
  );
}
