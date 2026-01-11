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
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"
import LetterToMyselfManager from "@/managers/LetterToMyselfManager"
import { LetterDeliveryTime } from "@/types/ILetterToMyself"
import { useHeader } from "@/utils/useHeader"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { useStores } from "@/models"
import SendLetterConfirmationModal from "@/components/modals/SendLetterConfirmationModal"
import { createAudioPlayer } from "expo-audio"
import Log from "@/utils/Log"
import StoreReviewManager from "@/managers/StoreReviewManager"

interface ComposeLetterScreenProps extends AppStackScreenProps<"ComposeLetter"> {}

const DELIVERY_OPTIONS: { months: LetterDeliveryTime; label: string }[] = [
  { months: 1, label: "1 month" },
  { months: 3, label: "3 months" },
  { months: 12, label: "1 year" },
]

export const ComposeLetterScreen: FC<ComposeLetterScreenProps> = observer(
  function ComposeLetterScreen({ navigation }) {
    const { themed, theme } = useAppTheme()
    const insets = useSafeAreaInsets()
    const { letterToMyselfStore } = useStores()
    const draft = letterToMyselfStore.draft
    const [text, setText] = useState(draft?.text ?? "")
    const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<LetterDeliveryTime>(
      draft?.deliveryTimeMonths ?? 1,
    )
    const [isSendModalVisible, setIsSendModalVisible] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null)
    const inputRef = useRef<TextInput>(null)

    const trimmedText = text.trim()
    const isValid = trimmedText.length > 0

    // Auto-save draft when text or delivery time changes
    useEffect(() => {
      if (text.length > 0) {
        // Debounce save
        const timeoutId = setTimeout(() => {
          LetterToMyselfManager.saveDraft(text, selectedDeliveryTime)
        }, 500)
        return () => clearTimeout(timeoutId)
      }
      return undefined
    }, [text, selectedDeliveryTime])

    // Sync local state with store when screen regains focus (only if store changed externally)
    useEffect(() => {
      const storeDraft = letterToMyselfStore.draft
      if (storeDraft) {
        if (storeDraft.text !== text) {
          setText(storeDraft.text)
        }
        if (storeDraft.deliveryTimeMonths !== selectedDeliveryTime) {
          setSelectedDeliveryTime(storeDraft.deliveryTimeMonths)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [letterToMyselfStore.draft])

    // Focus input on mount
    useEffect(() => {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }, [])

    const handleSend = () => {
      if (!text.trim()) return
      setIsSendModalVisible(true)
    }

    const handleConfirmSend = () => {
      // Play send sound effect
      try {
        const sound = createAudioPlayer(require("../../assets/sounds/transition.m4a"))
        sound.volume = 1.0
        sound.play()

        // Set up listener for auto-cleanup when playback finishes
        const removeListener = sound.addListener("playbackStatusUpdate", (status: any) => {
          if (status.didJustFinish) {
            sound.remove()
            removeListener.remove()
          }
        })

        StoreReviewManager.requestReview()
      } catch (error) {
        Log.error("ComposeLetterScreen: Failed to play send sound:", error)
      }

      LetterToMyselfManager.createLetter(text.trim(), selectedDeliveryTime)
      setIsSendModalVisible(false)
      // Reset navigation stack to TabNavigator to properly return to Home screen
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }],
      })
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

    const $containerInsetStyle = useMemo(() => ({ paddingTop: 16 }), [])
    const $contentInsetStyle = useMemo(
      () => ({ paddingBottom: insets.bottom + 120 }),
      [insets.bottom],
    )

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
      [],
    )

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
            <Text text="Letter to Myself" preset="heading" style={themed($title)} />
            <Text
              text="When would you like to receive this letter?"
              style={themed($deliveryLabel)}
            />
            <View style={themed($deliveryOptionsContainer)}>
              {DELIVERY_OPTIONS.map((option) => (
                <Pressable
                  key={option.months}
                  onPress={() => setSelectedDeliveryTime(option.months)}
                  style={themed([
                    $deliveryOption,
                    selectedDeliveryTime === option.months && $deliveryOptionSelected,
                  ])}
                >
                  <Text
                    text={option.label}
                    style={themed([
                      $deliveryOptionText,
                      selectedDeliveryTime === option.months && $deliveryOptionTextSelected,
                    ])}
                  />
                </Pressable>
              ))}
            </View>
            <View style={themed($inputWrapper)}>
              <TextInput
                ref={inputRef}
                placeholder="Write your letter to your future self..."
                placeholderTextColor={theme.colors.textDim}
                value={text}
                onChangeText={setText}
                multiline
                style={themed($input)}
                scrollEnabled={false}
                onSelectionChange={handleSelectionChange}
                textAlignVertical="top"
                blurOnSubmit={false}
                returnKeyType="default"
                autoCorrect={true}
                autoCapitalize="sentences"
              />
            </View>
          </ScrollView>
        </View>
        <FloatingCenterButton
          isValid={isValid}
          text="Send"
          onPress={handleSend}
          icon="paper-plane"
        />
        <SendLetterConfirmationModal
          visible={isSendModalVisible}
          onClose={() => setIsSendModalVisible(false)}
          onConfirm={handleConfirmSend}
          deliveryTimeMonths={selectedDeliveryTime}
        />
      </KeyboardAvoidingView>
    )
  },
)

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

const $deliveryLabel: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  marginBottom: 12,
  marginTop: 8,
})

const $deliveryOptionsContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  gap: 12,
  marginBottom: 24,
})

const $deliveryOption: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: theme.colors.border,
  backgroundColor: theme.colors.background,
  alignItems: "center",
})

const $deliveryOptionSelected: ThemedStyle<ViewStyle> = (theme) => ({
  borderColor: theme.colors.tint,
  backgroundColor: theme.colors.tint + "20",
})

const $deliveryOptionText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 14,
  fontWeight: "500",
})

const $deliveryOptionTextSelected: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.tint,
  fontWeight: "600",
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
  backgroundColor: theme.colors.textInputBackground,
  fontSize: 16,
  lineHeight: 24,
})

const $headerAction: ThemedStyle<ViewStyle> = () => ({
  padding: 8,
  minWidth: 40,
  alignItems: "center",
  justifyContent: "center",
})
