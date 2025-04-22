import { StyleSheet, View, ViewProps } from "react-native"

interface CenteredViewProps extends ViewProps {
  children: React.ReactNode
}

const CenteredView: React.FC<CenteredViewProps> = ({ children, style, ...rest }) => {
  return (
    <View style={[styles.centered, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
})

export default CenteredView
