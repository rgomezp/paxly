import { KeyboardAvoidingView, StyleSheet, Platform, ViewStyle } from "react-native"

type FloatingCenterWrapperProps = {
  children: React.ReactNode
  margin?: number
  keyboardOffset?: number
  containerStyle?: ViewStyle
  position?: "top" | "bottom"
}

const FloatingCenterWrapper: React.FC<FloatingCenterWrapperProps> = ({
  children,
  margin = 30,
  keyboardOffset = 80,
  containerStyle = {},
  position = "bottom",
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? keyboardOffset : 0}
      style={[styles.container, { [position]: margin }, containerStyle]}
      pointerEvents="box-none"
    >
      {children}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
  },
})

export default FloatingCenterWrapper
