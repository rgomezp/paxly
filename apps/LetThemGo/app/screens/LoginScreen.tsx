import { FC, useEffect, useState, useRef } from "react"
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
import Log from "@/utils/Log"
import LoginError, { LoginErrors } from "@/utils/errors/LoginErrors"
import { useNavigation } from "@react-navigation/native"
import LoadingModal from "@/components/modals/LoadingModal"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const { themed } = useAppTheme()
  const loginManager = LoginManager.getInstance()
  const [loggingIn, setLoggingIn] = useState(false)
  const loggingInRef = useRef(false)

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = loginManager.subscribe(() => {
      // Only navigate back if we're in a login flow
      if (loggingInRef.current) {
        setLoggingIn(false)
        loggingInRef.current = false
        navigation.goBack()
      }
    })
    return () => unsubscribe()
  }, [navigation, loginManager])

  const handleGoogleLogin = async () => {
    try {
      setLoggingIn(true)
      loggingInRef.current = true
      await loginManager.loginGoogle()
      // Note: The loading modal will be dismissed and navigation will happen
      // when the subscription callback fires (after login is complete)
    } catch (error: any) {
      setLoggingIn(false)
      loggingInRef.current = false
      if (error instanceof LoginError && error.message === LoginErrors.LoginCancelled) {
        // User cancelled, no action needed
        Log.info("LoginScreen: Google login cancelled by user")
      } else {
        Log.error(`LoginScreen: Google login error: ${error}`)
      }
    }
  }

  const handleAppleLogin = async () => {
    try {
      setLoggingIn(true)
      loggingInRef.current = true
      await loginManager.loginApple()
      // Note: The loading modal will be dismissed and navigation will happen
      // when the subscription callback fires (after login is complete)
    } catch (error: any) {
      setLoggingIn(false)
      loggingInRef.current = false
      if (error instanceof LoginError && error.message === LoginErrors.LoginCancelled) {
        // User cancelled, no action needed
        Log.info("LoginScreen: Apple login cancelled by user")
      } else {
        Log.error(`LoginScreen: Apple login error: ${error}`)
      }
    }
  }

  return (
    <Screen style={themed($root)} contentContainerStyle={themed($contentContainer)} preset="scroll">
      <LoadingModal visible={loggingIn} text="Logging in..." />
      <View style={themed($buttons)}>
        <AppleLoginButton onPress={handleAppleLogin} />
        <GoogleLoginButton onPress={handleGoogleLogin} />
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
