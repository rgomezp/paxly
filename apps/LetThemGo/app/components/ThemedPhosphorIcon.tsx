/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { StyleProp, TextStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { IconProps } from "phosphor-react-native"
import { ComponentType } from "react"

interface ThemedPhosphorIconProps extends Omit<IconProps, "color"> {
  style?: StyleProp<TextStyle>
  color?: string
  Component: ComponentType<IconProps>
}

export function ThemedPhosphorIcon({
  Component,
  style,
  color,
  ...otherProps
}: ThemedPhosphorIconProps) {
  const { theme } = useAppTheme()

  return <Component color={color || theme.colors.text} style={style} {...otherProps} />
}
