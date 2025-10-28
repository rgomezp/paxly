import { View, ViewStyle } from "react-native"
import OnboardingSlidesView from "@/components/onboarding/OnboardingSlidesView"
import { ScrollProvider } from "./ScrollProvider"

export const OnboardingScreen = () => {
  return (
    <ScrollProvider>
      <View style={$root}>
        <OnboardingSlidesView onComplete={() => {}} />
      </View>
    </ScrollProvider>
  )
}
const $root: ViewStyle = {
  flex: 1,
}
