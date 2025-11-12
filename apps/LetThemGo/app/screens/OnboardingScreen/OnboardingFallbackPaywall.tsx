import { useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import RevenueCatUI from "react-native-purchases-ui"
import Purchases from "react-native-purchases"
import Log from "@/utils/Log"

export default function OnboardingFallbackPaywall({ onFinished }: { onFinished: () => void }) {
  const [offering, setOffering] = useState<any>(undefined)

  useEffect(() => {
    let active = true
    Purchases.getOfferings()
      .then((o) => {
        if (!active) return
        const fallback = o.all?.["fallback_offering"]
        if (!fallback) {
          Log.error("OnboardingFallbackPaywall: fallback_offering not found in offerings")
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
