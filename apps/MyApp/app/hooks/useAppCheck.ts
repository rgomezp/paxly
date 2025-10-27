import { useEffect, useState, useRef } from "react"
import { getApp } from "@react-native-firebase/app"
import appCheck, { getToken, initializeAppCheck } from "@react-native-firebase/app-check"
import Log from "../utils/Log"
import { ganon } from "@/services/ganon/ganon"
import { Platform } from "react-native"

export default function useAppCheck() {
  Log.info("useAppCheck")
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  // Correctly typing timeoutRef to be either 'null' or 'ReturnType<typeof setTimeout>'
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // check debug tokens are available
  if (
    process.env.NODE_ENV === "development" &&
    !process.env.EXPO_PUBLIC_APP_CHECK_PLAY_INTEGRITY_DEBUG_TOKEN
  ) {
    Log.error("process.env.EXPO_PUBLIC_APP_CHECK_PLAY_INTEGRITY_DEBUG_TOKEN is not set")
  }

  if (
    process.env.NODE_ENV === "development" &&
    !process.env.EXPO_PUBLIC_APP_CHECK_APP_ATTEST_DEBUG_TOKEN
  ) {
    Log.error("process.env.EXPO_PUBLIC_APP_CHECK_APP_ATTEST_DEBUG_TOKEN is not set")
  }

  useEffect(() => {
    // Increase timeout for iOS App Attest which can take longer
    const TIMEOUT_DURATION = Platform.OS === "ios" ? 10000 : 5000 // 10s for iOS, 5s for Android

    // Set the timeout and store the ID in timeoutRef
    timeoutRef.current = setTimeout(() => {
      Log.error("AppCheck timeout, resolving hook")
      Log.info("AppCheck: Timeout reached, App Check failed")
      setIsLoadingComplete(true)
    }, TIMEOUT_DURATION)

    const configureAppCheck = async () => {
      try {
        Log.info("Configuring AppCheck")

        // Get the app instance
        const app = getApp()

        // Get AppCheck instance
        const appCheckInstance = appCheck(app)

        // Create and configure the provider
        const provider = appCheckInstance.newReactNativeFirebaseAppCheckProvider()
        provider.configure({
          android: {
            provider: __DEV__ ? "debug" : "playIntegrity",
            debugToken: process.env.EXPO_PUBLIC_APP_CHECK_PLAY_INTEGRITY_DEBUG_TOKEN,
          },
          apple: {
            provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
            debugToken: process.env.EXPO_PUBLIC_APP_CHECK_APP_ATTEST_DEBUG_TOKEN,
          },
          web: {
            provider: "reCaptchaV3",
            siteKey: "unknown",
          },
        })

        // Initialize AppCheck
        await initializeAppCheck(app, {
          provider: provider,
          isTokenAutoRefreshEnabled: true,
        })

        // Get token to verify setup
        const tokenResult = await getToken(appCheckInstance, true)

        if (!tokenResult || !tokenResult.token) {
          throw new Error("AppCheck token is null")
        } else {
          Log.info("AppCheck token is not null")
          ganon.set("passedAppCheck", true)
          Log.info("AppCheck: Successfully set passedAppCheck to true")
        }

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        setIsLoadingComplete(true)
      } catch (error) {
        if (error instanceof Error) {
          Log.error("AppCheck verification failed: " + JSON.stringify(error.message))
        } else {
          // Fallback for unknown error structure
          Log.error("AppCheck verification failed (unknown error): " + JSON.stringify(error))
        }

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        setIsLoadingComplete(true)
      }
    }

    configureAppCheck()

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return isLoadingComplete
}
