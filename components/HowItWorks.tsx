"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Store, Bike, Gift } from "lucide-react";
import { translations } from "@/lib/translations";
import { UI } from "@/lib/ui-text";
import { C } from "@/lib/site-config";
import { EASE, Reveal } from "./motion";
import { useLang } from "./LangProvider";

const ICONS = [Smartphone, Store, Bike, Gift];

export function HowItWorks() {
  const { lang } = useLang();
  const t = translations[lang];
  const u = UI[lang];

  return (
    <section id="how" className="relative overflow-hidden py-16 lg:py-24" style={{ background: C.ink2 }}>
      <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto px-5 text-white">
        <Reveal><h2 className="text-3xl lg:text-4xl font-bold mb-12 lg:mb-16 max-w-2xl leading-snug">{t.how.title}</h2></Reveal>

        <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* خط يتم رسمه عند الظهور (سطح المكتب) */}
          <motion.span aria-hidden className="hidden lg:block absolute top-[3.1rem] inset-x-[12.5%] h-[2px] rtl:origin-right ltr:origin-left"
            style={{ background: `repeating-linear-gradient(90deg, ${C.lime} 0 8px, transparent 8px 16px)`, opacity: 0.55 }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 1.6, ease: EASE, delay: 0.2 }} />

          {t.how.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li key={step.title}
                className="relative rounded-3xl p-6 border border-white/10 flex lg:flex-col items-start lg:items-center gap-5 lg:text-center"
                style={{ background: "rgba(255,255,255,.045)" }}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                whileHover={{ y: -6 }}>
                <span className="relative shrink-0 w-[3.1rem] h-[3.1rem] rounded-full grid place-items-center z-10" style={{ background: C.lime, color: C.ink }}>
                  <Icon size={22} />
                  <span className="absolute -top-1.5 -end-1.5 w-6 h-6 rounded-full grid place-items-center text-xs font-bold border-2" style={{ background: C.ink2, color: C.lime, borderColor: C.ink2 }}
                    aria-label={`${u.stepWord} ${i + 1}`}>{i + 1}</span>
                </span>
                <div>
                  <h3 className="font-bold text-lg mb-1.5">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
