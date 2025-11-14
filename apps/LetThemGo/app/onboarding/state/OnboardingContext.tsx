import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { OnboardingStep } from "./OnboardingStep"
import LoginManager from "@/managers/LoginManager"
import { OneSignal } from "react-native-onesignal"
import { ganon } from "@/services/ganon/ganon"
import AnalyticsManager from "@/managers/AnalyticsManager"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"
import Log from "@/utils/Log"

interface OnboardingContextType {
  step: OnboardingStep
  isLoggedIn: boolean
  setStep: (step: OnboardingStep) => void
  completeOnboarding: (emailOptIn: boolean) => Promise<void>
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const loginManager = LoginManager.getInstance()
    setIsLoggedIn(loginManager.isLoggedIn())

    // Subscribe to login state changes
    const unsubscribe = loginManager.subscribe((user) => {
      setIsLoggedIn(!!user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Add OneSignal tag when user starts onboarding (main step)
  useEffect(() => {
    if (step === "main") {
      try {
        OneSignal.User.addTag("onboarding_status", "started")
        Log.info("OnboardingContext: Added OneSignal tag: onboarding_status=started")
      } catch (error) {
        Log.error(`OnboardingContext: Error adding OneSignal tag: ${error}`)
      }
    }
  }, [step])

  const completeOnboarding = async (emailOptIn: boolean) => {
    if (!isLoggedIn) {
      OneSignal.User.addTag("onboard_no_login", "1")
    }
    OneSignal.User.addTag("onboard_email_opt_in", emailOptIn ? "1" : "0")

    ganon.set("finishedOnboarding", true)

    AnalyticsManager.getInstance().logEvent("onboard_complete", { emailOptIn })
    EventRegister.emit(GLOBAL_EVENTS.ONBOARDING_COMPLETE)
    setStep("complete")
  }

  return (
    <OnboardingContext.Provider
      value={{
        step,
        isLoggedIn,
        setStep,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboardingState() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboardingState must be used within an OnboardingProvider")
  }
  return context
}
