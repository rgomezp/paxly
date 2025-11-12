import { FC, useMemo, useState, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { TextStyle, ViewStyle } from "react-native"
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"
import MessageIntoTheVoidManager from "@/managers/MessageIntoTheVoidManager"
import SendMessageConfirmationModal from "@/components/modals/SendMessageConfirmationModal"
import { Audio } from "expo-av"
import Log from "@/utils/Log"
import { useStores } from "@/models"

interface ComposeMessageScreenProps extends AppStackScreenProps<"ComposeMessage"> {}

export const ComposeMessageScreen: FC<ComposeMessageScreenProps> = observer(
  function ComposeMessageScreen({ navigation }) {
    const { themed, theme } = useAppTheme()
    const insets = useSafeAreaInsets()
    const { messageIntoTheVoidStore } = useStores()
    const [text, setText] = useState(messageIntoTheVoidStore.draft)
    const [isSendModalVisible, setIsSendModalVisible] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null)
    const inputRef = useRef<TextInput>(null)

    const trimmedText = text.trim()
    const isValid = trimmedText.length > 0

    // Auto-save draft when text changes
    useEffect(() => {
      if (text.length > 0) {
        // Debounce save
        const timeoutId = setTimeout(() => {
          MessageIntoTheVoidManager.saveDraft(text)
        }, 500)
        return () => clearTimeout(timeoutId)
      }
      return undefined
    }, [text])

    // Sync local state with store when screen regains focus (only if store changed externally)
    useEffect(() => {
      const storeDraft = messageIntoTheVoidStore.draft
      if (storeDraft !== text) {
        setText(storeDraft)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageIntoTheVoidStore.draft])

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

    const handleConfirmSend = async () => {
      // Play send sound effect
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/transition.m4a"),
          {
            shouldPlay: true,
            volume: 1.0,
          },
        )

        // Set up status listener for auto-cleanup
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync().catch(() => {
              // Ignore cleanup errors
            })
          }
        })

        // Auto-cleanup after playback completes
        setTimeout(() => {
          sound
            .getStatusAsync()
            .then((status) => {
              if (status.isLoaded) {
                sound.unloadAsync().catch(() => {
                  // Ignore cleanup errors
                })
              }
            })
            .catch(() => {
              // Sound already unloaded, ignore
            })
        }, 3000) // 3 second buffer for cleanup
      } catch (error) {
        Log.error("ComposeMessageScreen: Failed to play send sound:", error)
      }

      MessageIntoTheVoidManager.sendMessage(text.trim())
      setIsSendModalVisible(false)
      navigation.navigate("TabNavigator")
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
            <Text text="Message into the Void" preset="heading" style={themed($title)} />
            <View style={themed($inputWrapper)}>
              <TextInput
                ref={inputRef}
                placeholder="Write what you need to say..."
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
        <SendMessageConfirmationModal
          visible={isSendModalVisible}
          onClose={() => setIsSendModalVisible(false)}
          onConfirm={handleConfirmSend}
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
