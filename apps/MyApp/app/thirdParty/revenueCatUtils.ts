import { Platform } from "react-native"
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui"
import Log from "@/utils/Log"
import AnalyticsManager from "@/managers/AnalyticsManager"
import Purchases from "react-native-purchases"

/**
 * Ensures RevenueCat is properly configured before proceeding
 */
export const ensureRevenueCatConfigured = async (): Promise<void> => {
  if (Purchases.isConfigured && !Purchases.isConfigured()) {
    Log.error("RevenueCat is not configured. Attempting to configure...")
    // Try to configure RevenueCat if it's not configured
    if (Platform.OS === "ios") {
      if (process.env.EXPO_PUBLIC_REVENUE_CAT_IOS) {
        Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_IOS })
      } else {
        throw new Error("EXPO_PUBLIC_REVENUE_CAT_IOS is not set")
      }
    } else if (Platform.OS === "android") {
      if (process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID) {
        Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID })
      } else {
        throw new Error("EXPO_PUBLIC_REVENUE_CAT_ANDROID is not set")
      }
    }

    // Verify configuration was successful
    if (Purchases.isConfigured && !Purchases.isConfigured()) {
      throw new Error("RevenueCat configuration failed")
    }
  }
}

/**
 * Executes a paywall function safely on the main thread for Android
 */
const executePaywallSafely = async <T>(
  paywallFunction: () => Promise<T>,
  errorMessage: string,
): Promise<T> => {
  Log.info("Executing paywall function safely")
  AnalyticsManager.getInstance().logEvent("present_paywall")
  if (Platform.OS === "android") {
    return new Promise<T>((resolve, reject) => {
      setImmediate(async () => {
        try {
          const result = await paywallFunction()
          resolve(result)
        } catch (error) {
          Log.error(`${errorMessage}: ${error}`)
          reject(error)
        }
      })
    })
  } else {
    return paywallFunction()
  }
}

/**
 * Safely presents the RevenueCat paywall on the main thread
 */
export const presentPaywallSafely = async (offeringId?: string): Promise<PAYWALL_RESULT> => {
  try {
    // Ensure RevenueCat is configured before proceeding
    await ensureRevenueCatConfigured()

    const offerings = await Purchases.getOfferings()
    const offering = offeringId ? offerings.all[offeringId] : offerings.current

    if (offering) {
      return await executePaywallSafely(
        () =>
          RevenueCatUI.presentPaywall({
            offering,
          }),
        "Error presenting paywall",
      )
    } else {
      return await executePaywallSafely(
        () => RevenueCatUI.presentPaywall(),
        "Error presenting paywall",
      )
    }
  } catch (error) {
    Log.error(`Error in presentPaywallSafely: ${error}`)
    throw error
  }
}

/**
 * Safely presents the RevenueCat paywall with options on the main thread
 */
export const presentPaywallIfNeededSafely = async (options: {
  requiredEntitlementIdentifier: string
}): Promise<PAYWALL_RESULT> => {
  try {
    // Ensure RevenueCat is configured before proceeding
    await ensureRevenueCatConfigured()

    return await executePaywallSafely(
      () => RevenueCatUI.presentPaywallIfNeeded(options),
      "Error presenting paywall if needed",
    )
  } catch (error) {
    Log.error(`Error in presentPaywallIfNeededSafely: ${error}`)
    throw error
  }
}
