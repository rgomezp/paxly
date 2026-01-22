import { useEffect, useState } from "react"
import Constants from "expo-constants"
import { OneSignal, LogLevel as OneSignalLogLevel } from "react-native-onesignal"
import Log from "../utils/Log"
import { ganon } from "@/services/ganon/ganon"

const useOneSignal = (): boolean => {
  const [isOneSignalSetup, setIsOneSignalSetup] = useState(false)

  useEffect(() => {
    Log.info("Setting up OneSignal")

    const configureOneSignal = async () => {
      try {
        // Ensure verbose logging in development for easier debugging
        if (process.env.NODE_ENV === "development") {
          try {
            OneSignal.Debug.setLogLevel(OneSignalLogLevel.Verbose)
          } catch {
            // Ignore if setLogLevel fails
          }
        }

        // Get app ID from expo config
        const appId = Constants?.expoConfig?.extra?.oneSignalAppId
        if (!appId) {
          Log.error("OneSignal App ID is not set in config")
          setIsOneSignalSetup(false)
          return
        }

        OneSignal.initialize(appId)
        OneSignal.Notifications.requestPermission(true)

        try {
          const email = ganon.get("email")
          if (email) {
            OneSignal.login(email)
            OneSignal.User.addEmail(email)
          } else {
            OneSignal.logout()
          }

          if (ganon.get("finishedOnboarding") === true) {
            OneSignal.User.addTag("onboarding_status", "completed")
          }
        } catch (error) {
          Log.error(JSON.stringify(error))
        }

        Log.info("OneSignal setup completed successfully")
        setIsOneSignalSetup(true)
      } catch (error) {
        Log.error(`Error setting up OneSignal: ${error}`)
        setIsOneSignalSetup(false)
      }
    }

    configureOneSignal()
  }, [])

  return isOneSignalSetup
}

export default useOneSignal
