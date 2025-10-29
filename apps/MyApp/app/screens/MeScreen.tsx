import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"

interface MeScreenProps extends AppStackScreenProps<"Me"> {}

export const MeScreen: FC<MeScreenProps> = observer(function MeScreen() {
  return (
    <Screen style={$root} contentContainerStyle={$contentContainer} preset="scroll">
      <Text text="Me" preset="heading" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}


