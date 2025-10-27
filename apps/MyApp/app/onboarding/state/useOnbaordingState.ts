import { useEffect, useState } from "react"
import { OnboardingStep } from "./OnboardingStep"
import LoginManager from "@/managers/LoginManager"
import Log from "@/utils/Log"
import { OneSignal } from "react-native-onesignal"
import { ganon } from "@/services/ganon/ganon"
import AnalyticsManager from "@/managers/AnalyticsManager"

export const useOnboardingState = () => {
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    LoginManager.getInstance().isLoggedIn().then(setIsLoggedIn)
    const unsubscribe = LoginManager.getInstance().subscribe((user) => {
      if (user) {
        // user is logged in
      }
    })

    return () => unsubscribe()
  }, [])

  /* H E L P E R S */

  /* H A N D L E R S */
  const completeOnboarding = async (emailOptIn: boolean) => {
    if (!isLoggedIn) {
      OneSignal.User.addTag("onboard_no_login", "1")
    }
    OneSignal.User.addTag("onboard_email_opt_in", emailOptIn ? "1" : "0")
    ganon.set("onboardCompleted", true)

    // trigger a sync for new users
    const lastBackup = ganon.get("lastBackup")

    if (!lastBackup && isLoggedIn) {
      Log.info("useOnboardingState: completeOnboarding: triggering sync for new users")
      try {
        await ganon.backup()
        Log.info("useOnboardingState: completeOnboarding: sync completed")
      } catch (error) {
        Log.error("useOnboardingState: completeOnboarding: error triggering sync", error)
      }
    }

    AnalyticsManager.getInstance().logEvent("onboard_complete", { emailOptIn })
    setStep("complete")
  }

  return {
    step,
    isLoggedIn,
    // export handlers
    completeOnboarding,
  }
}
