"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Gift, MapPin, ShieldCheck, Smartphone, Store, Truck } from "lucide-react";
import { translations } from "@/lib/translations";
import { UI } from "@/lib/ui-text";
import { C } from "@/lib/site-config";
import { EASE } from "./motion";
import { useLang } from "./LangProvider";
import { AppScreen } from "./AppScreen";

const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const word = { hidden: { y: "115%" }, show: { y: "0%", transition: { duration: 0.85, ease: EASE } } };

/**
 * خلفية: مسار توصيل بنقطة توقف ودراجة تتحرك عليه.
 * 📱 نسختين: واحدة بالطول للموبايل، وواحدة بالعرض للشاشات الأكبر
 * (عشان الـ slice على الموبايل ما يقصّش المسار).
 */
function RouteBackdrop() {
  return (
    <>
      {/* موبايل (طولي) */}
      <svg aria-hidden viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice" className="sm:hidden absolute inset-0 w-full h-full opacity-60">
        <path id="mk-route-m" d="M -20 830 C 100 830, 80 700, 200 690 S 330 770, 420 600"
          fill="none" stroke={C.lime} strokeOpacity=".4" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 12" />
        <circle cx="200" cy="690" r="12" fill={C.lime} opacity=".12" />
        <circle cx="200" cy="690" r="4.5" fill={C.lime} opacity=".7" />
        <g className="no-motion">
          <circle r="13" fill={C.lime} opacity=".25"><animateMotion dur="12s" repeatCount="indefinite"><mpath href="#mk-route-m" /></animateMotion></circle>
          <circle r="5" fill={C.lime}><animateMotion dur="12s" repeatCount="indefinite"><mpath href="#mk-route-m" /></animateMotion></circle>
        </g>
      </svg>

      {/* تابلت / ديسكتوب (عريض) */}
      <svg aria-hidden viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="hidden sm:block absolute inset-0 w-full h-full opacity-60">
        <path id="mk-route" d="M -20 650 C 220 650, 260 430, 480 450 S 760 710, 980 570 S 1260 250, 1470 310"
          fill="none" stroke={C.lime} strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 14" />
        {[[480, 450], [980, 570], [1262, 330]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill={C.lime} opacity=".12" />
            <circle cx={x} cy={y} r="5" fill={C.lime} opacity=".7" />
          </g>
        ))}
        <g className="no-motion">
          <circle r="16" fill={C.lime} opacity=".25"><animateMotion dur="14s" repeatCount="indefinite"><mpath href="#mk-route" /></animateMotion></circle>
          <circle r="6" fill={C.lime}><animateMotion dur="14s" repeatCount="indefinite"><mpath href="#mk-route" /></animateMotion></circle>
        </g>
      </svg>
    </>
  );
}

/** بطاقة عائمة — ظاهرة على كل المقاسات ومصغّرة على الموبايل */
function Chip({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div className={`absolute z-10 max-w-[200px] sm:max-w-none ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 + delay, ease: EASE }}>
      <motion.div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3"
        animate={{ y: [0, -8, 0] }} transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const { lang } = useLang();
  const t = translations[lang];
  const u = UI[lang];
  const words = t.hero.title.split(" ");

  return (
    <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28 lg:min-h-[min(100svh,880px)] lg:flex lg:items-center" style={{ background: C.ink }}>
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute -top-32 -end-32 w-[340px] h-[340px] sm:-top-40 sm:-end-40 sm:w-[620px] sm:h-[620px] rounded-full blur-3xl opacity-20" style={{ background: C.lime }} />
      <RouteBackdrop />

      {/* paddingInline بيحترم الـ notch في الوضع الأفقي */}
      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-10 sm:gap-14 items-center"
        style={{ paddingLeft: "max(1.25rem, env(safe-area-inset-left))", paddingRight: "max(1.25rem, env(safe-area-inset-right))" }}>
        <motion.div key={lang} className="text-white" initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}>
          <motion.p variants={item} className="inline-flex items-center gap-2 max-w-full px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 sm:mb-6"
            style={{ background: "rgba(217,242,107,.12)", color: C.lime }}>
            <Truck size={16} className="shrink-0" /> <span>{t.hero.badge}</span>
          </motion.p>

          {/* حجم مرن: يصغر على الشاشات الضيقة (320px) ويكبر تدريجياً */}
          <motion.h1 className="font-bold leading-[1.4] sm:leading-[1.35] mb-4 sm:mb-5 text-[clamp(1.75rem,7.2vw,2.5rem)] sm:text-5xl lg:text-[3.4rem]"
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className="inline-block overflow-hidden align-bottom py-[0.12em] -my-[0.12em]">
                  <motion.span variants={word} className="inline-block">{w}</motion.span>
                </span>{" "}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p variants={item} className="text-[15px] sm:text-lg text-white/75 leading-loose max-w-xl mb-7 sm:mb-8">{t.hero.subtitle}</motion.p>

          {/* أزرار بعرض كامل على الموبايل وبارتفاع لمس مريح (≥ 52px) */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/#download" className="min-h-[52px] px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg text-center inline-flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 active:scale-[.98]"
              style={{ background: C.lime, color: C.ink, boxShadow: "0 12px 30px -10px rgba(217,242,107,.55)" }}>
              <Smartphone size={22} className="shrink-0" /> {t.hero.btnCustomer}
            </Link>
            <Link href="/#join" className="min-h-[52px] px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg text-center inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 active:scale-[.98] transition">
              <Store size={22} className="shrink-0" /> {t.hero.btnVendor}
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-7 sm:mt-9 flex flex-wrap gap-x-5 sm:gap-x-7 gap-y-2.5 text-[13px] sm:text-sm text-white/70">
            <span className="flex items-center gap-2"><ShieldCheck size={18} className="shrink-0" style={{ color: C.lime }} /> {t.hero.safe}</span>
            <span className="flex items-center gap-2"><MapPin size={18} className="shrink-0" style={{ color: C.lime }} /> {t.hero.track}</span>
            <span className="flex items-center gap-2"><Gift size={18} className="shrink-0" style={{ color: C.lime }} /> {t.hero.points}</span>
          </motion.div>
        </motion.div>

        <motion.div className="relative" initial={{ opacity: 0, y: 50, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.35, ease: EASE }}>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <AppScreen id="hero" lang={lang} alt={t.hero.track} />
          </motion.div>

          {/* على الموبايل: بطاقات مصغّرة تتداخل مع حافة الموبايل بدل ما تختفي */}
          <Chip className="top-14 -start-1 sm:top-24 sm:-start-2 lg:-start-12" delay={0}>
            <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full grid place-items-center" style={{ background: "#FFF3D6", color: C.gold }}><Bell size={16} className="sm:hidden" /><Bell size={20} className="hidden sm:block" /></span>
            <div className="text-xs sm:text-sm"><p className="font-bold leading-tight" style={{ color: C.ink }}>{u.chipDelivery}</p><p className="text-[10px] sm:text-xs text-gray-500">{u.chipNow}</p></div>
          </Chip>
          <Chip className="bottom-14 -end-1 sm:bottom-24 sm:-end-2 lg:-end-10" delay={0.3}>
            <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full grid place-items-center" style={{ background: C.lime, color: C.ink }}><Gift size={16} className="sm:hidden" /><Gift size={20} className="hidden sm:block" /></span>
            <div className="text-xs sm:text-sm"><p className="text-[10px] sm:text-xs text-gray-500">{u.chipPoints}</p><p className="font-bold leading-tight" style={{ color: C.ink }}>450 {u.pts}</p></div>
          </Chip>
        </motion.div>
      </div>
    </section>
  );
}