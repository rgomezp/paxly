import { Platform } from "react-native"
import { EventRegister } from "@/utils/EventEmitter"

export const TOAST_EVENTS = {
  SHOW: "TOAST_SHOW",
} as const

export type ToastPayload = {
  message: string
  durationMs?: number
}

export function showToast(message: string, opts?: { durationMs?: number }) {
  // On web we can use react-hot-toast directly.
  if (Platform.OS === "web") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { toast } = require("react-hot-toast")
      toast(message)
      return
    } catch {
      // Fall through to native toast host.
    }
  }

  const payload: ToastPayload = { message, durationMs: opts?.durationMs }
  EventRegister.emit(TOAST_EVENTS.SHOW, payload)
}
