import { useCallback, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import { PurchasesOffering } from "react-native-purchases"
import Log from "@/utils/Log"
import RevenueCatManager from "@/managers/RevenueCatManager"
import { handlePurchaseCompletion } from "@/utils/paywallUtils"
import { useOnboardingState } from "@/onboarding/state/useOnboardingState"

export default function OnboardingFallbackPaywall({ onFinished }: { onFinished: () => void }) {
  const { originalOffering } = useOnboardingState()
  const [offering, setOffering] = useState<PurchasesOffering | null>(null)

  const handlePurchaseCompleted = useCallback(async () => {
    try {
      await handlePurchaseCompletion(offering, "OnboardingFallbackPaywall", onFinished)
    } catch (error) {
      Log.error(`OnboardingFallbackPaywall: Error in handlePurchaseCompleted: ${error}`)
      // Still call onFinished to allow user to proceed even if tagging fails
      try {
        onFinished()
      } catch (callbackError) {
        Log.error(`OnboardingFallbackPaywall: Error in onFinished callback: ${callbackError}`)
      }
    }
  }, [offering, onFinished])

  useEffect(() => {
    let active = true
    const fetchAbandonmentOffering = async () => {
      // Use the original offering from the main paywall
      if (!originalOffering) {
        Log.error("OnboardingFallbackPaywall: No original offering available")
        return
      }

      try {
        // Get the abandonment offering based on the original offering
        const abandonmentOffering =
          await RevenueCatManager.getAbandonmentOfferingForDefault(originalOffering)
        if (!active) return

        if (!abandonmentOffering) {
          Log.error("OnboardingFallbackPaywall: No abandonment offering found")
        } else {
          Log.info(
            `OnboardingFallbackPaywall: Using abandonment offering: ${abandonmentOffering.identifier}`,
          )
        }
        setOffering(abandonmentOffering)
      } catch (error) {
        if (!active) return
        Log.error(
          `OnboardingFallbackPaywall: Failed to fetch abandonment offering: ${String(error)}`,
        )
      }
    }

    fetchAbandonmentOffering()
    return () => {
      active = false
    }
  }, [originalOffering])

  if (!offering) {
    return <View style={$root} />
  }

  return (
    <View style={$root}>
      <RevenueCatUI.Paywall
        options={{ offering, displayCloseButton: true }}
        onDismiss={onFinished}
        onPurchaseCompleted={handlePurchaseCompleted}
      />
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
