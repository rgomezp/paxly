import { useCallback, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import Purchases, { PurchasesOffering } from "react-native-purchases"
import Log from "@/utils/Log"
import {
  getAgeRange,
  getAgeBasedFallbackOffering,
  handlePurchaseCompletion,
} from "@/utils/paywallUtils"

export default function OnboardingFallbackPaywall({ onFinished }: { onFinished: () => void }) {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null)

  const handlePurchaseCompleted = useCallback(() => {
    handlePurchaseCompletion(offering, "OnboardingFallbackPaywall", onFinished)
  }, [offering, onFinished])

  useEffect(() => {
    let active = true
    Purchases.getOfferings()
      .then((o) => {
        if (!active) return
        const ageRange = getAgeRange()
        const fallbackOffering = getAgeBasedFallbackOffering(o, ageRange)
        if (!fallbackOffering) {
          Log.error("OnboardingFallbackPaywall: No age-based fallback offering found in offerings")
        } else {
          Log.info(
            `OnboardingFallbackPaywall: Using age-based fallback offering: ${fallbackOffering.identifier}`,
          )
        }
        setOffering(fallbackOffering)
      })
      .catch((error) => {
        Log.error(`OnboardingFallbackPaywall: Failed to fetch offerings: ${String(error)}`)
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
