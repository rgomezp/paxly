import { useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { msUntilNextLocalMidnight } from "@/utils/date"
import DailyStreakManager from "@/managers/DailyStreakManager"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { PlantIcon } from "phosphor-react-native"

type Props = {
  refreshToken?: number
}

export default function DailyStreakSection({ refreshToken }: Props) {
  const { theme, themed } = useAppTheme()
  const [current, setCurrent] = useState(() => DailyStreakManager.getState().current)

  useEffect(() => {
    const refresh = () => setCurrent(DailyStreakManager.getState().current)
    refresh()

    // Refresh at local midnight so the display reflects day-boundary logic.
    const id = setTimeout(refresh, msUntilNextLocalMidnight())
    return () => clearTimeout(id)
  }, [refreshToken])

  const dayLabel = current === 1 ? "day" : "days"

  return (
    <View style={themed($container)}>
      <View style={themed($header)}>
        <Text text="Daily Streak" preset="subheading" style={themed({ color: theme.colors.text })} />
        <View style={themed($streakRow)}>
          <ThemedPhosphorIcon Component={PlantIcon} size={28} color={theme.colors.tint} />
          <View style={themed($streakTextRow)}>
            <Text text={`${current}`} size="xxl" weight="bold" style={themed({ color: theme.colors.tint })} />
            <Text text={dayLabel} size="xl" style={themed({ color: theme.colors.tint })} />
          </View>
        </View>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  marginTop: -22, // visually tuck under DailyTasksTimeline spacing
  marginBottom: 28,
}

const $header: ViewStyle = {
  marginHorizontal: 30,
}

const $streakRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginTop: 6,
}

const $streakTextRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "baseline",
  gap: 8,
}

