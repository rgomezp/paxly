import { FC } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Text, TextProps } from "./Text"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/navigationTypes"

type NavigationProp = NativeStackNavigationProp<AppStackParamList>

export interface MenuItemProps extends Omit<TextProps, "onPress"> {
  /**
   * The route to navigate to when pressed
   */
  route: keyof AppStackParamList
  /**
   * Optional parameters to pass to the route
   */
  params?: AppStackParamList[keyof AppStackParamList]
  /**
   * Optional style override for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the text
   */
  textStyle?: StyleProp<TextStyle>
}

/**
 * Type-safe navigation helper that handles dynamic route navigation
 * This is needed because TypeScript can't verify params match the route at compile time
 */
function navigateSafely(
  navigation: NavigationProp,
  route: keyof AppStackParamList,
  params?: AppStackParamList[keyof AppStackParamList],
): void {
  // TypeScript requires this assertion because route is a union type
  // and params is a union type, so it can't verify they match at compile time
  // This is safe because the component interface ensures route is a valid key
  const nav = navigation.navigate as (
    name: keyof AppStackParamList,
    params?: AppStackParamList[keyof AppStackParamList],
  ) => void
  nav(route, params)
}

export const MenuItem: FC<MenuItemProps> = ({
  route,
  params,
  containerStyle,
  textStyle,
  ...textProps
}) => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <TouchableOpacity
      onPress={() => {
        navigateSafely(navigation, route, params)
      }}
      style={containerStyle}
    >
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
}
