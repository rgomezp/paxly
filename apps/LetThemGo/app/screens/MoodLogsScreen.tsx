import { FC, useMemo, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, Alert, Pressable } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
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
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle as RNViewStyle } from "react-native"

interface MoodLogsScreenProps extends AppStackScreenProps<"MoodLogs"> {}

type MoodLogListItem = IMoodHistoryItem & { id: string }

export const MoodLogsScreen: FC<MoodLogsScreenProps> = observer(function MoodLogsScreen() {
  const insets = useSafeAreaInsets()
  const { theme, themed } = useAppTheme()
  const { moodStore } = useStores()
  const swipeableRefs = useRef<Map<string, Swipeable>>(new Map())

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

  const handleDelete = (item: MoodLogListItem) => {
    Alert.alert("Delete mood log", "Are you sure you want to delete this mood log?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Close the swipeable first to hide the delete button
          const swipeable = swipeableRefs.current.get(item.id)
          swipeable?.close()

          // Clean up the ref
          swipeableRefs.current.delete(item.id)

          // Delete the mood log
          MoodManager.deleteByDate(item.date)
          // Also update the store to ensure UI updates immediately
          moodStore.deleteByDate(item.date)
        },
      },
    ])
  }

  const renderItem = ({ item }: { item: MoodLogListItem }) => {
    const renderRightActions = () => {
      return (
        <Pressable
          onPress={() => handleDelete(item)}
          style={[themed($deleteAction), { backgroundColor: theme.colors.palette.negative }]}
        >
          <ThemedFontAwesome5Icon name="trash" color={theme.colors.text} size={20} solid />
        </Pressable>
      )
    }

    return (
      <Swipeable
        ref={(ref) => {
          if (ref) {
            swipeableRefs.current.set(item.id, ref)
          } else {
            swipeableRefs.current.delete(item.id)
          }
        }}
        renderRightActions={renderRightActions}
        rightThreshold={40}
      >
        <View style={$itemWrapper}>
          <MoodLogItem item={item} />
        </View>
      </Swipeable>
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

const $deleteAction: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 80,
  borderRadius: 12,
  marginRight: 16,
  marginBottom: 12,
}

const $emptyStateWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $emptyStateContainer: ThemedStyle<RNViewStyle> = () => ({
  paddingHorizontal: 26,
})
