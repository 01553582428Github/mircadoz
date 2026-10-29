"use client";

// يعرض صورة القسم (لو موجودة) وإلا الشاشة التجريبية.
// ✅ بيفحص الصور قبل العرض (بدل onError اللي كان بيفشل أحياناً مع الـ SSR).
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { C, SCREENS_CONFIG, frameOf, type AppKey, type Lang } from "@/lib/site-config";
import { PhoneFrame } from "./PhoneFrame";
import { TrackingScreen, MOCK_SCREENS } from "./MockScreens";

const cache = new Map<string, string | null>();

const probe = (src: string) =>
  new Promise<boolean>((res) => {
    const i = new Image();
    i.onload = () => res(true);
    i.onerror = () => res(false);
    i.src = src;
  });

// undefined = لسه بنفحص ، null = مفيش صورة ، string = المسار
function useScreenSrc(candidates: string[]) {
  const key = candidates.join("|");
  const [src, setSrc] = useState<string | null | undefined>(() => cache.get(key));
  useEffect(() => {
    if (cache.has(key)) { setSrc(cache.get(key)); return; }
    let off = false;
    setSrc(undefined);
    (async () => {
      let found: string | null = null;
      for (const s of candidates) { if (await probe(s)) { found = s; break; } }
      cache.set(key, found);
      if (!off) setSrc(found);
    })();
    return () => { off = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return src;
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[600px] mx-auto rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: "0 30px 60px -24px rgba(15,42,32,.4)", border: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ background: "#F1F4EC", borderColor: C.line }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" /><span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
        <span className="ms-3 flex-1 h-5 rounded-md bg-white/90" />
      </div>
      {children}
    </div>
  );
}

export function AppScreen({ id, lang, alt = "" }: { id: AppKey | "hero"; lang: Lang; alt?: string }) {
  const cfg = SCREENS_CONFIG[id];
  const frame = frameOf(cfg);
  const candidates = [cfg[lang], cfg.any, `/screens/${id}-${lang}.png`, `/screens/${id}.png`].filter(Boolean) as string[];
  const src = useScreenSrc(candidates);

  const mock = id === "hero" ? <TrackingScreen lang={lang} /> : MOCK_SCREENS[id](lang);

  // جاري الفحص
  if (src === undefined) {
    return frame === "browser"
      ? <BrowserFrame><div className="aspect-[16/10] animate-pulse" style={{ background: "#E7EBDF" }} /></BrowserFrame>
      : <PhoneFrame><div className="absolute inset-0 animate-pulse" style={{ background: "#E7EBDF" }} /></PhoneFrame>;
  }
  // مفيش صورة → الشاشة التجريبية
  if (src === null) return <PhoneFrame>{mock}</PhoneFrame>;

  const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };

  if (frame === "browser") {
    return (
      <BrowserFrame>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img {...fade} src={src} alt={alt} className="w-full h-auto block" />
      </BrowserFrame>
    );
  }
  if (frame === "none") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <motion.img {...fade} src={src} alt={alt} className="w-full max-w-[560px] max-h-[600px] h-auto mx-auto object-contain" />
    );
  }
  return (
    <PhoneFrame>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img {...fade} src={src} alt={alt} className="absolute inset-0 w-full h-full"
        style={{ objectFit: cfg.fit ?? "cover", objectPosition: cfg.position ?? "top" }} />
    </PhoneFrame>
  );
}
