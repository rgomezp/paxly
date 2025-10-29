import { useState, useCallback } from "react"
import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"

type UseCustomColorHook = {
  color: string | undefined
  setColor: (color: string) => void
}

export function useCustomColor(): UseCustomColorHook {
  const [color, setColorState] = useState<string | undefined>(() => ganon.get("themeColor"))

  const setColor = useCallback((newColor: string) => {
    try {
      ganon.set("themeColor", newColor)
      setColorState(newColor)
      Log.info(`Theme color updated to: ${newColor}`)
    } catch (err) {
      Log.error(`Error setting theme color: ${err}`)
    }
  }, [])

  return {
    color,
    setColor,
  }
}
