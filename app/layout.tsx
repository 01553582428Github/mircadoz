import type { Metadata, Viewport } from "next";
import { Playpen_Sans_Arabic } from "next/font/google";
import "./globals.css";
import "./mk.css";
import { Providers } from "@/components/Providers";

const playpen = Playpen_Sans_Arabic({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playpen",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: { default: "ميركادوز | Mircadoz", template: "%s | Mircadoz" },
  description: "مطعمك وصيدليتك وسوبر ماركتك، توصلك في دقائق. | Your restaurant, pharmacy and supermarket, delivered in minutes.",
  appleWebApp: { capable: true, title: "Mircadoz", statusBarStyle: "black-translucent" },
  other: { "mobile-web-app-capable": "yes", "format-detection": "telephone=no" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

// ✅ themeColor و viewport لازم يكونوا هنا (مش داخل metadata) في Next الحديث
export const viewport: Viewport = {
  themeColor: "#0F2A20",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${playpen.variable} ${playpen.className} antialiased`}>
        {/* ✅ الـ Providers كانت ناقصة في نسختك، ولهذا لم يكن زر اللغة يعمل */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
