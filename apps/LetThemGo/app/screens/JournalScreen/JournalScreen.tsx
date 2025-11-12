import { FC, useMemo, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { TextStyle, ViewStyle } from "react-native"
import { useStores } from "@/models"
import DailyTaskManager from "@/managers/DailyTaskManager"
import FreeUserUsageManager from "@/managers/FreeUserUsageManager"
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"
import FloatingCenterWrapper from "@/components/FloatingCenterWrapper"
import { useEntitlements } from "@/entitlements/useEntitlements"
import { FEATURES } from "@/entitlements/constants/features"
import { getRandomPrompt } from "./prompts"

interface JournalScreenProps extends AppStackScreenProps<"Journal"> {}

export const JournalScreen: FC<JournalScreenProps> = observer(function JournalScreen({
  navigation,
  route,
}) {
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const [text, setText] = useState(route.params?.initialText ?? "")
  const scrollViewRef = useRef<ScrollView>(null)
  const inputRef = useRef<TextInput>(null)
  const { journalStore } = useStores()
  const { hasFeatureAccess } = useEntitlements()

  const isEdit = route.params?.mode === "edit" && typeof route.params?.date === "number"

  const trimmedText = text.trim()
  const initialTrimmed = (route.params?.initialText ?? "").trim()
  const isValid = isEdit
    ? trimmedText.length > 0 && trimmedText !== initialTrimmed
    : trimmedText.length > 0

  function onSave() {
    if (!text.trim()) {
      navigation.goBack()
      return
    }

    // For new entries (not edits), increment count for free users when they save
    if (!isEdit) {
      const hasPremium = hasFeatureAccess(FEATURES.PREMIUM_FEATURES)
      if (!hasPremium) {
        FreeUserUsageManager.incrementJournalLogCount()
      }
    }

    if (isEdit) {
      journalStore.updateByDate(route.params!.date as number, text.trim())
    } else {
      journalStore.create(text.trim())
      DailyTaskManager.markCompleted("journal")
    }
    navigation.goBack()
  }

  // Handle cursor position changes to scroll to the cursor
  const handleSelectionChange = (event: any) => {
    if (scrollViewRef.current && event.nativeEvent.selection) {
      // Add a small delay to ensure the keyboard is fully shown
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }

  const $containerInsetStyle = useMemo(() => ({ paddingTop: insets.top + 16 }), [insets.top])
  const $contentInsetStyle = useMemo(
    () => ({ paddingBottom: insets.bottom + 120 }),
    [insets.bottom],
  )

  const [showPromptButton, setShowPromptButton] = useState(true)
  const [promptText, setPromptText] = useState<string>("What's on your heart today?")

  const handleShowPrompt = () => {
    setPromptText(getRandomPrompt())
    setShowPromptButton(false)
    // Focus the input to make the placeholder visible
    inputRef.current?.focus()
  }

  return (
    <KeyboardAvoidingView
      style={themed($container)}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={[themed($innerContainer), $containerInsetStyle]}>
        <ScrollView
          ref={scrollViewRef}
          style={themed($scroll)}
          contentContainerStyle={$contentInsetStyle}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={true}
        >
          <Text
            text={isEdit ? "Edit Journal" : "Journal"}
            preset="heading"
            style={themed($title)}
          />
          <View style={themed($inputWrapper)}>
            <TextInput
              ref={inputRef}
              placeholder={promptText}
              placeholderTextColor={theme.colors.textDim}
              value={text}
              onChangeText={(newText) => {
                setText(newText)
                if (newText.length > 0) {
                  setShowPromptButton(false)
                }
              }}
              multiline
              style={themed($input)}
              scrollEnabled={false} // Important: disable TextInput's internal scrolling
              onSelectionChange={handleSelectionChange}
              textAlignVertical="top"
              // Add these props for better keyboard handling
              blurOnSubmit={false}
              returnKeyType="default"
              autoCorrect={true}
              autoCapitalize="sentences"
            />
          </View>
        </ScrollView>
      </View>
      {showPromptButton && (
        <FloatingCenterWrapper position="bottom" margin={90}>
          <Pressable onPress={handleShowPrompt} style={themed($promptButton)}>
            <Text style={themed($promptButtonText)}>Get a prompt</Text>
          </Pressable>
        </FloatingCenterWrapper>
      )}
      <FloatingCenterButton isValid={isValid} text="Save" onPress={onSave} />
    </KeyboardAvoidingView>
  )
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $innerContainer: ThemedStyle<ViewStyle> = () => ({
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

const $inputWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  minHeight: 180,
})

const $input: ThemedStyle<TextStyle> = (theme) => ({
  minHeight: 180,
  borderRadius: 12,
  padding: 12,
  color: theme.colors.text,
  backgroundColor: theme.colors.card,
  fontSize: 16,
  lineHeight: 24,
})

const $promptButton: ThemedStyle<ViewStyle> = () => ({
  paddingVertical: 8,
  paddingHorizontal: 12,
  alignItems: "center",
  justifyContent: "center",
})

const $promptButtonText: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 14,
  color: theme.colors.tint,
  fontStyle: "italic",
})
