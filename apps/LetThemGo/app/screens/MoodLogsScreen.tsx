import { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import { ListView } from "@/components/ListView"
import { useStores } from "@/models"
import MoodManager from "@/managers/MoodManager"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { MoodCategory } from "@/types/MoodCategory"
import { activityToPhrase } from "@/types/Activities"
import { Text } from "@/components/Text"
import { EmptyState } from "@/components/EmptyState"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle as RNViewStyle } from "react-native"

interface MoodLogsScreenProps extends AppStackScreenProps<"MoodLogs"> {}

type MoodLogItem = IMoodHistoryItem & { id: string }

export const MoodLogsScreen: FC<MoodLogsScreenProps> = observer(function MoodLogsScreen() {
  const insets = useSafeAreaInsets()
  const { theme, themed } = useAppTheme()
  const { moodStore } = useStores()

  const historySource: IMoodHistoryItem[] = moodStore.history.length
    ? (moodStore.history.slice() as IMoodHistoryItem[])
    : MoodManager.getHistory()
  const history: MoodLogItem[] = useMemo(
    () =>
      historySource
        .slice()
        .sort((a, b) => b.date - a.date)
        .map((item, idx) => ({ ...item, id: `mood-item-${item.date}-${idx}` })),
    [historySource],
  )

  const colors = {
    negative: theme.colors.palette.negative,
    neutral: theme.colors.palette.neutral,
    positive: theme.colors.palette.positive,
  }

  const renderItem = ({ item }: { item: MoodLogItem }) => {
    let moodColor: string = colors.positive as string
    if (item.mood.category === MoodCategory.Negative) moodColor = colors.negative
    else if (item.mood.category === MoodCategory.Neutral) moodColor = colors.neutral

    const activityPhrase = activityToPhrase(item.activity)

    return (
      <View>
        <View style={themed($row)}>
          <View style={$rowContent}>
            <Text style={themed([$lineOneText, { color: theme.colors.text }])}>
              You felt{" "}
              <Text weight="bold" style={{ color: moodColor }}>
                {item.mood.title}
              </Text>{" "}
              while{" "}
              <Text style={[$activityText, { color: theme.colors.text }]}>{activityPhrase}</Text>
            </Text>
            {!!item.notes && (
              <Text style={themed([$notesText, { color: theme.colors.text }])}>{item.notes}</Text>
            )}
            <Text style={themed([$timeText, { color: theme.colors.textDim }])}>
              {formatRelativeTime(item.date)}
            </Text>
          </View>
        </View>
        <View style={[themed($divider), { backgroundColor: theme.colors.separator }]} />
      </View>
    )
  }

  const renderHeader = () => (
    <View style={themed($headerContainer)}>
      <Text text="Mood Logs" preset="heading" style={themed($title)} />
    </View>
  )

  return (
    <View style={[themed($container), { paddingTop: insets.top }]}>
      {history.length === 0 ? (
        <View style={themed($emptyStateWrapper)}>
          <EmptyState
            style={themed($emptyStateContainer as any)}
            heading="No mood logs yet"
            content="Track how you feel to see insights over time."
          />
        </View>
      ) : (
        <ListView
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          ListHeaderComponent={renderHeader}
        />
      )}
    </View>
  )
})

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
})

const $headerContainer: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 24,
}

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
})

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 12,
  paddingHorizontal: 26,
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
  marginHorizontal: 26,
}

const $emptyStateWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $emptyStateContainer: ThemedStyle<RNViewStyle> = () => ({
  paddingHorizontal: 26,
})

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
