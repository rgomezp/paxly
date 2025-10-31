import { View } from "react-native"
import { ReactNode } from "react"
import { useAppTheme } from "@/utils/useAppTheme"

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
    </View>
  )
}
