import { ViewStyle } from "react-native"
import { spacing } from "./spacing"
import { StyleSheet } from "react-native"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,

  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,

  dropShadow: {
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    // Shadow properties for Android
    elevation: 2,
  } as ViewStyle,

  borderRadius: {
    borderRadius: 15,
  } as ViewStyle,
}

export const TRACK_BACKGROUND = "rgba(255, 255, 255, 0.3)"

export const progressBarStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
  },
  progress: {
    borderRadius: 4,
    height: "100%",
  },
  track: {
    backgroundColor: TRACK_BACKGROUND,
    borderRadius: 4,
    height: 8,
    overflow: "hidden",
  },
})
