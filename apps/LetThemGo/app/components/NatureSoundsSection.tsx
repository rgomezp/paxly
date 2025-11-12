import { FC, useState, useRef, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Audio } from "expo-av"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "@/components/buttons/RectangularButton"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"

export const NatureSoundsSection: FC = function NatureSoundsSection() {
  const { themed, theme } = useAppTheme()
  const [isPlaying, setIsPlaying] = useState(ganon.get("isPlayingNatureSounds") ?? false)
  const soundRef = useRef<Audio.Sound | null>(null)

  // Load and play sound if it should be playing on mount
  useEffect(() => {
    const loadAndPlaySound = async () => {
      const shouldPlay = ganon.get("isPlayingNatureSounds") ?? false
      if (shouldPlay && !soundRef.current) {
        try {
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
        } catch (error) {
          Log.error("NatureSoundsSection: Failed to load sound on mount:", error)
          setIsPlaying(false)
          ganon.set("isPlayingNatureSounds", false)
        }
      }
    }

    loadAndPlaySound()
  }, [])

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {
          // Ignore cleanup errors
        })
        soundRef.current = null
      }
    }
  }, [])

  const handleTogglePlay = async () => {
    try {
      if (isPlaying) {
        // Pause the sound
        if (soundRef.current) {
          await soundRef.current.pauseAsync()
          setIsPlaying(false)
          ganon.set("isPlayingNatureSounds", false)
        }
      } else {
        // Play the sound
        if (!soundRef.current) {
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
        } else {
          // Resume if it already exists
          await soundRef.current.playAsync()
          setIsPlaying(true)
        }
        ganon.set("isPlayingNatureSounds", true)
      }
    } catch (error) {
      Log.error("NatureSoundsSection: Failed to toggle play:", error)
      setIsPlaying(false)
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
