"use client";

import React from "react";

export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[236px] sm:w-[270px] aspect-[1/2] rounded-[2.6rem] p-[9px] ${className}`}
      style={{
        background: "linear-gradient(145deg,#1c2e26,#0a1511)",
        boxShadow: "0 40px 80px -24px rgba(0,0,0,.55), inset 0 0 0 1.5px rgba(255,255,255,.08)",
      }}
    >
      {/* أزرار جانبية */}
      <span aria-hidden className="absolute -left-[3px] top-24 w-[3px] h-9 rounded-l bg-[#0a1511]" />
      <span aria-hidden className="absolute -left-[3px] top-36 w-[3px] h-9 rounded-l bg-[#0a1511]" />
      <span aria-hidden className="absolute -right-[3px] top-32 w-[3px] h-14 rounded-r bg-[#0a1511]" />
      {/* النوتش */}
      <div aria-hidden className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-20" />
      <div className="w-full h-full rounded-[2.1rem] overflow-hidden bg-white relative">{children}</div>
      {/* لمعة زجاج */}
      <div aria-hidden className="pointer-events-none absolute inset-[9px] rounded-[2.1rem] z-30"
        style={{ background: "linear-gradient(115deg, rgba(255,255,255,.13) 0%, transparent 32%)" }} />
    </div>
  );
}
