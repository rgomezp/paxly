import { Text } from "@/components/Text"
import { useEffect, useState } from "react"
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
  useEffect(() => {
    const id = setInterval(() => setLeft((t) => (t > 0 ? t - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    if (left === 0) onDone?.()
  }, [left, onDone])
  return (
    <View style={themed(() => ({ alignItems: "center", gap: 8 }))}>
      <Text style={themed(() => ({ color: theme.colors.text, fontSize: 64, fontWeight: "800" }))}>
        {left}
      </Text>
      {!!label && <Text style={themed(() => ({ color: theme.colors.textDim }))}>{label}</Text>}
    </View>
  )
}
