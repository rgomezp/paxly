import { Platform } from "react-native"
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui"
import Log from "@/utils/Log"
import AnalyticsManager from "@/managers/AnalyticsManager"
import Purchases from "react-native-purchases"

// Memory cache for configuration state
type ConfigState = {
  isConfigured: boolean | null // null = unknown, true = configured, false = failed
  lastAttempt: number
  lastError: Error | null
  pendingPromise: Promise<void> | null
}

let configState: ConfigState = {
  isConfigured: null,
  lastAttempt: 0,
  lastError: null,
  pendingPromise: null,
}

const DEBOUNCE_MS = 5000 // 5 seconds debounce
const ERROR_LOG_INTERVAL_MS = 30000 // Only log errors every 30 seconds

/**
 * Ensures RevenueCat is properly configured before proceeding
 * Uses memory caching and debouncing to prevent repeated attempts
 */
export const ensureRevenueCatConfigured = async (): Promise<void> => {
  const now = Date.now()

  // If we have a pending promise, return it to avoid duplicate attempts
  if (configState.pendingPromise) {
    return configState.pendingPromise
  }

  // Check if RevenueCat is already configured (cached check)
  if (configState.isConfigured === true) {
    // Double-check with actual API call (but don't cache failure if it changed)
    const isActuallyConfigured = await Purchases.isConfigured()
    if (isActuallyConfigured) {
      return
    }
    // If it's no longer configured, reset state and continue
    configState.isConfigured = null
  }

  // Debounce: if we recently attempted and failed, don't try again immediately
  if (
    configState.isConfigured === false &&
    configState.lastError &&
    now - configState.lastAttempt < DEBOUNCE_MS
  ) {
    // Only log error if enough time has passed since last log
    const timeSinceLastAttempt = now - configState.lastAttempt
    if (timeSinceLastAttempt >= ERROR_LOG_INTERVAL_MS) {
      Log.error(
        `RevenueCat configuration failed (cached). Last error: ${configState.lastError.message}`,
      )
      configState.lastAttempt = now // Update to prevent repeated logging
    }
    throw configState.lastError
  }

  // Create a promise for this attempt
  const attemptPromise = (async (): Promise<void> => {
    try {
      // Check if RevenueCat is already configured
      if (await Purchases.isConfigured()) {
        configState.isConfigured = true
        configState.lastError = null
        configState.pendingPromise = null
        return
      }

      // Only log if we haven't logged recently
      const shouldLog = now - configState.lastAttempt >= ERROR_LOG_INTERVAL_MS
      if (shouldLog) {
        Log.error("RevenueCat is not configured. Attempting to configure...")
      }

      configState.lastAttempt = now

      // Try to configure RevenueCat if it's not configured
      if (Platform.OS === "ios") {
        if (process.env.EXPO_PUBLIC_REVENUE_CAT_IOS) {
          Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_IOS })
        } else {
          const error = new Error("EXPO_PUBLIC_REVENUE_CAT_IOS is not set")
          configState.isConfigured = false
          configState.lastError = error
          configState.pendingPromise = null
          throw error
        }
      } else if (Platform.OS === "android") {
        if (process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID) {
          Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID })
        } else {
          const error = new Error("EXPO_PUBLIC_REVENUE_CAT_ANDROID is not set")
          configState.isConfigured = false
          configState.lastError = error
          configState.pendingPromise = null
          throw error
        }
      }

      // Verify configuration was successful
      if (!(await Purchases.isConfigured())) {
        const error = new Error("RevenueCat configuration failed")
        configState.isConfigured = false
        configState.lastError = error
        configState.pendingPromise = null
        throw error
      }

      // Success!
      configState.isConfigured = true
      configState.lastError = null
      configState.pendingPromise = null
    } catch (error) {
      configState.isConfigured = false
      configState.lastError = error as Error
      configState.pendingPromise = null
      throw error
    }
  })()

  configState.pendingPromise = attemptPromise
  return attemptPromise
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
