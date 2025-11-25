import { FC, useState, useRef, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Audio } from "expo-av"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "@/components/buttons/RectangularButton"
import Log from "@/utils/Log"

// Singleton to persist nature sounds state across component remounts
class NatureSoundsManager {
  private static instance: NatureSoundsManager
  private sound: Audio.Sound | null = null
  private isPlayingState: boolean = false
  private isLoading: boolean = false

  static getInstance(): NatureSoundsManager {
    if (!NatureSoundsManager.instance) {
      NatureSoundsManager.instance = new NatureSoundsManager()
    }
    return NatureSoundsManager.instance
  }

  getSound(): Audio.Sound | null {
    return this.sound
  }

  setSound(sound: Audio.Sound | null) {
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

  async cleanup() {
    if (this.sound) {
      try {
        await this.sound.stopAsync()
        await this.sound.unloadAsync()
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
  const soundRef = useRef<Audio.Sound | null>(manager.getSound())
  const isLoadingRef = useRef(manager.getIsLoading())

  // Sync state with singleton on mount and check actual playback status
  useEffect(() => {
    const currentSound = manager.getSound()
    if (currentSound && currentSound !== soundRef.current) {
      soundRef.current = currentSound
      // Check actual playback status to sync state
      currentSound
        .getStatusAsync()
        .then((status) => {
          if (status.isLoaded) {
            const actuallyPlaying = status.isPlaying
            setIsPlaying(actuallyPlaying)
            manager.setIsPlaying(actuallyPlaying)
          }
        })
        .catch(() => {
          // Sound might be unloaded, reset state
          setIsPlaying(false)
          manager.setIsPlaying(false)
        })
    } else {
      setIsPlaying(manager.getIsPlaying())
    }
    isLoadingRef.current = manager.getIsLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cleanup sound on unmount (but don't unload if still playing - let singleton manage it)
  useEffect(() => {
    return () => {
      // Only cleanup if component is truly unmounting and sound should stop
      // The singleton will persist the sound instance
      // Note: We don't unload here to allow state to persist across remounts
    }
  }, [])

  const handleTogglePlay = async () => {
    // Prevent multiple simultaneous operations
    if (isLoadingRef.current || manager.getIsLoading()) return

    try {
      if (isPlaying) {
        // Pause the sound
        const sound = soundRef.current || manager.getSound()
        if (sound) {
          await sound.pauseAsync()
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
          const { sound: newSound } = await Audio.Sound.createAsync(
            require("../../assets/sounds/birds.mp3"),
            {
              shouldPlay: true,
              isLooping: true,
              volume: 1.0,
            },
          )
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
          await sound.playAsync()
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
