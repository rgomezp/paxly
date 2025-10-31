import { FC } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle, Platform } from "react-native"
import Constants from "expo-constants"
import { Text, TextProps } from "./Text"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"
import Log from "@/utils/Log"

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
  const handlePress = () => {
    try {
      // Get app store URLs from Expo constants (from customConfig)
      const config = Constants?.expoConfig?.extra
      const appStoreUrl =
        Platform.OS === "ios" ? config?.iosAppStoreUrl : config?.androidAppStoreUrl

      if (appStoreUrl) {
        openLinkInBrowser(appStoreUrl)
      } else {
        Log.error("App store URL not configured in customConfig")
      }
    } catch (error) {
      Log.error(`Error opening app store review link: ${error}`)
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
}
