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

/**
 * Mapping of age ranges to abandonment paywall placement identifiers
 * Used for the abandonment paywall shown after user dismisses the main paywall
 *
 * CHANGES MADE:
 * - Switched from using offering IDs directly (AGE_TO_ABANDONMENT_OFFERING) to using placements
 * - Placements allow RevenueCat to manage A/B testing and offering selection server-side
 * - The abandonment paywall now uses fetchAbandonmentPlacementOffering() which calls
 *   Purchases.getCurrentOfferingForPlacement() instead of looking up offerings by ID
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
 * Mapping of age ranges to onboarding paywall offering identifiers
 * Used as a fallback when placement returns the current offering instead of the age-specific offering
 * This ensures we get the correct offering (e.g., default_offering_old for old age ranges)
 * even if the placement isn't properly configured in RevenueCat
 */
export const AGE_TO_OFFERING_ID: Record<AgeRanges, string | null> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "default_offering_young",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: null, // Uses default_offering via placement
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: null, // Uses default_offering via placement
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "default_offering_old",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "default_offering_old",
  [AgeRanges.FIFTY_SIX_PLUS]: "default_offering_old",
}

/**
 * TODO: Remove this constant and getAgeBasedAbandonmentOffering() after 2026-02-01
 *
 * CLEANUP STEPS:
 * 1. Remove AGE_TO_ABANDONMENT_OFFERING constant (lines 54-61)
 * 2. Remove getAgeBasedAbandonmentOffering() function (lines 297-328)
 * 3. Remove the fallback logic in fetchAbandonmentPlacementOffering() that calls
 *    getAgeBasedAbandonmentOffering() (lines 262-270)
 * 4. Update fetchAbandonmentPlacementOffering() to only use placements (no fallback)
 *
 * DEPRECATED:
 * This was replaced by AGE_TO_ABANDONMENT_PLACEMENT_ID and fetchAbandonmentPlacementOffering()
 * Kept temporarily as a fallback when placement lookup fails, to avoid breaking changes
 *
 * Mapping of age ranges to abandonment paywall offering identifiers
 * Used for the abandonment paywall shown after user dismisses the main paywall
 */
export const AGE_TO_ABANDONMENT_OFFERING: Record<AgeRanges, string> = {
  [AgeRanges.SEVENTEEN_OR_UNDER]: "fallback_offering_young",
  [AgeRanges.EIGHTEEN_TO_TWENTY_FIVE]: "fallback_offering",
  [AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE]: "fallback_offering",
  [AgeRanges.THIRTY_SIX_TO_FORTY_FIVE]: "fallback_offering_old",
  [AgeRanges.FORTY_SIX_TO_FIFTY_FIVE]: "fallback_offering_old",
  [AgeRanges.FIFTY_SIX_PLUS]: "fallback_offering_old",
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
 * Gets the abandonment placement ID based on age range, with fallback
 */
export const getAbandonmentPlacementId = (ageRange: AgeRanges | null): string => {
  return (ageRange && AGE_TO_ABANDONMENT_PLACEMENT_ID[ageRange]) || "abandonment_placement"
}

/**
 * Fetches abandonment paywall offering with placement logic
 * Used specifically for the abandonment paywall shown after user dismisses the main paywall
 *
 * CHANGES MADE:
 * - Switched from direct offering ID lookup to using RevenueCat placements
 * - Uses Purchases.getCurrentOfferingForPlacement() to get the offering for the placement
 * - Placements allow RevenueCat to manage A/B testing and offering selection server-side
 *
 * FALLBACK BEHAVIOR:
 * - Currently falls back to getAgeBasedAbandonmentOffering() (deprecated) if placement lookup fails
 * - This fallback should be removed during cleanup (see TODO in AGE_TO_ABANDONMENT_OFFERING)
 * - After cleanup, this function should return null if placement lookup fails
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
    // If the placement is effectively "not configured" and just returns the same offering
    // as the current/default offering, we want to fall back to our explicit abandonment
    // fallback_offering instead. This avoids depending on a specific offering ID string.
    const ageBasedFallbackOffering = getAgeBasedAbandonmentOffering(offerings, ageRange)
    const isSameAsCurrent =
      offerings.current && placementOffering.identifier === offerings.current.identifier

    if (isSameAsCurrent && ageBasedFallbackOffering) {
      Log.warn(
        `Abandonment placement ${placementId} returned current offering (${placementOffering.identifier}); using age-based fallback abandonment offering instead: ${ageBasedFallbackOffering.identifier}`,
      )
      paywallAnalytics.placementLoaded(ageBasedFallbackOffering.identifier, placementId, ageRange)
      return ageBasedFallbackOffering
    }

    Log.info(
      `Using ${placementId} offering for abandonment paywall: ${placementOffering.identifier}`,
    )
    paywallAnalytics.placementLoaded(placementOffering.identifier, placementId, ageRange)
    return placementOffering
  }

  // Placement doesn't exist, is null, or returned invalid offering
  // TODO: Remove this fallback during cleanup (after 2026-02-01)
  // Fallback to offering by ID (deprecated functionality)
  // This is temporary to avoid breaking changes while transitioning to placements
  if (placementOffering && !isValidOffering(placementOffering)) {
    Log.warn(
      `Abandonment placement ${placementId} returned invalid offering (${placementOffering.identifier}), falling back to offering by ID`,
    )
  } else {
    Log.warn(
      `Abandonment placement ${placementId} not found or returned null, falling back to offering by ID`,
    )
  }

  const fallbackOffering = getAgeBasedAbandonmentOffering(offerings, ageRange)
  if (fallbackOffering) {
    Log.info(`Using fallback abandonment offering: ${fallbackOffering.identifier}`)
    paywallAnalytics.placementLoaded(fallbackOffering.identifier, placementId, ageRange)
    return fallbackOffering
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
 * Gets the abandonment paywall offering based on age range by looking up offering IDs directly
 *
 * @deprecated Use fetchAbandonmentPlacementOffering instead
 *
 * TODO: Remove this function during cleanup (after 2026-02-01)
 *
 * DEPRECATED FUNCTIONALITY:
 * - This function looks up offerings by ID from offerings.all[offeringId]
 * - Replaced by fetchAbandonmentPlacementOffering() which uses placements
 * - Currently only used as a fallback in fetchAbandonmentPlacementOffering()
 *
 * REMOVAL STEPS:
 * 1. Remove this entire function (lines 297-328)
 * 2. Remove the fallback call to this function in fetchAbandonmentPlacementOffering() (lines 262-270)
 * 3. Remove AGE_TO_ABANDONMENT_OFFERING constant that this function depends on (lines 54-61)
 *
 * Legacy behavior:
 * - young: fallback_offering_young
 * - old: fallback_offering_old
 * - other: fallback_offering
 */
export const getAgeBasedAbandonmentOffering = (
  offerings: PurchasesOfferings,
  ageRange: AgeRanges | null,
): PurchasesOffering | null => {
  Log.info(`getAgeBasedAbandonmentOffering: offerings for age range ${ageRange}`)
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

  // Fallback to fallback_offering if age-based abandonment offering not found
  if (offerings.all && typeof offerings.all === "object") {
    const fallbackOffering = offerings.all["fallback_offering"]
    if (isValidOffering(fallbackOffering)) {
      Log.info(`Using fallback abandonment offering: fallback_offering`)
      return fallbackOffering
    }
  }

  // Last resort: log error and return null
  Log.error("No abandonment offering found (neither age-based nor fallback_offering)")
  return null
}

/**
 * Gets the onboarding paywall offering based on age range by looking up offering IDs directly
 * Used as a fallback when placement returns the current offering instead of the age-specific offering
 *
 * @param offerings - The RevenueCat offerings object
 * @param ageRange - The user's age range
 * @returns The age-based offering if found, null otherwise
 */
export const getAgeBasedOffering = (
  offerings: PurchasesOfferings,
  ageRange: AgeRanges | null,
): PurchasesOffering | null => {
  if (!offerings || typeof offerings !== "object") {
    return null
  }

  if (ageRange && AGE_TO_OFFERING_ID[ageRange]) {
    const offeringId = AGE_TO_OFFERING_ID[ageRange]
    if (offerings.all && typeof offerings.all === "object") {
      const offering = offerings.all[offeringId]
      if (isValidOffering(offering)) {
        Log.info(`Found age-based offering: ${offeringId}`)
        return offering
      } else if (offeringId) {
        // Offering ID is mapped but the offering doesn't exist or is invalid
        Log.warn(
          `Age-based offering ${offeringId} for age range ${ageRange} is mapped but not found or invalid in RevenueCat. Offering may have been deleted.`,
        )
      }
    } else if (offeringId) {
      Log.warn(
        `Age-based offering ${offeringId} for age range ${ageRange} is mapped but offerings.all is not available.`,
      )
    }
  }

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
 * Robust fallback chain to handle missing placements or offerings gracefully:
 * 1. Try placement offering (if valid)
 * 2. If placement returns current offering, try age-based offering
 * 3. If placement is missing/null, try age-based offering
 * 4. Fall back to current offering
 * 5. Return null if nothing is available
 *
 * UPSTREAM ISSUE (RevenueCat):
 * RevenueCat's getCurrentOfferingForPlacement() has a known issue where it can return
 * the current/default offering instead of the placement-specific offering, even when
 * the placement is correctly configured in the RevenueCat dashboard. This occurs when:
 * - The user isn't assigned to the experiment variant with placement mappings
 * - The placement configuration hasn't synced to the device yet
 * - The experiment variant isn't active or properly configured
 *
 * This function implements a workaround by detecting when the placement returns the
 * current offering and falling back to age-based offering lookup to ensure correct
 * offering selection (e.g., default_offering_old for old age ranges).
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
    // If the placement is effectively "not configured" and just returns the same offering
    // as the current/default offering, we want to fall back to an age-based offering lookup.
    // This ensures we get the correct offering (e.g., default_offering_old for old age ranges)
    // even if the placement isn't properly configured in RevenueCat.
    //
    // NOTE: RevenueCat's getCurrentOfferingForPlacement() can return the current offering
    // as a fallback when:
    // 1. The placement isn't configured in the active experiment variant
    // 2. The user isn't assigned to the experiment variant with placement mappings
    // 3. The placement configuration hasn't synced yet
    // This is why we need the age-based fallback to ensure correct offering selection.
    const isSameAsCurrent =
      offerings.current && placementOffering.identifier === offerings.current.identifier

    if (isSameAsCurrent) {
      Log.warn(
        `Placement ${placementId} returned current offering (${placementOffering.identifier}). This suggests the placement may not be configured in the active RevenueCat experiment variant, or the user isn't assigned to the variant with placement mappings.`,
      )
      // Fallback to age-based offering lookup
      const ageBasedOffering = getAgeBasedOffering(offerings, ageRange)
      if (ageBasedOffering) {
        Log.warn(
          `Placement ${placementId} returned current offering (${placementOffering.identifier}); using age-based offering instead: ${ageBasedOffering.identifier}`,
        )
        paywallAnalytics.placementLoaded(ageBasedOffering.identifier, placementId, ageRange)
        return ageBasedOffering
      }
      // If age-based offering doesn't exist, continue with placement offering
      Log.warn(
        `Placement ${placementId} returned current offering, but age-based offering not found. Using placement offering: ${placementOffering.identifier}`,
      )
    }

    Log.info(`Using ${placementId} offering for A/B testing: ${placementOffering.identifier}`)
    paywallAnalytics.placementLoaded(placementOffering.identifier, placementId, ageRange)
    return placementOffering
  }

  // Placement doesn't exist, is null, or returned invalid offering
  // Try age-based offering as fallback
  if (placementOffering && !isValidOffering(placementOffering)) {
    Log.warn(
      `Placement ${placementId} returned invalid offering (${placementOffering.identifier}), trying fallbacks`,
    )
  } else {
    Log.warn(`Placement ${placementId} not found or returned null, trying fallbacks`)
  }

  const ageBasedOffering = getAgeBasedOffering(offerings, ageRange)
  if (ageBasedOffering) {
    Log.info(
      `Using age-based offering as fallback for placement ${placementId}: ${ageBasedOffering.identifier}`,
    )
    paywallAnalytics.placementLoaded(ageBasedOffering.identifier, placementId, ageRange)
    return ageBasedOffering
  }

  // Fall back to current offering if available and valid
  if (offerings.current && isValidOffering(offerings.current)) {
    Log.warn(
      `No placement or age-based offering found for ${placementId}, using current offering: ${offerings.current.identifier}`,
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
