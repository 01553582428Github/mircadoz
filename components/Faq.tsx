"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { translations } from "@/lib/translations";
import { C } from "@/lib/site-config";
import { EASE, Reveal } from "./motion";
import { useLang } from "./LangProvider";

export function Faq() {
  const { lang } = useLang();
  const t = translations[lang];
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="pb-16 lg:pb-28">
      <div className="max-w-3xl mx-auto px-5">
        <Reveal><h2 className="text-3xl font-bold mb-8" style={{ color: C.ink }}>{t.faq.title}</h2></Reveal>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const on = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.06} y={16}>
                <div className="bg-white rounded-2xl transition-shadow" style={{ border: `1px solid ${on ? C.ink : C.line}`, boxShadow: on ? "0 12px 30px -16px rgba(15,42,32,.35)" : "none" }}>
                  <h3>
                    <button type="button" id={`faq-btn-${i}`} aria-expanded={on} aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(on ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-start font-bold" style={{ color: C.ink }}>
                      {item.q}
                      <motion.span animate={{ rotate: on ? 135 : 0 }} transition={{ duration: 0.3, ease: EASE }}
                        className="shrink-0 w-8 h-8 rounded-full grid place-items-center"
                        style={{ background: on ? C.lime : C.paper }}>
                        <Plus size={18} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-gray-600 leading-loose">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
