import { useEffect, useCallback, useState } from "react"
import { createAudioPlayer, AudioPlayer } from "expo-audio"
import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"

// Module-level singleton to ensure only one nature sound player instance exists
let natureSoundPlayer: AudioPlayer | null = null

/**
 * Hook to manage nature sounds at the app level.
 * Plays ambient nature sounds (waves or birds) based on user settings.
 */
export function useNatureSounds() {
  const [natureSoundsEnabled, setNatureSoundsEnabled] = useState<boolean>(
    () => (ganon.get("natureSoundsEnabled") as boolean | undefined) ?? false,
  )
  const [natureSoundType, setNatureSoundType] = useState<"waves" | "birds">(
    () => (ganon.get("natureSoundType") as "waves" | "birds" | null) ?? "waves",
  )

  // Function to update nature sound based on current settings
  const updateNatureSound = useCallback(() => {
    const enabled = (ganon.get("natureSoundsEnabled") as boolean | undefined) ?? false
    const soundType = (ganon.get("natureSoundType") as "waves" | "birds" | null) ?? "waves"

    setNatureSoundsEnabled(enabled)
    setNatureSoundType(soundType)
  }, [])

  // Initial read of settings on mount
  useEffect(() => {
    updateNatureSound()
  }, [updateNatureSound])

  // Listen for settings updates
  useEffect(() => {
    const handleUpdateAll = () => {
      // Small delay to ensure ganon has updated
      setTimeout(() => {
        updateNatureSound()
      }, 50)
    }

    EventRegister.on(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)

    return () => {
      EventRegister.off(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)
    }
  }, [updateNatureSound])

  // Helper function to stop the current sound
  const stopCurrentSound = useCallback(() => {
    if (natureSoundPlayer) {
      try {
        // Pause first to stop playback immediately
        natureSoundPlayer.pause()
        // Then remove to clean up resources
        natureSoundPlayer.remove()
        Log.info("useNatureSounds: Stopped nature sound (paused and removed)")
      } catch (error) {
        Log.error("useNatureSounds: Error stopping nature sound player:", error)
      } finally {
        // Clear singleton reference after attempting to stop
        natureSoundPlayer = null
      }
    }
  }, [])

  // Play/stop nature sounds based on settings
  useEffect(() => {
    Log.info(
      `useNatureSounds: Settings changed - enabled: ${natureSoundsEnabled}, type: ${natureSoundType}`,
    )

    // Always stop any existing nature sound first (synchronously)
    stopCurrentSound()

    // Play nature sound if enabled
    if (natureSoundsEnabled) {
      // Small delay to ensure previous sound is fully stopped
      const playTimer = setTimeout(() => {
        // Double-check we're still enabled (in case user toggled off during delay)
        if (!natureSoundsEnabled) {
          Log.info("useNatureSounds: Sound disabled during play delay, skipping")
          return
        }

        try {
          // Ensure any existing player is stopped first
          if (natureSoundPlayer) {
            try {
              natureSoundPlayer.pause()
              natureSoundPlayer.remove()
            } catch (e) {
              // Ignore errors when cleaning up old player
            }
            natureSoundPlayer = null
          }

          const soundFile =
            natureSoundType === "waves"
              ? require("../../assets/sounds/waves.mp3")
              : require("../../assets/sounds/birds.mp3")

          const sound = createAudioPlayer(soundFile)
          sound.volume = 0.5 // Set a reasonable volume for ambient sounds
          sound.loop = true
          sound.play()

          // Store in singleton
          natureSoundPlayer = sound

          Log.info(`useNatureSounds: Playing nature sound: ${natureSoundType}`)
        } catch (error) {
          Log.error("useNatureSounds: Failed to play nature sound:", error)
          natureSoundPlayer = null
        }
      }, 50) // Reduced delay for faster response

      return () => {
        clearTimeout(playTimer)
        // Stop sound if effect is cleaning up
        stopCurrentSound()
      }
    } else {
      Log.info("useNatureSounds: Nature sounds disabled - sound stopped")
      // No cleanup needed here since we already stopped it above
      return undefined
    }
  }, [natureSoundsEnabled, natureSoundType, stopCurrentSound]) // Re-run when settings change
}

