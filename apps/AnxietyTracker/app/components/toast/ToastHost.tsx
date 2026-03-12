import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Platform, View, type ViewStyle, type TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import { EventRegister } from "@/utils/EventEmitter"
import { TOAST_EVENTS, type ToastPayload } from "@/utils/toast"
import { Text } from "@/components"

type ToastState = {
  message: string
  durationMs: number
  nonce: number
}

const SHADOW_COLOR = "rgba(0,0,0,1)" as const

function ToastHostWeb() {
  // DOM-based toaster for web only.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Toaster } = require("react-hot-toast")
  return <Toaster position="top-center" />
}

function ToastHostNative() {
  const insets = useSafeAreaInsets()
  const { theme } = useAppTheme()
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(8)).current
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [toast, setToast] = useState<ToastState | null>(null)

  const wrapperStyle = useMemo<ViewStyle>(
    () => ({
      position: "absolute",
      left: 0,
      right: 0,
      bottom: Math.max(16, insets.bottom + 16),
      alignItems: "center",
      zIndex: 9999,
      elevation: 9999,
    }),
    [insets.bottom],
  )

  const toastStyle = useMemo<ViewStyle>(
    () => ({
      maxWidth: 340,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: theme.colors.text,
      shadowColor: SHADOW_COLOR,
      shadowOpacity: 0.18,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    }),
    [theme.colors.text],
  )

  const toastTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.background,
      textAlign: "center",
    }),
    [theme.colors.background],
  )

  useEffect(() => {
    const show = (payload: ToastPayload) => {
      const durationMs = payload.durationMs ?? 2200

      if (hideTimer.current) {
        clearTimeout(hideTimer.current)
        hideTimer.current = null
      }

      setToast({ message: payload.message, durationMs, nonce: Date.now() })

      opacity.setValue(0)
      translateY.setValue(8)
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 160, useNativeDriver: true }),
      ]).start()

      hideTimer.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 8, duration: 160, useNativeDriver: true }),
        ]).start(({ finished }) => {
          if (finished) setToast(null)
        })
      }, durationMs)
    }

    EventRegister.on(TOAST_EVENTS.SHOW, show)
    return () => {
      EventRegister.off(TOAST_EVENTS.SHOW, show)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [opacity, translateY])

  if (!toast) return null

  return (
    <View style={wrapperStyle} pointerEvents="none">
      <Animated.View style={[toastStyle, { opacity, transform: [{ translateY }] }]}>
        <Text text={toast.message} style={toastTextStyle} weight="medium" />
      </Animated.View>
    </View>
  )
}

export default function ToastHost() {
  return Platform.OS === "web" ? <ToastHostWeb /> : <ToastHostNative />
}
