import { FC, useMemo, useState, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { TextStyle, ViewStyle } from "react-native"
import { useStores } from "@/models"
import DailyTaskManager from "@/managers/DailyTaskManager"
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"
import FloatingCenterWrapper from "@/components/FloatingCenterWrapper"
import { getRandomPrompt } from "./prompts"

interface JournalScreenProps extends AppStackScreenProps<"Journal"> {}

export const JournalScreen: FC<JournalScreenProps> = observer(function JournalScreen({
  navigation,
  route,
}) {
  const { themed, theme } = useAppTheme()
  const [text, setText] = useState(route.params?.initialText ?? "")
  const scrollViewRef = useRef<ScrollView>(null)
  const inputRef = useRef<TextInput>(null)
  const { journalStore } = useStores()

  const isEdit = route.params?.mode === "edit" && typeof route.params?.date === "number"
  const DEFAULT_PROMPT = "What's on your heart today?"

  const trimmedText = text.trim()
  const initialTrimmed = (route.params?.initialText ?? "").trim()
  const isValid = isEdit
    ? trimmedText.length > 0 && trimmedText !== initialTrimmed
    : trimmedText.length > 0

  // Length thresholds for the indicator
  const MEDIUM_THRESHOLD = 150
  const LONG_THRESHOLD = 300

  // Calculate progress for each segment of the progress bar
  const getProgressBarData = () => {
    const length = text.length

    // First segment (negative): 0 to MEDIUM_THRESHOLD
    const negativeProgress = Math.min(length / MEDIUM_THRESHOLD, 1)

    // Second segment (neutral): MEDIUM_THRESHOLD to LONG_THRESHOLD
    const neutralProgress =
      length < MEDIUM_THRESHOLD
        ? 0
        : Math.min((length - MEDIUM_THRESHOLD) / (LONG_THRESHOLD - MEDIUM_THRESHOLD), 1)

    // Third segment (positive): LONG_THRESHOLD onwards
    const positiveProgress =
      length < LONG_THRESHOLD ? 0 : Math.min((length - LONG_THRESHOLD) / 100, 1)

    return {
      negative: negativeProgress,
      neutral: neutralProgress,
      positive: positiveProgress,
    }
  }

  const progressData = getProgressBarData()
  const hasReachedPositive = text.length >= LONG_THRESHOLD

  // Calculate segment colors and widths
  const segmentStyles = useMemo(() => {
    const positiveColor = theme.colors.palette.positive
    return {
      negative: {
        backgroundColor: hasReachedPositive ? positiveColor : theme.colors.palette.negative,
        width: (hasReachedPositive ? "100%" : `${progressData.negative * 100}%`) as string,
        backgroundBg: hasReachedPositive ? positiveColor : theme.colors.palette.negative,
      },
      neutral: {
        backgroundColor: hasReachedPositive ? positiveColor : theme.colors.palette.neutral,
        width: (hasReachedPositive ? "100%" : `${progressData.neutral * 100}%`) as string,
        backgroundBg: hasReachedPositive ? positiveColor : theme.colors.palette.neutral,
      },
      positive: {
        backgroundColor: positiveColor,
        width: (hasReachedPositive ? "100%" : `${progressData.positive * 100}%`) as string,
        backgroundBg: positiveColor,
      },
    }
  }, [hasReachedPositive, progressData, theme])

  // Load saved prompt when editing
  const editDate = route.params?.date
  useEffect(() => {
    if (isEdit && editDate) {
      const entry = journalStore.entries.find((e) => e.date === editDate)
      if (entry?.prompt) {
        setPromptText(entry.prompt)
      } else {
        setPromptText(DEFAULT_PROMPT)
      }
    } else {
      setPromptText(DEFAULT_PROMPT)
    }
  }, [isEdit, editDate, journalStore.entries])

  function onSave() {
    if (!text.trim()) {
      navigation.goBack()
      return
    }

    // Only save prompt if it's different from the default
    // Pass undefined to clear it if it's the default, or the custom prompt if it's not
    const promptToSave = promptText !== DEFAULT_PROMPT ? promptText : undefined

    if (isEdit) {
      // Always pass promptToSave (even if undefined) to allow clearing the prompt
      journalStore.updateByDate(route.params!.date as number, text.trim(), promptToSave)
    } else {
      journalStore.create(text.trim(), promptToSave)
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

  const insets = useSafeAreaInsets()
  const $containerInsetStyle = useMemo(() => ({ paddingTop: 16 }), [])
  const $contentInsetStyle = useMemo(
    () => ({ paddingBottom: insets.bottom + 120 }),
    [insets.bottom],
  )

  const [promptText, setPromptText] = useState<string>(DEFAULT_PROMPT)

  const handleShowPrompt = () => {
    setPromptText(getRandomPrompt())
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
          <Text text={promptText} preset="subheading" />
          <View style={themed($inputWrapper)}>
            <TextInput
              ref={inputRef}
              placeholder="Start writing..."
              placeholderTextColor={theme.colors.textDim}
              value={text}
              onChangeText={setText}
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
            <View style={themed($indicatorContainer)}>
              <View style={themed($progressBar)}>
                {/* Negative segment */}
                <View style={themed($progressSegmentContainer)}>
                  <View
                    style={[
                      themed($progressSegmentBackgroundNegative),
                      { backgroundColor: segmentStyles.negative.backgroundBg },
                    ]}
                  />
                  <View
                    style={[
                      themed($progressSegmentFill),
                      {
                        width: segmentStyles.negative.width as any,
                        backgroundColor: segmentStyles.negative.backgroundColor,
                      },
                    ]}
                  />
                </View>
                {/* Neutral segment */}
                <View style={themed($progressSegmentContainer)}>
                  <View
                    style={[
                      themed($progressSegmentBackgroundNeutral),
                      { backgroundColor: segmentStyles.neutral.backgroundBg },
                    ]}
                  />
                  <View
                    style={[
                      themed($progressSegmentFill),
                      {
                        width: segmentStyles.neutral.width as any,
                        backgroundColor: segmentStyles.neutral.backgroundColor,
                      },
                    ]}
                  />
                </View>
                {/* Positive segment */}
                <View style={themed($progressSegmentContainer)}>
                  <View
                    style={[
                      themed($progressSegmentBackgroundPositive),
                      { backgroundColor: segmentStyles.positive.backgroundBg },
                    ]}
                  />
                  <View
                    style={[
                      themed($progressSegmentFill),
                      {
                        width: segmentStyles.positive.width as any,
                        backgroundColor: segmentStyles.positive.backgroundColor,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <FloatingCenterWrapper position="bottom" margin={90}>
        <Pressable onPress={handleShowPrompt} style={themed($promptButton)}>
          <Text style={themed($promptButtonText)}>Get a prompt</Text>
        </Pressable>
      </FloatingCenterWrapper>
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
  marginTop: 12,
})

const $indicatorContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "flex-end",
  marginTop: 6,
  paddingRight: 4,
})

const $progressBar: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
})

const $progressSegmentContainer: ThemedStyle<ViewStyle> = () => ({
  width: 20,
  height: 3,
  borderRadius: 1.5,
  overflow: "hidden",
  position: "relative",
})

const $progressSegmentBackgroundNegative: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: "100%",
  borderRadius: 1.5,
  opacity: 0.15,
  position: "absolute",
  left: 0,
  top: 0,
})

const $progressSegmentBackgroundNeutral: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: "100%",
  borderRadius: 1.5,
  opacity: 0.15,
  position: "absolute",
  left: 0,
  top: 0,
})

const $progressSegmentBackgroundPositive: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: "100%",
  borderRadius: 1.5,
  opacity: 0.15,
  position: "absolute",
  left: 0,
  top: 0,
})

const $progressSegmentFill: ThemedStyle<ViewStyle> = () => ({
  height: "100%",
  borderRadius: 1.5,
  position: "absolute",
  left: 0,
  top: 0,
  zIndex: 1,
})

const $input: ThemedStyle<TextStyle> = (theme) => ({
  minHeight: 180,
  borderRadius: 12,
  padding: 12,
  color: theme.colors.text,
  backgroundColor: theme.colors.textInputBackground,
  fontSize: 16,
  lineHeight: 24,
})

const $promptButton: ThemedStyle<ViewStyle> = () => ({
  paddingBottom: 20,
  paddingHorizontal: 12,
  alignItems: "center",
  justifyContent: "center",
})

const $promptButtonText: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 14,
  color: theme.colors.tint,
  fontStyle: "italic",
})
