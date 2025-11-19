import { useEffect } from "react"
import Purchases from "react-native-purchases"
import Log from "@/utils/Log"
import { paywallAnalytics } from "@/utils/paywallAnalytics"

/**
 * Custom hook to monitor purchase status and call onComplete when user has active subscription
 */
export const usePurchaseStatus = (onComplete: () => void) => {
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo()

        // Safely validate customerInfo structure
        if (
          !customerInfo ||
          typeof customerInfo !== "object" ||
          !customerInfo.entitlements ||
          typeof customerInfo.entitlements !== "object"
        ) {
          Log.warn("Invalid customerInfo structure received")
          return
        }

        // Check for active entitlements
        const activeEntitlements = customerInfo.entitlements.active
        if (!activeEntitlements || typeof activeEntitlements !== "object") {
          return
        }

        const entitlementValues = Object.values(activeEntitlements)
        const hasActiveEntitlement = entitlementValues.some(
          (entitlement: any) =>
            entitlement && typeof entitlement === "object" && entitlement.isActive === true,
        )

        if (hasActiveEntitlement) {
          Log.info("User already has active entitlement, proceeding")
          paywallAnalytics.alreadySubscribed()

          try {
            onComplete()
          } catch (error) {
            Log.error(`Error in onComplete callback: ${error}`)
          }
        }
      } catch (error) {
        Log.error(`Error checking purchase status: ${error}`)
        // Don't throw - allow the interval to continue
      }
    }

    // Check purchase status when component mounts
    checkPurchaseStatus()

    // Set up periodic check for purchase status (every 5 seconds)
    const interval = setInterval(checkPurchaseStatus, 5000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [onComplete])
}

