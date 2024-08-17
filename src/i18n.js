import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationTA from './locales/ta/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ta: {
    translation: translationTA,
  },
};

i18n
  .use(LanguageDetector) // Detect the user's language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
