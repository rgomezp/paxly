export type SupportedLanguages = "en" | "es" | "de" | "fr"

export default class Language {
  static readonly DEFAULT_LANGUAGE = "en"

  static current: SupportedLanguages = this.DEFAULT_LANGUAGE

  static setLanguage(language: SupportedLanguages) {
    Language.current = language
  }
}
