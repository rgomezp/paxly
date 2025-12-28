import { Vibration, Platform } from "react-native"

/**
 * Provides platform-optimized haptic feedback
 * Disabled on iOS, enabled on Android
 */
export const triggerHapticFeedback = (duration?: number) => {
  if (Platform.OS === "ios") {
    // Haptic feedback disabled on iOS
    return
  } else {
    // Android works well with 10ms
    Vibration.vibrate(duration || 10)
  }
}

/**
 * Light haptic feedback for UI interactions (buttons, tabs, etc.)
 */
export const triggerLightHaptic = () => {
  triggerHapticFeedback()
}

/**
 * Medium haptic feedback for more significant interactions
 */
export const triggerMediumHaptic = () => {
  if (Platform.OS === "ios") {
    // Haptic feedback disabled on iOS
    return
  } else {
    Vibration.vibrate(20)
  }
}

/**
 * Strong haptic feedback for important events
 */
export const triggerStrongHaptic = () => {
  if (Platform.OS === "ios") {
    // Haptic feedback disabled on iOS
    return
  } else {
    Vibration.vibrate(50)
  }
}
