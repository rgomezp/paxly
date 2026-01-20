import { StyleSheet, View, Linking, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useRef, useState } from "react"
import { Mascot } from "../Mascot"
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

  // Listen for restore completion
  useEffect(() => {
    const handleRestoreCompleted = () => {
      Log.info("OnboardingLoginScreen: Restore completed")
      setRestoreFinished(true)
    }

    EventRegister.on(GLOBAL_EVENTS.RESTORE_COMPLETED, handleRestoreCompleted)

    // If user is already logged in when component mounts, we need to wait for restore
    // to complete. The restore will happen during onAuthStateChanged, and RESTORE_COMPLETED will be emitted.
    // Note: If the user just logged in, onAuthStateChanged will be called and ganon.login() will
    // handle restore. We must wait for RESTORE_COMPLETED before completing onboarding.

    return () => {
      EventRegister.off(GLOBAL_EVENTS.RESTORE_COMPLETED, handleRestoreCompleted)
    }
  }, [step])

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
          {/* Animation container - takes up 1/2 of the screen */}
          <View style={styles.imageContainer}>
            <Mascot width={250} height={250} />
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
  safeArea: {
    flex: 1,
  },
})

export default OnboardingLoginScreen
