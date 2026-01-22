import { ViewStyle, View, DimensionValue } from "react-native"
import Modal from "react-native-modal"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { useAppTheme } from "@/utils/useAppTheme"

interface BottomModalProps {
  children: React.ReactNode
  visible: boolean
  onClose?: () => void
  maxHeight?: DimensionValue
}

export default function BottomModal({
  children,
  visible,
  onClose,
  maxHeight = "60%",
}: BottomModalProps) {
  const { theme } = useAppTheme()

  return (
    <Modal
      testID={"modal"}
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={$view}
      avoidKeyboard={true}
      useNativeDriverForBackdrop={true}
    >
      <View style={[$content, { backgroundColor: theme.colors.background, maxHeight }]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={$scrollContent}
          keyboardShouldPersistTaps="handled"
          bottomOffset={0}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  )
}

const $view: ViewStyle = {
  justifyContent: "flex-end",
  margin: 0,
}

const $content: ViewStyle = {
  borderRadius: 10,
  overflow: "hidden",
}

const $scrollContent: ViewStyle = {
  padding: 20,
  paddingBottom: 40,
}
