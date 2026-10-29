import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "شروط الاستخدام | Terms of Use" };

export default function Page() {
  return <ContentPage page="terms" />;
}
