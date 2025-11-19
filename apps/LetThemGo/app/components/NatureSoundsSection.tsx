import { FC, useState, useRef, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Audio } from "expo-av"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "@/components/buttons/RectangularButton"
import Log from "@/utils/Log"

export const NatureSoundsSection: FC = function NatureSoundsSection() {
  const { themed, theme } = useAppTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const soundRef = useRef<Audio.Sound | null>(null)
  const isLoadingRef = useRef(false)

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      const cleanup = async () => {
        if (soundRef.current) {
          try {
            // Stop and unload completely
            await soundRef.current.stopAsync()
            await soundRef.current.unloadAsync()
          } catch (error) {
            // Ignore cleanup errors
            Log.error("NatureSoundsSection: Cleanup error:", error)
          } finally {
            soundRef.current = null
          }
        }
      }
      cleanup()
    }
  }, [])

  const handleTogglePlay = async () => {
    // Prevent multiple simultaneous operations
    if (isLoadingRef.current) return

    try {
      if (isPlaying) {
        // Pause the sound
        if (soundRef.current) {
          await soundRef.current.pauseAsync()
          setIsPlaying(false)
        }
      } else {
        // Play the sound
        if (!soundRef.current) {
          isLoadingRef.current = true
          // Create and load the sound if it doesn't exist
          const { sound } = await Audio.Sound.createAsync(
            require("../../assets/sounds/birds.mp3"),
            {
              shouldPlay: true,
              isLooping: true,
              volume: 1.0,
            },
          )
          soundRef.current = sound
          setIsPlaying(true)
          isLoadingRef.current = false
        } else {
          // Resume if it already exists
          await soundRef.current.playAsync()
          setIsPlaying(true)
        }
      }
    } catch (error) {
      Log.error("NatureSoundsSection: Failed to toggle play:", error)
      setIsPlaying(false)
      isLoadingRef.current = false
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
