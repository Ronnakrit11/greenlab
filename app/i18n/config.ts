'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly
import enTranslations from './locales/en.json';
import thTranslations from './locales/th.json';
import ruTranslations from './locales/ru.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslations },
      th: { translation: thTranslations },
      ru: { translation: ruTranslations }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'th', 'ru'],
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18next;