import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ThemeProvider } from "@/lib/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Kaizen — Free Developer Microtools",
    template: "%s | Kaizen",
  },
  description:
    "Free online developer tools — JSON formatter, JWT decoder, regex tester, UUID generator, Base64 encoder, SQL formatter, and 10+ more. Fast, private, browser-based.",
  keywords: [
    "developer tools", "json formatter", "jwt decoder", "regex tester",
    "uuid generator", "base64 encoder", "sql formatter", "timestamp converter",
    "url encoder", "password generator", "cron visualizer", "api tester",
    "markdown preview", "html minifier", "color palette generator",
    "free online developer tools", "browser based tools", "kaizen tools",
  ],
  authors: [{ name: "Kaizen" }],
  creator: "Kaizen",
  metadataBase: new URL("https://kaizen.tools"),
  alternates: {
    canonical: "https://kaizen.tools",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaizen.tools",
    title: "Kaizen — Free Developer Microtools",
    description:
      "Free online developer tools — JSON formatter, JWT decoder, regex tester, UUID generator, and 10+ more. Fast, private, browser-based.",
    siteName: "Kaizen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaizen — Free Developer Microtools",
    description:
      "Free online developer tools — JSON formatter, JWT decoder, regex tester, UUID generator, and 10+ more.",
    creator: "@kaizen_tools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* WebApplication structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Kaizen — Developer Microtools",
              url: "https://kaizen.tools",
              description: "Free online developer tools — JSON formatter, JWT decoder, regex tester, UUID generator, and more. Fast, private, browser-based.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "JSON Formatter & Validator",
                "JWT Decoder",
                "Regex Tester",
                "UUID Generator",
                "Base64 Encoder/Decoder",
                "SQL Formatter",
                "Timestamp Converter",
                "URL Encoder/Decoder",
                "Password Generator",
                "Cron Visualizer",
                "API Tester",
                "Markdown Preview",
                "HTML Minifier",
                "Color Palette Generator",
                "Env Variable Formatter",
              ],
            }),
          }}
        />
        <CursorGlow />
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
