import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { Text } from "@/components"
import { $styles } from "@/theme/styles"
import { useAppTheme } from "@/utils/useAppTheme"
import { getLocalDateKey, msUntilNextLocalMidnight } from "@/utils/date"
import { Icon } from "@/components"
import DailyTaskManager from "@/managers/DailyTaskManager"
import FreeUserUsageManager from "@/managers/FreeUserUsageManager"
import { useStores } from "@/models"
import { useEntitlements } from "../entitlements/useEntitlements"
import { FEATURES } from "../entitlements/constants/features"
import { presentPaywallSafely } from "@/thirdParty/revenueCatUtils"
import { useFeatureFlags } from "@/hooks/useFlags"

type Props = {
  onPressMood: () => void
  onPressLesson?: () => void
  onPressJournal?: () => void
  refreshToken?: number
}

export default observer(function DailyTasksTimeline({
  onPressMood,
  onPressLesson,
  onPressJournal,
  refreshToken,
}: Props) {
  const { theme, themed } = useAppTheme()
  const { moodStore } = useStores()
  const [done, setDone] = useState({ mood: false, lesson: false, journal: false })
  const { hasFeatureAccess } = useEntitlements()
  const flags = useFeatureFlags()

  // Get the task limit from feature flags, fallback to default if not available
  const taskLimit = flags.task_limit_free_users ?? FreeUserUsageManager.getDefaultFreeLimit()

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
  }, [refreshToken])

  // Compute directly in render so MobX can track observable usage; avoid useMemo with observables
  const todayKey = getLocalDateKey()
  const history = moodStore.history
  let moodDone = false
  if (history.length) {
    for (const item of history) {
      const key = getLocalDateKey(new Date(item.date))
      if (key === todayKey) {
        moodDone = true
        break
      }
    }
  }

  const Row = (
    label: string,
    completed: boolean,
    onPress?: () => void,
    taskType?: "mood" | "journal",
  ) => {
    const innerOnPress = async () => {
      const hasPremium = hasFeatureAccess(FEATURES.PREMIUM_FEATURES)

      // If not premium, check free user limits for specific tasks using feature flag limit
      if (!hasPremium && taskType) {
        if (taskType === "mood" && FreeUserUsageManager.hasReachedMoodLogLimit(taskLimit)) {
          await presentPaywallSafely()
          return
        }
        if (taskType === "journal" && FreeUserUsageManager.hasReachedJournalLogLimit(taskLimit)) {
          await presentPaywallSafely()
          return
        }
      }

      // If premium or under limit, proceed
      onPress?.()
    }

    return (
      <TouchableOpacity onPress={innerOnPress} activeOpacity={0.9} style={themed([$row])}>
        <View
          style={[
            themed([$buttonContainer, { backgroundColor: theme.colors.card }]),
            $styles.borderRadius,
            $styles.dropShadow,
          ]}
        >
          <View style={$leftGroup}>
            <View
              style={[
                $checkCircle,
                {
                  borderColor: theme.colors.tint,
                  ...(completed ? { backgroundColor: theme.colors.tint } : {}),
                },
              ]}
            >
              {completed && <Icon icon="check" size={12} color={theme.colors.background} />}
            </View>
            <Text text={label} size="xs" style={themed({ color: theme.colors.text })} />
          </View>
          <Icon icon="caretRight" color={theme.colors.tint} size={12} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={themed($container)}>
      <View style={themed($header)}>
        <Text text="Daily Tasks" preset="subheading" style={themed({ color: theme.colors.text })} />
      </View>
      <View style={themed([$timeline])}>
        {Row("Log your mood", moodDone, () => {
          onPressMood()
        }, "mood")}
        {false &&
          Row("Daily lesson", done.lesson, () => {
            onPressLesson?.()
          })}
        {Row("Write in your journal", done.journal, () => {
          onPressJournal?.()
        }, "journal")}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  marginVertical: 46,
}

const $header: ViewStyle = {
  marginBottom: 20,
  marginLeft: 30,
}

const $timeline: ViewStyle = {
  flexDirection: "column",
  gap: 22,
  paddingHorizontal: 20,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $buttonContainer: ViewStyle = {
  flex: 1,
  height: 56,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
}

const $checkCircle: ViewStyle = {
  height: 32,
  width: 32,
  borderRadius: 16,
  borderWidth: 2,
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
}

const $leftGroup: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

// removed dashed timeline styles
