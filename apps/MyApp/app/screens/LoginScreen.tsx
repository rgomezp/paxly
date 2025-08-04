import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const { themed } = useAppTheme()

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={themed($root)} preset="scroll">
      <Text
        text={LANGUAGE_COPY.homeScreen.loginCreateAccount[Language.current]}
        preset="heading"
        style={themed($heading)}
      />
      <Text text="Login and account creation functionality will be implemented here." />
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  padding: 16,
})

const $heading: ThemedStyle<TextStyle> = (theme) => ({
  marginTop: 16,
  color: theme.colors.text,
})
