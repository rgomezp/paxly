import { useEffect, useMemo } from "react"
import { ViewStyle, TextStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Text } from "./Text"
import QuoteManager from "@/managers/QuoteManager"
import { spacing } from "@/theme/spacing"

export default function Quote() {
  const { quote, author } = useMemo(() => new QuoteManager().getRandomQuote(), [])
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1600 })
  }, [opacity])

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[$container, animatedContainerStyle]}>
      <Text preset="subheading" style={$quoteText}>
        “{quote}”
      </Text>
      <Text style={$authorText}>— {author}</Text>
    </Animated.View>
  )
}

const $container: ViewStyle = {
  marginTop: spacing.lg,
  marginBottom: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $quoteText: TextStyle = {
  fontStyle: "italic",
}

const $authorText: TextStyle = {
  marginTop: spacing.xs,
  opacity: 0.8,
  textAlign: "right",
}
