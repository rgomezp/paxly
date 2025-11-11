import { useEffect, useState, useCallback } from "react"
import Purchases, { PurchasesEntitlementInfo, CustomerInfo } from "react-native-purchases"
import Log from "../utils/Log"
import { ganon } from "@/services/ganon/ganon"
import { OneSignal } from "react-native-onesignal"
import { FEATURES } from "./constants/features"
import { ensureRevenueCatConfigured } from "@/thirdParty/revenueCatUtils"
import { getFeatureEntitlements } from "./constants/featureDefinitions"
import { useReferralUnlocks } from "./useReferralUnlocks"

type Entitlements = Record<string, PurchasesEntitlementInfo>

type EntitlementsHook = {
  entitlements: Entitlements | null
  activeEntitlements: Entitlements
  isLoading: boolean
  error: Error | null
  refresh: () => Promise<void>
  hasActiveEntitlement: (identifier: "pro" | "elite") => boolean
  hasFeatureAccess: (feature: keyof typeof FEATURES) => boolean
}

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second
const ERROR_LOG_INTERVAL_MS = 30000 // Only log errors every 30 seconds

// Memory cache for error logging
let lastErrorLogTime = 0
let lastErrorMessage = ""

export function useEntitlements(): EntitlementsHook {
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null)
  const [activeEntitlements, setActiveEntitlements] = useState<Entitlements>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const { referralUnlockedFeatures, checkReferralUnlocks } = useReferralUnlocks()

  const fetchData = useCallback(
    async (retryCount = 0): Promise<void> => {
      try {
        setIsLoading(true)

        // Check referral unlocks in parallel with RevenueCat data
        const referralPromise = checkReferralUnlocks()

        // Ensure RevenueCat is configured before making API calls
        await ensureRevenueCatConfigured()

        const purchaserInfo = await Purchases.getCustomerInfo()

        const allEntitlements = purchaserInfo.entitlements.all
        const active = Object.fromEntries(
          Object.entries(purchaserInfo.entitlements.active).filter(([_, value]) => value.isActive),
        )

        // Set entitlement ID in ganon and OneSignal
        if (active["elite"]?.isActive) {
          ganon.set("entitlementId", "elite")
          OneSignal.User.addTag("entitlementId", "elite")
        } else if (active["pro"]?.isActive) {
          ganon.set("entitlementId", "pro")
          OneSignal.User.addTag("entitlementId", "pro")
        } else if (ganon.contains("entitlementId")) {
          ganon.remove("entitlementId")
          OneSignal.User.removeTag("entitlementId")
        }

        // Wait for referral check to complete
        await referralPromise

        setEntitlements(allEntitlements)
        setActiveEntitlements(active)
        setError(null)
        // Reset error logging on success
        lastErrorLogTime = 0
        lastErrorMessage = ""
      } catch (err) {
        const errorMessage = String(err)
        const now = Date.now()

        // Only log if it's a different error or enough time has passed
        const shouldLog =
          errorMessage !== lastErrorMessage || now - lastErrorLogTime >= ERROR_LOG_INTERVAL_MS

        if (shouldLog) {
          Log.error(`Error fetching entitlements: ${err}`)
          lastErrorLogTime = now
          lastErrorMessage = errorMessage
        }

        // Retry logic for network-related errors
        if (retryCount < MAX_RETRIES) {
          setTimeout(
            () => {
              fetchData(retryCount + 1)
            },
            RETRY_DELAY * Math.pow(2, retryCount),
          ) // Exponential backoff
          return
        }

        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    },
    [checkReferralUnlocks],
  )

  const hasActiveEntitlement = (identifier: "pro" | "elite"): boolean => {
    // Enable all features in development environment
    if (process.env.NODE_ENV === "test") {
      return true
    }

    // Check for premium override
    if (ganon.get("premiumOverride") && (identifier === "pro" || identifier === "elite")) {
      return true
    }

    // Defensive check in case of errors or loading state
    if (error || isLoading) return false
    return Boolean(activeEntitlements[identifier]?.isActive)
  }

  const hasFeatureAccess = (feature: keyof typeof FEATURES): boolean => {
    // if (process.env.NODE_ENV === "development") {
    //   return true
    // }

    // Check if feature is unlocked via referrals first
    if (referralUnlockedFeatures.has(feature)) {
      return true
    }

    // Get the list of entitlements that grant access to this feature
    const requiredEntitlements = getFeatureEntitlements(feature)
    if (!requiredEntitlements || requiredEntitlements.length === 0) return false

    // Check if user has any of the required entitlements
    return requiredEntitlements.some((entitlement) =>
      hasActiveEntitlement(entitlement as "pro" | "elite"),
    )
  }

  useEffect(() => {
    // Initial fetch
    fetchData()

    const customerInfoUpdateListener = (purchaserInfo: CustomerInfo) => {
      try {
        const active = Object.fromEntries(
          Object.entries(purchaserInfo.entitlements.active).filter(([_, value]) => value.isActive),
        )
        setActiveEntitlements(active)
        setEntitlements(purchaserInfo.entitlements.all)

        // Also refresh referral unlocks when entitlements update
        checkReferralUnlocks()
      } catch (err) {
        Log.error(`Error in customerInfoUpdateListener: ${err}`)
        // Don't update state on listener errors to prevent UI inconsistencies
      }
    }

    // Set up listener for changes
    Purchases.addCustomerInfoUpdateListener(customerInfoUpdateListener)

    return () => {
      Purchases.removeCustomerInfoUpdateListener(customerInfoUpdateListener)
    }
  }, [fetchData, checkReferralUnlocks])

  return {
    entitlements,
    activeEntitlements,
    isLoading,
    error,
    refresh: fetchData,
    hasActiveEntitlement,
    hasFeatureAccess,
  }
}
