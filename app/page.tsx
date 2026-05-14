import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Kaizen — Free Developer Microtools | JSON, JWT, Regex & More",
  description:
    "Free online developer tools built for speed and privacy. JSON formatter, JWT decoder, regex tester, UUID generator, Base64 encoder, SQL formatter, and 10+ more. No signup, no data stored.",
  alternates: { canonical: "https://kaizen.tools" },
  openGraph: {
    title: "Kaizen — Free Developer Microtools",
    description:
      "Free online developer tools — JSON formatter, JWT decoder, regex tester, UUID generator, and 10+ more. Fast, private, browser-based.",
    url: "https://kaizen.tools",
  },
};

export default function Page() {
  return <HomePage />;
}
