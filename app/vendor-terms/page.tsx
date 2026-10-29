import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "شروط البائعين | Vendor Terms" };

export default function Page() {
  return <ContentPage page="vendorTerms" />;
}
