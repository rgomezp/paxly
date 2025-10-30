import { Text } from "@/components/Text"
import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated"
import { useAppTheme } from "@/utils/useAppTheme"

export function Breath({
  pattern,
  rounds,
  onDone,
}: {
  pattern: "4-7-8" | "box" | "physiological"
  rounds: number
  onDone?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [round, setRound] = useState(1)
  const [phase, setPhase] = useState("inhale")
  const [count, setCount] = useState(0)
  const breathScale = useSharedValue(1)

  const schedule = useMemo(() => {
    if (pattern === "physiological") return { inhale: 2, hold: 0, exhale: 6 }
    if (pattern === "box") return { inhale: 4, hold: 4, exhale: 4 }
    return { inhale: 4, hold: 7, exhale: 8 }
  }, [pattern])

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const total = schedule.inhale + schedule.hold + schedule.exhale
    const step = count % total
    const r = Math.floor(count / total) + 1
    setRound(r)
    if (r > rounds) onDone?.()
    else if (step < schedule.inhale) setPhase("inhale")
    else if (step < schedule.inhale + schedule.hold) setPhase("hold")
    else setPhase("exhale")
  }, [count, onDone, rounds, schedule.exhale, schedule.hold, schedule.inhale])

  useEffect(() => {
    if (phase === "inhale") {
      breathScale.value = withTiming(1.5, {
        duration: schedule.inhale * 1000,
        easing: Easing.inOut(Easing.ease),
      })
    } else if (phase === "hold") {
      // Stay at expanded size
      breathScale.value = 1.5
    } else if (phase === "exhale") {
      breathScale.value = withTiming(1, {
        duration: schedule.exhale * 1000,
        easing: Easing.inOut(Easing.ease),
      })
    }
  }, [phase, breathScale, schedule.inhale, schedule.exhale])

  const animatedBreathStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathScale.value }],
  }))

  return (
    <View style={themed(() => ({ alignItems: "center", gap: 6 }))}>
      <Text style={themed(() => ({ marginBottom: theme.spacing.sm }))}>
        Round {Math.min(round, rounds)} / {rounds}
      </Text>
      <Animated.View style={animatedBreathStyle}>
        <Text preset="subheading" style={themed(() => ({ color: theme.colors.textDim }))}>
          {phase.toUpperCase()}
        </Text>
      </Animated.View>
    </View>
  )
}
