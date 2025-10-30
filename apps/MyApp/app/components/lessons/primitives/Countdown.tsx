import { Text } from "@/components/Text"
import { useEffect, useState } from "react"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { View } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"

export function Countdown({
  seconds,
  label,
  onDone,
}: {
  seconds: number
  label?: string
  onDone?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [left, setLeft] = useState(seconds)
  const labelOpacity = useSharedValue(1)
  useEffect(() => {
    const id = setInterval(() => setLeft((t) => (t > 0 ? t - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    if (left === 0) onDone?.()
  }, [left, onDone])

  useEffect(() => {
    labelOpacity.value = withRepeat(withTiming(0.3, { duration: 2000 }), -1, true)
  }, [labelOpacity])

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }))
  return (
    <View
      style={themed(() => ({
        alignItems: "center",
        gap: theme.spacing.sm,
        padding: theme.spacing.md,
        borderRadius: theme.spacing.md,
      }))}
    >
      <Text preset="heading" size="xxl" weight="bold">
        {left}
      </Text>
      {!!label && (
        <Animated.View style={animatedLabelStyle}>
          <Text style={themed(() => ({ color: theme.colors.textDim }))}>{label}</Text>
        </Animated.View>
      )}
    </View>
  )
}
