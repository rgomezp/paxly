import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
import { AppleLoginButton, GoogleLoginButton } from "@/components/login"
import LoginManager from "@/managers/LoginManager"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const { themed } = useAppTheme()
  const loginManager = LoginManager.getInstance()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={themed($root)} contentContainerStyle={themed($contentContainer)} preset="scroll">
      <View style={themed($buttons)}>
        <AppleLoginButton onPress={loginManager.loginApple} />
        <GoogleLoginButton onPress={loginManager.loginGoogle} />
      </View>
      <View style={themed($titleContainer)}>
        <Text
          text={LANGUAGE_COPY.homeScreen.loginCreateAccount[Language.current]}
          preset="subheading"
          style={themed($heading)}
        />
      </View>
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  padding: 16,
})

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
})

const $titleContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  marginTop: 32,
})

const $buttons: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
})

const $heading: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  textAlign: "center",
})
