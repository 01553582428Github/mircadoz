"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Smartphone, Store, Bike, LayoutDashboard, ArrowUpRight, type LucideIcon } from "lucide-react";
import { translations } from "@/lib/translations";
import { APP_KEYS, C, type AppKey } from "@/lib/site-config";
import { EASE, Reveal } from "./motion";
import { useLang } from "./LangProvider";
import { AppScreen } from "./AppScreen";

const ICONS: Record<AppKey, LucideIcon> = { customer: Smartphone, vendor: Store, courier: Bike, admin: LayoutDashboard };
const HREFS: Record<AppKey, string | null> = { customer: "/#download", vendor: "/contact#vendor", courier: "/contact#courier", admin: null };

export function AppShowcase() {
  const { lang } = useLang();
  const t = translations[lang];
  const [[app, dir], setState] = useState<[AppKey, number]>(["customer", 0]);
  const cur = t.apps[app];
  const href = HREFS[app];
  const ctaLabel = app === "customer" ? t.hero.btnCustomer : app === "vendor" ? t.join.vendor.btn : app === "courier" ? t.join.courier.btn : null;
  const rtl = lang === "ar" ? -1 : 1;

  const select = (k: AppKey) => setState([k, Math.sign(APP_KEYS.indexOf(k) - APP_KEYS.indexOf(app))]);

  return (
    <section id="apps" className="py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal className="max-w-2xl mb-8 lg:mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-4" style={{ color: C.ink }}>{t.apps.title}</h2>
          <p className="text-gray-600 leading-loose">{t.apps.subtitle}</p>
        </Reveal>

        {/* التبويبات بمؤشر منزلق */}
        <div role="tablist" aria-label={t.apps.title} className="grid grid-cols-2 sm:inline-flex gap-1.5 p-1.5 rounded-3xl sm:rounded-full mb-6 lg:mb-10 bg-white border" style={{ borderColor: C.line }}>
          {APP_KEYS.map((key) => {
            const Icon = ICONS[key];
            const active = app === key;
            return (
              <button key={key} role="tab" id={`tab-${key}`} aria-selected={active} aria-controls="app-panel" tabIndex={active ? 0 : -1}
                onClick={() => select(key)}
                onKeyDown={(e) => {
                  const i = APP_KEYS.indexOf(app);
                  const step = e.key === "ArrowRight" ? rtl * -1 : e.key === "ArrowLeft" ? rtl : 0;
                  if (step) { e.preventDefault(); select(APP_KEYS[(i + step + APP_KEYS.length) % APP_KEYS.length]); }
                }}
                className="relative px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full font-bold flex items-center justify-center gap-2 transition-colors"
                style={{ color: active ? "#fff" : C.ink }}>
                {active && <motion.span layoutId="app-tab" className="absolute inset-0 -z-0 rounded-2xl sm:rounded-full" style={{ background: C.ink }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={18} style={{ color: active ? C.lime : C.ink }} />{t.apps[key].tab}
                </span>
              </button>
            );
          })}
        </div>

        <div id="app-panel" role="tabpanel" aria-labelledby={`tab-${app}`}
          className="relative overflow-hidden grid lg:grid-cols-2 gap-10 lg:gap-12 items-center rounded-[1.75rem] lg:rounded-[2.25rem] p-6 sm:p-8 lg:p-14 bg-white"
          style={{ border: `1px solid ${C.line}` }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={app + lang + "t"} custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 28 * rtl }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -28 * rtl }),
              }}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: EASE }}>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: C.ink }}>{cur.title}</h3>
              <p className="text-gray-600 leading-loose mb-7">{cur.desc}</p>
              <motion.ul className="space-y-3.5 mb-8" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}>
                {cur.points.map((p) => (
                  <motion.li key={p} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="flex items-start gap-3 text-gray-700">
                    <span className="w-6 h-6 mt-0.5 rounded-full grid place-items-center shrink-0" style={{ background: C.lime, color: C.ink }}><Check size={14} /></span>{p}
                  </motion.li>
                ))}
              </motion.ul>
              {href && ctaLabel && (
                <Link href={href} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: C.ink }}>
                  {ctaLabel} <ArrowUpRight size={18} className="rtl:-scale-x-100" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="relative py-2">
            <div aria-hidden className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[75%] rounded-full blur-3xl opacity-60" style={{ background: C.lime }} />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={app + lang + "p"} className="relative" custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 40 * rtl, scale: 0.96 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -40 * rtl, scale: 0.96 }),
                }}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: EASE }}>
                <AppScreen id={app} lang={lang} alt={cur.title} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
