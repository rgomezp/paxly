import { Text } from "@/components/Text"
import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
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
  return (
    <View style={themed(() => ({ alignItems: "center", gap: 6 }))}>
      <Text>
        Round {Math.min(round, rounds)} / {rounds}
      </Text>
      <Text style={themed(() => ({ color: theme.colors.textDim }))}>Phase: {phase}</Text>
    </View>
  )
}
