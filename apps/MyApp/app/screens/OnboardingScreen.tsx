import { FC } from "react"
import { ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
// import { useNavigation } from "@react-navigation/native"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

export const OnboardingScreen: FC<OnboardingScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="onboarding" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
