import { SupportedLanguages } from "./Language"

type ITranslation = {
  [key in SupportedLanguages]: string
}

type IAlertCopy = {
  title: ITranslation
  message: ITranslation
  button: ITranslation
}

interface ILanguageCopy {
  homeScreen: {
    welcome: ITranslation
    selectOption: ITranslation
    loginCreateAccount: ITranslation
  }
  words: {
    settings: ITranslation
    theme: ITranslation
    light: ITranslation
    dark: ITranslation
    system: ITranslation
    termsOfService: ITranslation
    privacyPolicy: ITranslation
    next: ITranslation
    membership: ITranslation
    leaveReview: ITranslation
    currentPlan: ITranslation
    expirationDate: ITranslation
    renewalDate: ITranslation
    changePlan: ITranslation
    cancelSubscription: ITranslation
    noActiveSubscription: ITranslation
  }
  alerts: {
    error: IAlertCopy
  }
}

export default ILanguageCopy
