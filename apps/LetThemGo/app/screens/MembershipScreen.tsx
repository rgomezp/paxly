import { FC, useEffect, useState, useMemo } from "react"
import { View, ViewStyle, Platform, Alert } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen, Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useEntitlements } from "@/entitlements/useEntitlements"
import Purchases from "react-native-purchases"
import { presentPaywallSafely } from "@/thirdParty/revenueCatUtils"
import { formatDate } from "@/utils/formatDate"
import { loadDateFnsLocale } from "@/utils/formatDate"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import RectangularButton from "@/components/buttons/RectangularButton"
import Log from "@/utils/Log"
import { Linking } from "react-native"
import { ensureRevenueCatConfigured } from "@/thirdParty/revenueCatUtils"

interface MembershipScreenProps extends AppStackScreenProps<"Membership"> {}

export const MembershipScreen: FC<MembershipScreenProps> = function MembershipScreen() {
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const { activeEntitlements, isLoading, refresh } = useEntitlements()
  const [, setCustomerInfo] = useState<any>(null)

  useEffect(() => {
    // Load date locale for formatting
    loadDateFnsLocale()
    
    // Fetch customer info to get detailed subscription information
    const fetchCustomerInfo = async () => {
      try {
        await ensureRevenueCatConfigured()
        const info = await Purchases.getCustomerInfo()
        setCustomerInfo(info)
      } catch (error) {
        Log.error(`Error fetching customer info: ${error}`)
      }
    }

    fetchCustomerInfo()
  }, [])

  // Get the active entitlement (pro or elite)
  const activeEntitlement = useMemo(() => {
    const entitlements = Object.values(activeEntitlements)
    return entitlements.find((ent) => ent.isActive) || null
  }, [activeEntitlements])

  // Format dates
  const formattedExpirationDate = useMemo(() => {
    if (!activeEntitlement?.expirationDate) return null
    try {
      return formatDate(activeEntitlement.expirationDate, "MMM dd, yyyy")
    } catch (error) {
      Log.error(`Error formatting expiration date: ${error}`)
      return null
    }
  }, [activeEntitlement])

  const formattedRenewalDate = useMemo(() => {
    if (!activeEntitlement?.expirationDate) return null
    try {
      // For subscriptions, renewal date is typically the expiration date
      return formatDate(activeEntitlement.expirationDate, "MMM dd, yyyy")
    } catch (error) {
      Log.error(`Error formatting renewal date: ${error}`)
      return null
    }
  }, [activeEntitlement])

  // Get plan name from entitlement identifier
  const planName = useMemo(() => {
    if (!activeEntitlement) return null
    const identifier = activeEntitlement.identifier || ""
    // Capitalize first letter
    return identifier.charAt(0).toUpperCase() + identifier.slice(1)
  }, [activeEntitlement])

  const handleChangePlan = async () => {
    try {
      await presentPaywallSafely()
      // Refresh entitlements after paywall closes
      await refresh()
      // Refresh customer info
      try {
        await ensureRevenueCatConfigured()
        const info = await Purchases.getCustomerInfo()
        setCustomerInfo(info)
      } catch (error) {
        Log.error(`Error refreshing customer info: ${error}`)
      }
    } catch (error) {
      Log.error(`Error presenting paywall: ${error}`)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      if (Platform.OS === "ios") {
        // iOS: Open App Store subscription management
        const url = "https://apps.apple.com/account/subscriptions"
        const canOpen = await Linking.canOpenURL(url)
        if (canOpen) {
          await Linking.openURL(url)
        } else {
          Alert.alert(
            "Manage Subscription",
            "To cancel your subscription, please go to Settings > [Your Name] > Subscriptions and manage your subscriptions there.",
          )
        }
      } else if (Platform.OS === "android") {
        // Android: Open Google Play Store subscription management
        // This URL format should work for most cases
        const url = "https://play.google.com/store/account/subscriptions?package=com.honeywolf.letthemgo&sku="
        const canOpen = await Linking.canOpenURL(url)
        if (canOpen) {
          await Linking.openURL(url)
        } else {
          // Fallback to Play Store app
          const playStoreUrl = "market://details?id=com.honeywolf.letthemgo"
          const canOpenPlayStore = await Linking.canOpenURL(playStoreUrl)
          if (canOpenPlayStore) {
            await Linking.openURL(playStoreUrl)
          } else {
            Alert.alert(
              "Manage Subscription",
              "To cancel your subscription, please go to Google Play Store > Account > Subscriptions and manage your subscriptions there.",
            )
          }
        }
      }
    } catch (error) {
      Log.error(`Error opening subscription management: ${error}`)
      Alert.alert(
        "Error",
        "Unable to open subscription management. Please go to your device settings to manage your subscription.",
      )
    }
  }

  if (isLoading) {
    return (
      <Screen style={themed($root)} preset="fixed">
        <View style={themed([$container, { paddingTop: insets.top }])}>
          <Text text="Loading..." preset="default" style={themed({ color: theme.colors.text })} />
        </View>
      </Screen>
    )
  }

  return (
    <Screen style={themed($root)} preset="scroll">
      <View style={themed([$container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }])}>
        <Text
          text={LANGUAGE_COPY.words.membership[Language.current]}
          preset="heading"
          style={themed({ color: theme.colors.text, marginBottom: 24 })}
        />

        {activeEntitlement ? (
          <>
            <View style={themed($infoSection)}>
              <View style={themed([$infoRow, { borderBottomColor: theme.colors.border || "rgba(255, 255, 255, 0.1)" }])}>
                <Text
                  text={LANGUAGE_COPY.words.currentPlan[Language.current]}
                  preset="subheading"
                  style={themed({ color: theme.colors.textDim })}
                />
                <Text
                  text={planName || "Unknown"}
                  preset="default"
                  style={themed({ color: theme.colors.text, fontWeight: "bold" })}
                />
              </View>

              {formattedExpirationDate && (
                <View style={themed([$infoRow, { borderBottomColor: theme.colors.border || "rgba(255, 255, 255, 0.1)" }])}>
                  <Text
                    text={LANGUAGE_COPY.words.expirationDate[Language.current]}
                    preset="subheading"
                    style={themed({ color: theme.colors.textDim })}
                  />
                  <Text
                    text={formattedExpirationDate}
                    preset="default"
                    style={themed({ color: theme.colors.text })}
                  />
                </View>
              )}

              {formattedRenewalDate && (
                <View style={themed([$infoRow, { borderBottomColor: theme.colors.border || "rgba(255, 255, 255, 0.1)" }])}>
                  <Text
                    text={LANGUAGE_COPY.words.renewalDate[Language.current]}
                    preset="subheading"
                    style={themed({ color: theme.colors.textDim })}
                  />
                  <Text
                    text={formattedRenewalDate}
                    preset="default"
                    style={themed({ color: theme.colors.text })}
                  />
                </View>
              )}
            </View>

            <View style={themed($buttonSection)}>
              <RectangularButton
                buttonText={LANGUAGE_COPY.words.changePlan[Language.current]}
                onClick={handleChangePlan}
                customStyles={themed($button)}
              />
              <RectangularButton
                buttonText={LANGUAGE_COPY.words.cancelSubscription[Language.current]}
                onClick={handleCancelSubscription}
                customStyles={themed([$button, $cancelButton])}
                lightBackground
              />
            </View>
          </>
        ) : (
          <View style={themed($noSubscriptionSection)}>
            <Text
              text={LANGUAGE_COPY.words.noActiveSubscription[Language.current]}
              preset="subheading"
              style={themed({ color: theme.colors.textDim, textAlign: "center", marginBottom: 24 })}
            />
            <RectangularButton
              buttonText={LANGUAGE_COPY.words.changePlan[Language.current]}
              onClick={handleChangePlan}
              customStyles={themed($button)}
            />
          </View>
        )}
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
}

const $infoSection: ViewStyle = {
  marginBottom: 32,
}

const $infoRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  paddingBottom: 16,
  borderBottomWidth: 1,
}

const $buttonSection: ViewStyle = {
  gap: 16,
}

const $button: ViewStyle = {
  marginVertical: 8,
}

const $cancelButton: ViewStyle = {
  marginTop: 8,
}

const $noSubscriptionSection: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}