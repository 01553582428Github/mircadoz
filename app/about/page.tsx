import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "عن ميركادوز | About" };

export default function Page() {
  return <ContentPage page="about" />;
}
