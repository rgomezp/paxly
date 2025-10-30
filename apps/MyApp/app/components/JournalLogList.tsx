import { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, Pressable } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "./Text"
import { ThemedFontAwesome5Icon } from "./ThemedFontAwesome5Icon"
import { navigate } from "@/navigators/navigationUtilities"
import { useStores } from "@/models"
import { EmptyState } from "./EmptyState"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle as RNViewStyle } from "react-native"

const PREVIEW_CHAR_LIMIT = 120

const JournalLogList: FC = observer(function JournalLogList() {
  const { theme, themed } = useAppTheme()
  const { journalStore } = useStores()
  const entries = useMemo(() => journalStore.sortedEntries, [journalStore.sortedEntries])

  return (
    <View style={themed($listWrapper)}>
      {entries.length === 0 ? (
        <EmptyState
          style={themed($emptyStateContainer as any)}
          heading="No journal entries yet"
          content="Your thoughts will appear here. Start your first entry to get going."
        />
      ) : null}
      {entries.map((item, idx) => {
        const preview =
          item.text.length > PREVIEW_CHAR_LIMIT
            ? item.text.slice(0, PREVIEW_CHAR_LIMIT) + "…"
            : item.text

        return (
          <View key={`journal-item-${item.date}-${idx}`}>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigate("JournalReader", { date: item.date })}
              style={themed($row)}
            >
              <View style={[themed($iconBox), { backgroundColor: theme.colors.card }]}>
                <ThemedFontAwesome5Icon name="fire" color={theme.colors.text} size={18} solid />
              </View>
              <View style={$rowContent}>
                <Text style={themed([$entryText, { color: theme.colors.text }])}>{preview}</Text>
                <Text style={themed([$timeText, { color: theme.colors.textDim }])}>
                  {formatRelativeTime(item.date)}
                </Text>
              </View>
            </Pressable>
            <View style={[themed($divider), { backgroundColor: theme.colors.separator }]} />
          </View>
        )
      })}
    </View>
  )
})

export default JournalLogList

const $listWrapper: ViewStyle = {
  paddingHorizontal: 16,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 12,
}

const $iconBox: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 12,
  marginRight: 12,
  alignItems: "center",
  justifyContent: "center",
}

const $rowContent: ViewStyle = {
  flex: 1,
  marginLeft: 12,
}

const $entryText: TextStyle = {
  fontSize: 14,
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

const $emptyStateContainer: ThemedStyle<RNViewStyle> = () => ({
  marginBottom: 16,
})
