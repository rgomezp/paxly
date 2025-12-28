import { useState } from "react"
import { StyleSheet, View, Platform } from "react-native"
import Log from "@/utils/Log"
import LoginManager from "@/managers/LoginManager"
import LoginError, { LoginErrors } from "@/utils/errors/LoginErrors"
import { GoogleLoginButton } from "@/components/login/GoogleLoginButton"
import { AppleLoginButton } from "@/components/login/AppleLoginButton"
import LoadingModal from "../modals/LoadingModal"

export default function LoginComponent() {
  const [loggingIn, setLoggingIn] = useState(false)

  const loginManager = LoginManager.getInstance()

  const loginGoogle = async () => {
    try {
      setLoggingIn(true)
      await loginManager.loginGoogle()
      setLoggingIn(false)
    } catch (error: any) {
      setLoggingIn(false)
      if (error instanceof LoginError && error.message === LoginErrors.LoginCancelled) {
        // User cancelled, no action needed
        Log.info("LoginComponent: Google login cancelled by user")
      } else {
        Log.error(`LoginComponent: Google login error: ${error}`)
      }
    }
  }

  const loginApple = async () => {
    try {
      setLoggingIn(true)
      await loginManager.loginApple()
      setLoggingIn(false)
    } catch (error: any) {
      setLoggingIn(false)
      if (error instanceof LoginError && error.message === LoginErrors.LoginCancelled) {
        // User cancelled, no action needed
        Log.info("LoginComponent: Apple login cancelled by user")
      } else {
        Log.error(`LoginComponent: Apple login error: ${error}`)
      }
    }
  }

  return (
    <View style={styles.loginButtonsContainer}>
      <LoadingModal visible={loggingIn} text="Please wait..." />
      <LoggedOutView loginGoogle={loginGoogle} loginApple={loginApple} />
    </View>
  )
}

const LoggedOutView = ({
  loginGoogle,
  loginApple,
}: {
  loginGoogle: () => void
  loginApple: () => void
}) => (
  <View style={styles.loginButtonsContainer} testID="loginComponentLoggedOut">
    <View style={styles.loginButton}>
      <GoogleLoginButton onPress={loginGoogle} />
    </View>
    {Platform.OS === "ios" && (
      <View style={styles.loginButton}>
        <AppleLoginButton onPress={loginApple} />
      </View>
    )}
  </View>
)

const styles = StyleSheet.create({
  loginButton: {
    margin: 10,
  },
  loginButtonsContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
  },
})
