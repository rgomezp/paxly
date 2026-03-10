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

  displayed: (offeringId: string) => {
    safeLogEvent("onboarding_paywall_displayed", {
      offering_id: offeringId || "unknown",
    })
  },

  trialStarted: (offeringId: string) => {
    safeLogEvent("trial_started", {
      offering_id: offeringId,
    })
  },
}
