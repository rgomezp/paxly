import { AgeRanges } from "@/types/AgeRange"
import { ganon } from "@/services/ganon/ganon"
import Log from "./Log"
import { PurchasesOffering, PurchasesOfferings } from "react-native-purchases"
import { paywallAnalytics } from "./paywallAnalytics"
import { OneSignal } from "react-native-onesignal"

export const AGE_TO_PLACEMENT_ID: Record<AgeRanges, string> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "onboarding_placement_young",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: "onboarding_placement",
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: "onboarding_placement",
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "onboarding_placement_old",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "onboarding_placement_old",
  [AgeRanges.FIFTY_SIX_PLUS]: "onboarding_placement_old",
}

// Manual mapping of placement IDs to expected offering identifiers
// This is a fallback when getCurrentOfferingForPlacement doesn't work
export const PLACEMENT_TO_OFFERING_MAP: Record<string, string[]> = {
  onboarding_placement_young: ["trial_offering_young", "trial_offering_young_fallback"],
  onboarding_placement: ["default_offering", "trial_offering", "trial_offering_b"],
  onboarding_placement_old: [
    "trial_offering_old",
    "trial_offering_old_fallback",
    "trial_offering_b",
  ],
}

// Mapping of age ranges to fallback offering identifiers
// Used when placement offerings are not available
export const AGE_TO_FALLBACK_OFFERING: Record<AgeRanges, string> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "trial_offering_young_fallback",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: "trial_offering_fallback",
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: "trial_offering_fallback",
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "trial_offering_old_fallback",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "trial_offering_old_fallback",
  [AgeRanges.FIFTY_SIX_PLUS]: "trial_offering_old_fallback",
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
 * Gets an age-based fallback offering from the offerings object
 */
export const getAgeBasedFallbackOffering = (
  offerings: PurchasesOfferings,
  ageRange: AgeRanges | null,
): PurchasesOffering | null => {
  if (!offerings || typeof offerings !== "object") {
    return null
  }

  // If we have an age range, try to get the specific fallback offering
  if (ageRange && AGE_TO_FALLBACK_OFFERING[ageRange]) {
    const fallbackOfferingId = AGE_TO_FALLBACK_OFFERING[ageRange]
    if (offerings.all && typeof offerings.all === "object") {
      const fallbackOffering = offerings.all[fallbackOfferingId]
      if (isValidOffering(fallbackOffering)) {
        Log.info(`Found age-based fallback offering: ${fallbackOfferingId}`)
        return fallbackOffering
      }
    }
  }

  // Fallback to generic getValidOffering if age-based fallback not found
  return getValidOffering(offerings)
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
