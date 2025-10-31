import { Card } from "@/components/Card"
import { useEffect, useRef } from "react"
import { Audio } from "expo-av"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"

export function AudioStep({ asset, onDone }: { asset: string; onDone?: () => void }) {
  const { themed, theme } = useAppTheme()
  const sound = useRef<Audio.Sound | null>(null)
  useEffect(() => {
    ;(async () => {
      const { sound: s } = await Audio.Sound.createAsync({ uri: asset })
      sound.current = s
      await s.playAsync()
      s.setOnPlaybackStatusUpdate((st: any) => st.didJustFinish && onDone?.())
    })()
    return () => {
      sound.current?.unloadAsync()
    }
  }, [asset, onDone])

  return (
    <Card>
      <Text style={themed(() => ({ color: theme.colors.textDim }))}>Playing audio…</Text>
    </Card>
  )
}
