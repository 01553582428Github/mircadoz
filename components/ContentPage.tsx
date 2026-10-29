"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Target, Gift, HeartHandshake, CalendarDays, ArrowUpRight, type LucideIcon } from "lucide-react";
import { C } from "@/lib/site-config";
import { UI } from "@/lib/ui-text";
import { PAGES, UPDATED, type PageKey } from "@/lib/pages-content";
import { EASE, Reveal } from "./motion";
import { useLang } from "./LangProvider";
import { PageShell } from "./PageShell";

const ABOUT_ICONS: LucideIcon[] = [Target, Layers, Gift, HeartHandshake];

function ContactCard() {
  const { lang } = useLang();
  const u = UI[lang];
  return (
    <Reveal className="mt-10">
      <div className="rounded-3xl p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5" style={{ background: C.ink }}>
        <div className="text-white">
          <p className="font-bold text-xl mb-1">{u.questions}</p>
          <p className="text-white/70">{u.questionsDesc}</p>
        </div>
        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-transform hover:-translate-y-0.5" style={{ background: C.lime, color: C.ink }}>
          {u.contactUs} <ArrowUpRight size={18} className="rtl:-scale-x-100" />
        </Link>
      </div>
    </Reveal>
  );
}

export function ContentPage({ page }: { page: PageKey }) {
  const { lang } = useLang();
  const u = UI[lang];
  const c = PAGES[page][lang];
  const isAbout = page === "about";
  const [active, setActive] = useState("sec-0");

  // تمييز القسم الحالي في فهرس الصفحة
  useEffect(() => {
    if (isAbout) return;
    const els = c.sections.map((_, i) => document.getElementById(`sec-${i}`)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (es) => {
        const v = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [c.sections, isAbout]);

  /* صفحة "عن المنصة": بطاقات بدل مستند طويل */
  if (isAbout) {
    return (
      <PageShell title={c.title} intro={c.intro}>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.sections.map((s, i) => {
            const Icon = ABOUT_ICONS[i % ABOUT_ICONS.length];
            return (
              <motion.article key={s.h} className="group bg-white rounded-3xl p-7 transition-shadow duration-300 hover:shadow-xl" style={{ border: `1px solid ${C.line}` }}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}>
                <span className="w-12 h-12 rounded-2xl grid place-items-center mb-5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ background: C.lime, color: C.ink }}>
                  <Icon size={24} />
                </span>
                <h2 className="text-xl font-bold mb-2" style={{ color: C.ink }}>{s.h}</h2>
                {s.p.map((p) => <p key={p} className="text-gray-600 leading-loose">{p}</p>)}
              </motion.article>
            );
          })}
        </div>
        <ContactCard />
      </PageShell>
    );
  }

  /* الصفحات القانونية: فهرس جانبي + أقسام مرقمة (التسلسل هنا له معنى) */
  return (
    <PageShell title={c.title} intro={c.intro} wide>
      <div className="grid lg:grid-cols-[230px_1fr] gap-6 items-start">
        <aside className="lg:sticky lg:top-24 bg-white rounded-3xl p-5 hidden lg:block" style={{ border: `1px solid ${C.line}` }}>
          <p className="font-bold mb-3 text-sm" style={{ color: C.ink }}>{u.toc}</p>
          <ul className="space-y-1">
            {c.sections.map((s, i) => {
              const on = active === `sec-${i}`;
              return (
                <li key={s.h}>
                  <a href={`#sec-${i}`} className="relative block px-3 py-2 rounded-xl text-sm transition-colors" style={{ color: on ? C.ink : "#6b7280", fontWeight: on ? 700 : 500 }}>
                    {on && <motion.span layoutId="toc-active" className="absolute inset-0 -z-10 rounded-xl" style={{ background: "rgba(217,242,107,.55)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    {s.h}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        <div>
          <article className="bg-white rounded-3xl p-6 sm:p-10 space-y-10" style={{ border: `1px solid ${C.line}` }}>
            <p className="inline-flex items-center gap-2 text-sm text-gray-500"><CalendarDays size={16} /> {UPDATED[lang]}</p>
            {c.sections.map((s, i) => (
              <section key={s.h} id={`sec-${i}`} className="scroll-mt-28 flex gap-4">
                <span className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-sm font-bold" style={{ background: C.lime, color: C.ink }}>{i + 1}</span>
                <div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: C.ink }}>{s.h}</h2>
                  {s.p.map((p) => <p key={p} className="text-gray-600 leading-loose">{p}</p>)}
                </div>
              </section>
            ))}
          </article>
          <ContactCard />
        </div>
      </div>
    </PageShell>
  );
}
