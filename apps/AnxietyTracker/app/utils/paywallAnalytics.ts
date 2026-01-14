import AnalyticsManager from "@/managers/AnalyticsManager"
import Log from "./Log"

/**
 * Safely logs an analytics event, catching and logging any errors
 */
const safeLogEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    AnalyticsManager.getInstance().logEvent(eventName, params)
  } catch (error) {
    Log.warn(`Error logging analytics event ${eventName}: ${error}`)
  }
}

export const paywallAnalytics = {
  placementLoaded: (offeringId: string, placement: string, ageRange: string | null) => {
    safeLogEvent("onboarding_paywall_placement_loaded", {
      offering_id: offeringId,
      placement,
      age_range: ageRange || "unknown",
    })
  },

  fallbackOffering: (offeringId: string, reason: string, placementRequested?: string) => {
    safeLogEvent("onboarding_paywall_fallback_offering", {
      offering_id: offeringId,
      reason,
      ...(placementRequested && { placement_requested: placementRequested }),
    })
  },

  error: (error: string, step: string) => {
    safeLogEvent("onboarding_paywall_error", {
      error: String(error),
      step,
    })
  },

  restored: () => {
    safeLogEvent("onboarding_paywall_restored")
  },

  cancelled: (reason: "dismiss" | "purchase_cancelled", offeringId?: string) => {
    safeLogEvent("onboarding_paywall_cancelled", {
      reason,
      offering_id: offeringId || "unknown",
    })
  },

  alreadySubscribed: () => {
    safeLogEvent("onboarding_paywall_already_subscribed")
  },

  noOffering: () => {
    safeLogEvent("onboarding_paywall_no_offering")
  },

  displayed: (offeringId: string, placement: string, ageRange: string | null) => {
    safeLogEvent("onboarding_paywall_displayed", {
      offering_id: offeringId || "unknown",
      placement,
      age_range: ageRange || "unknown",
    })
  },

  trialStarted: (offeringId: string) => {
    safeLogEvent("trial_started", {
      offering_id: offeringId,
    })
  },
}
