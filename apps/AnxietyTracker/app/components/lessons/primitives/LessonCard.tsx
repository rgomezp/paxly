import { View } from "react-native"
import { ReactNode } from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedFontAwesome5Icon } from "../../ThemedFontAwesome5Icon"
import { $styles } from "@/theme/styles"

export function LessonCard({
  children,
  tone = "default",
}: {
  children: ReactNode
  tone?: "default" | "tip"
}) {
  const { themed, theme, themeContext } = useAppTheme()
  const tipBgColor =
    themeContext === "dark" ? theme.colors.palette.primary300 : theme.colors.palette.secondary200
  const bg = tone === "tip" ? tipBgColor : theme.colors.card
  const bulbColor =
    themeContext === "dark" ? theme.colors.palette.neutral800 : theme.colors.palette.primary400
  return (
    <View
      style={themed(() => ({
        backgroundColor: bg,
        borderRadius: 16,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...$styles.dropShadow,
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
            color={bulbColor}
            solid
            style={themed(() => ({ marginRight: theme.spacing.xs }))}
          />
        </View>
      )}
    </View>
  )
}
