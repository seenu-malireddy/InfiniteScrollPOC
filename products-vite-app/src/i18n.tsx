import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "Products - Infinite Scrolling",
      toggleTheme: "Switch to {{theme}} Mode",
      back: "⬅ Back to Products",
      price: "Price: ${{price}}",
      language : "Change to Arabic",
      loading: "Loading more products...",
      iDark:"Dark",
      iLight:"Light",
    },
  },
  ar: {
    translation: {
      title: "المنتجات - التمرير اللانهائي",
      toggleTheme: "تغيير إلى الوضع {{theme}}",
      back: "⬅ العودة إلى المنتجات",
      price: "السعر: ${{price}}",
      iDark:"مظلم",
      iLight:"ضوء",
      language : "التغيير إلى اللغة الإنجليزية",
      loading: "جارٍ تحميل المزيد من المنتجات...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
