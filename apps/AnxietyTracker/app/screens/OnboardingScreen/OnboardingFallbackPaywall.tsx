import { useCallback, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import { PurchasesOffering } from "react-native-purchases"
import Log from "@/utils/Log"
import { fetchAbandonmentPlacementOffering, handlePurchaseCompletion } from "@/utils/paywallUtils"

export default function OnboardingFallbackPaywall({ onFinished }: { onFinished: () => void }) {
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
    fetchAbandonmentPlacementOffering()
      .then((abandonmentOffering) => {
        if (!active) return
        if (!abandonmentOffering) {
          Log.error("OnboardingFallbackPaywall: No abandonment placement offering found")
        } else {
          Log.info(
            `OnboardingFallbackPaywall: Using abandonment placement offering: ${abandonmentOffering.identifier}`,
          )
        }
        setOffering(abandonmentOffering)
      })
      .catch((error) => {
        Log.error(
          `OnboardingFallbackPaywall: Failed to fetch abandonment placement offering: ${String(error)}`,
        )
      })
    return () => {
      active = false
    }
  }, [])

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
