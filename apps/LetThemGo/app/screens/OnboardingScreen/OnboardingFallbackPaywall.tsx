import { useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import Purchases from "react-native-purchases"
import Log from "@/utils/Log"
import { getAgeRange, getAgeBasedFallbackOffering } from "@/utils/paywallUtils"

export default function OnboardingFallbackPaywall({ onFinished }: { onFinished: () => void }) {
  const [offering, setOffering] = useState<any>(undefined)

  useEffect(() => {
    let active = true
    Purchases.getOfferings()
      .then((o) => {
        if (!active) return
        const ageRange = getAgeRange()
        const fallback = getAgeBasedFallbackOffering(o, ageRange)
        if (!fallback) {
          Log.error("OnboardingFallbackPaywall: No age-based fallback offering found in offerings")
        } else {
          Log.info(
            `OnboardingFallbackPaywall: Using age-based fallback offering: ${fallback.identifier}`,
          )
        }
        setOffering(fallback)
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
        onPurchaseCompleted={onFinished}
      />
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
