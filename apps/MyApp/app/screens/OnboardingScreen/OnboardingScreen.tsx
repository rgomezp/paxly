import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
// import { useNavigation } from "@react-navigation/native"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

export const OnboardingScreen = observer(function OnboardingScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="onboarding" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
