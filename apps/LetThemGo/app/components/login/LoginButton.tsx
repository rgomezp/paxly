import { FC } from "react"
import { TouchableOpacity, View, DimensionValue } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"

type LoginButtonProps = {
  onPress: () => void
  text: string
  iconName: keyof typeof Ionicons.glyphMap
  backgroundColor: string
  borderColor?: string
  textColor?: string
  iconColor?: string
  width?: DimensionValue
  height?: number
  testID?: string
  disabled?: boolean
}

export const LoginButton: FC<LoginButtonProps> = ({
  onPress,
  text,
  iconName,
  backgroundColor,
  textColor = "white",
  iconColor = "white",
  width = 240,
  height = 50,
  borderColor = "transparent",
  testID,
  disabled = false,
}) => {
  const { themed } = useAppTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        themed($button),
        {
          backgroundColor,
          width,
          height,
          borderColor,
          ...(borderColor && borderColor !== "transparent" && { borderWidth: 1 }),
        },
        disabled && themed($disabled),
      ]}
      disabled={disabled}
      testID={testID}
      activeOpacity={0.8}
    >
      <View style={themed($content)}>
        <Ionicons name={iconName} size={24} color={iconColor} style={themed($icon)} />
        <Text style={[themed($text), { color: textColor }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const $button: ThemedStyle<any> = () => ({
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  elevation: 2,
})

const $content: ThemedStyle<any> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
})

const $icon: ThemedStyle<any> = () => ({
  marginRight: 12,
})

const $text: ThemedStyle<any> = () => ({
  fontSize: 16,
  fontWeight: "600",
})

const $disabled: ThemedStyle<any> = () => ({
  opacity: 0.6,
})
