import { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { MoodCategory } from "@/types/MoodCategory"
import { activityToPhrase } from "@/types/Activities"
import { MOOD_TO_EMOJI, MoodId } from "@/types/Moods"
import { Text } from "./Text"

export interface MoodLogItemProps {
  item: IMoodHistoryItem
  showDivider?: boolean
}

export const MoodLogItem: FC<MoodLogItemProps> = function MoodLogItem({
  item,
  showDivider = true,
}) {
  const { theme, themed } = useAppTheme()

  const colors = {
    negative: theme.colors.palette.negative,
    neutral: theme.colors.palette.neutral,
    positive: theme.colors.palette.positive,
  }

  let moodColor: string = colors.positive as string
  if (item.mood.category === MoodCategory.Negative) moodColor = colors.negative
  else if (item.mood.category === MoodCategory.Neutral) moodColor = colors.neutral

  const activityPhrase = activityToPhrase(item.activity)
  const moodEmoji = MOOD_TO_EMOJI[item.mood.title as MoodId] || "😐"

  return (
    <View>
      <View style={themed($row)}>
        <View style={[themed($emojiBox), { backgroundColor: theme.colors.card }]}>
          <Text style={$emojiText}>{moodEmoji}</Text>
        </View>
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
      {showDivider && (
        <View style={[themed($divider), { backgroundColor: theme.colors.separator }]} />
      )}
    </View>
  )
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 12,
}

const $emojiBox: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 12,
  marginRight: 12,
  alignItems: "center",
  justifyContent: "center",
}

const $emojiText: TextStyle = {
  fontSize: 24,
  lineHeight: 30,
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
  marginVertical: 12,
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
