import { SupportedLanguages } from "./Language"

type ITranslation = {
  [key in SupportedLanguages]: string
}

type IAlertCopy = {
  title: ITranslation
  message: ITranslation
  button: ITranslation
}

type LanguageCopyValue = ITranslation | IAlertCopy | { [key: string]: LanguageCopyValue }

interface ILanguageCopy {
  homeScreen: {
    welcome: LanguageCopyValue
    selectOption: LanguageCopyValue
  }
  words: {
    settings: LanguageCopyValue
    theme: LanguageCopyValue
    light: LanguageCopyValue
    dark: LanguageCopyValue
    system: LanguageCopyValue
  }
}

export default ILanguageCopy
