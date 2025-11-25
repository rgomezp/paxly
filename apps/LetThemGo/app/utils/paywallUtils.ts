import { AgeRanges } from "@/types/AgeRange"
import { ganon } from "@/services/ganon/ganon"
import Log from "./Log"
import { PurchasesOffering, PurchasesOfferings } from "react-native-purchases"
import { paywallAnalytics } from "./paywallAnalytics"
import { OneSignal } from "react-native-onesignal"
import Purchases from "react-native-purchases"

export const AGE_TO_PLACEMENT_ID: Record<AgeRanges, string> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "onboarding_placement_young",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: "onboarding_placement",
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: "onboarding_placement",
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "onboarding_placement_old",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "onboarding_placement_old",
  [AgeRanges.FIFTY_SIX_PLUS]: "onboarding_placement_old",
}

// Mapping of age ranges to abandonment paywall offering identifiers
// Used for the abandonment paywall shown after user dismisses the main paywall
export const AGE_TO_ABANDONMENT_OFFERING: Record<AgeRanges, string> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "fallback_offering_young",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: "fallback_offering",
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: "fallback_offering",
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "fallback_offering_old",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "fallback_offering_old",
  [AgeRanges.FIFTY_SIX_PLUS]: "fallback_offering_old",
}

/**
 * Safely retrieves the age range from storage
 */
export const getAgeRange = (): AgeRanges | null => {
  try {
    const storedAgeRange = ganon.get("ageRange")
    if (storedAgeRange && Object.values(AgeRanges).includes(storedAgeRange as AgeRanges)) {
      return storedAgeRange as AgeRanges
    }
  } catch (error) {
    Log.warn(`Error reading ageRange from storage: ${error}`)
  }
  return null
}

/**
 * Gets the placement ID based on age range, with fallback
 */
export const getPlacementId = (ageRange: AgeRanges | null): string => {
  return (ageRange && AGE_TO_PLACEMENT_ID[ageRange]) || "onboarding_placement"
}

/**
 * Validates if an offering object is valid
 * Based on PurchasesOffering interface from react-native-purchases
 */
export const isValidOffering = (offering: PurchasesOffering | null | undefined): boolean => {
  return (
    offering != null &&
    typeof offering === "object" &&
    typeof offering.identifier === "string" &&
    offering.identifier.length > 0 &&
    Array.isArray(offering.availablePackages)
  )
}

/**
 * Safely gets a valid offering from the offerings object
 */
export const getValidOffering = (
  offerings: PurchasesOfferings | null | undefined,
): PurchasesOffering | null => {
  if (!offerings || typeof offerings !== "object") {
    return null
  }

  // Try current offering first
  if (isValidOffering(offerings.current)) {
    return offerings.current
  }

  // Try all offerings
  if (offerings.all && typeof offerings.all === "object") {
    const allOfferings = Object.values(offerings.all)
    for (const offering of allOfferings) {
      if (isValidOffering(offering)) {
        return offering
      }
    }
  }

  return null
}

/**
 * Gets the abandonment paywall offering based on age range
 * Used specifically for the abandonment paywall shown after user dismisses the main paywall
 * young: fallback_offering_young
 * old: fallback_offering_old
 * other: fallback_offering
 */
export const getAgeBasedAbandonmentOffering = (
  offerings: PurchasesOfferings,
  ageRange: AgeRanges | null,
): PurchasesOffering | null => {
  if (!offerings || typeof offerings !== "object") {
    return null
  }

  if (ageRange && AGE_TO_ABANDONMENT_OFFERING[ageRange]) {
    const abandonmentOfferingId = AGE_TO_ABANDONMENT_OFFERING[ageRange]
    if (offerings.all && typeof offerings.all === "object") {
      const abandonmentOffering = offerings.all[abandonmentOfferingId]
      if (isValidOffering(abandonmentOffering)) {
        Log.info(`Found abandonment paywall offering: ${abandonmentOfferingId}`)
        return abandonmentOffering
      }
    }
  }

  // Fallback to generic getValidOffering if age-based abandonment offering not found
  return getValidOffering(offerings)
}

/**
 * Logs available offerings for debugging purposes
 */
export const logAvailableOfferings = (offerings: PurchasesOfferings): void => {
  if (offerings.all && typeof offerings.all === "object") {
    const offeringIds = Object.keys(offerings.all)
    if (offeringIds.length > 0) {
      Log.info(`Available offerings: ${offeringIds.join(", ")}`)
    }
  }
}

/**
 * Fetches offering with placement logic
 * Tries placement offering first, then falls back to current offering
 */
export const fetchPlacementOffering = async (): Promise<PurchasesOffering | null> => {
  const ageRange = getAgeRange()
  const placementId = getPlacementId(ageRange)

  Log.info(`Syncing offerings before fetching placement ${placementId}`)
  const offerings = await Purchases.getOfferings()
  logAvailableOfferings(offerings)

  // Try to get placement offering
  const placementOffering = await Purchases.getCurrentOfferingForPlacement(placementId)
  if (placementOffering) {
    Log.info(`Using ${placementId} offering for A/B testing: ${placementOffering.identifier}`)
    paywallAnalytics.placementLoaded(placementOffering.identifier, placementId, ageRange)
    return placementOffering
  }

  // Use current offering as default
  if (offerings.current) {
    Log.warn(`No placement offering for ${placementId} found, using current offering`)
    return offerings.current
  }

  return null
}

/**
 * Handles purchase completion logic shared between paywall components
 * - Logs purchase completion
 * - Tags user if trial offering
 * - Calls analytics
 * - Calls completion callback with error handling (if provided)
 */
export const handlePurchaseCompletion = (
  offering: PurchasesOffering | null | undefined,
  componentName: string,
  onComplete?: () => void,
): void => {
  Log.info(`${componentName}: Purchase completed`)

  // Check if this is a trial offering and tag the user
  const offeringId = offering?.identifier
  if (offeringId?.includes("trial")) {
    try {
      OneSignal.User.addTag("trial_status", "started")
      ganon.set("trialStatus", "started")
      Log.info(`${componentName}: Tagged user with trial_status: started`)
    } catch (tagError) {
      Log.error(`${componentName}: Error adding trial_status tag: ${tagError}`)
    }

    paywallAnalytics.trialStarted(offeringId)
  }

  if (onComplete) {
    try {
      onComplete()
    } catch (error) {
      Log.error(`${componentName}: Error in completion callback: ${error}`)
    }
  }
}
