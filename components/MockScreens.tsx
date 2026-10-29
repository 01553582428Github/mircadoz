"use client";

// شاشات تجريبية مرسومة بالكود — بتظهر تلقائياً لو مفيش صورة حقيقية للقسم
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { C, type Lang, type AppKey } from "@/lib/site-config";

export function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[240px] sm:w-[270px] aspect-[1/2] rounded-[2.6rem] p-[9px] shadow-2xl ${className}`}
      style={{ background: "#0a1511" }}
    >
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-20" />
      <div className="w-full h-full rounded-[2.1rem] overflow-hidden bg-white relative">{children}</div>
    </div>
  );
}

export function TrackingScreen({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const pts = { x: [40, 40, 120, 120, 200, 200], y: [250, 170, 170, 90, 90, 40] };
  const statusTexts = lang === "ar" ? ["تم التأكيد", "جاري التحضير", "في الطريق", "وصل"] : ["Confirmed", "Preparing", "On the way", "Delivered"];
  return (
    <div className="h-full flex flex-col" style={{ background: "#EEF2E8" }}>
      <div className="relative flex-1 overflow-hidden">
        <svg viewBox="0 0 240 300" className="absolute inset-0 w-full h-full">
          {[...Array(7)].map((_, i) => <line key={"h" + i} x1="0" x2="240" y1={i * 50} y2={i * 50} stroke="#DCE3D2" strokeWidth="1" />)}
          {[...Array(5)].map((_, i) => <line key={"v" + i} y1="0" y2="300" x1={i * 60} x2={i * 60} stroke="#DCE3D2" strokeWidth="1" />)}
          <path d="M40 250 V170 H120 V90 H200 V40" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 9" />
          <circle cx="200" cy="40" r="9" fill={C.ink} />
          <circle cx="200" cy="40" r="3.5" fill={C.lime} />
          <rect x="31" y="241" width="18" height="18" rx="5" fill={C.gold} />
          <motion.g animate={reduce ? undefined : { x: pts.x, y: pts.y }} initial={{ x: 120, y: 130 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}>
            <circle r="14" fill={C.lime} opacity=".45" />
            <circle r="8" fill={C.ink} stroke="#fff" strokeWidth="2.5" />
          </motion.g>
        </svg>
        <div className="absolute top-8 right-3 left-3 bg-white rounded-2xl px-3 py-2 shadow flex items-center gap-2 text-[11px]">
          <MapPin size={14} style={{ color: C.ink }} />
          <span className="font-semibold">{lang === "ar" ? "الطيار في الطريق إليك" : "Courier is on the way"}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-t-3xl -mt-4 relative z-10 shadow-[0_-8px_24px_rgba(0,0,0,.06)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[11px] text-gray-500">{lang === "ar" ? "الوصول خلال" : "Arriving in"}</p>
            <p className="text-2xl font-bold" style={{ color: C.ink }}>12 {lang === "ar" ? "دقيقة" : "min"}</p>
          </div>
          <div className="text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ background: C.lime, color: C.ink }}>+35 {lang === "ar" ? "نقطة" : "pts"}</div>
        </div>
        <div className="flex gap-1.5">
          {statusTexts.map((s, i) => (
            <div key={s} className="flex-1">
              <div className="h-1.5 rounded-full" style={{ background: i < 3 ? C.ink : C.line }} />
              <p className="text-[9px] mt-1 text-gray-500">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Row = ({ t, s, r }: { t: string; s: string; r: React.ReactNode }) => (
  <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 text-[11px]">
    <div><p className="font-semibold text-gray-800">{t}</p><p className="text-gray-500 mt-0.5">{s}</p></div>{r}
  </div>
);
const Tag = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span className="px-2.5 py-1 rounded-full font-semibold text-[10px]" style={dark ? { background: C.ink, color: "#fff" } : { background: C.lime, color: C.ink }}>{children}</span>
);

const ar = (lang: Lang) => lang === "ar";

export const MOCK_SCREENS: Record<AppKey, (lang: Lang) => React.JSX.Element> = {
  customer: (lang) => (
    <div className="p-4 pt-9 space-y-3 h-full" style={{ background: C.paper }}>
      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 text-[11px] text-gray-400"><Search size={14} /> {ar(lang) ? "ابحث عن مطعم، دواء، منتج…" : "Search restaurant, medicine…"}</div>
      <div className="flex gap-2 text-[10px] font-semibold overflow-hidden">
        {(ar(lang) ? ["مطاعم", "صيدليات", "سوبر ماركت", "متاجر"] : ["Food", "Pharmacy", "Grocery", "Stores"]).map((n, i) => (
          <span key={n} className="px-3 py-1.5 rounded-full whitespace-nowrap" style={i === 0 ? { background: C.ink, color: "#fff" } : { background: "#fff", color: C.ink }}>{n}</span>
        ))}
      </div>
      <div className="rounded-2xl p-3.5 text-white" style={{ background: C.ink }}>
        <p className="text-[10px] opacity-70">{ar(lang) ? "رصيد الولاء" : "Loyalty Balance"}</p>
        <p className="text-xl font-bold">450 {ar(lang) ? "نقطة" : "pts"}</p>
        <p className="text-[10px] mt-1" style={{ color: C.lime }}>{ar(lang) ? "باقي 50 نقطة على خصم 20%" : "50 pts left for 20% off"}</p>
      </div>
      {(ar(lang) ? ["مطعم الشام", "صيدلية الحياة", "ماركت الأسرة"] : ["Al-Sham Restaurant", "Al-Hayah Pharmacy", "Family Market"]).map((n, i) => (
        <Row key={n} t={n} s={ar(lang) ? ["30 دقيقة • توصيل مجاني", "20 دقيقة", "45 دقيقة"][i] : ["30 min • Free delivery", "20 min", "45 min"][i]}
          r={<Tag>{ar(lang) ? ["خصم 15%", "كوبون", "جديد"][i] : ["15% Off", "Coupon", "New"][i]}</Tag>} />
      ))}
    </div>
  ),
  vendor: (lang) => (
    <div className="p-4 pt-9 space-y-3 h-full" style={{ background: C.paper }}>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl p-3"><p className="text-[10px] text-gray-500">{ar(lang) ? "مبيعات اليوم" : "Today's Sales"}</p><p className="font-bold text-lg" style={{ color: C.ink }}>4,820 {ar(lang) ? "ج" : "EGP"}</p></div>
        <div className="bg-white rounded-xl p-3"><p className="text-[10px] text-gray-500">{ar(lang) ? "طلبات جديدة" : "New Orders"}</p><p className="font-bold text-lg" style={{ color: C.ink }}>7</p></div>
      </div>
      <div className="bg-white rounded-xl p-3 flex items-end gap-1.5 h-20">
        {[30, 48, 36, 62, 54, 78, 90].map((h, i) => <div key={i} className="flex-1 rounded-t" style={{ height: h + "%", background: i === 6 ? C.ink : C.lime }} />)}
      </div>
      {(ar(lang) ? [["طلب #2041", "2 وجبات • 180 ج"], ["طلب #2042", "5 أصناف • 342 ج"]] : [["Order #2041", "2 items • 180 EGP"], ["Order #2042", "5 items • 342 EGP"]]).map(([a, b]) => (
        <Row key={a} t={a} s={b} r={<Tag dark>{ar(lang) ? "قبول" : "Accept"}</Tag>} />
      ))}
    </div>
  ),
  courier: (lang) => (
    <div className="p-4 pt-9 space-y-3 h-full" style={{ background: C.ink }}>
      <div className="flex justify-between items-center text-white">
        <div><p className="text-[10px] opacity-70">{ar(lang) ? "أرباح اليوم" : "Today's Earnings"}</p><p className="text-xl font-bold">620 {ar(lang) ? "ج" : "EGP"}</p></div>
        <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: C.lime, color: C.ink }}>{ar(lang) ? "متصل" : "Online"}</span>
      </div>
      <div className="bg-white rounded-2xl p-3.5 space-y-2.5 text-[11px]">
        <p className="font-bold" style={{ color: C.ink }}>{ar(lang) ? "طلب توصيل جديد" : "New Delivery Request"}</p>
        <div className="flex items-center gap-2 text-gray-600"><span className="w-2 h-2 rounded-full" style={{ background: C.gold }} /> {ar(lang) ? "استلام: مطعم الشام (1.2 كم)" : "Pickup: Al-Sham (1.2 km)"}</div>
        <div className="flex items-center gap-2 text-gray-600"><span className="w-2 h-2 rounded-full" style={{ background: C.ink }} /> {ar(lang) ? "تسليم: المهندسين (3.4 كم)" : "Drop-off: Mohandessin (3.4 km)"}</div>
        <div className="flex gap-2 pt-1">
          <button className="flex-1 py-2 rounded-lg font-bold" style={{ background: C.lime, color: C.ink }}>{ar(lang) ? "قبول • 35 ج" : "Accept • 35 EGP"}</button>
          <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600">{ar(lang) ? "رفض" : "Decline"}</button>
        </div>
      </div>
      <div className="text-[10px] text-white/70 text-center">{ar(lang) ? "3 طلبات مكتملة اليوم" : "3 orders completed today"}</div>
    </div>
  ),
  admin: (lang) => (
    <div className="p-4 pt-9 space-y-3 h-full" style={{ background: C.paper }}>
      <p className="font-bold text-sm" style={{ color: C.ink }}>{ar(lang) ? "نظرة عامة على المنصة" : "Platform Overview"}</p>
      <div className="grid grid-cols-2 gap-2">
        {(ar(lang) ? [["البائعون", "فعّال"], ["الطيارون", "متصل"], ["الطلبات", "مباشر"], ["الكوبونات", "نشط"]] : [["Vendors", "Active"], ["Couriers", "Online"], ["Orders", "Live"], ["Coupons", "Active"]]).map(([a, b]) => (
          <div key={a} className="bg-white rounded-xl p-3"><p className="text-[10px] text-gray-500">{a}</p><p className="font-bold text-sm" style={{ color: C.ink }}>{b}</p></div>
        ))}
      </div>
      <Row t={ar(lang) ? "طلب انضمام بائع" : "Vendor Join Request"} s={ar(lang) ? "مراجعة المستندات" : "Reviewing docs"} r={<Tag dark>{ar(lang) ? "مراجعة" : "Review"}</Tag>} />
      <Row t={ar(lang) ? "عمولات الأسبوع" : "Weekly Commissions"} s={ar(lang) ? "تقرير جاهز" : "Report ready"} r={<Tag>{ar(lang) ? "تحميل" : "Download"}</Tag>} />
      <Row t={ar(lang) ? "إدارة النقاط" : "Points Management"} s={ar(lang) ? "قواعد الكسب والاستبدال" : "Earn & redeem rules"} r={<Tag>{ar(lang) ? "تعديل" : "Edit"}</Tag>} />
    </div>
  ),
};
