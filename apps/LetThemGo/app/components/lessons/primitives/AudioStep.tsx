import { Card } from "@/components/Card"
import { useEffect, useRef } from "react"
import { createAudioPlayer, AudioPlayer } from "expo-audio"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"

export function AudioStep({ asset, onDone }: { asset: string; onDone?: () => void }) {
  const { themed, theme } = useAppTheme()
  const sound = useRef<AudioPlayer | null>(null)
  useEffect(() => {
    const soundInstance = createAudioPlayer({ uri: asset })
    sound.current = soundInstance
    soundInstance.play()

    const removeListener = soundInstance.addListener("playbackStatusUpdate", (status: any) => {
      if (status.didJustFinish) {
        onDone?.()
      }
    })

    return () => {
      if (sound.current) {
        sound.current.remove()
        removeListener.remove()
      }
    }
  }, [asset, onDone])

  return (
    <Card>
      <Text style={themed(() => ({ color: theme.colors.textDim }))}>Playing audio…</Text>
    </Card>
  )
}
