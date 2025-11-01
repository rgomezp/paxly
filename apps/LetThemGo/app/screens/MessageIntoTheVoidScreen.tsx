import { FC, useMemo, useState, useRef, useEffect } from "react"
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Image,
} from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import FloatingCenterButton from "@/components/buttons/FloatingCenterButton"
import RectangularButton from "@/components/buttons/RectangularButton"
import MessageIntoTheVoidManager from "@/managers/MessageIntoTheVoidManager"
import SendMessageConfirmationModal from "@/components/modals/SendMessageConfirmationModal"

// Conditionally import expo-image for animated WebP support
let ExpoImage: any = null
try {
  ExpoImage = require("expo-image").Image
} catch {}

interface MessageIntoTheVoidScreenProps extends AppStackScreenProps<"MessageIntoTheVoid"> {}

const HEADER_COPY =
  "This is a safe place to say what you can't—or shouldn't—send. Write it out, feel it fully, and release it. Your note isn't delivered to anyone; it simply drifts away so you can keep your peace. Write it in a single session, or save it as a draft to work on over time.\n\nHonor your feelings and move them out of your body. Take a breath, type what you need to say, and let gravity do the rest."

export const MessageIntoTheVoidScreen: FC<MessageIntoTheVoidScreenProps> =
  function MessageIntoTheVoidScreen({ navigation }) {
    const { themed, theme } = useAppTheme()
    const insets = useSafeAreaInsets()
    const initialDraft = MessageIntoTheVoidManager.getDraft()
    const [text, setText] = useState(initialDraft ?? "")
    const [isEditing, setIsEditing] = useState(false)
    const [isSendModalVisible, setIsSendModalVisible] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null)
    const inputRef = useRef<TextInput>(null)

    const trimmedText = text.trim()
    const hasDraft = initialDraft !== null && initialDraft.trim().length > 0
    const isValid = trimmedText.length > 0

    // Auto-save draft when text changes
    useEffect(() => {
      if (isEditing && text.length > 0) {
        // Debounce save
        const timeoutId = setTimeout(() => {
          MessageIntoTheVoidManager.saveDraft(text)
        }, 500)
        return () => clearTimeout(timeoutId)
      }
      return undefined
    }, [text, isEditing])

    const handleStartEditing = () => {
      setIsEditing(true)
      // Focus input after a short delay
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }

    const handleSend = () => {
      if (!text.trim()) return
      setIsSendModalVisible(true)
    }

    const handleConfirmSend = () => {
      MessageIntoTheVoidManager.sendMessage(text.trim())
      setIsSendModalVisible(false)
      navigation.goBack()
    }

    const handleSelectionChange = (event: any) => {
      if (scrollViewRef.current && event.nativeEvent.selection) {
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
            <View style={$graphicContainer}>
              {ExpoImage ? (
                <ExpoImage
                  source={require("../../assets/images/message_into_the_void.webp")}
                  style={$graphic}
                  contentFit="contain"
                  transition={0}
                  cachePolicy="memory"
                />
              ) : (
                <Image
                  source={require("../../assets/images/message_into_the_void.webp")}
                  style={$graphic}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text text={HEADER_COPY} style={themed($headerCopy)} />

            {!isEditing && (
              <View style={themed($createButtonContainer)}>
                <RectangularButton
                  buttonText={hasDraft ? "Continue draft" : "Create"}
                  onClick={handleStartEditing}
                  width="100%"
                  icon={hasDraft ? "edit" : "plus"}
                  isPaidFeature={true}
                />
              </View>
            )}

            {isEditing && (
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
            )}
          </ScrollView>
        </View>
        {isEditing && (
          <FloatingCenterButton
            isValid={isValid}
            text="Send"
            onPress={handleSend}
            icon="paper-plane"
          />
        )}
        <SendMessageConfirmationModal
          visible={isSendModalVisible}
          onClose={() => setIsSendModalVisible(false)}
          onConfirm={handleConfirmSend}
        />
      </KeyboardAvoidingView>
    )
  }

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $innerContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $scroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 26,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: 12,
})

const $headerCopy: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  lineHeight: 24,
  marginBottom: 24,
})

const $createButtonContainer: ThemedStyle<ViewStyle> = () => ({
  marginTop: 12,
  marginBottom: 24,
  alignItems: "center",
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

const $graphicContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
  minHeight: 200,
}

const $graphic: ImageStyle = {
  width: 250,
  height: 200,
}
