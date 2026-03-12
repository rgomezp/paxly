import { useEffect, useRef, useState } from "react"
import { Animated, View, ViewStyle, TextStyle } from "react-native"
import type { ISlide } from "@/types/ISlide"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "@/components"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { PlantIcon } from "phosphor-react-native"
import ConfettiCannon from "react-native-confetti-cannon"

type OneDayStreakSlideProps = {
  onSelection?: () => void
}

type OneDayStreakComponentProps = {
  isActive?: boolean
}

function OneDayStreakComponent({ isActive }: OneDayStreakComponentProps) {
  const { theme, themed } = useAppTheme()
  const [display, setDisplay] = useState(0)
  const [confettiRun, setConfettiRun] = useState(0)
  const streakNumberScale = useRef(new Animated.Value(1)).current
  const streakNumberOpacity = useRef(new Animated.Value(1)).current
  const numberSwapAnim = useRef(new Animated.Value(0)).current
  const hasSwappedRef = useRef(false)

  useEffect(() => {
    if (!isActive) {
      streakNumberScale.stopAnimation()
      streakNumberOpacity.stopAnimation()
      numberSwapAnim.stopAnimation()

      streakNumberScale.setValue(1)
      streakNumberOpacity.setValue(1)
      numberSwapAnim.setValue(0)

      setDisplay(0)
      return
    }

    // Restart animation every time the slide becomes active.
    setDisplay(0)
    setConfettiRun((n) => n + 1)
    hasSwappedRef.current = false

    streakNumberScale.setValue(1)
    streakNumberOpacity.setValue(1)
    numberSwapAnim.setValue(0)

    const swapListenerId = numberSwapAnim.addListener(({ value }) => {
      // Swap from 0 -> 1 during the "fade" step (only once).
      if (!hasSwappedRef.current && value >= 0.5) {
        hasSwappedRef.current = true
        setDisplay(1)
      }
    })

    Animated.sequence([
      Animated.parallel([
        Animated.timing(streakNumberScale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(streakNumberOpacity, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // Change the number during the fade.
      Animated.timing(numberSwapAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(streakNumberScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(streakNumberOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start()

    return () => {
      numberSwapAnim.removeListener(swapListenerId)
    }
  }, [isActive, numberSwapAnim, streakNumberOpacity, streakNumberScale])

  const dayLabel = "day"

  return (
    <View style={themed($container)}>
      {isActive && (
        <View style={themed($confettiLayer)} pointerEvents="none">
          <ConfettiCannon
            key={confettiRun}
            count={120}
            fadeOut
            fallSpeed={2800}
            origin={{ x: 0, y: 0 }}
          />
        </View>
      )}

      <View style={themed($card)}>
        <Text
          text="Daily Streak"
          preset="subheading"
          style={themed({ color: theme.colors.text, textAlign: "center" })}
        />

        <View style={themed($streakRow)}>
          <ThemedPhosphorIcon Component={PlantIcon} size={44} color={theme.colors.tint} />
          <View style={themed($streakTextRow)}>
            <Animated.View
              style={{
                opacity: streakNumberOpacity,
                transform: [{ scale: streakNumberScale }],
              }}
            >
              <Text
                text={`${display}`}
                weight="bold"
                style={themed([$bigNumber, { color: theme.colors.tint }])}
              />
            </Animated.View>
            <Text text={dayLabel} style={themed([$bigLabel, { color: theme.colors.tint }])} weight="bold" />
          </View>
        </View>
      </View>
    </View>
  )
}

export function oneDayStreakSlide({ onSelection: _onSelection }: OneDayStreakSlideProps): ISlide {
  return {
    id: "oneDayStreak",
    title: "Build a daily streak",
    description: "Complete any daily task each day to keep it alive.",
    component: <OneDayStreakComponent />,
    textPlacement: "top",
    textAlignment: "center",
  }
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
})

const $confettiLayer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const $card: ThemedStyle<ViewStyle> = (theme) => ({
  width: "100%",
  borderRadius: 18,
  paddingVertical: 26,
  paddingHorizontal: 22,
  backgroundColor: theme.colors.dailyTasksTimelineBackground,
  alignItems: "center",
})

const $streakRow: ThemedStyle<ViewStyle> = () => ({
  marginTop: 16,
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
  justifyContent: "center",
})

const $streakTextRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "baseline",
  gap: 10,
})

const $bigNumber: ThemedStyle<TextStyle> = () => ({
  fontSize: 64,
  lineHeight: 72,
})

const $bigLabel: ThemedStyle<TextStyle> = () => ({
  fontSize: 34,
  lineHeight: 44,
})

