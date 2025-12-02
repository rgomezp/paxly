import { FC, useState, useRef, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { createAudioPlayer, AudioPlayer } from "expo-audio"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "@/components/buttons/RectangularButton"
import Log from "@/utils/Log"

// Singleton to persist nature sounds state across component remounts
class NatureSoundsManager {
  private static instance: NatureSoundsManager
  private sound: AudioPlayer | null = null
  private isPlayingState: boolean = false
  private isLoading: boolean = false

  static getInstance(): NatureSoundsManager {
    if (!NatureSoundsManager.instance) {
      NatureSoundsManager.instance = new NatureSoundsManager()
    }
    return NatureSoundsManager.instance
  }

  getSound(): AudioPlayer | null {
    return this.sound
  }

  setSound(sound: AudioPlayer | null) {
    this.sound = sound
  }

  getIsPlaying(): boolean {
    return this.isPlayingState
  }

  setIsPlaying(isPlaying: boolean) {
    this.isPlayingState = isPlaying
  }

  getIsLoading(): boolean {
    return this.isLoading
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  cleanup() {
    if (this.sound) {
      try {
        this.sound.pause()
        this.sound.remove()
      } catch (error) {
        Log.error("NatureSoundsManager: Cleanup error:", error)
      } finally {
        this.sound = null
        this.isPlayingState = false
      }
    }
  }
}

export const NatureSoundsSection: FC = function NatureSoundsSection() {
  const { themed, theme } = useAppTheme()
  const manager = NatureSoundsManager.getInstance()
  const [isPlaying, setIsPlaying] = useState(() => manager.getIsPlaying())
  const soundRef = useRef<AudioPlayer | null>(manager.getSound())
  const isLoadingRef = useRef(manager.getIsLoading())

  // Sync state with singleton on mount and check actual playback status
  useEffect(() => {
    const currentSound = manager.getSound()
    if (currentSound && currentSound !== soundRef.current) {
      soundRef.current = currentSound
      // Check actual playback status to sync state
      try {
        const actuallyPlaying = currentSound.playing
        setIsPlaying(actuallyPlaying)
        manager.setIsPlaying(actuallyPlaying)
      } catch {
        // Sound might be removed, reset state
        setIsPlaying(false)
        manager.setIsPlaying(false)
      }
    } else {
      setIsPlaying(manager.getIsPlaying())
    }
    isLoadingRef.current = manager.getIsLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTogglePlay = () => {
    // Prevent multiple simultaneous operations
    if (isLoadingRef.current || manager.getIsLoading()) return

    try {
      if (isPlaying) {
        // Pause the sound
        const sound = soundRef.current || manager.getSound()
        if (sound) {
          sound.pause()
          setIsPlaying(false)
          manager.setIsPlaying(false)
        }
      } else {
        // Play the sound
        let sound = soundRef.current || manager.getSound()
        if (!sound) {
          manager.setIsLoading(true)
          isLoadingRef.current = true
          // Create and load the sound if it doesn't exist
          const newSound = createAudioPlayer(require("../../assets/sounds/birds.mp3"))
          newSound.loop = true
          newSound.volume = 1.0
          newSound.play()
          sound = newSound
          soundRef.current = sound
          manager.setSound(sound)
          setIsPlaying(true)
          manager.setIsPlaying(true)
          isLoadingRef.current = false
          manager.setIsLoading(false)
        } else {
          // Resume if it already exists
          soundRef.current = sound
          sound.play()
          setIsPlaying(true)
          manager.setIsPlaying(true)
        }
      }
    } catch (error) {
      Log.error("NatureSoundsSection: Failed to toggle play:", error)
      setIsPlaying(false)
      manager.setIsPlaying(false)
      isLoadingRef.current = false
      manager.setIsLoading(false)
    }
  }

  return (
    <>
      <View style={themed($messageSectionHeader)}>
        <Text
          text="Nature Sounds"
          preset="subheading"
          style={themed({ color: theme.colors.text })}
        />
      </View>
      <View style={$messageButtonContainer}>
        <RectangularButton
          buttonText={isPlaying ? "Pause" : "Play"}
          onClick={handleTogglePlay}
          icon={isPlaying ? "pause" : "play"}
        />
      </View>
    </>
  )
}

const $messageSectionHeader: ViewStyle = {
  marginBottom: 20,
  marginLeft: 30,
}

const $messageButtonContainer: ViewStyle = {
  marginBottom: 40,
  paddingHorizontal: 40,
}
