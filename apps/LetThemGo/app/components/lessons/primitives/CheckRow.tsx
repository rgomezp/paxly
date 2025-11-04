import { Text } from "@/components/Text"
import { View, type ViewStyle } from "react-native"

import { Pressable } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"

export function CheckRow({
  label,
  value,
  onToggle,
}: {
  label: string
  value: boolean
  onToggle: () => void
}) {
  const { themed, theme } = useAppTheme()
  return (
    <Pressable
      onPress={onToggle}
      style={themed<ViewStyle>(() => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: theme.spacing.md,
        maxWidth: "90%",
        alignSelf: "center",
      }))}
    >
      <View
        style={themed(() => ({
          width: 22,
          height: 22,
          borderRadius: 6,
          marginRight: theme.spacing.lg,
          backgroundColor: value ? theme.colors.tint : theme.colors.card,
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }))}
      >
        {value && <Text style={themed(() => ({ color: theme.colors.background }))}>✓</Text>}
      </View>
      <View style={themed(() => ({ flex: 1, flexShrink: 1 }))}>
        <Text style={themed(() => ({ color: theme.colors.text }))}>{label}</Text>
      </View>
    </Pressable>
  )
}
