import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface MyTabScreenProps extends AppStackScreenProps<"MyTab"> {}

export const MyTabScreen: FC<MyTabScreenProps> = observer(function MyTabScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} contentContainerStyle={$contentContainer} preset="scroll">
      <Text text="My Tab" preset="heading" />
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
