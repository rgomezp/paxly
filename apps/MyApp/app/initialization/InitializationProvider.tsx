import useAppCheck from "@/hooks/useAppCheck"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "@/theme"
import useOnboardingFlow from "@/hooks/useOnboardingFlow"
import useRevenueCat from "@/thirdParty/useRevenueCat"
import { createContext } from "react"
import useOneSignal from "@/thirdParty/useOneSignal"
import { useAudio } from "@/hooks/useAudio"

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
  const isRevenueCatSetup = useRevenueCat()
  const isOneSignalSetup = useOneSignal()

  const isInitialized =
    isAppCheckComplete &&
    areFontsLoaded &&
    isOnboardingComplete &&
    isRevenueCatSetup &&
    isOneSignalSetup &&
    isAudioSetup

  return (
    <InitializationContext.Provider value={{ isInitialized, isOnboardingComplete }}>
      {children}
    </InitializationContext.Provider>
  )
}
