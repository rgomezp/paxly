import { Platform } from "react-native"
import Purchases from "react-native-purchases"
import Log from "../utils/Log"

const setupRevenueCat = async (): Promise<void> => {
  Log.info("Setting up RevenueCat")

  try {
    if (Platform.OS === "ios") {
      if (!process.env.EXPO_PUBLIC_REVENUE_CAT_IOS) {
        Log.error("EXPO_PUBLIC_REVENUE_CAT_IOS is not set")
        return
      }
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_IOS })
    } else if (Platform.OS === "android") {
      if (!process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID) {
        Log.error("EXPO_PUBLIC_REVENUE_CAT_ANDROID is not set")
        return
      }
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID })
    }

    // Verify that RevenueCat is configured
    if (Purchases.isConfigured && !Purchases.isConfigured()) {
      throw new Error("RevenueCat configuration failed")
    }

    Log.info("RevenueCat setup completed successfully")
  } catch (error) {
    Log.error(`Error setting up RevenueCat: ${error}`)
    throw error
  }
}

export default setupRevenueCat
