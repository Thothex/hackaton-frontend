import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruTranslation from "../assets/locales/ru/translation.json";
import enTranslation from "../assets/locales/en/translation.json";

const resources = {
  ru: {
    translation: ruTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

const storedLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
