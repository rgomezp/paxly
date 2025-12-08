import { FC } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle, Platform } from "react-native"
import Constants from "expo-constants"
import { Text, TextProps } from "./Text"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"
import Log from "@/utils/Log"
import StoreReviewManager from "@/managers/StoreReviewManager"

export interface LeaveReviewDrawerItemProps extends Omit<TextProps, "onPress"> {
  /**
   * Optional style override for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the text
   */
  textStyle?: StyleProp<TextStyle>
}

export const LeaveReviewDrawerItem: FC<LeaveReviewDrawerItemProps> = ({
  containerStyle,
  textStyle,
  ...textProps
}) => {
  const handlePress = async () => {
    Log.info("LeaveReviewDrawerItem: handlePress called")
    const config = Constants?.expoConfig?.extra
    const appStoreUrl = Platform.OS === "ios" ? config?.iosAppStoreUrl : config?.androidAppStoreUrl

    // On iOS, the native review API is unreliable on newer devices (can silently fail).
    // We'll attempt it, but always fall back to the App Store URL to ensure something happens.
    const isIOS = Platform.OS === "ios"

    try {
      // First, attempt to show native review prompt
      const reviewShown = await StoreReviewManager.requestReview(true)
      Log.info("LeaveReviewDrawerItem: requestReview returned", { reviewShown, isIOS })

      // On iOS, always show fallback since native review can silently fail on newer devices.
      // On Android, only show fallback if native review didn't work.
      if (isIOS || !reviewShown) {
        Log.info("LeaveReviewDrawerItem: Attempting fallback to App Store", {
          isIOS,
          reviewShown,
        })

        if (appStoreUrl) {
          Log.info("LeaveReviewDrawerItem: Opening app store URL", { appStoreUrl })
          await openLinkInBrowser(appStoreUrl)
        } else {
          Log.error("LeaveReviewDrawerItem: App store URL not configured", {
            platform: Platform.OS,
            configKeys: config ? Object.keys(config) : null,
          })
        }
      } else {
        Log.info("LeaveReviewDrawerItem: Native review shown successfully (Android)")
      }
    } catch (error) {
      Log.error(`LeaveReviewDrawerItem: Error handling review request: ${error}`)
      // Always fallback to App Store on error
      if (appStoreUrl) {
        try {
          Log.info("LeaveReviewDrawerItem: Opening app store URL in error fallback", {
            appStoreUrl,
          })
          await openLinkInBrowser(appStoreUrl)
        } catch (fallbackError) {
          Log.error(`LeaveReviewDrawerItem: Error opening app store review link: ${fallbackError}`)
        }
      } else {
        Log.error("LeaveReviewDrawerItem: App store URL not available in error fallback")
      }
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
}
