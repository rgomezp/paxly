import { useEffect, useState } from "react"
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av"

export function useAudio() {
  const [isAudioSetup, setIsAudioSetup] = useState(false)

  useEffect(() => {
    setupAudio()
  }, [])

  const setupAudio = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false,
    })
    setIsAudioSetup(true)
  }

  return isAudioSetup
}
