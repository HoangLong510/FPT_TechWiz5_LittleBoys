import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import localeEN from "~/locales/en.json"
import localeVI from "~/locales/vi.json"

const locale = localStorage.getItem("locale") || 'en'

const resources = {
    en: {
        translation: localeEN
    },
    vi: {
        translation: localeVI
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: locale,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;