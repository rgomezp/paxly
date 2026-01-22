import { View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { Text, Mascot } from ".."
import { useAppTheme } from "@/utils/useAppTheme"

export function LessonHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { themed, theme } = useAppTheme()

  return (
    <View
      style={themed(() => ({
        alignItems: "center",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.xs,
        paddingBottom: theme.spacing.xl,
      }))}
    >
      <Animated.View entering={FadeIn.duration(600)}>
        <Mascot width={120} height={120} />
      </Animated.View>
      <Animated.View entering={FadeIn.duration(800)}>
        <Text
          preset="heading"
          size="xl"
          weight="bold"
          style={themed(() => ({ textAlign: "center" }))}
        >
          {title}
        </Text>
      </Animated.View>
      {subtitle ? (
        <Animated.View entering={FadeIn.duration(800).delay(400)}>
          <Text
            preset="subheading"
            size="md"
            weight="medium"
            style={themed(() => ({ textAlign: "center" }))}
          >
            {subtitle}
          </Text>
        </Animated.View>
      ) : null}
    </View>
  )
}
