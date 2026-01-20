import { AgeRanges } from "@/types/AgeRange"
import { ganon } from "@/services/ganon/ganon"
import Log from "./Log"
import {
  PurchasesOffering,
  PurchasesOfferings,
  PurchasesEntitlementInfo,
  CustomerInfo,
} from "react-native-purchases"
import { paywallAnalytics } from "./paywallAnalytics"
import { OneSignal } from "react-native-onesignal"
import Purchases from "react-native-purchases"
import { ensureRevenueCatConfigured } from "@/thirdParty/revenueCatUtils"

/**
 * Mapping of age ranges to paywall placement identifiers
 *
 */
export const AGE_TO_PLACEMENT_ID: Record<AgeRanges, string> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "placement_young",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: "placement",
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: "placement",
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "placement_old",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "placement_old",
  [AgeRanges.FIFTY_SIX_PLUS]: "placement_old",
}

/**
 * Mapping of age ranges to abandonment paywall placement identifiers
 * Used for the abandonment paywall shown after user dismisses the main paywall
 *
 * Placements allow RevenueCat to manage A/B testing and offering selection server-side.
 * The abandonment paywall uses fetchAbandonmentPlacementOffering() which calls
 * Purchases.getCurrentOfferingForPlacement() to get the offering for the placement.
 */
export const AGE_TO_ABANDONMENT_PLACEMENT_ID: Record<AgeRanges, string> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "abandonment_placement_young",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: "abandonment_placement",
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: "abandonment_placement",
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "abandonment_placement_old",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "abandonment_placement_old",
  [AgeRanges.FIFTY_SIX_PLUS]: "abandonment_placement_old",
}

/**
 * Checks if an offering contains packages with free trial periods by examining package product information
 * This is the most reliable method as it checks the actual product configuration
 * Works for both iOS and Android by checking:
 * - iOS/Android: introPrice with price === 0 (free trial)
 * - Android: subscriptionOptions/defaultOption with freePhase (free trial phase)
 *
 * Note: This specifically detects FREE trials. Intro pricing (discounted but not free) is not considered a trial.
 * Based on RevenueCat type definitions:
 * - PurchasesIntroPrice.price === 0 indicates a free trial
 * - SubscriptionOption.freePhase is the free trial phase (amountMicros === 0)
 * - SubscriptionOption.introPhase is intro pricing (amountMicros > 0, discounted but not free)
 */
const hasTrialPackages = (offering: PurchasesOffering | null | undefined): boolean => {
  if (!offering || !Array.isArray(offering.availablePackages)) {
    return false
  }

  try {
    // Check each package for free trial information
    for (const pkg of offering.availablePackages) {
      // Check if package has product
      if (!pkg || typeof pkg !== "object" || !pkg.product || typeof pkg.product !== "object") {
        continue
      }

      const product = pkg.product

      // Method 1: Check introPrice (works for both iOS and Android)
      // According to RevenueCat docs, a free trial is indicated by introPrice.price === 0
      // introPrice is null if there's no intro offer, or has price > 0 for intro pricing
      if (product.introPrice && product.introPrice.price === 0) {
        return true
      }

      // Method 2: Check Android subscription options for freePhase (Google Play only)
      // freePhase is specifically for free trials (amountMicros === 0)
      // introPhase is for intro pricing (amountMicros > 0, not a free trial)
      if (product.subscriptionOptions && Array.isArray(product.subscriptionOptions)) {
        for (const option of product.subscriptionOptions) {
          // Only check freePhase for free trials, not introPhase (which is paid intro pricing)
          if (option.freePhase) {
            return true
          }
        }
      }

      // Method 3: Check Android default option for freePhase (Google Play only)
      if (product.defaultOption?.freePhase) {
        return true
      }
    }
  } catch (error) {
    Log.warn(`Error checking package trial information: ${error}`)
  }

  return false
}

/**
 * Robustly determines if an offering is a trial offering
 * Uses multiple detection methods in order of reliability:
 * 1. Checks package product information for trial periods (most reliable, no code changes needed)
 * 2. Falls back to identifier substring check (for backward compatibility with existing offerings)
 */
export const isTrialOffering = (offering: PurchasesOffering | null | undefined): boolean => {
  if (!offering) {
    return false
  }

  // Method 1: Check package product information for trial periods
  // This is the most reliable method as it checks the actual product configuration
  // and doesn't require code updates when new offerings are added
  if (hasTrialPackages(offering)) {
    return true
  }

  const offeringId = offering.identifier

  if (!offeringId || typeof offeringId !== "string") {
    return false
  }

  // Method 2: Fallback to identifier substring check (for backward compatibility)
  // This is less reliable but maintained to catch offerings that may not have
  // package-level trial information available
  if (offeringId.toLowerCase().includes("trial")) {
    Log.warn(
      `Trial detected via identifier substring check for "${offeringId}". Package-level trial detection should be preferred.`,
    )
    return true
  }

  return false
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
 *
 * NOTE: Despite the name "placement", this placement is used throughout
 * the entire app to ensure consistent age-based pricing across all paywalls.
 */
export const getPlacementId = (ageRange: AgeRanges | null): string => {
  return (ageRange && AGE_TO_PLACEMENT_ID[ageRange]) || "placement"
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
 * Gets the abandonment placement ID based on age range, with fallback
 */
export const getAbandonmentPlacementId = (ageRange: AgeRanges | null): string => {
  return (ageRange && AGE_TO_ABANDONMENT_PLACEMENT_ID[ageRange]) || "abandonment_placement"
}

/**
 * Fetches abandonment paywall offering with placement logic
 * Used specifically for the abandonment paywall shown after user dismisses the main paywall
 *
 * Uses RevenueCat placements to get the offering:
 * - Uses Purchases.getCurrentOfferingForPlacement() to get the offering for the placement
 * - Placements allow RevenueCat to manage A/B testing and offering selection server-side
 */
export const fetchAbandonmentPlacementOffering = async (): Promise<PurchasesOffering | null> => {
  const ageRange = getAgeRange()
  const placementId = getAbandonmentPlacementId(ageRange)

  Log.info(`Syncing offerings before fetching abandonment placement ${placementId}`)
  const offerings = await Purchases.getOfferings()
  logAvailableOfferings(offerings)

  // Try to get placement offering
  const placementOffering = await Purchases.getCurrentOfferingForPlacement(placementId)

  // If placement exists and returns a valid offering
  if (placementOffering && isValidOffering(placementOffering)) {
    Log.info(
      `Using ${placementId} offering for abandonment paywall: ${placementOffering.identifier}`,
    )
    paywallAnalytics.placementLoaded(placementOffering.identifier, placementId, ageRange)
    return placementOffering
  }

  // Placement doesn't exist, is null, or returned invalid offering
  if (placementOffering && !isValidOffering(placementOffering)) {
    Log.warn(
      `Abandonment placement ${placementId} returned invalid offering (${placementOffering.identifier})`,
    )
  } else {
    Log.warn(`Abandonment placement ${placementId} not found or returned null`)
  }

  // Last resort: try to get any valid offering
  const validOffering = getValidOffering(offerings)
  if (validOffering) {
    Log.warn(
      `No suitable abandonment offering found for placement ${placementId}, using fallback offering: ${validOffering.identifier}`,
    )
    paywallAnalytics.placementLoaded(validOffering.identifier, placementId, ageRange)
    return validOffering
  }

  // Nothing available - this should be handled by the calling component
  Log.error(
    `No valid abandonment offering found for placement ${placementId}. Placement may be deleted or misconfigured in RevenueCat dashboard.`,
  )
  return null
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
 *
 * This function is used throughout the app (not just onboarding) to ensure consistent
 * age-based pricing. Despite placement names containing "onboarding", they are used
 * everywhere to maintain price consistency.
 *
 * Fallback chain to handle missing placements or offerings gracefully:
 * 1. Try placement offering (if valid)
 * 2. Fall back to current offering
 * 3. Try to get any valid offering
 * 4. Return null if nothing is available
 */
export const fetchPlacementOffering = async (): Promise<PurchasesOffering | null> => {
  const ageRange = getAgeRange()
  const placementId = getPlacementId(ageRange)

  Log.info(`Syncing offerings before fetching placement ${placementId}`)
  const offerings = await Purchases.getOfferings()
  logAvailableOfferings(offerings)

  // Log current offering for diagnostic purposes
  if (offerings.current) {
    Log.info(`Current offering: ${offerings.current.identifier}`)
  }

  // Try to get placement offering
  const placementOffering = await Purchases.getCurrentOfferingForPlacement(placementId)

  // Diagnostic logging
  if (placementOffering) {
    Log.info(
      `Placement ${placementId} returned offering: ${placementOffering.identifier} (valid: ${isValidOffering(placementOffering)})`,
    )
  } else {
    Log.warn(
      `Placement ${placementId} returned null - placement may not be configured in RevenueCat`,
    )
  }

  // If placement exists and returns a valid offering
  if (placementOffering && isValidOffering(placementOffering)) {
    Log.info(`Using ${placementId} offering for A/B testing: ${placementOffering.identifier}`)
    paywallAnalytics.placementLoaded(placementOffering.identifier, placementId, ageRange)
    return placementOffering
  }

  // Placement doesn't exist, is null, or returned invalid offering
  if (placementOffering && !isValidOffering(placementOffering)) {
    Log.warn(
      `Placement ${placementId} returned invalid offering (${placementOffering.identifier}), trying fallbacks`,
    )
  } else {
    Log.warn(`Placement ${placementId} not found or returned null, trying fallbacks`)
  }

  // Fall back to current offering if available and valid
  if (offerings.current && isValidOffering(offerings.current)) {
    Log.warn(
      `No placement offering found for ${placementId}, using current offering: ${offerings.current.identifier}`,
    )
    paywallAnalytics.placementLoaded(offerings.current.identifier, placementId, ageRange)
    return offerings.current
  }

  // Last resort: try to get any valid offering
  const validOffering = getValidOffering(offerings)
  if (validOffering) {
    Log.warn(
      `No suitable offering found for placement ${placementId}, using fallback offering: ${validOffering.identifier}`,
    )
    paywallAnalytics.placementLoaded(validOffering.identifier, placementId, ageRange)
    return validOffering
  }

  // Nothing available - this should be handled by the calling component
  Log.error(
    `No valid offering found for placement ${placementId}. Placement may be deleted or misconfigured in RevenueCat dashboard.`,
  )
  return null
}

/**
 * Sets entitlement ID tags in ganon and OneSignal based on active entitlements
 * This is a shared utility to ensure consistent tagging across purchase and restore flows
 */
export const setEntitlementTags = (
  customerInfo: CustomerInfo | null | undefined,
  componentName: string,
): void => {
  try {
    // Validate customerInfo structure
    if (
      !customerInfo ||
      typeof customerInfo !== "object" ||
      !customerInfo.entitlements ||
      typeof customerInfo.entitlements !== "object" ||
      !customerInfo.entitlements.active ||
      typeof customerInfo.entitlements.active !== "object"
    ) {
      Log.warn(`${componentName}: Invalid customerInfo structure, cannot set entitlement tags`)
      return
    }

    // Extract active entitlements
    const active = Object.fromEntries(
      Object.entries(customerInfo.entitlements.active).filter(
        ([_, value]) => (value as PurchasesEntitlementInfo)?.isActive,
      ),
    ) as Record<string, PurchasesEntitlementInfo>

    // Set entitlement ID in ganon and OneSignal
    if (active["elite"]?.isActive) {
      ganon.set("entitlementId", "elite")
      OneSignal.User.addTag("entitlementId", "elite")
      Log.info(`${componentName}: Tagged user with entitlementId: elite`)
    } else if (active["pro"]?.isActive) {
      ganon.set("entitlementId", "pro")
      OneSignal.User.addTag("entitlementId", "pro")
      Log.info(`${componentName}: Tagged user with entitlementId: pro`)
    } else if (ganon.contains("entitlementId")) {
      ganon.remove("entitlementId")
      OneSignal.User.removeTag("entitlementId")
      Log.info(`${componentName}: Removed entitlementId tag (no active entitlements)`)
    }
  } catch (error) {
    Log.error(`${componentName}: Error setting entitlement tags: ${error}`)
  }
}

/**
 * Handles purchase completion logic shared between paywall components
 * - Logs purchase completion
 * - Refreshes customer info to ensure entitlements are up to date
 * - Tags user with entitlement ID and trial status if applicable
 * - Calls analytics
 * - Calls completion callback with error handling (if provided)
 */
export const handlePurchaseCompletion = async (
  offering: PurchasesOffering | null | undefined,
  componentName: string,
  onComplete?: () => void,
): Promise<void> => {
  Log.info(`${componentName}: Purchase completed`)

  // Immediately refresh customer info to ensure entitlements are updated
  // This is critical because RevenueCat listeners may have delays
  try {
    await ensureRevenueCatConfigured()
    // Sync purchases to ensure server state is up to date
    // This will trigger the customerInfoUpdateListener in useEntitlements
    await Purchases.syncPurchases()
    const customerInfo = await Purchases.getCustomerInfo()

    // Set entitlement ID tags immediately after purchase
    setEntitlementTags(customerInfo, componentName)

    // Extract active entitlements for logging (with validation)
    if (
      customerInfo &&
      customerInfo.entitlements &&
      customerInfo.entitlements.active &&
      typeof customerInfo.entitlements.active === "object"
    ) {
      const active = Object.fromEntries(
        Object.entries(customerInfo.entitlements.active).filter(
          ([_, value]) => (value as PurchasesEntitlementInfo)?.isActive,
        ),
      )

      Log.info(
        `${componentName}: Customer info refreshed after purchase. Active entitlements: ${Object.keys(active).join(", ") || "none"}`,
      )
    } else {
      Log.warn(`${componentName}: Customer info structure invalid, cannot log active entitlements`)
    }
  } catch (error) {
    Log.error(`${componentName}: Error refreshing customer info after purchase: ${error}`)
    // Continue with the rest of the flow even if refresh fails
  }

  // Check if this is a trial offering using robust detection method
  if (isTrialOffering(offering)) {
    const offeringId = offering?.identifier || "unknown"
    try {
      OneSignal.User.addTag("trial_status", "started")
      ganon.set("trialStatus", "started")
      Log.info(`${componentName}: Tagged user with trial_status: started (offering: ${offeringId})`)
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
