import { View } from "react-native"
import { ReactNode } from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedFontAwesome5Icon } from "../../ThemedFontAwesome5Icon"

export function LessonCard({
  children,
  tone = "default",
}: {
  children: ReactNode
  tone?: "default" | "tip"
}) {
  const { themed, theme } = useAppTheme()
  const bg = tone === "tip" ? theme.colors.palette.secondary100 : theme.colors.card
  return (
    <View
      style={themed(() => ({
        backgroundColor: bg,
        borderRadius: 16,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
      }))}
    >
      {children}
      {tone === "tip" && (
        <View
          style={themed(() => ({
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: theme.spacing.xs,
          }))}
        >
          <ThemedFontAwesome5Icon
            name="lightbulb"
            size={16}
            color={theme.colors.tint}
            solid
            style={themed(() => ({ marginRight: theme.spacing.xs }))}
          />
        </View>
      )}
    </View>
  )
}
