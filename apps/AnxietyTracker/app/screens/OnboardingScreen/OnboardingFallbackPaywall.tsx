import { useCallback, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import { PurchasesOffering } from "react-native-purchases"
import Log from "@/utils/Log"
import { fetchAbandonmentPlacementOffering, handlePurchaseCompletion } from "@/utils/paywallUtils"

export default function OnboardingFallbackPaywall({ onFinished }: { onFinished: () => void }) {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null)

  const handlePurchaseCompleted = useCallback(() => {
    handlePurchaseCompletion(offering, "OnboardingFallbackPaywall", onFinished)
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
