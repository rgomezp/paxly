import { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
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
import RectangularButton from "@/components/buttons/RectangularButton"
import { useStores } from "@/models"

// Conditionally import expo-image for animated WebP support
let ExpoImage: any = null
try {
  ExpoImage = require("expo-image").Image
} catch {}

interface MessageIntoTheVoidScreenProps extends AppStackScreenProps<"MessageIntoTheVoid"> {}

const HEADER_COPY =
  "This is a safe place to say what you can't—or shouldn't—send. Write it out, feel it fully, and release it. Your note isn't delivered to anyone; it simply drifts away so you can keep your peace. Write it in a single session, or save it as a draft to work on over time.\n\nHonor your feelings and move them out of your body. Take a breath, type what you need to say, and let gravity do the rest."

export const MessageIntoTheVoidScreen: FC<MessageIntoTheVoidScreenProps> = observer(
  function MessageIntoTheVoidScreen({ navigation }) {
    const { themed } = useAppTheme()
    const insets = useSafeAreaInsets()
    const { messageIntoTheVoidStore } = useStores()
    const hasDraft = messageIntoTheVoidStore.hasDraft

    const handleStartEditing = () => {
      navigation.navigate("ComposeMessage")
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
            style={themed($scroll)}
            contentContainerStyle={$contentInsetStyle}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={true}
          >
            <Text text="Send to the Void" preset="heading" style={themed($title)} />
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

            <View style={themed($createButtonContainer)}>
              <RectangularButton
                buttonText={hasDraft ? "Continue draft" : "Create"}
                onClick={handleStartEditing}
                width="100%"
                icon={hasDraft ? "edit" : "plus"}
                isPaidFeature={true}
              />
            </View>
          </ScrollView>
        </View>
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
