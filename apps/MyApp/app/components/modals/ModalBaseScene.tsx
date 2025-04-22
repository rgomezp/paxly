import { Component } from "react"
import { ViewStyle, View } from "react-native"

type State<P> = P & {
  visible: boolean
}

abstract class ModalBaseScene<P extends object = {}> extends Component<P, State<P>> {
  abstract renderModal(): React.ReactElement<any>

  constructor(props: P) {
    super(props)
    this.state = {
      ...(props as P),
      visible: false,
    } as State<P>
  }

  open = () => this.setState((prevState) => ({ ...prevState, visible: true }))
  close = () => this.setState((prevState) => ({ ...prevState, visible: false }))
  isVisible = () => this.state.visible

  render() {
    return <View style={$view}>{this.renderModal()}</View>
  }
}

const $view: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}

export default ModalBaseScene
