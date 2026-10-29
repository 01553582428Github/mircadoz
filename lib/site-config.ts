// ============================================================
// ⚙️ إعدادات الموقع — كل ما تحتاج تعدله من مكان واحد
// ============================================================

export const C = {
  ink: "#0F2A20",
  ink2: "#16382B",
  lime: "#D9F26B",
  paper: "#F6F7F2",
  line: "#E1E5DA",
  gold: "#F5A623",
};

export type Lang = "ar" | "en";
export type AppKey = "customer" | "vendor" | "courier" | "admin";
export const APP_KEYS: AppKey[] = ["customer", "vendor", "courier", "admin"];

// 📞 بيانات التواصل (غيّرها ببياناتك الحقيقية)
export const CONTACT = {
  email: "support@mircadoz.com",
  phone: "+20 01070053582",
  whatsapp: "201070053582", // بدون + أو مسافات
  address: { ar: "القاهرة، مصر", en: "Cairo, Egypt" },
};

/**
 * 🖼️ التحكم في صورة كل قسم
 * ----------------------------------------------------------
 * الطريقة الأسهل (بدون تعديل كود): حط صورك في  public/screens/
 *   hero-ar.png      hero-en.png      (أو hero.png للغتين)
 *   customer-ar.png  customer-en.png  (أو customer.png)
 *   vendor-ar.png    vendor-en.png    (أو vendor.png)
 *   courier-ar.png   courier-en.png   (أو courier.png)
 *   admin-ar.png     admin-en.png     (أو admin.png)
 * لو الصورة مش موجودة بتظهر الشاشة التجريبية المرسومة بالكود.
 *
 * الطريقة التانية: اكتب مسار/رابط الصورة هنا (ar / en / any).
 *   fit      : "cover" | "contain"
 *   position : أي قيمة object-position مثل "top" أو "center"
 *   frame    : "phone"   = داخل إطار موبايل
 *              "browser" = داخل إطار متصفح (مناسب للوحة التحكم)
 *              "none"    = الصورة لوحدها (لو فيها إطار جاهز)
 */
export type FrameKind = "phone" | "browser" | "none";

export type ScreenConfig = {
  ar?: string;
  en?: string;
  any?: string;
  fit?: "cover" | "contain";
  position?: string;
  frame?: FrameKind | boolean; // true = phone ، false = none (للتوافق مع النسخة القديمة)
};

export const SCREENS_CONFIG: Record<AppKey | "hero", ScreenConfig> = {
  hero:     { fit: "cover", position: "top", frame: "phone" },
  customer: { fit: "cover", position: "top", frame: "phone" },
  vendor:   { fit: "cover", position: "top", frame: "phone" },
  courier:  { fit: "cover", position: "top", frame: "phone" },
  admin:    { fit: "cover", position: "top", frame: "browser" },
};

export function frameOf(cfg: ScreenConfig): FrameKind {
  if (cfg.frame === false) return "none";
  if (cfg.frame === true || cfg.frame === undefined) return "phone";
  return cfg.frame;
}
