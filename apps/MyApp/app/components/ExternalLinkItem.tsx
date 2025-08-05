import { FC } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Text, TextProps } from "./Text"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

export interface ExternalLinkItemProps extends Omit<TextProps, "onPress"> {
  /**
   * The URL to open when pressed
   */
  url: string
  /**
   * Optional style override for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the text
   */
  textStyle?: StyleProp<TextStyle>
}

export const ExternalLinkItem: FC<ExternalLinkItemProps> = ({
  url,
  containerStyle,
  textStyle,
  ...textProps
}) => {
  return (
    <TouchableOpacity onPress={() => openLinkInBrowser(url)} style={containerStyle}>
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
} 