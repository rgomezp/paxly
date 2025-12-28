import { View, ViewStyle } from "react-native"
import OnboardingSlidesView from "@/components/onboarding/OnboardingSlidesView"
import { ScrollProvider } from "./ScrollProvider"
import { useOnboardingState } from "@/onboarding/state/useOnboardingState"
import OnboardingOpeningScreen from "@/components/onboarding/OnboardingOpeningScreen"
import OnboardingLoginScreen from "@/components/onboarding/OnboardingLoginScreen"
import OnboardingHardPaywall from "./OnboardingHardPaywall"
import OnboardingFallbackPaywall from "./OnboardingFallbackPaywall"
import OnboardingLoadingScreen from "@/components/onboarding/OnboardingLoadingScreen"

export const OnboardingScreen = () => {
  const { step, setStep } = useOnboardingState()

  switch (step) {
    case "welcome":
      return (
        <OnboardingOpeningScreen
          onGetStarted={() => setStep("main")}
          onIHaveAccount={() => setStep("login")}
        />
      )
    case "main":
      return (
        <ScrollProvider>
          <View style={$root}>
            <OnboardingSlidesView onComplete={() => setStep("loading")} />
          </View>
        </ScrollProvider>
      )
    case "loading":
      return (
        <View style={$root}>
          <OnboardingLoadingScreen onComplete={() => setStep("paywall")} />
        </View>
      )
    case "paywall":
      return (
        <OnboardingHardPaywall
          onComplete={() => setStep("login")}
          onCancel={() => setStep("paywall_fallback")}
        />
      )
    case "paywall_fallback":
      return <OnboardingFallbackPaywall onFinished={() => setStep("login")} />
    case "login":
      return <OnboardingLoginScreen />
    case "complete":
    default:
      return null
  }
}
const $root: ViewStyle = {
  flex: 1,
}
