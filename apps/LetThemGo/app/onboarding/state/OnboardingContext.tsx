import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { OnboardingStep } from "./OnboardingStep"
import LoginManager from "@/managers/LoginManager"
import Log from "@/utils/Log"
import { OneSignal } from "react-native-onesignal"
import { ganon } from "@/services/ganon/ganon"
import AnalyticsManager from "@/managers/AnalyticsManager"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"

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

  const completeOnboarding = async (emailOptIn: boolean) => {
    if (!isLoggedIn) {
      OneSignal.User.addTag("onboard_no_login", "1")
    }
    OneSignal.User.addTag("onboard_email_opt_in", emailOptIn ? "1" : "0")
    ganon.set("finishedOnboarding", true)

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

