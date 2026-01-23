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

import { useEffect, useRef } from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import Log from "../../utils/Log"
import { useAppTheme } from "@/utils/useAppTheme"
import { useOffering } from "@/hooks/useOffering"
import { usePurchaseStatus } from "@/hooks/usePurchaseStatus"
import {
  isValidOffering,
  getPlacementId,
  handlePurchaseCompletion,
  setEntitlementTags,
} from "@/utils/paywallUtils"
import { paywallAnalytics } from "@/utils/paywallAnalytics"

interface OnboardingHardPaywallProps {
  onComplete: () => void
  onCancel: () => void
}

const OnboardingHardPaywall: React.FC<OnboardingHardPaywallProps> = ({ onComplete, onCancel }) => {
  const { theme } = useAppTheme()
  const { offering, isLoading } = useOffering()
  const noOfferingHandledRef = useRef(false)
  const paywallDisplayedRef = useRef(false)

  // Monitor purchase status to detect successful purchases
  usePurchaseStatus(onComplete)

  const handleRestoreCompleted = ({ customerInfo }: { customerInfo: any }) => {
    try {
      const userId =
        customerInfo?.originalAppUserId || customerInfo?.originalApplicationUsername || "unknown"
      Log.info(`OnboardingHardPaywall: Restore completed for customer: ${userId}`)
    } catch (error) {
      Log.warn(`OnboardingHardPaywall: Error logging restore info: ${error}`)
    }

    // Set entitlement ID tags immediately after restore
    if (customerInfo) {
      setEntitlementTags(customerInfo, "OnboardingHardPaywall")
    }

    paywallAnalytics.restored()

    try {
      onComplete()
    } catch (error) {
      Log.error(`OnboardingHardPaywall: Error in onComplete callback: ${error}`)
    }
  }

  const handleCancel = (reason: "dismiss" | "purchase_cancelled") => {
    Log.info(`OnboardingHardPaywall: Purchase flow cancelled - ${reason}`)
    paywallAnalytics.cancelled(reason, offering?.identifier)
    onCancel()
  }

  const handlePurchaseCompleted = async () => {
    try {
      await handlePurchaseCompletion(offering, "OnboardingHardPaywall", onComplete)
    } catch (error) {
      Log.error(`OnboardingHardPaywall: Error in handlePurchaseCompleted: ${error}`)
      // Still call onComplete to allow user to proceed even if tagging fails
      // The usePurchaseStatus hook will detect the entitlement and call onComplete anyway
    }
  }

  // If no offering is available after loading, proceed to next step
  useEffect(() => {
    if (!isLoading && !offering && !noOfferingHandledRef.current) {
      noOfferingHandledRef.current = true
      Log.error("OnboardingHardPaywall: No offering available, proceeding to next step")
      paywallAnalytics.noOffering()
      onComplete()
    }
  }, [isLoading, offering, onComplete])

  // Log when the paywall is displayed
  useEffect(() => {
    if (!isLoading && isValidOffering(offering) && offering && !paywallDisplayedRef.current) {
      paywallDisplayedRef.current = true

      const placementId = getPlacementId()

      Log.info(`OnboardingHardPaywall: Paywall displayed with placement ${placementId}`)
      paywallAnalytics.displayed(offering.identifier, placementId, null)
    }
  }, [isLoading, offering])

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

  // Validate offering before rendering paywall
  if (!isValidOffering(offering)) {
    Log.error("OnboardingHardPaywall: Invalid offering, cannot render paywall")
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
            onDismiss={() => handleCancel("dismiss")}
            onPurchaseCancelled={() => handleCancel("purchase_cancelled")}
            onPurchaseCompleted={handlePurchaseCompleted}
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
