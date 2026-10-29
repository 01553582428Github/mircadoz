"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { C } from "@/lib/site-config";
import { UI } from "@/lib/ui-text";
import { EASE } from "@/components/motion";
import { useLang } from "@/components/LangProvider";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  const { lang } = useLang();
  const u = UI[lang];
  return (
    <PageShell title="404" intro={u.notFoundTitle}>
      <motion.div className="bg-white rounded-3xl p-10 text-center" style={{ border: `1px solid ${C.line}` }}
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}>
        <p className="text-[7rem] leading-none font-bold" style={{ color: C.ink }} dir="ltr">4<span className="inline-block px-1 rounded-2xl" style={{ background: C.lime }}>0</span>4</p>
        <p className="text-gray-600 leading-loose mt-4 mb-8">{u.notFoundDesc}</p>
        <Link href="/" className="inline-flex px-7 py-3.5 rounded-2xl font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: C.ink }}>{u.goHome}</Link>
      </motion.div>
    </PageShell>
  );
}
