import { Text } from "@/components/Text"
import { Pressable } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"

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
  return (
    <Pressable
      onPress={onPress}
      style={themed(() => ({
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        borderRadius: 16,
        backgroundColor: selected ? theme.colors.tint : theme.colors.card,
        marginRight: theme.spacing.xs,
      }))}
    >
      <Text>{label}</Text>
    </Pressable>
  )
}
