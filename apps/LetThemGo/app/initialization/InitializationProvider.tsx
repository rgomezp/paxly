import useAppCheck from "@/hooks/useAppCheck"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "@/theme"
import useOnboardingFlow from "@/hooks/useOnboardingFlow"
import useRevenueCat from "@/thirdParty/useRevenueCat"
import { createContext, useEffect, useState } from "react"
import useOneSignal from "@/thirdParty/useOneSignal"
import { useAudio } from "@/hooks/useAudio"
import Log, { LogLevel } from "@/utils/Log"
import LoginManager from "@/managers/LoginManager"
import DataInitializationManager from "@/managers/DataInitializationManager"

interface InitializationState {
  isInitialized?: boolean
  isOnboardingComplete?: boolean
  isDataInitialized?: boolean
}

export const InitializationContext = createContext<InitializationState | null>(null)

export function InitializationProvider({ children }: { children: React.ReactNode }) {
  const isAppCheckComplete = useAppCheck()
  const isOnboardingComplete = useOnboardingFlow()
  const isAudioSetup = useAudio()

  const [areFontsLoaded, _fontLoadError] = useFonts(customFontsToLoad)
  const [isDataInitialized, setIsDataInitialized] = useState(false)

  useEffect(() => {
    DataInitializationManager.initializeData().then(() => {
      setIsDataInitialized(true)
    })
  }, [])

  /* N O N - B L O C K I N G */
  useRevenueCat()
  useOneSignal()

  // Setup auth listener once on mount
  useEffect(() => {
    const unsubscribe = LoginManager.getInstance().setupAuthListener()
    return () => {
      unsubscribe()
    }
  }, [])

  // Set log level once on mount
  useEffect(() => {
    Log.setLevel(process.env.NODE_ENV === "development" ? LogLevel.Info : LogLevel.None)
  }, [])

  /* B L O C K I N G */
  const isInitialized = isAppCheckComplete && areFontsLoaded && isAudioSetup && isDataInitialized

  return (
    <InitializationContext.Provider
      value={{ isInitialized, isOnboardingComplete, isDataInitialized }}
    >
      {children}
    </InitializationContext.Provider>
  )
}
