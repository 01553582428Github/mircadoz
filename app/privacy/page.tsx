import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "سياسة الخصوصية | Privacy Policy" };

export default function Page() {
  return <ContentPage page="privacy" />;
}
