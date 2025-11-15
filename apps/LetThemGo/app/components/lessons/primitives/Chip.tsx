import { Text } from "@/components/Text"
import { Pressable } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import getTextColorForBackground from "@/utils/getTextColorForBackground"

export function Chip({
  label,
  onPress,
  selected,
}: {
  label: string
  onPress?: () => void
  selected?: boolean
}) {
  const { themed, theme } = useAppTheme()
  const backgroundColor = selected ? theme.colors.tint : theme.colors.card
  const textColor = getTextColorForBackground(backgroundColor)

  return (
    <Pressable
      onPress={onPress}
      style={themed(() => ({
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        borderRadius: 16,
        backgroundColor,
        marginRight: theme.spacing.xs,
      }))}
    >
      <Text style={{ color: textColor }}>{label}</Text>
    </Pressable>
  )
}
