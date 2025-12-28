import { Modal, ActivityIndicator, StyleSheet } from "react-native"
import { Text } from "../Text"
import { View } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"

type IProps = {
  visible: boolean
  text?: string
}

const LoadingModal = ({ visible, text }: IProps) => {
  const { theme } = useAppTheme()

  // Use a slightly different shade than the default background
  // Light: neutral200 (#F5F5F5), Dark: neutral300 (#3C3836)
  const wrapperBackgroundColor = theme.isDark
    ? theme.colors.palette.neutral300
    : theme.colors.palette.neutral200

  return (
    <Modal transparent={true} animationType="none" visible={visible} onRequestClose={() => {}}>
      <View style={[styles.modalBackground, { backgroundColor: theme.colors.palette.overlay50 }]}>
        <View
          style={[styles.activityIndicatorWrapper, { backgroundColor: wrapperBackgroundColor }]}
        >
          <ActivityIndicator size="large" color={theme.colors.tint} />
          {text && <Text style={styles.loadingText}>{text}</Text>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: "center",
    borderRadius: 10,
    display: "flex",
    height: 150,
    justifyContent: "center",
    width: 150,
  },
  loadingText: {
    marginTop: 10,
    textAlign: "center",
  },
  modalBackground: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
})

export default LoadingModal
