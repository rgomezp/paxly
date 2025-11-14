import { FC } from "react"
import { View, ViewStyle, Pressable, TextStyle, StyleProp } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { Text } from "@/components/Text"
import { IconProps } from "phosphor-react-native"
import { ComponentType } from "react"
import { $styles } from "@/theme"

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
  badge?: number | string | boolean
  badgeColor?: string
}

export const CircularButton: FC<CircularButtonProps> = ({
  onPress,
  icon,
  label,
  size = 70,
  iconSize = 32,
  iconColor,
  backgroundColor,
  labelColor,
  style,
  badge,
  badgeColor,
}) => {
  const { theme, themed } = useAppTheme()

  const $circularButton: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    ...$styles.dropShadow,
  }

  const $buttonContainer: ViewStyle = {
    position: "relative",
    width: size,
    height: size,
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

  const $badge: ViewStyle = {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: badgeColor || theme.colors.tint,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    zIndex: 1,
  }

  const $badgeText: TextStyle = {
    color: theme.colors.background,
    fontSize: 10,
    fontWeight: "700",
  }

  const $buttonLabel: TextStyle = {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: labelColor || theme.colors.text,
  }

  const showBadge = badge !== undefined && badge !== false && badge !== null
  const badgeValue = typeof badge === "boolean" ? "" : badge

  return (
    <Pressable onPress={onPress} style={[themed($circularButton), style]}>
      <View style={$buttonContainer}>
        <View style={themed($buttonInner)}>
          <ThemedPhosphorIcon
            Component={icon}
            color={iconColor || theme.colors.tint}
            size={iconSize}
          />
        </View>
        {showBadge && (
          <View style={$badge}>
            {badgeValue && (
              <Text style={$badgeText}>
                {typeof badgeValue === "number" && badgeValue > 99 ? "99+" : String(badgeValue)}
              </Text>
            )}
          </View>
        )}
      </View>
      <Text style={themed($buttonLabel)}>{label}</Text>
    </Pressable>
  )
}
