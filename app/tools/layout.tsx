import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Developer Tools — JSON, JWT, Regex, UUID & More | Kaizen",
  description:
    "Browse 15+ free online developer tools. JSON formatter, JWT decoder, regex tester, UUID generator, Base64 encoder, SQL formatter, timestamp converter, and more. All browser-based, no data stored.",
  alternates: { canonical: "https://kaizen.tools/tools" },
  openGraph: {
    title: "All Developer Tools | Kaizen",
    description:
      "Browse 15+ free online developer tools — all browser-based, no signup required.",
    url: "https://kaizen.tools/tools",
  },
};

export default function ToolsLayout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>;
}
