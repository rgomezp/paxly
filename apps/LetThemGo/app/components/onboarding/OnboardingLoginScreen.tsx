import { StyleSheet, View, Linking, Text, TouchableOpacity } from "react-native"
import { Image } from "expo-image"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useRef, useState } from "react"
import LoginComponent from "../login/LoginComponent"
import { useAppTheme } from "@/utils/useAppTheme"
import customConfig from "../../../customConfig"
import { useOnboardingState } from "@/onboarding/state/useOnboardingState"
import Log from "@/utils/Log"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"

const OnboardingLoginScreen: React.FC = () => {
  const config = customConfig()
  const { theme } = useAppTheme()
  const { completeOnboarding, step, isLoggedIn } = useOnboardingState()
  const hasCompletedOnboardingRef = useRef(false)
  const [restoreFinished, setRestoreFinished] = useState(false)

  console.log("OnboardingLoginScreen: isLoggedIn", isLoggedIn)
  console.log("OnboardingLoginScreen: step", step)

  // Listen for restore completion
  useEffect(() => {
    const handleAuthStateChangedFinished = () => {
      Log.info("OnboardingLoginScreen: Auth state changed finished (restore completed)")
      setRestoreFinished(true)
    }

    EventRegister.on(GLOBAL_EVENTS.AUTH_STATE_CHANGED_FINISHED, handleAuthStateChangedFinished)

    // If user is already logged in when component mounts, restore should have already finished
    // during app initialization, so we can mark it as finished
    if (isLoggedIn && step === "login") {
      Log.info("OnboardingLoginScreen: User already logged in on mount, assuming restore completed")
      setRestoreFinished(true)
    }

    return () => {
      EventRegister.off(GLOBAL_EVENTS.AUTH_STATE_CHANGED_FINISHED, handleAuthStateChangedFinished)
    }
  }, [isLoggedIn, step])

  // Automatically complete onboarding when user logs in AND restore is complete
  useEffect(() => {
    // Only listen to auth changes if we're on the login step
    if (step !== "login") {
      hasCompletedOnboardingRef.current = false
      setRestoreFinished(false)
      return
    }

    // Only proceed if user is logged in AND restore has finished
    if (isLoggedIn && restoreFinished) {
      if (hasCompletedOnboardingRef.current) {
        return // Already completed, don't run again
      }

      Log.info("OnboardingLoginScreen: User logged in and restore completed, completing onboarding")
      hasCompletedOnboardingRef.current = true
      ;(async () => {
        await completeOnboarding(true)
      })()
    }
  }, [step, completeOnboarding, isLoggedIn, restoreFinished])

  const openTerms = () => {
    Linking.openURL(config.termsOfServiceUrl)
  }

  const openPrivacy = () => {
    Linking.openURL(config.privacyPolicyUrl)
  }

  const handleContinueAsGuest = async () => {
    await completeOnboarding(false)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {/* Image container - takes up 1/2 of the screen */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/planty/6m/planty.webp")}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          {/* Login component */}
          <View style={styles.loginContainer}>
            <LoginComponent />
          </View>

          {/* Terms and privacy text with links */}
          <View style={styles.legalContainer}>
            <Text style={[styles.legalText, { color: theme.colors.textDim }]}>
              By continuing you accept the{" "}
              <Text style={[styles.linkText, { color: theme.colors.tint }]} onPress={openTerms}>
                terms and conditions
              </Text>{" "}
              and have reviewed the{" "}
              <Text style={[styles.linkText, { color: theme.colors.tint }]} onPress={openPrivacy}>
                privacy policy
              </Text>
            </Text>
          </View>

          {/* Continue as Guest button */}
          <View style={styles.guestContainer}>
            <TouchableOpacity onPress={handleContinueAsGuest}>
              <Text style={[styles.guestText, { color: theme.colors.textDim }]}>
                Continue as Guest
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  guestContainer: {
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 16,
  },
  guestText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  imageContainer: {
    alignItems: "center",
    flex: 0.5, // Takes up 1/2 of the screen
    justifyContent: "center",
    paddingTop: 40,
  },
  legalContainer: {
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  legalText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  loginContainer: {
    flex: 0.25,
    justifyContent: "center",
  },
  logo: {
    height: 250,
    width: 250,
  },
  safeArea: {
    flex: 1,
  },
})

export default OnboardingLoginScreen
