import { FC } from "react"
import { View, ViewStyle, Pressable, TextStyle, StyleProp } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { Text } from "@/components/Text"
import { IconProps } from "phosphor-react-native"
import { ComponentType } from "react"

export interface CircularButtonProps {
  onPress: () => void
  icon: ComponentType<IconProps>
  label: string
  size?: number
  iconSize?: number
  iconColor?: string
  backgroundColor?: string
  labelColor?: string
  style?: StyleProp<ViewStyle>
}

export const CircularButton: FC<CircularButtonProps> = ({
  onPress,
  icon,
  label,
  size = 100,
  iconSize = 32,
  iconColor,
  backgroundColor,
  labelColor,
  style,
}) => {
  const { theme, themed } = useAppTheme()

  const $circularButton: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
  }

  const $buttonInner: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: backgroundColor || theme.colors.card,
  }

  const $buttonLabel: TextStyle = {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: labelColor || theme.colors.text,
  }

  return (
    <Pressable onPress={onPress} style={[themed($circularButton), style]}>
      <View style={themed($buttonInner)}>
        <ThemedPhosphorIcon
          Component={icon}
          color={iconColor || theme.colors.tint}
          size={iconSize}
        />
        <Text style={themed($buttonLabel)}>{label}</Text>
      </View>
    </Pressable>
  )
}

