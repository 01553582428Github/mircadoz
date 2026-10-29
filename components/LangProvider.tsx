"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Lang } from "@/lib/site-config";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LangContext = createContext<Ctx>({ lang: "ar", setLang: () => {}, toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mk-lang");
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("mk-lang", l); } catch {}
  }, []);

  const toggle = useCallback(() => setLang(lang === "ar" ? "en" : "ar"), [lang, setLang]);

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
