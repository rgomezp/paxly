/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { FontAwesome5 } from "@expo/vector-icons"
import { StyleProp, TextStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"

interface ThemedFontAwesome5IconProps {
  name: string
  size?: number
  style?: StyleProp<TextStyle>
  color?: string
  solid?: boolean
  brand?: boolean
  light?: boolean
  regular?: boolean
  duotone?: boolean
  thin?: boolean
  [key: string]: any
}

export function ThemedFontAwesome5Icon(props: ThemedFontAwesome5IconProps) {
  const { style, color, ...otherProps } = props
  const { theme } = useAppTheme()

  return <FontAwesome5 style={[{ color: color || theme.colors.text }, style]} {...otherProps} />
}
