import { View } from "react-native"
import { Text } from ".."
import { useAppTheme } from "@/utils/useAppTheme"

export function LessonHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { themed, theme } = useAppTheme()
  return (
    <View
      style={themed(() => ({
        alignItems: "center",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.sm,
      }))}
    >
      <Text
        preset="heading"
        size="xl"
        weight="bold"
        style={themed(() => ({ textAlign: "center" }))}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          preset="subheading"
          size="md"
          weight="medium"
          style={themed(() => ({ textAlign: "center" }))}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  )
}
