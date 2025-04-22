import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text
        text={(LANGUAGE_COPY.words as any).settings[Language.current]}
        preset="heading"
        style={$heading}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 16,
}

const $heading: TextStyle = {
  marginTop: 16,
}
