"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Utensils, Pill, Store, Bike, Smartphone, ArrowUpRight } from "lucide-react";
import { translations } from "@/lib/translations";
import { C } from "@/lib/site-config";
import { EASE, Reveal } from "./motion";
import { useLang } from "./LangProvider";

/* ------------------------------ الأقسام ------------------------------ */
export function Categories() {
  const { lang } = useLang();
  const t = translations[lang];
  const cats = [
    { icon: Utensils, ...t.categories.restaurants },
    { icon: Pill, ...t.categories.pharmacies },
    { icon: ShoppingBag, ...t.categories.supermarket },
    { icon: Store, ...t.categories.stores },
  ];
  return (
    <section className="py-14 lg:py-20 bg-white border-b" style={{ borderColor: C.line }}>
      <div className="max-w-7xl mx-auto px-5">
        <Reveal><h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-10" style={{ color: C.ink }}>{t.categories.title}</h2></Reveal>
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          {cats.map((cat, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="group rounded-3xl p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:!bg-[#0F2A20]" style={{ background: C.paper }}>
              <span className="w-12 h-12 rounded-2xl grid place-items-center bg-white transition-colors duration-300 group-hover:!bg-[#D9F26B]">
                <cat.icon size={26} style={{ color: C.ink }} />
              </span>
              <h3 className="font-bold text-base sm:text-lg mt-5 transition-colors duration-300 group-hover:text-white" style={{ color: C.ink }}>{cat.title}</h3>
              <p className="text-sm text-gray-500 mt-1 transition-colors duration-300 group-hover:text-white/70">{cat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- انضم كبائع / طيار --------------------------- */
export function Join() {
  const { lang } = useLang();
  const t = translations[lang];
  const items = [
    { icon: Store, href: "/contact#vendor", ...t.join.vendor },
    { icon: Bike, href: "/contact#courier", ...t.join.courier },
  ];
  return (
    <section id="join" className="pb-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-5 lg:gap-6">
        {items.map((item, i) => (
          <Reveal key={item.href} delay={i * 0.12}>
            <div className="group relative overflow-hidden h-full rounded-[2rem] p-7 lg:p-10 bg-white transition-shadow duration-300 hover:shadow-xl" style={{ border: `1px solid ${C.line}` }}>
              <div aria-hidden className="absolute -top-16 -end-16 w-48 h-48 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" style={{ background: C.lime }} />
              <span className="relative w-14 h-14 rounded-2xl grid place-items-center mb-6 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ background: C.lime }}>
                <item.icon size={28} style={{ color: C.ink }} />
              </span>
              <h3 className="relative text-2xl font-bold mb-3" style={{ color: C.ink }}>{item.title}</h3>
              <p className="relative text-gray-600 leading-loose mb-7">{item.desc}</p>
              <Link href={item.href} className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: C.ink }}>
                {item.btn} <ArrowUpRight size={18} className="rtl:-scale-x-100" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ الدعوة الأخيرة ------------------------------ */
export function FinalCta() {
  const { lang } = useLang();
  const t = translations[lang];
  return (
    <section id="download" className="relative overflow-hidden py-16 lg:py-20" style={{ background: C.lime }}>
      <div aria-hidden className="absolute -bottom-32 -start-24 w-96 h-96 rounded-full opacity-40" style={{ border: `48px solid ${C.ink}`, filter: "blur(2px)" }} />
      <div aria-hidden className="absolute -top-24 -end-16 w-72 h-72 rounded-full opacity-[.12]" style={{ background: C.ink }} />
      <div className="relative max-w-4xl mx-auto px-5 text-center">
        <Reveal>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-snug" style={{ color: C.ink }}>{t.cta.title}</h2>
          <p className="mb-9 text-lg" style={{ color: C.ink }}>{t.cta.desc}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {[t.cta.appStore, t.cta.googlePlay].map((s) => (
              <a key={s} href="#" className="px-8 py-4 rounded-2xl font-bold text-white inline-flex items-center justify-center gap-2.5 transition-transform hover:-translate-y-1 active:translate-y-0"
                style={{ background: C.ink, boxShadow: "0 16px 30px -12px rgba(15,42,32,.6)" }}>
                <Smartphone size={20} /> {s}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}