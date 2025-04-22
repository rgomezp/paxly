import { ViewStyle, View } from "react-native"
import Modal from "react-native-modal"
import ModalBaseScene from "./ModalBaseScene"

interface BottomModalProps {
  children: React.ReactNode
  visible: boolean
  onClose?: () => void
}

export default class BottomModal extends ModalBaseScene<BottomModalProps> {
  renderModal(): React.ReactElement<any> {
    const { children, visible, onClose } = this.props
    return (
      <Modal
        testID={"modal"}
        isVisible={visible}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection={["down"]}
        style={$view}
      >
        <View style={$content}>{children}</View>
      </Modal>
    )
  }
}

const $view: ViewStyle = {
  justifyContent: "flex-end",
  margin: 0,
}

const $content: ViewStyle = {
  padding: 20,
  borderRadius: 10,
  maxHeight: "50%",
  paddingBottom: 40,
}
