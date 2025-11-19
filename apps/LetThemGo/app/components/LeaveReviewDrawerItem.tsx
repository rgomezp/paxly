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
    try {
      // First, attempt to show native review prompt
      const reviewShown = await StoreReviewManager.requestReview(true)

      if (!reviewShown) {
        // If native review cannot be shown, fallback to opening App Store page
        const config = Constants?.expoConfig?.extra
        const appStoreUrl =
          Platform.OS === "ios" ? config?.iosAppStoreUrl : config?.androidAppStoreUrl

        if (appStoreUrl) {
          openLinkInBrowser(appStoreUrl)
        } else {
          Log.error("App store URL not configured in customConfig")
        }
      }
    } catch (error) {
      Log.error(`Error handling review request: ${error}`)
      // Fallback to App Store on error
      try {
        const config = Constants?.expoConfig?.extra
        const appStoreUrl =
          Platform.OS === "ios" ? config?.iosAppStoreUrl : config?.androidAppStoreUrl

        if (appStoreUrl) {
          openLinkInBrowser(appStoreUrl)
        }
      } catch (fallbackError) {
        Log.error(`Error opening app store review link: ${fallbackError}`)
      }
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
}
