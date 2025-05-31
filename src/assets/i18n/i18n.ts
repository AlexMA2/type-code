// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(Backend) // carga los archivos de traducción desde /public/locales
    .use(LanguageDetector) // detecta el idioma del navegador
    .use(initReactI18next) // conecta con React
    .init({
        fallbackLng: "en",
        debug: false,
        interpolation: {
            escapeValue: false, // React ya lo hace
        },
    });

export default i18n;
