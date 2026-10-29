import { C } from "@/lib/site-config";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Hero } from "@/components/Hero";
import { AppShowcase } from "@/components/AppShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { Loyalty } from "@/components/Loyalty";
import { Faq } from "@/components/Faq";
import { Categories, Join, FinalCta } from "@/components/Sections";

// صفحة Server Component بسيطة تجمع الأقسام (كل قسم Client Component مستقل)
export default function LandingPage() {
  return (
    <div className="mk min-h-screen text-gray-800" style={{ background: C.paper }}>
      <SiteNav />
      <main id="main">
        <Hero />
        <Categories />
        <AppShowcase />
        <HowItWorks />
        <Loyalty />
        <Join />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
