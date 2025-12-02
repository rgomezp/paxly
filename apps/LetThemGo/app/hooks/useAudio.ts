import { useEffect, useState } from "react"
import Sound from "react-native-sound"

// Enable playback in silence mode (iOS)
Sound.setCategory("Playback", true)

export function useAudio() {
  const [isAudioSetup, setIsAudioSetup] = useState(false)

  useEffect(() => {
    // react-native-sound doesn't require async setup like expo-av
    // The Sound.setCategory call above handles audio mode configuration
    setIsAudioSetup(true)
  }, [])

  return isAudioSetup
}
