import { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { TextStyle, ViewStyle } from "react-native"
import JournalManager from "@/managers/JournalManager"
import DailyTaskManager from "@/managers/DailyTaskManager"
import RectangularButton from "@/components/buttons/RectangularButton"

interface JournalScreenProps extends AppStackScreenProps<"Journal"> {}

export const JournalScreen: FC<JournalScreenProps> = observer(function JournalScreen({
  navigation,
}) {
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const [text, setText] = useState("")

  function onSave() {
    if (!text.trim()) {
      navigation.goBack()
      return
    }
    JournalManager.create(text.trim())
    DailyTaskManager.markCompleted("journal")
    navigation.goBack()
  }

  const $containerInsetStyle = useMemo(() => ({ paddingTop: insets.top + 16 }), [insets.top])
  const $contentInsetStyle = useMemo(() => ({ paddingBottom: insets.bottom + 96 }), [insets.bottom])
  const $saveContainerInsetStyle = useMemo(() => ({ bottom: insets.bottom }), [insets.bottom])

  return (
    <KeyboardAvoidingView
      style={themed($root)}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={insets.top}
    >
      <View style={[themed($container), $containerInsetStyle]}>
        <ScrollView
          style={themed($scroll)}
          contentContainerStyle={$contentInsetStyle}
          keyboardShouldPersistTaps="handled"
        >
          <Text text="Journal" preset="heading" style={themed($title)} />
          <TextInput
            placeholder="Write your thoughts..."
            placeholderTextColor={theme.colors.textDim}
            value={text}
            onChangeText={setText}
            multiline
            style={themed($input)}
          />
        </ScrollView>

        <View style={[themed($saveContainer), $saveContainerInsetStyle]}>
          <RectangularButton buttonText="Save" onClick={onSave} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
})

const $root: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $scroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 16,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: 12,
})

const $input: ThemedStyle<ViewStyle> = (theme) => ({
  minHeight: 180,
  borderRadius: 12,
  padding: 12,
  color: theme.colors.text,
  backgroundColor: theme.colors.card,
  textAlignVertical: "top",
})

const $saveContainer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  left: 16,
  right: 16,
})
