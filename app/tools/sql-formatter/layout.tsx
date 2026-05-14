import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/seo-data";

export async function generateMetadata(): Promise<Metadata> {
  return getToolMetadata("") ?? {};
}

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>;
}
