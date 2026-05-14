import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CursorGlow } from "@/components/ui/cursor-glow";

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
    default: "Kaizen — Developer Microtools",
    template: "%s | Kaizen",
  },
  description:
    "A zen workspace for developers. Small tools, big flow. Work with clarity, calm focus, and craftsmanship.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "JWT decoder",
    "regex tester",
    "developer productivity",
    "kaizen",
  ],
  authors: [{ name: "Kaizen" }],
  creator: "Kaizen",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Kaizen — Developer Microtools",
    description:
      "A zen workspace for developers. Small tools, big flow.",
    siteName: "Kaizen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaizen — Developer Microtools",
    description: "A zen workspace for developers. Small tools, big flow.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CursorGlow />
        <TooltipProvider delayDuration={300}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
