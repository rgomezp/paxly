import { SupportedLanguages } from "./Language"

type Translation = {
  [key in SupportedLanguages]: string
}

type AlertCopy = {
  title: Translation
  message: Translation
  button: Translation
}

interface LanguageCopy {
  [key: string]: Translation | AlertCopy | LanguageCopy
}

const LANGUAGE_COPY: LanguageCopy = {
  homeScreen: {
    welcome: {
      en: "Welcome to Potion Forge",
      es: "Bienvenido a Potion Forge",
      de: "Willkommen bei Potion Forge",
    },
    selectOption: {
      en: "Select an option from the drawer menu to get started",
      es: "Seleccione una opción del menú del cajón para comenzar",
      de: "Wählen Sie eine Option aus dem Menü des Kastens, um loszulegen",
    },
  },
}

export default LANGUAGE_COPY
