import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import traslations from 'app/translations';
import env from 'app/config/env';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: 'en',
    debug: env.DEBUG,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    resources: traslations,
  });

export default i18n;
