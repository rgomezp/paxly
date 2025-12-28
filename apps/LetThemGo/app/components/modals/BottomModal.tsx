import { ViewStyle, View, ScrollView } from "react-native"
import Modal from "react-native-modal"
import { useAppTheme } from "@/utils/useAppTheme"

interface BottomModalProps {
  children: React.ReactNode
  visible: boolean
  onClose?: () => void
}

export default function BottomModal({ children, visible, onClose }: BottomModalProps) {
  const { theme } = useAppTheme()

  return (
    <Modal
      testID={"modal"}
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={$view}
    >
      <View style={[$content, { backgroundColor: theme.colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={$scrollContent}>
          {children}
        </ScrollView>
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
  maxHeight: "60%",
  overflow: "hidden",
}

const $scrollContent: ViewStyle = {
  padding: 20,
  paddingBottom: 40,
}
