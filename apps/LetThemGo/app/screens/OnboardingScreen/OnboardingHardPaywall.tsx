/**
 * OnboardingHardPaywall Component
 *
 * This is a HARD PAYWALL implementation that:
 * - Removes the close button (displayCloseButton: false)
 * - Does NOT allow users to bypass without subscribing
 * - Only proceeds to the next step when an active subscription is confirmed
 * - Uses RevenueCat placement offerings for A/B testing
 * - Continuously checks subscription status to detect successful purchases
 *
 * Users CANNOT proceed without completing a purchase or having an active subscription.
 */

import { useEffect, useRef, useState } from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import Purchases from "react-native-purchases"
import Log from "../../utils/Log"
import AnalyticsManager from "../../managers/AnalyticsManager"
import { ensureRevenueCatConfigured } from "@/thirdParty/revenueCatUtils"
import { useAppTheme } from "@/utils/useAppTheme"

interface OnboardingHardPaywallProps {
  onComplete: () => void
  onCancel: () => void
}

const OnboardingHardPaywall: React.FC<OnboardingHardPaywallProps> = ({ onComplete, onCancel }) => {
  const { theme } = useAppTheme()
  const [offering, setOffering] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const noOfferingHandledRef = useRef(false)

  // Fetch the specific placement offering for A/B testing
  useEffect(() => {
    const fetchPlacementOffering = async () => {
      try {
        // Ensure RevenueCat is configured before proceeding
        await ensureRevenueCatConfigured()

        // Get the current offering for the onboarding placement (for A/B testing)
        const placementOffering =
          await Purchases.getCurrentOfferingForPlacement("onboarding_placement")

        if (placementOffering) {
          Log.info("OnboardingHardPaywall: Using onboarding_placement offering for A/B testing")
          // Track which placement offering is being used for A/B testing analytics
          AnalyticsManager.getInstance().logEvent("onboarding_paywall_placement_loaded", {
            offering_id: placementOffering.identifier,
            placement: "onboarding_placement",
          })
          setOffering(placementOffering)
        } else {
          // Fallback to current offering if placement offering not found
          Log.info("OnboardingHardPaywall: No placement offering found, using current offering")
          const offerings = await Purchases.getOfferings()
          if (offerings.current) {
            AnalyticsManager.getInstance().logEvent("onboarding_paywall_fallback_offering", {
              offering_id: offerings.current.identifier,
              reason: "no_placement_offering",
            })
          }
          setOffering(offerings.current)
        }
      } catch (error) {
        Log.error(`OnboardingHardPaywall: Error fetching placement offering: ${error}`)
        AnalyticsManager.getInstance().logEvent("onboarding_paywall_error", {
          error: String(error),
          step: "fetch_placement_offering",
        })
        // Try to get default offering as fallback
        try {
          const offerings = await Purchases.getOfferings()
          if (offerings.current) {
            AnalyticsManager.getInstance().logEvent("onboarding_paywall_fallback_offering", {
              offering_id: offerings.current.identifier,
              reason: "placement_error",
            })
          }
          setOffering(offerings.current)
        } catch (fallbackError) {
          Log.error(`OnboardingHardPaywall: Error fetching fallback offering: ${fallbackError}`)
          AnalyticsManager.getInstance().logEvent("onboarding_paywall_error", {
            error: String(fallbackError),
            step: "fetch_fallback_offering",
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlacementOffering()
  }, [])

  const handleRestoreCompleted = ({ customerInfo }: { customerInfo: any }) => {
    Log.info(
      `OnboardingHardPaywall: Restore completed for customer: ${customerInfo?.originalAppUserId || "unknown"}`,
    )
    // When restore is completed successfully, proceed to next step
    AnalyticsManager.getInstance().logEvent("onboarding_paywall_restored")
    onComplete()
  }

  // Set up a listener for purchase state changes
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      try {
        // Check if user has active entitlements
        const customerInfo = await Purchases.getCustomerInfo()
        const hasActiveEntitlement = Object.values(customerInfo.entitlements.active).some(
          (entitlement) => entitlement.isActive,
        )

        if (hasActiveEntitlement) {
          Log.info("OnboardingHardPaywall: User already has active entitlement, proceeding")
          AnalyticsManager.getInstance().logEvent("onboarding_paywall_already_subscribed")
          onComplete()
        }
      } catch (error) {
        Log.error(`OnboardingHardPaywall: Error checking purchase status: ${error}`)
      }
    }

    // Check purchase status when component mounts
    checkPurchaseStatus()

    // Set up periodic check for purchase status (every 5 seconds)
    const interval = setInterval(checkPurchaseStatus, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [onComplete])

  // If no offering is available after loading, proceed to next step (post-render)
  useEffect(() => {
    if (!isLoading && !offering && !noOfferingHandledRef.current) {
      noOfferingHandledRef.current = true
      Log.error("OnboardingHardPaywall: No offering available, proceeding to next step")
      AnalyticsManager.getInstance().logEvent("onboarding_paywall_no_offering")
      onComplete()
    }
  }, [isLoading, offering, onComplete])

  // Show loading state while fetching offering
  if (isLoading) {
    return (
      <View style={[styles.innerContainer, styles.loadingContainer]}>
        {/* You can add a loading spinner here if needed */}
      </View>
    )
  }

  if (!offering) {
    return null
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.innerContainer}>
        <SafeAreaView style={styles.safeArea}>
          <RevenueCatUI.Paywall
            options={{
              offering: offering, // Use the specific placement offering for A/B testing
            }}
            onRestoreCompleted={handleRestoreCompleted}
            onDismiss={onCancel}
            onPurchaseCancelled={onCancel}
            onPurchaseCompleted={onComplete}
          />
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
  },
})

export default OnboardingHardPaywall
