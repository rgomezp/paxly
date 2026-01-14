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
  iconSize?: number
  iconColor?: string
  backgroundColor?: string
  labelColor?: string
  style?: StyleProp<ViewStyle>
  badge?: number | string | boolean
  badgeColor?: string
}

export const ActionCard: FC<CircularButtonProps> = ({
  onPress,
  icon,
  label,
  iconSize = 28,
  iconColor,
  labelColor,
  style,
  badge,
  badgeColor,
}) => {
  const { theme, themed } = useAppTheme()

  const $buttonContainer: ViewStyle = {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  }

  const $iconContainer: ViewStyle = {
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 12,
  }

  const $badge: ViewStyle = {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: badgeColor || theme.colors.palette.accent100,
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
    fontSize: 14,
    fontWeight: "600",
    color: labelColor || theme.colors.tint,
    textAlign: "left",
  }

  const showBadge = badge !== undefined && badge !== false && badge !== null
  const badgeValue = typeof badge === "boolean" ? "" : badge

  return (
    <Pressable onPress={onPress} style={[themed($buttonContainer), style]}>
      <View style={$iconContainer}>
        <ThemedPhosphorIcon
          Component={icon}
          color={iconColor || theme.colors.text}
          size={iconSize}
        />
      </View>
      <Text style={themed($buttonLabel)}>{label} →</Text>
      {showBadge && (
        <View style={$badge}>
          {badgeValue && (
            <Text style={$badgeText}>
              {typeof badgeValue === "number" && badgeValue > 99 ? "99+" : String(badgeValue)}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  )
}
