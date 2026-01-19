import { useEffect, useState } from "react"
import { setAudioModeAsync } from "expo-audio"

export function useAudio() {
  const [isAudioSetup, setIsAudioSetup] = useState(false)

  useEffect(() => {
    setupAudio()
  }, [])

  const setupAudio = async () => {
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: "mixWithOthers",
        interruptionModeAndroid: "duckOthers",
      })
      setIsAudioSetup(true)
    } catch (e) {
      setIsAudioSetup(false)
    }
  }

  return isAudioSetup
}
