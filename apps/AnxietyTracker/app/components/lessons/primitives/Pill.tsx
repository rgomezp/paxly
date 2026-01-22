import { Text } from "@/components/Text"
import { Pressable } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"

export function Pill({
  label,
  onPress,
  highlight,
}: {
  label: string
  onPress?: () => void
  highlight?: boolean
}) {
  const { themed, theme } = useAppTheme()
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        themed(() => ({
          backgroundColor: highlight ? theme.colors.tint : theme.colors.card,
          opacity: pressed ? 0.9 : 1,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          borderRadius: 24,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: highlight ? 0.25 : 0.15,
          shadowRadius: 8,
          elevation: 3,
        }))
      }
    >
      <Text>{label}</Text>
    </Pressable>
  )
}
