"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import { translations } from "@/lib/translations";
import { UI } from "@/lib/ui-text";
import { C, type Lang } from "@/lib/site-config";
import { EASE } from "./motion";
import { useLang } from "./LangProvider";

type NavKey = "apps" | "how" | "loyalty" | "join" | "faq";
const NAV: [string, NavKey][] = [
    ["/#apps", "apps"], ["/#how", "how"], ["/#loyalty", "loyalty"], ["/#join", "join"], ["/#faq", "faq"],
];

export function Brand({ light = false }: { light?: boolean }) {
    const { lang } = useLang();
    const t = translations[lang].logo;
    return (
        <Link href="/" className="group flex items-center gap-2.5" aria-label={t.brandName}>
            <span className="w-10 h-10 rounded-xl grid place-items-center font-bold text-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
                style={{ background: C.lime, color: C.ink }}>{t.brandLetter}</span>
            <span className="text-2xl font-bold" style={{ color: light ? C.paper : C.ink }}>{t.brandName}</span>
        </Link>
    );
}

/** مبدّل لغة بمؤشر منزلق */
function LangSwitch({ id }: { id: string }) {
    const { lang, setLang } = useLang();
    return (
        <div role="group" aria-label={UI[lang].switchLang} className="relative flex rounded-full p-1 border bg-white" style={{ borderColor: C.line }}>
            {(["ar", "en"] as Lang[]).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
                    className="relative z-10 px-3.5 py-1.5 text-sm font-bold rounded-full transition-colors"
                    style={{ color: lang === l ? C.paper : C.ink }}>
                    {lang === l && (
                        <motion.span layoutId={id} className="absolute inset-0 -z-10 rounded-full" style={{ background: C.ink }}
                            transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                    )}
                    {l === "ar" ? "عربي" : "EN"}
                </button>
            ))}
        </div>
    );
}

export function SiteNav() {
    const { lang } = useLang();
    const t = translations[lang];
    const u = UI[lang];
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");

    const { scrollY, scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

    // يختفي عند النزول ويظهر عند الصعود
    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(y > prev && y > 160 && !open);
        setScrolled(y > 8);
        if (y < 400) setActive("");
    });

    // تمييز القسم الحالي في الصفحة الرئيسية
    useEffect(() => {
        if (pathname !== "/") { setActive(""); return; }
        const els = NAV.map(([h]) => document.getElementById(h.replace("/#", ""))).filter(Boolean) as HTMLElement[];
        const obs = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            <a href="#main" className="sr-only focus:not-sr-only fixed top-3 start-3 z-[60] px-4 py-2 rounded-lg font-bold" style={{ background: C.lime, color: C.ink }}>
                {u.skip}
            </a>

            <motion.header
                className="fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top)] backdrop-blur-md border-b"
                style={{ background: "rgba(246,247,242,.9)", borderColor: C.line, boxShadow: scrolled ? "0 8px 28px rgba(15,42,32,.07)" : "none" }}
                animate={{ y: hidden ? "-100%" : "0%" }}
                transition={{ duration: 0.35, ease: EASE }}
            >
                <nav aria-label="Main" className="max-w-7xl mx-auto px-5 h-[68px] flex items-center justify-between">
                    <Brand />
                    <div className="hidden md:flex items-center gap-1">
                        {NAV.map(([h, k]) => {
                            const on = active === h.replace("/#", "");
                            return (
                                <Link key={h} href={h} className="relative px-4 py-2 font-medium rounded-full transition-colors hover:text-gray-900"
                                    style={{ color: on ? C.ink : "#4b5563" }}>
                                    {on && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full -z-10" style={{ background: "rgba(217,242,107,.55)" }}
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                                    {t.nav[k]}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <LangSwitch id="lang-pill-d" />
                        <Link href="/#download" className="px-5 py-2.5 rounded-full font-bold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0" style={{ background: C.ink }}>
                            {t.nav.download}
                        </Link>
                    </div>
                    <button className="md:hidden p-2 -m-2" aria-label={open ? u.close : u.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </nav>
                <motion.span aria-hidden className="absolute bottom-0 inset-x-0 h-[3px] rtl:origin-right ltr:origin-left" style={{ scaleX: progress, background: C.ink }} />
            </motion.header>

            {/* القائمة الجانبية للموبايل (خارج الـ header عشان الـ transform ما يكسرش position:fixed) */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="md:hidden fixed inset-0 z-40 pt-[calc(68px+env(safe-area-inset-top))] px-5 pb-8 overflow-y-auto"
                        style={{ background: C.paper }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                    >
                        <motion.div className="flex flex-col pt-4" initial="hidden" animate="show"
                            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}>
                            {NAV.map(([h, k]) => (
                                <motion.div key={h} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}>
                                    <Link href={h} onClick={() => setOpen(false)} className="block py-4 text-xl font-bold border-b" style={{ borderColor: C.line, color: C.ink }}>
                                        {t.nav[k]}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div className="mt-6 flex items-center justify-between gap-4"
                                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}>
                                <LangSwitch id="lang-pill-m" />
                                <Link href="/#download" onClick={() => setOpen(false)} className="flex-1 text-center py-3.5 rounded-2xl font-bold text-white" style={{ background: C.ink }}>
                                    {t.nav.download}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export function SiteFooter() {
    const { lang } = useLang();
    const t = translations[lang];
    const f = t.footer;
    const u = UI[lang];
    const cols: { title: string; links: [string, string][] }[] = [
        { title: u.colExplore, links: [["/#apps", t.nav.apps], ["/#how", t.nav.how], ["/#loyalty", t.nav.loyalty], ["/#faq", t.nav.faq]] },
        { title: u.colCompany, links: [["/about", f.about], ["/contact", f.contact], ["/#join", t.nav.join]] },
        { title: u.colLegal, links: [["/privacy", f.privacy], ["/terms", f.terms], ["/vendor-terms", f.vendorTerms]] },
    ];
    return (
        <footer className="pt-14 pb-[calc(2rem+env(safe-area-inset-bottom))] text-gray-400 text-sm" style={{ background: "#0A1A13" }}>
            <div className="max-w-7xl mx-auto px-5">
                <div className="space-y-4 mb-6">
                    <Brand light />
                    <p className="max-w-xs leading-loose">{u.tagline}</p>
                </div>
                <div className="space-y-4 grid gap-10 grid-cols-[1fr_0.7fr_1fr]">
                    {cols.map((c) => (
                        <div key={c.title}>
                            <h2 className="font-bold text-white mb-4">{c.title}</h2>
                            <ul className="space-y-2.5">
                                {c.links.map(([href, label]) => (
                                    <li key={href}><Link href={href} className="inline-block hover:text-white hover:translate-x-0.5 rtl:hover:-translate-x-0.5 transition">{label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 {f.rights}</p>
                    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:bg-white/10 hover:text-white transition">
                        <ArrowUp size={16} /> {u.top}
                    </button>
                </div>
            </div>
        </footer>
    );
}
