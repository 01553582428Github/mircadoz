"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { C } from "@/lib/site-config";
import { UI } from "@/lib/ui-text";
import { EASE } from "./motion";
import { useLang } from "./LangProvider";
import { SiteNav, SiteFooter } from "./SiteChrome";

// هيكل مشترك لكل الصفحات الداخلية: هيدر داكن + مسار تنقل + محتوى
export function PageShell({ title, intro, children, wide = false }: { title: string; intro?: string; children: React.ReactNode; wide?: boolean }) {
  const { lang } = useLang();
  const u = UI[lang];
  return (
    <div className="mk min-h-screen flex flex-col text-gray-800" style={{ background: C.paper }}>
      <SiteNav />
      <header className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20" style={{ background: C.ink }}>
        <div aria-hidden className="absolute inset-0 grid-bg" />
        <div aria-hidden className="absolute -top-32 -end-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-20" style={{ background: C.lime }} />
        <motion.div key={lang + title} className={`relative mx-auto px-5 text-white ${wide ? "max-w-5xl" : "max-w-4xl"}`}
          initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.nav variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition">{u.home}</Link>
            <ChevronLeft size={14} className="ltr:rotate-180" aria-hidden />
            <span aria-current="page" className="text-white/90">{title}</span>
          </motion.nav>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="text-3xl sm:text-5xl font-bold leading-snug mb-4">{title}</motion.h1>
          {intro && <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="text-white/75 leading-loose max-w-2xl text-lg">{intro}</motion.p>}
        </motion.div>
      </header>
      <main id="main" className="flex-1 -mt-8 relative z-10">
        <div className={`mx-auto px-5 pb-20 ${wide ? "max-w-5xl" : "max-w-4xl"}`}>{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
