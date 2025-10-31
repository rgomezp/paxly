import { FC } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/navigationTypes"
import { Text, TextProps } from "./Text"
import { useEntitlements } from "@/entitlements/useEntitlements"
import { FEATURES } from "@/entitlements/constants/features"
import { presentPaywallSafely } from "@/thirdParty/revenueCatUtils"
import Log from "@/utils/Log"

type NavigationProp = NativeStackNavigationProp<AppStackParamList>

export interface MembershipDrawerItemProps extends Omit<TextProps, "onPress"> {
  /**
   * Optional style override for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the text
   */
  textStyle?: StyleProp<TextStyle>
}

export const MembershipDrawerItem: FC<MembershipDrawerItemProps> = ({
  containerStyle,
  textStyle,
  ...textProps
}) => {
  const navigation = useNavigation<NavigationProp>()
  const { hasFeatureAccess } = useEntitlements()

  const handlePress = async () => {
    try {
      const hasAccess = hasFeatureAccess(FEATURES.PREMIUM_FEATURES)
      if (!hasAccess) {
        // Show paywall if user is not a paid member
        await presentPaywallSafely()
      } else {
        // Navigate to membership screen if user is a member
        navigation.navigate("Membership")
      }
    } catch (error) {
      Log.error(`Error in MembershipDrawerItem: ${error}`)
      // Fallback to navigating to membership screen if paywall fails
      navigation.navigate("Membership")
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
}
