import { useEffect, useState } from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { Text } from "@/components"
import { $styles } from "@/theme/styles"
import { useAppTheme } from "@/utils/useAppTheme"
import { msUntilNextLocalMidnight } from "@/utils/date"
import { Icon } from "@/components"
import DailyTaskManager from "@/managers/DailyTaskManager"

type Props = {
  onPressMood: () => void
  onPressLesson?: () => void
  onPressJournal?: () => void
}

export default function DailyTasksTimeline({ onPressMood, onPressLesson, onPressJournal }: Props) {
  const { theme, themed } = useAppTheme()
  const [done, setDone] = useState({ mood: false, lesson: false, journal: false })

  useEffect(() => {
    // Initialize from persisted state, ensuring today's dateKey
    const state = DailyTaskManager.getState()
    setDone({ mood: state.mood, lesson: state.lesson, journal: state.journal })

    // Schedule a local midnight refresh to reflect reset
    const reset = () => {
      const fresh = DailyTaskManager.getState()
      setDone({ mood: fresh.mood, lesson: fresh.lesson, journal: fresh.journal })
    }
    const ms = msUntilNextLocalMidnight()
    const id = setTimeout(reset, ms)
    return () => clearTimeout(id)
  }, [])

  const circle = (label: string, completed: boolean, onPress?: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        themed([$button, { backgroundColor: theme.colors.card }]),
        $styles.borderRadius,
        $styles.dropShadow,
      ]}
      activeOpacity={0.8}
    >
      <View style={$labelRow}>
        <Text text={label} size="xxs" style={themed({ color: theme.colors.tint })} />
        <Icon icon="caretRight" color={theme.colors.tint} size={10} containerStyle={$iconRight} />
      </View>
      {completed && (
        <View style={[$checkBadge, { backgroundColor: theme.colors.tint }]}>
          <Icon icon="check" color={theme.colors.background} size={10} />
        </View>
      )}
    </TouchableOpacity>
  )

  const Dash = () => (
    <View style={$dashContainer}>
      {Array.from({ length: 20 }).map((_, i) => (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={[$dashSegment, { backgroundColor: theme.colors.textDim }]}
        />
      ))}
    </View>
  )

  return (
    <View style={themed($container)}>
      <View style={themed($header)}>
        <Text text="Daily Tasks" size="xxs" style={themed({ color: theme.colors.text })} />
      </View>
      <View style={themed([$timeline])}>
        {circle("Mood", done.mood, () => {
          onPressMood()
        })}
        <Dash />
        {circle("Lesson", done.lesson, () => {
          onPressLesson?.()
        })}
        <Dash />
        {circle("Journal", done.journal, () => {
          onPressJournal?.()
        })}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  marginVertical: 46,
}

const $header: ViewStyle = {
  marginBottom: 20,
  marginLeft: 30,
}

const $timeline: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}

const $button: ViewStyle = {
  width: 80,
  height: 56,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}

const $labelRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $iconRight: ViewStyle = {
  marginLeft: 6,
}

// deprecated placeholder kept for backward compatibility
const $dashContainer: ViewStyle = {
  width: 36,
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 6,
  overflow: "hidden",
}

const $dashSegment: ViewStyle = {
  width: 4,
  height: 1,
  marginHorizontal: 3,
}

const $checkBadge: ViewStyle = {
  position: "absolute",
  top: -4,
  right: -4,
  width: 14,
  height: 14,
  borderRadius: 7,
  alignItems: "center",
  justifyContent: "center",
}
