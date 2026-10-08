"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "hi" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations: Record<Language, Record<string, string>> = {
  en: {
    shop: "Shop",
    about: "About",
    resources: "Resources",
    blog: "Blog",
    contact: "Contact",
    search: "Search herbs, oils...",
    shippingAddress: "Shipping Address",
    paymentMethod: "Payment Method",
    orderSummary: "Order Summary",
    grandTotal: "Grand Total",
    confirmPay: "Confirm & Pay",
    addNew: "Add New",
    deliveringTo: "Delivering to",
  },

  hi: {
    shop: "शॉप",
    about: "हमारे बारे में",
    resources: "संसाधन",
    blog: "ब्लॉग",
    contact: "संपर्क",
    search: "जड़ी-बूटियां, तेल खोजें...",
    shippingAddress: "शिपिंग पता",
    paymentMethod: "भुगतान का तरीका",
    orderSummary: "ऑर्डर सारांश",
    grandTotal: "कुल राशि",
    confirmPay: "पुष्टि करें और भुगतान करें",
    addNew: "नया जोड़ें",
    deliveringTo: "डिलीवरी स्थान",
  },

  ar: {
    shop: "المتجر",
    about: "من نحن",
    resources: "الموارد",
    blog: "المدونة",
    contact: "اتصل بنا",
    search: "ابحث عن الأعشاب والزيوت...",
    shippingAddress: "عنوان الشحن",
    paymentMethod: "طريقة الدفع",
    orderSummary: "ملخص الطلب",
    grandTotal: "المجموع الكلي",
    confirmPay: "تأكيد ودفع",
    addNew: "إضافة جديد",
    deliveringTo: "التوصيل إلى",
  },
};

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const country = localStorage.getItem("selectedCountry");

    const countryLanguage: Record<string, Language> = {
      IN: "hi",
      AE: "ar",
      SA: "ar",
      QA: "ar",
      US: "en",
      GB: "en",
      CA: "en",
      AU: "en",
      OTHER: "en",
    };

    if (country && countryLanguage[country]) {
      setLanguageState(countryLanguage[country]);
    }

    const handleCountryChanged = (event: Event) => {
      const customEvent = event as CustomEvent;

      const selectedCode = customEvent.detail?.code;

      if (selectedCode && countryLanguage[selectedCode]) {
        setLanguageState(countryLanguage[selectedCode]);
      }
    };

    window.addEventListener("countryChanged", handleCountryChanged);

    return () => {
      window.removeEventListener(
        "countryChanged",
        handleCountryChanged
      );
    };
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
