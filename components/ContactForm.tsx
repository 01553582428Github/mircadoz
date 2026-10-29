"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Phone, CheckCircle2, ArrowUpRight } from "lucide-react";
import { C, CONTACT } from "@/lib/site-config";
import { CONTACT_TEXT } from "@/lib/pages-content";
import { UI } from "@/lib/ui-text";
import { EASE } from "./motion";
import { useLang } from "./LangProvider";
import { PageShell } from "./PageShell";

type Topic = "customer" | "vendor" | "courier" | "other";

export function ContactForm() {
  const { lang } = useLang();
  const t = CONTACT_TEXT[lang];
  const u = UI[lang];
  const [topic, setTopic] = useState<Topic>("customer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; message?: boolean }>({});
  const [sent, setSent] = useState(false);

  // /contact#vendor و /contact#courier بيختاروا النوع تلقائياً
  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (h === "vendor" || h === "courier") setTopic(h);
  }, []);

  const body = () => `${t.topics[topic]}\n${t.name}: ${name}\n${t.phone}: ${phone}\n\n${message}`;

  const validate = () => {
    const e = { name: !name.trim(), message: !message.trim() };
    setErrors(e);
    return !e.name && !e.message;
  };
  const done = () => { setSent(true); setTimeout(() => setSent(false), 4000); };

  const sendWhatsApp = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body())}`, "_blank", "noopener");
    done();
  };
  const sendMail = () => {
    if (!validate()) return;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t.topics[topic])}&body=${encodeURIComponent(body())}`;
    done();
  };

  const field = "w-full rounded-xl px-4 py-3 bg-gray-50 border outline-none transition-colors focus:bg-white";
  const label = "font-bold text-sm";
  const info = [
    { icon: Mail, text: CONTACT.email, href: `mailto:${CONTACT.email}`, ltr: true, label: t.email },
    { icon: Phone, text: CONTACT.phone, href: `https://wa.me/${CONTACT.whatsapp}`, ltr: true, label: t.whatsapp },
    { icon: MapPin, text: CONTACT.address[lang], href: undefined, ltr: false, label: t.address },
  ];

  return (
    <PageShell title={t.title} intro={t.intro} wide>
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-5">
        <motion.form noValidate onSubmit={sendWhatsApp} className="bg-white rounded-3xl p-6 sm:p-8 space-y-5" style={{ border: `1px solid ${C.line}` }}
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}>
          <fieldset>
            <legend className={`${label} mb-2.5`} style={{ color: C.ink }}>{t.topic}</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(t.topics) as Topic[]).map((k) => {
                const on = topic === k;
                return (
                  <button key={k} type="button" aria-pressed={on} onClick={() => setTopic(k)}
                    className="relative px-4 py-2 rounded-full text-sm font-bold border transition-colors"
                    style={{ color: on ? "#fff" : C.ink, borderColor: on ? C.ink : C.line, background: "#fff" }}>
                    {on && <motion.span layoutId="topic-pill" className="absolute inset-0 rounded-full" style={{ background: C.ink }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{t.topics[k]}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="c-name" className={label} style={{ color: C.ink }}>{t.name}</label>
            <input id="c-name" className={`${field} mt-1.5`} style={{ borderColor: errors.name ? "#dc2626" : C.line }} value={name}
              onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: false })); }} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
            {errors.name && <p id="e-name" role="alert" className="text-sm text-red-600 mt-1">{u.errName}</p>}
          </div>
          <div>
            <label htmlFor="c-phone" className={label} style={{ color: C.ink }}>{t.phone}</label>
            <input id="c-phone" className={`${field} mt-1.5 text-start`} style={{ borderColor: C.line }} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" dir="ltr" />
          </div>
          <div>
            <label htmlFor="c-msg" className={label} style={{ color: C.ink }}>{t.message}</label>
            <textarea id="c-msg" className={`${field} mt-1.5 min-h-36 resize-y`} style={{ borderColor: errors.message ? "#dc2626" : C.line }} value={message}
              onChange={(e) => { setMessage(e.target.value); setErrors((x) => ({ ...x, message: false })); }} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-msg" : undefined} />
            {errors.message && <p id="e-msg" role="alert" className="text-sm text-red-600 mt-1">{u.errMsg}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" className="flex-1 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0" style={{ background: C.lime, color: C.ink }}>
              <MessageCircle size={20} /> {t.send}
            </button>
            <button type="button" onClick={sendMail} className="flex-1 py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0" style={{ background: C.ink }}>
              <Mail size={20} /> {t.sendMail}
            </button>
          </div>

          <div aria-live="polite" className="min-h-6">
            <AnimatePresence>
              {sent && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.ink2 }}>
                  <CheckCircle2 size={18} style={{ color: "#2f9e44" }} /> {u.opening}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        <aside className="space-y-3 h-fit">
          <h2 className="font-bold text-lg px-1" style={{ color: C.ink }}>{t.direct}</h2>
          {info.map((it, i) => {
            const Inner = (
              <>
                <span className="w-11 h-11 shrink-0 rounded-xl grid place-items-center" style={{ background: C.lime, color: C.ink }}><it.icon size={20} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-gray-500">{it.label}</span>
                  <span className="block font-semibold truncate" dir={it.ltr ? "ltr" : undefined} style={{ color: C.ink, textAlign: "start" }}>{it.text}</span>
                </span>
                {it.href && <ArrowUpRight size={18} className="text-gray-400 rtl:-scale-x-100" />}
              </>
            );
            const cls = "flex items-center gap-4 bg-white rounded-2xl p-4 transition-all duration-300";
            return (
              <motion.div key={it.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: EASE }}>
                {it.href ? (
                  <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={`${cls} hover:-translate-y-1 hover:shadow-lg`} style={{ border: `1px solid ${C.line}` }}>{Inner}</a>
                ) : (
                  <div className={cls} style={{ border: `1px solid ${C.line}` }}>{Inner}</div>
                )}
              </motion.div>
            );
          })}
        </aside>
      </div>
    </PageShell>
  );
}
