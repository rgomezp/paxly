import useAppCheck from "@/hooks/useAppCheck"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "@/theme"
import useOnboardingFlow from "@/hooks/useOnboardingFlow"
import useRevenueCat from "@/thirdParty/useRevenueCat"
import { createContext } from "react"
import useOneSignal from "@/thirdParty/useOneSignal"
import { useAudio } from "@/hooks/useAudio"
import Log, { LogLevel } from "@/utils/Log"

interface InitializationState {
  isInitialized?: boolean
  isOnboardingComplete?: boolean
}

export const InitializationContext = createContext<InitializationState | null>(null)

export function InitializationProvider({ children }: { children: React.ReactNode }) {
  const isAppCheckComplete = useAppCheck()

  const [areFontsLoaded, _fontLoadError] = useFonts(customFontsToLoad)
  const isOnboardingComplete = useOnboardingFlow()
  const isAudioSetup = useAudio()

  /* N O N - B L O C K I N G */
  useRevenueCat()
  useOneSignal()
  Log.setLevel(process.env.NODE_ENV === "development" ? LogLevel.Info : LogLevel.None)

  /* B L O C K I N G */
  const isInitialized = isAppCheckComplete && areFontsLoaded && isAudioSetup

  return (
    <InitializationContext.Provider value={{ isInitialized, isOnboardingComplete }}>
      {children}
    </InitializationContext.Provider>
  )
}
