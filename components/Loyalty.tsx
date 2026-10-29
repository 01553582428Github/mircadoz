"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Tag, Wallet, Sparkles } from "lucide-react";
import { translations } from "@/lib/translations";
import { UI } from "@/lib/ui-text";
import { C } from "@/lib/site-config";
import { CountUp, EASE, Reveal } from "./motion";
import { useLang } from "./LangProvider";

export function Loyalty() {
  const { lang } = useLang();
  const t = translations[lang];
  const u = UI[lang];
  const feats = [{ icon: Gift, ...t.loyalty.earn }, { icon: Tag, ...t.loyalty.redeem }, { icon: Wallet, ...t.loyalty.pay }];

  return (
    <section id="loyalty" className="py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <Reveal>
            <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-5" style={{ color: C.ink }}>{t.loyalty.title}</h2>
            <p className="text-gray-600 leading-loose mb-8">{t.loyalty.desc}</p>
          </Reveal>
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-3">
            {feats.map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.1} y={18}>
                <div className="group h-full rounded-2xl p-5 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" style={{ border: `1px solid ${C.line}` }}>
                  <span className="w-11 h-11 rounded-xl grid place-items-center transition-colors duration-300 group-hover:!bg-[#D9F26B]" style={{ background: C.lime, color: C.ink }}>
                    <item.icon size={22} />
                  </span>
                  <p className="font-bold mt-4" style={{ color: C.ink }}>{item.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* بطاقة الرصيد */}
        <motion.div className="relative overflow-hidden rounded-[2rem] p-7 lg:p-10 text-white"
          style={{ background: C.ink, boxShadow: "0 40px 80px -30px rgba(15,42,32,.55)" }}
          initial={{ opacity: 0, y: 40, rotate: 1.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: EASE }}>
          <div aria-hidden className="absolute -top-24 -end-24 w-72 h-72 rounded-full blur-3xl opacity-25" style={{ background: C.lime }} />
          <div className="relative">
            <p className="text-white/70 text-sm">{t.loyalty.balance}</p>
            <p className="text-6xl font-bold mt-1 mb-8">
              <CountUp to={450} /> <span className="text-xl font-medium text-white/70">{t.loyalty.points}</span>
            </p>

            <div className="relative">
              <div className="h-3 rounded-full bg-white/15 overflow-hidden">
                <motion.div className="h-full rounded-full rtl:origin-right ltr:origin-left" style={{ background: C.lime, width: "90%" }}
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3, ease: EASE }} />
              </div>
              {/* علامة المكافأة */}
              <motion.span className="absolute -top-4 -end-1 w-11 h-11 rounded-full grid place-items-center border-4" style={{ background: C.lime, color: C.ink, borderColor: C.ink }}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 1.7 }}>
                <Sparkles size={18} />
              </motion.span>
            </div>

            <p className="text-sm mt-5 leading-relaxed" style={{ color: C.lime }}>{t.loyalty.nextReward}</p>

            <motion.div className="mt-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold" style={{ background: "rgba(255,255,255,.1)" }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 2 }}>
              <Gift size={16} style={{ color: C.lime }} /> +35 {u.pts}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
