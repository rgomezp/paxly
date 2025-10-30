import { View, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"

interface HelpModalProps {
  visible: boolean
  onClose: () => void
  onLessonActivated: () => void
  onIContacted: () => void
}

export default function HelpModal({
  visible,
  onClose,
  onLessonActivated,
  onIContacted,
}: HelpModalProps) {
  const { theme, themed } = useAppTheme()

  const handleOptionPress = (callback: () => void) => {
    callback()
    onClose()
  }

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <View style={themed($container)}>
        <Text
          text="How can we help?"
          preset="subheading"
          style={themed([$title, { color: theme.colors.text }])}
        />

        <View style={themed($optionsContainer)}>
          <RectangularButton
            buttonText="I have the urge to contact"
            onClick={() => handleOptionPress(onLessonActivated)}
            width="100%"
            customStyles={$buttonSpacing}
            icon="exclamation-triangle"
          />
          <RectangularButton
            buttonText="I've been sleeping poorly"
            onClick={() => handleOptionPress(onLessonActivated)}
            width="100%"
            customStyles={$buttonSpacing}
            icon="bed"
          />
          <RectangularButton
            buttonText="I'm feeling down"
            onClick={() => handleOptionPress(onLessonActivated)}
            width="100%"
            customStyles={$buttonSpacing}
            icon="sad-tear"
          />
          <RectangularButton
            buttonText="I'm ruminating"
            onClick={() => handleOptionPress(onLessonActivated)}
            width="100%"
            customStyles={$buttonSpacing}
            icon="brain"
          />

          <RectangularButton
            buttonText="I contacted"
            onClick={() => handleOptionPress(onIContacted)}
            width="100%"
            customStyles={$buttonSpacing}
            isSelected
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
  marginBottom: 20,
  textAlign: "center",
}

const $optionsContainer: ViewStyle = {
  gap: 24,
  paddingBottom: 50,
}

const $buttonSpacing: ViewStyle = {
  margin: 0,
}
