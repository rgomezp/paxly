import { View, ViewStyle, TextStyle, ImageStyle, Image } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"
import { LetterDeliveryTime } from "@/types/ILetterToMyself"

// Conditionally import expo-image for animated WebP support
let ExpoImage: any = null
try {
  ExpoImage = require("expo-image").Image
} catch {}

interface SendLetterConfirmationModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  deliveryTimeMonths: LetterDeliveryTime
}

const DELIVERY_TIME_LABELS: Record<LetterDeliveryTime, string> = {
  1: "1 month",
  3: "3 months",
  12: "1 year",
}

export default function SendLetterConfirmationModal({
  visible,
  onClose,
  onConfirm,
  deliveryTimeMonths,
}: SendLetterConfirmationModalProps) {
  const { theme, themed } = useAppTheme()
  const deliveryLabel = DELIVERY_TIME_LABELS[deliveryTimeMonths]

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <View style={themed($container)}>
        <Text
          text="Send Letter?"
          preset="subheading"
          style={themed([$title, { color: theme.colors.text }])}
        />
        <Text
          text={`Your letter will be delivered in ${deliveryLabel}. You'll find it waiting in your inbox when the time comes.`}
          style={themed([$description, { color: theme.colors.text }])}
        />
        <View style={$graphicContainer}>
          {ExpoImage ? (
            <ExpoImage
              source={require("../../../assets/images/letter_to_myself_graphic.png")}
              style={$graphic}
              contentFit="contain"
              transition={0}
              cachePolicy="memory"
            />
          ) : (
            <Image
              source={require("../../../assets/images/letter_to_myself_graphic.png")}
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
  lineHeight: 24,
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
