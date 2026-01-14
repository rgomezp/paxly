import { View, ViewStyle, TextStyle, ImageStyle, Image } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"

// Conditionally import expo-image for animated WebP support
let ExpoImage: any = null
try {
  ExpoImage = require("expo-image").Image
} catch {}

interface SendMessageConfirmationModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function SendMessageConfirmationModal({
  visible,
  onClose,
  onConfirm,
}: SendMessageConfirmationModalProps) {
  const { theme, themed } = useAppTheme()

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <View style={themed($container)}>
        <Text
          text="Send Message?"
          preset="subheading"
          style={themed([$title, { color: theme.colors.text }])}
        />
        <Text
          text="Say it here—then let it go."
          style={themed([$description, { color: theme.colors.text }])}
        />
        <View style={$graphicContainer}>
          {ExpoImage ? (
            <ExpoImage
              source={require("../../../assets/images/message_into_the_void.webp")}
              style={$graphic}
              contentFit="contain"
              transition={0}
              cachePolicy="memory"
            />
          ) : (
            <Image
              source={require("../../../assets/images/message_into_the_void.webp")}
              style={$graphic}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={themed($buttonsContainer)}>
          <RectangularButton
            buttonText="Send"
            onClick={onConfirm}
            width="100%"
            customStyles={$buttonSpacing}
            icon="paper-plane"
          />
          <RectangularButton
            buttonText="Cancel"
            onClick={onClose}
            width="100%"
            customStyles={$buttonSpacing}
            lightBackground
          />
        </View>
      </View>
    </BottomModal>
  )
}

const $container: ViewStyle = {
  alignItems: "stretch",
}

const $title: ViewStyle & TextStyle = {
  marginBottom: 16,
  textAlign: "center",
}

const $description: TextStyle = {
  marginBottom: 24,
  textAlign: "center",
  fontSize: 16,
}

const $buttonsContainer: ViewStyle = {
  gap: 16,
  paddingBottom: 20,
}

const $buttonSpacing: ViewStyle = {
  margin: 0,
}

const $graphicContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 24,
  minHeight: 150,
}

const $graphic: ImageStyle = {
  width: 200,
  height: 150,
}
