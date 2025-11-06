import { Platform } from "react-native"
import Purchases from "react-native-purchases"
import Log from "../utils/Log"
import { useEffect, useState } from "react"

const useRevenueCat = (): boolean => {
  const [isRevenueCatSetup, setIsRevenueCatSetup] = useState(false)

  useEffect(() => {
    Log.info("Setting up RevenueCat")

    const configureRevenueCat = async () => {
      try {
        // Check if RevenueCat is already configured
        if (await Purchases.isConfigured()) {
          Log.info("RevenueCat is already configured")
          setIsRevenueCatSetup(true)
          return
        }

        const testKey = process.env.EXPO_PUBLIC_REVENUE_CAT_TEST_STORE
        let apiKey: string | undefined

        if (Platform.OS === "ios") {
          apiKey = process.env.EXPO_PUBLIC_REVENUE_CAT_IOS || testKey
        } else if (Platform.OS === "android") {
          apiKey = process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID || testKey
        }

        if (!apiKey) {
          Log.error(
            "RevenueCat API key is not set. Expected EXPO_PUBLIC_REVENUE_CAT_IOS/ANDROID or EXPO_PUBLIC_REVENUE_CAT_TEST_STORE",
          )
          setIsRevenueCatSetup(false)
          return
        }

        Purchases.configure({ apiKey })

        // Verify that RevenueCat is configured
        if (!(await Purchases.isConfigured())) {
          throw new Error("RevenueCat configuration failed")
        }

        Log.info("RevenueCat setup completed successfully")
        setIsRevenueCatSetup(true)
      } catch (error) {
        Log.error(`Error setting up RevenueCat: ${error}`)
        setIsRevenueCatSetup(false)
      }
    }

    configureRevenueCat()
  }, [])

  return isRevenueCatSetup
}

export default useRevenueCat
