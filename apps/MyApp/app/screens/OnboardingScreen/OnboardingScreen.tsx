import { View, ViewStyle } from "react-native"
import OnboardingSlidesView from "@/components/onboarding/OnboardingSlidesView"
import { ScrollProvider } from "./ScrollProvider"
import { useOnboardingState } from "@/onboarding/state/useOnboardingState"
import OnboardingOpeningScreen from "@/components/onboarding/OnboardingOpeningScreen"
import OnboardingLoginScreen from "@/components/onboarding/OnboardingLoginScreen"

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
            <OnboardingSlidesView onComplete={() => setStep("login")} />
          </View>
        </ScrollProvider>
      )
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
