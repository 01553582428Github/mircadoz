"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { LangProvider } from "./LangProvider";

// reducedMotion="user" = كل الحركات تحترم إعداد "تقليل الحركة" في جهاز المستخدم
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangProvider>
  );
}
