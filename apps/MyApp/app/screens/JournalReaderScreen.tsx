import { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ScrollView } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { TextStyle, ViewStyle } from "react-native"
import JournalManager from "@/managers/JournalManager"
import RectangularButton from "@/components/buttons/RectangularButton"
import { navigate } from "@/navigators/navigationUtilities"

interface JournalReaderScreenProps extends AppStackScreenProps<"JournalReader"> {}

export const JournalReaderScreen: FC<JournalReaderScreenProps> = observer(function JournalReaderScreen({
  route,
}) {
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const date = route.params?.date

  const entry = useMemo(
    () => JournalManager.getEntries().find((e) => e.date === date),
    [date],
  )

  const $containerInsetStyle = useMemo(() => ({ paddingTop: insets.top + 16 }), [insets.top])
  const $contentInsetStyle = useMemo(() => ({ paddingBottom: insets.bottom + 96 }), [insets.bottom])
  const $editContainerInsetStyle = useMemo(() => ({ bottom: insets.bottom }), [insets.bottom])

  return (
    <View style={[themed($container), $containerInsetStyle]}>
      <ScrollView style={themed($scroll)} contentContainerStyle={$contentInsetStyle}>
        <Text text="Journal Entry" preset="heading" style={themed($title)} />
        <Text style={themed($body)} text={entry?.text ?? ""} />
      </ScrollView>
      {entry ? (
        <View style={[themed($editContainer), $editContainerInsetStyle]}>
          <RectangularButton
            buttonText="Edit"
            onClick={() => navigate("Journal", { mode: "edit", date: entry.date, initialText: entry.text })}
          />
        </View>
      ) : null}
    </View>
  )
})

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

const $body: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  lineHeight: 22,
})

const $editContainer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  left: 16,
  right: 16,
})

export default JournalReaderScreen


