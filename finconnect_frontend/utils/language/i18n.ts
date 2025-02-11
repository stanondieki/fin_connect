import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Hi, Welcome Back": "Hi, Welcome Back",
      "Guest": "Guest",
      "Settings": "Settings",
      "Profile": "Profile",
      "Log Out": "Log Out",
    },
  },
  fr: {
    translation: {
      "Hi, Welcome Back": "Bonjour, Bienvenue",
      "Guest": "Invité",
      "Settings": "Paramètres",
      "Profile": "Profil",
      "Log Out": "Déconnexion",
    },
  },
  es: {
    translation: {
      "Hi, Welcome Back": "Hola, Bienvenido",
      "Guest": "Invitado",
      "Settings": "Configuraciones",
      "Profile": "Perfil",
      "Log Out": "Cerrar sesión",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
