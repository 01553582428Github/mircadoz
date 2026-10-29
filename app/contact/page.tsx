import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "تواصل معنا | Contact" };

export default function Page() {
  return <ContactForm />;
}
