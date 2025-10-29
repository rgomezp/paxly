import { View, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"

interface HelpModalProps {
  visible: boolean
  onClose: () => void
  onThoughtContact: () => void
  onNeedEmotionalSupport: () => void
  onIContacted: () => void
}

export default function HelpModal({
  visible,
  onClose,
  onThoughtContact,
  onNeedEmotionalSupport,
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
            buttonText="I'm thinking about contacting"
            onClick={() => handleOptionPress(onThoughtContact)}
            width="100%"
            customStyles={$buttonSpacing}
          />

          <RectangularButton
            buttonText="I need emotional support"
            onClick={() => handleOptionPress(onNeedEmotionalSupport)}
            width="100%"
            customStyles={$buttonSpacing}
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
