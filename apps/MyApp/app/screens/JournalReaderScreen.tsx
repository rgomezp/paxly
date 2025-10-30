import { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ScrollView, Alert, Pressable } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { TextStyle, ViewStyle } from "react-native"
import { navigate } from "@/navigators/navigationUtilities"
import { useStores } from "@/models"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { isAlive } from "mobx-state-tree"
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"

interface JournalReaderScreenProps extends AppStackScreenProps<"JournalReader"> {}

export const JournalReaderScreen: FC<JournalReaderScreenProps> = observer(
  function JournalReaderScreen({ route, navigation }) {
    const { themed, theme } = useAppTheme()
    const insets = useSafeAreaInsets()
    const date = route.params?.date
    const { journalStore } = useStores()

    const entry = useMemo(() => {
      return journalStore.entries.find((e) => e.date === date)
    }, [journalStore.entries, date])
    const isEntryAlive = entry ? isAlive(entry as any) : false
    const displayedText = isEntryAlive ? entry!.text : ""
    const formattedDate = useMemo(() => {
      if (!isEntryAlive || !entry) return ""
      try {
        const d = new Date(entry.date)
        return d.toLocaleString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      } catch {
        return ""
      }
    }, [isEntryAlive, entry])

    const $deleteButtonInsetStyle = useMemo(() => ({ top: insets.top + 8 }), [insets.top])

    const $containerInsetStyle = useMemo(() => ({ paddingTop: insets.top + 16 }), [insets.top])
    const $contentInsetStyle = useMemo(
      () => ({ paddingBottom: insets.bottom + 96 }),
      [insets.bottom],
    )

    return (
      <View style={[themed($container), $containerInsetStyle]}>
        {isEntryAlive ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              const dateToDelete = entry!.date
              Alert.alert("Delete entry", "Are you sure you want to delete this journal entry?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    journalStore.deleteByDate(dateToDelete)
                    navigation.goBack()
                  },
                },
              ])
            }}
            style={[themed($topRightAction), $deleteButtonInsetStyle]}
          >
            <ThemedFontAwesome5Icon name="trash" color={theme.colors.text} size={18} solid />
          </Pressable>
        ) : null}
        <ScrollView style={themed($scroll)} contentContainerStyle={$contentInsetStyle}>
          <Text text="Journal Entry" preset="heading" style={themed($title)} />
          {formattedDate ? (
            <Text preset="subheading" style={themed($dateSubheading)} text={formattedDate} />
          ) : null}
          <Text style={themed($body)} text={displayedText} />
        </ScrollView>
        {isEntryAlive ? (
          <FloatingCenterButton
            isValid={true}
            text="Edit"
            onPress={() => {
              navigate("Journal", { mode: "edit", date: entry!.date, initialText: entry!.text })
            }}
          />
        ) : null}
      </View>
    )
  },
)

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
})

const $scroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 16,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: 12,
})

const $dateSubheading: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  marginBottom: 12,
})

const $body: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  lineHeight: 22,
})

const $topRightAction: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  right: 12,
  padding: 8,
  zIndex: 1,
})

export default JournalReaderScreen
