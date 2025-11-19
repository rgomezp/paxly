import { useEffect, useState } from "react"
import Purchases, { PurchasesOffering } from "react-native-purchases"
import Log from "@/utils/Log"
import { ensureRevenueCatConfigured } from "@/thirdParty/revenueCatUtils"
import {
  getAgeRange,
  getPlacementId,
  isValidOffering,
  getAgeBasedFallbackOffering,
  PLACEMENT_TO_OFFERING_MAP,
} from "@/utils/paywallUtils"
import { paywallAnalytics } from "@/utils/paywallAnalytics"

interface UseOfferingResult {
  offering: PurchasesOffering | null
  isLoading: boolean
}

/**
 * Custom hook to fetch and manage RevenueCat offering based on age range placement
 */
export const useOffering = (): UseOfferingResult => {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlacementOffering = async () => {
      let finalOffering: any = null

      try {
        const ageRange = getAgeRange()
        const placementId = getPlacementId(ageRange)

        // Validate placement ID
        if (typeof placementId !== "string" || placementId.length === 0) {
          Log.error(`Invalid placement ID: ${placementId}`)
          throw new Error("Invalid placement ID")
        }

        // Ensure RevenueCat is configured
        await ensureRevenueCatConfigured()

        // Sync offerings to get latest data including placements
        Log.info(`Syncing offerings before fetching placement ${placementId}`)
        const offerings = await Purchases.getOfferings()

        // Validate offerings structure
        if (!offerings || typeof offerings !== "object") {
          Log.error("Invalid offerings structure received")
          throw new Error("Invalid offerings structure")
        }

        // Log available offerings for debugging
        try {
          if (offerings.all && typeof offerings.all === "object") {
            const placementKeys = Object.keys(offerings.all)
            if (placementKeys.length > 0) {
              Log.info(`Available offerings: ${placementKeys.join(", ")}`)
            }
          }
          if (isValidOffering(offerings.current)) {
            Log.info(`Current offering: ${offerings.current?.identifier}`)
          }
        } catch (logError) {
          Log.warn(`Error logging offerings info: ${logError}`)
        }

        // Try to get placement offering via API
        let placementOffering: any = null
        try {
          placementOffering = await Purchases.getCurrentOfferingForPlacement(placementId)
          if (placementOffering && !isValidOffering(placementOffering)) {
            Log.warn("Placement API returned invalid offering, treating as null")
            placementOffering = null
          }
        } catch (placementError) {
          Log.warn(`Error calling getCurrentOfferingForPlacement: ${placementError}`)
          placementOffering = null
        }

        // Fallback: try manual mapping if API didn't return an offering
        if (!placementOffering && PLACEMENT_TO_OFFERING_MAP[placementId]) {
          const expectedOfferings = PLACEMENT_TO_OFFERING_MAP[placementId]
          if (Array.isArray(expectedOfferings) && expectedOfferings.length > 0) {
            Log.info(
              `Placement API returned null, trying manual mapping for ${placementId}. Expected offerings: ${expectedOfferings.join(", ")}`,
            )

            if (offerings.all && typeof offerings.all === "object") {
              for (const expectedOfferingId of expectedOfferings) {
                if (typeof expectedOfferingId !== "string") continue

                try {
                  const foundOffering = offerings.all[expectedOfferingId]
                  if (isValidOffering(foundOffering)) {
                    placementOffering = foundOffering
                    Log.info(
                      `Found offering ${expectedOfferingId} via manual mapping for placement ${placementId}`,
                    )
                    break
                  }
                } catch (accessError) {
                  Log.warn(`Error accessing offering ${expectedOfferingId}: ${accessError}`)
                  continue
                }
              }
            }
          }
        }

        // Use placement offering if found, otherwise fallback
        if (isValidOffering(placementOffering)) {
          Log.info(`Using ${placementId} offering for A/B testing`)
          paywallAnalytics.placementLoaded(placementOffering.identifier, placementId, ageRange)
          finalOffering = placementOffering
        } else {
          Log.warn(
            `No placement offering for ${placementId} found (tried API and manual mapping), using age-based fallback`,
          )

          const fallbackOffering = getAgeBasedFallbackOffering(offerings, ageRange)
          if (fallbackOffering) {
            paywallAnalytics.fallbackOffering(
              fallbackOffering.identifier,
              "no_placement_offering",
              placementId,
            )
            finalOffering = fallbackOffering
          } else {
            Log.error("No valid offering available as fallback after trying all methods")
          }
        }
      } catch (error) {
        Log.error(`Error fetching placement offering: ${error}`)
        paywallAnalytics.error(String(error), "fetch_placement_offering")

        // Try to get age-based fallback offering
        try {
          const fallbackOfferings = await Purchases.getOfferings()
          const ageRange = getAgeRange()
          const fallbackOffering = getAgeBasedFallbackOffering(fallbackOfferings, ageRange)
          if (fallbackOffering) {
            paywallAnalytics.fallbackOffering(fallbackOffering.identifier, "placement_error")
            finalOffering = fallbackOffering
          }
        } catch (fallbackError) {
          Log.error(`Error fetching fallback offering: ${fallbackError}`)
          paywallAnalytics.error(String(fallbackError), "fetch_fallback_offering")
        }
      } finally {
        setOffering(finalOffering)
        setIsLoading(false)
      }
    }

    fetchPlacementOffering()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { offering, isLoading }
}
