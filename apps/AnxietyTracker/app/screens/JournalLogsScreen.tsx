import { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, Pressable } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { ListView } from "@/components/ListView"
import { useStores } from "@/models"
import { Text } from "@/components/Text"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { navigate } from "@/navigators/navigationUtilities"
import { EmptyState } from "@/components/EmptyState"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle as RNViewStyle } from "react-native"
import { useHeader } from "@/utils/useHeader"

interface JournalLogsScreenProps extends AppStackScreenProps<"JournalLogs"> {}

const PREVIEW_CHAR_LIMIT = 120

type JournalLogItem = {
  id: string
  date: number
  text: string
}

export const JournalLogsScreen: FC<JournalLogsScreenProps> = observer(function JournalLogsScreen({
  navigation,
}) {
  const { theme, themed } = useAppTheme()
  const { journalStore } = useStores()

  useHeader(
    {
      LeftActionComponent: (
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={themed($headerAction)}
        >
          <ThemedFontAwesome5Icon name="chevron-left" color={theme.colors.text} size={18} solid />
        </Pressable>
      ),
    },
    [navigation, theme.colors.text],
  )

  const entries: JournalLogItem[] = useMemo(
    () =>
      journalStore.sortedEntries.map((item, idx) => ({
        id: `journal-item-${item.date}-${idx}`,
        date: item.date,
        text: item.text,
      })),
    [journalStore.sortedEntries],
  )

  const renderItem = ({ item }: { item: JournalLogItem }) => {
    const preview =
      item.text.length > PREVIEW_CHAR_LIMIT
        ? item.text.slice(0, PREVIEW_CHAR_LIMIT) + "…"
        : item.text

    return (
      <View>
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
  }

  const renderHeader = () => (
    <View style={themed($headerContainer)}>
      <Text text="Journal Entries" preset="heading" style={themed($title)} />
    </View>
  )

  return (
    <View style={themed($container)}>
      {entries.length === 0 ? (
        <View style={themed($emptyStateWrapper)}>
          <EmptyState
            style={themed($emptyStateContainer as any)}
            heading="No journal entries yet"
            content="Your thoughts will appear here. Start your first entry to get going."
          />
        </View>
      ) : (
        <ListView
          data={entries}
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
  paddingHorizontal: 16,
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
  marginHorizontal: 16,
}

const $emptyStateWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $emptyStateContainer: ThemedStyle<RNViewStyle> = () => ({
  paddingHorizontal: 16,
})

const $headerAction: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  height: 56,
  alignItems: "center",
  justifyContent: "center",
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
