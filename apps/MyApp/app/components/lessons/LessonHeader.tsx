import { Image, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
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
        marginBottom: theme.spacing.xxxl,
      }))}
    >
      <Image
        source={require("../../../assets/images/cute-flame.png")}
        style={themed(() => ({ width: 72, height: 72, marginBottom: theme.spacing.xs }))}
        resizeMode="contain"
      />
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
