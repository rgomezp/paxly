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
    <Screen style={themed($root)} contentContainerStyle={themed($contentContainer)} preset="scroll">
      <View style={themed($titleContainer)}>
        <Text
          text={LANGUAGE_COPY.homeScreen.loginCreateAccount[Language.current]}
          preset="heading"
          style={themed($heading)}
        />
      </View>
      <View style={themed($buttons)}>
        <AppleLoginButton onPress={() => {}} />
        <GoogleLoginButton onPress={() => {}} />
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
})

const $titleContainer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
})

const $buttons: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
})

const $heading: ThemedStyle<TextStyle> = (theme) => ({
  marginTop: 16,
  color: theme.colors.text,
})
