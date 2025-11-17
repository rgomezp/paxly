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
import { Text } from "@/components/Text"
import { EmptyState } from "@/components/EmptyState"
import { MoodLogItem } from "@/components/MoodLogItem"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle as RNViewStyle } from "react-native"

interface MoodLogsScreenProps extends AppStackScreenProps<"MoodLogs"> {}

type MoodLogListItem = IMoodHistoryItem & { id: string }

export const MoodLogsScreen: FC<MoodLogsScreenProps> = observer(function MoodLogsScreen() {
  const insets = useSafeAreaInsets()
  const { themed } = useAppTheme()
  const { moodStore } = useStores()

  const historySource: IMoodHistoryItem[] = moodStore.history.length
    ? (moodStore.history.slice() as IMoodHistoryItem[])
    : MoodManager.getHistory()
  const history: MoodLogListItem[] = useMemo(
    () =>
      historySource
        .slice()
        .sort((a, b) => b.date - a.date)
        .map((item, idx) => ({ ...item, id: `mood-item-${item.date}-${idx}` })),
    [historySource],
  )

  const renderItem = ({ item }: { item: MoodLogListItem }) => {
    return (
      <View style={$itemWrapper}>
        <MoodLogItem item={item} />
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

const $itemWrapper: ViewStyle = {
  paddingHorizontal: 16,
}

const $emptyStateWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $emptyStateContainer: ThemedStyle<RNViewStyle> = () => ({
  paddingHorizontal: 26,
})
