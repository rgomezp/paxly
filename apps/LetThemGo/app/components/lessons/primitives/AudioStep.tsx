import { Card } from "@/components/Card"
import { useEffect, useRef } from "react"
import Sound from "react-native-sound"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"

export function AudioStep({ asset, onDone }: { asset: string; onDone?: () => void }) {
  const { themed, theme } = useAppTheme()
  const sound = useRef<Sound | null>(null)
  useEffect(() => {
    // react-native-sound supports both local files and remote URIs
    const soundInstance = new Sound(asset, "", (error) => {
      if (error) {
        console.error("AudioStep: Failed to load sound:", error)
        onDone?.()
        return
      }
      // Sound loaded successfully, start playing
      soundInstance.play((playError) => {
        if (playError) {
          console.error("AudioStep: Failed to play sound:", playError)
        }
        // Call onDone when playback finishes
        onDone?.()
        // Cleanup
        soundInstance.release()
      })
    })
    sound.current = soundInstance
    return () => {
      if (sound.current) {
        sound.current.stop()
        sound.current.release()
      }
    }
  }, [asset, onDone])

  return (
    <Card>
      <Text style={themed(() => ({ color: theme.colors.textDim }))}>Playing audio…</Text>
    </Card>
  )
}
