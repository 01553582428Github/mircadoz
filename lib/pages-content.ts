// ============================================================
// 📄 محتوى الصفحات الثابتة (عربي / إنجليزي)
// ⚠️ نصوص الخصوصية والشروط مسودة عامة — راجعها مع مستشار قانوني قبل النشر.
// ============================================================
import type { Lang } from "./site-config";

export type Section = { h: string; p: string[] };
export type PageContent = { title: string; intro: string; sections: Section[] };
export type PageKey = "about" | "privacy" | "terms" | "vendorTerms";

export const UPDATED = { ar: "آخر تحديث: أكتوبر 2026", en: "Last updated: October 2026" };

export const PAGES: Record<PageKey, Record<Lang, PageContent>> = {
  about: {
    ar: {
      title: "عن ميركادوز",
      intro: "ميركادوز منصة توصيل متعددة البائعين: مطاعم وصيدليات وسوبر ماركت ومتاجر في تطبيق واحد.",
      sections: [
        { h: "ماذا نفعل", p: ["نربط العملاء بالمتاجر القريبة منهم، ونوصّل الطلبات عن طريق طيارين مستقلين، ونتيح تتبع كل طلب على الخريطة."] },
        { h: "أربعة تطبيقات، منظومة واحدة", p: ["لكل طرف تطبيق مصمم لدوره: العملاء، البائعون، الطيارون، والإدارة. كلها متصلة لحظياً حتى يعرف كل طرف حالة الطلب في وقتها."] },
        { h: "نظام الولاء", p: ["نمنح العميل نقاطاً مع كل طلب من أي متجر على المنصة، ويمكنه استبدالها بخصومات أو رصيد في محفظته."] },
        { h: "قيمنا", p: ["الوضوح في الأسعار والعمولات، واحترام وقت العميل، وأرباح عادلة للبائعين والطيارين."] },
      ],
    },
    en: {
      title: "About Mircadoz",
      intro: "Mircadoz is a multi-vendor delivery platform: restaurants, pharmacies, supermarkets and stores in one app.",
      sections: [
        { h: "What we do", p: ["We connect customers with nearby stores, deliver orders through independent couriers, and let you track every order on the map."] },
        { h: "Four apps, one ecosystem", p: ["Each party has an app built for its role: customers, vendors, couriers and admins. They stay connected in real time so everyone knows the order status as it changes."] },
        { h: "Loyalty", p: ["Customers earn points on every order from any store on the platform and can redeem them for discounts or wallet credit."] },
        { h: "What we value", p: ["Clear prices and commissions, respect for the customer's time, and fair earnings for vendors and couriers."] },
      ],
    },
  },
  privacy: {
    ar: {
      title: "سياسة الخصوصية",
      intro: "نوضح هنا ما البيانات التي نجمعها، ولماذا، وكيف نحميها.",
      sections: [
        { h: "البيانات التي نجمعها", p: ["بيانات الحساب (الاسم، رقم الهاتف، البريد الإلكتروني)، وعناوين التوصيل، وسجل الطلبات والنقاط، وبيانات الدفع عبر مزودي الدفع (لا نخزّن بيانات البطاقة الكاملة)."] },
        { h: "الموقع الجغرافي", p: ["نستخدم موقعك لعرض المتاجر القريبة وتتبع الطلب. للطيارين، نستخدم الموقع أثناء الاتصال لتوزيع الطلبات. يمكنك إيقاف إذن الموقع من إعدادات جهازك."] },
        { h: "كيف نستخدم بياناتك", p: ["لتنفيذ الطلبات، وتشغيل نظام النقاط، وتحسين الخدمة، وإرسال إشعارات الطلب، ومنع الاحتيال."] },
        { h: "المشاركة مع أطراف أخرى", p: ["نشارك الحد الأدنى اللازم مع البائع (لتجهيز الطلب) ومع الطيار (للتوصيل) ومع مزودي الدفع. لا نبيع بياناتك."] },
        { h: "الاحتفاظ بالبيانات وحقوقك", p: ["نحتفظ بالبيانات طالما حسابك نشط أو حسب ما يقتضيه القانون. يمكنك طلب الاطلاع على بياناتك أو تعديلها أو حذف حسابك بالتواصل معنا."] },
        { h: "التواصل", p: ["لأي استفسار عن الخصوصية، راسلنا من صفحة «تواصل معنا»."] },
      ],
    },
    en: {
      title: "Privacy Policy",
      intro: "Here is what data we collect, why we collect it, and how we protect it.",
      sections: [
        { h: "Data we collect", p: ["Account details (name, phone, email), delivery addresses, order and points history, and payment details handled by payment providers (we do not store full card numbers)."] },
        { h: "Location", p: ["We use your location to show nearby stores and track orders. For couriers, location is used while online to assign orders. You can turn off location access in your device settings."] },
        { h: "How we use your data", p: ["To fulfil orders, run the points system, improve the service, send order notifications, and prevent fraud."] },
        { h: "Sharing", p: ["We share the minimum needed with the vendor (to prepare the order), the courier (to deliver it) and payment providers. We do not sell your data."] },
        { h: "Retention and your rights", p: ["We keep data while your account is active or as required by law. You can ask to access, correct or delete your data by contacting us."] },
        { h: "Contact", p: ["For privacy questions, write to us from the Contact page."] },
      ],
    },
  },
  terms: {
    ar: {
      title: "شروط الاستخدام",
      intro: "باستخدامك تطبيق ميركادوز أو موقعه فأنت توافق على الشروط التالية.",
      sections: [
        { h: "الحساب", p: ["يجب أن تكون بياناتك صحيحة، وأنت مسؤول عن الحفاظ على سرية حسابك."] },
        { h: "الطلبات والدفع", p: ["الأسعار والتوفر يحددها كل بائع. تظهر لك رسوم التوصيل قبل تأكيد الطلب. يمكنك الدفع نقداً أو بالبطاقة أو بالمحفظة حسب المتاح."] },
        { h: "الإلغاء والاسترجاع", p: ["يمكن إلغاء الطلب قبل أن يبدأ البائع في تجهيزه. في حال وجود مشكلة في الطلب تواصل معنا وسنراجعها مع البائع."] },
        { h: "النقاط والكوبونات", p: ["النقاط والكوبونات ليس لها قيمة نقدية خارج المنصة، ولها شروط وتاريخ انتهاء، ويحق لنا إيقافها عند إساءة الاستخدام."] },
        { h: "الاستخدام المقبول", p: ["يُمنع إساءة استخدام المنصة أو التحايل على العروض أو الإساءة للبائعين والطيارين."] },
        { h: "التعديلات", p: ["قد نحدّث هذه الشروط من وقت لآخر، وسننشر النسخة المحدثة في هذه الصفحة."] },
      ],
    },
    en: {
      title: "Terms of Use",
      intro: "By using the Mircadoz app or website you agree to the following terms.",
      sections: [
        { h: "Your account", p: ["Your details must be accurate, and you are responsible for keeping your account secure."] },
        { h: "Orders and payment", p: ["Prices and availability are set by each vendor. Delivery fees are shown before you confirm. You can pay by cash, card or wallet where available."] },
        { h: "Cancellation and refunds", p: ["You can cancel before the vendor starts preparing your order. If something is wrong with an order, contact us and we will review it with the vendor."] },
        { h: "Points and coupons", p: ["Points and coupons have no cash value outside the platform, have conditions and expiry dates, and may be suspended in case of abuse."] },
        { h: "Acceptable use", p: ["Do not misuse the platform, exploit offers, or mistreat vendors and couriers."] },
        { h: "Changes", p: ["We may update these terms from time to time and will publish the latest version on this page."] },
      ],
    },
  },
  vendorTerms: {
    ar: {
      title: "شروط البائعين",
      intro: "الشروط الخاصة بالمتاجر والمطاعم والصيدليات التي تبيع عبر ميركادوز.",
      sections: [
        { h: "شروط الانضمام", p: ["سجل تجاري أو ما يعادله، وترخيص ساري للنشاط (ومنها ترخيص الصيدليات)، وبيانات تواصل وحساب لاستلام المستحقات. نراجع الطلب قبل التفعيل."] },
        { h: "المنتجات والأسعار", p: ["أنت مسؤول عن دقة المنتجات والأسعار والمخزون وجودتها. يجب ألا تبيع منتجات ممنوعة أو منتهية الصلاحية."] },
        { h: "استقبال الطلبات", p: ["اقبل الطلب أو ارفضه بسرعة، وجهّزه خلال الوقت المعلن. التأخير المتكرر أو الإلغاء بدون سبب قد يؤثر على ظهور متجرك."] },
        { h: "العمولات والتسوية", p: ["تُحسب عمولة المنصة كنسبة من قيمة الطلب وتظهر لك في تقارير المبيعات. تتم التسوية وفق الجدول المتفق عليه عند التسجيل."] },
        { h: "الكوبونات والعروض", p: ["يمكنك إطلاق كوبونات لعملائك، وتتحمل تكلفتها حسب إعداداتك."] },
        { h: "إيقاف الحساب", p: ["يحق لنا إيقاف المتجر عند مخالفة الشروط أو تكرار الشكاوى، ويمكنك إغلاق حسابك بعد تسوية الطلبات المفتوحة."] },
      ],
    },
    en: {
      title: "Vendor Terms",
      intro: "Terms for stores, restaurants and pharmacies selling through Mircadoz.",
      sections: [
        { h: "Eligibility", p: ["A commercial registration or equivalent, a valid activity licence (including pharmacy licences), contact details and an account for payouts. We review each application before activation."] },
        { h: "Products and prices", p: ["You are responsible for the accuracy of products, prices, stock and quality. Prohibited or expired products must not be sold."] },
        { h: "Handling orders", p: ["Accept or reject orders promptly and prepare them within the stated time. Repeated delays or unexplained cancellations may affect your store's visibility."] },
        { h: "Commission and settlement", p: ["The platform commission is a percentage of the order value and appears in your sales reports. Settlement follows the schedule agreed at signup."] },
        { h: "Coupons and offers", p: ["You can launch coupons for your customers and bear their cost according to your settings."] },
        { h: "Suspension", p: ["We may suspend a store for breaking these terms or repeated complaints. You may close your account after open orders are settled."] },
      ],
    },
  },
};

export const CONTACT_TEXT = {
  ar: {
    title: "تواصل معنا", intro: "اختر نوع رسالتك وسنرد عليك في أقرب وقت.",
    topic: "نوع الرسالة", topics: { customer: "دعم العملاء", vendor: "الانضمام كبائع", courier: "الانضمام كطيار", other: "أخرى" },
    name: "الاسم", phone: "رقم الهاتف", message: "رسالتك", send: "أرسل عبر واتساب", sendMail: "أو أرسل بالبريد الإلكتروني",
    required: "من فضلك اكتب اسمك ورسالتك.", direct: "أو تواصل مباشرة", email: "البريد الإلكتروني", whatsapp: "واتساب", address: "العنوان",
  },
  en: {
    title: "Contact us", intro: "Pick a topic and we will get back to you as soon as possible.",
    topic: "Topic", topics: { customer: "Customer support", vendor: "Join as a vendor", courier: "Join as a courier", other: "Other" },
    name: "Name", phone: "Phone", message: "Your message", send: "Send via WhatsApp", sendMail: "Or send by email",
    required: "Please enter your name and message.", direct: "Or reach us directly", email: "Email", whatsapp: "WhatsApp", address: "Address",
  },
};
