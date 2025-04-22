import { FC } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Text, TextProps } from "./Text"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/AppNavigator"

type NavigationProp = NativeStackNavigationProp<AppStackParamList>

export interface MenuItemProps extends Omit<TextProps, "onPress"> {
  /**
   * The route to navigate to when pressed
   */
  route: keyof AppStackParamList
  /**
   * Optional parameters to pass to the route
   */
  params?: any
  /**
   * Optional style override for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the text
   */
  textStyle?: StyleProp<TextStyle>
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
    <TouchableOpacity onPress={() => navigation.navigate(route, params)} style={containerStyle}>
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
}
