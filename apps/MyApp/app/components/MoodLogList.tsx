import { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "@/models"
import MoodManager from "@/managers/MoodManager"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { MoodCategory } from "@/types/MoodCategory"
import { activityToPhrase } from "@/types/Activities"
import { Text } from "./Text"
import { EmptyState } from "./EmptyState"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle as RNViewStyle } from "react-native"

const MoodLogList: FC = observer(function MoodLogList() {
  const { theme, themed } = useAppTheme()
  const { moodStore } = useStores()

  const historySource: IMoodHistoryItem[] = moodStore.history.length
    ? (moodStore.history.slice() as IMoodHistoryItem[])
    : MoodManager.getHistory()
  const history: IMoodHistoryItem[] = historySource.slice().sort((a, b) => b.date - a.date)

  const colors = {
    negative: theme.colors.palette.negative,
    neutral: theme.colors.palette.neutral,
    positive: theme.colors.palette.positive,
  }

  return (
    <View style={themed($listWrapper)}>
      {history.length === 0 ? (
        <EmptyState
          style={themed($emptyStateContainer as any)}
          heading="No mood logs yet"
          content="Track how you feel to see insights over time."
        />
      ) : null}
      {history.map((item, idx) => {
        let moodColor: string = colors.positive as string
        if (item.mood.category === MoodCategory.Negative) moodColor = colors.negative
        else if (item.mood.category === MoodCategory.Neutral) moodColor = colors.neutral

        const activityPhrase = activityToPhrase(item.activity)

        return (
          <View key={`mood-item-${item.date}-${idx}`}>
            <View style={themed($row)}>
              <View style={$rowContent}>
                <Text style={themed([$lineOneText, { color: theme.colors.text }])}>
                  You felt{" "}
                  <Text weight="bold" style={{ color: moodColor }}>
                    {item.mood.title}
                  </Text>{" "}
                  while{" "}
                  <Text style={[$activityText, { color: theme.colors.text }]}>
                    {activityPhrase}
                  </Text>
                </Text>
                {!!item.notes && (
                  <Text style={themed([$notesText, { color: theme.colors.text }])}>
                    {item.notes}
                  </Text>
                )}
                <Text style={themed([$timeText, { color: theme.colors.textDim }])}>
                  {formatRelativeTime(item.date)}
                </Text>
              </View>
            </View>
            <View style={[themed($divider), { backgroundColor: theme.colors.separator }]} />
          </View>
        )
      })}
    </View>
  )
})

export default MoodLogList

const $listWrapper: ViewStyle = {
  paddingHorizontal: 26,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 12,
}

const $rowContent: ViewStyle = {
  flex: 1,
}

const $lineOneText: TextStyle = {
  marginBottom: 2,
}

const $activityText: TextStyle = {
  fontWeight: "700",
}

const $notesText: TextStyle = {
  marginTop: 8,
  opacity: 0.7,
}

const $timeText: TextStyle = {
  marginTop: 6,
  fontSize: 14,
}

const $divider: ViewStyle = {
  height: 1,
  opacity: 0.2,
}

function formatRelativeTime(timestamp: number): string {
  const seconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000))
  if (seconds < 45) return "a moment ago"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours === 1 ? "an hour ago" : `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "yesterday"
  if (days < 7) return `${days} days ago`
  const weeks = Math.floor(days / 7)
  return weeks === 1 ? "a week ago" : `${weeks} weeks ago`
}

const $emptyStateContainer: ThemedStyle<RNViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
