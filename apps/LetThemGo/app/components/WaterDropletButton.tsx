import { TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import PlantyManager from "@/managers/PlantyManager"
import { Audio } from "expo-av"

interface WaterDropletButtonProps {
  onPress?: () => void
  /** If true, don't mark as watered (for demo/onboarding purposes) */
  isDemo?: boolean
}

export function WaterDropletButton({ onPress, isDemo = false }: WaterDropletButtonProps) {
  const { theme } = useAppTheme()

  const handlePress = async () => {
    // Only mark as watered if it's not a demo
    if (!isDemo) {
      PlantyManager.markWateredToday()
    }

    // Call onPress first, before playing sound, so component unmount doesn't interrupt
    onPress?.()

    try {
      // Always create a fresh sound instance to avoid state issues
      const { sound } = await Audio.Sound.createAsync(require("../../assets/sounds/droplet.mp3"), {
        shouldPlay: true,
        volume: 1.0,
      })

      // Set up status listener for auto-cleanup
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {
            // Ignore cleanup errors
          })
        }
      })

      // Auto-cleanup after playback completes (sound is ~456ms, give it 1s buffer)
      setTimeout(() => {
        sound
          .getStatusAsync()
          .then((status) => {
            if (status.isLoaded) {
              sound.unloadAsync().catch(() => {
                // Ignore cleanup errors
              })
            }
          })
          .catch(() => {
            // Sound already unloaded, ignore
          })
      }, 1000)
    } catch (error) {
      console.error("WaterDropletButton: Failed to play droplet sound:", error)
    }
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={handlePress}
      style={[$dropletBtn, { backgroundColor: theme.colors.tint }]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text text="💧" style={$dropletEmoji} />
    </TouchableOpacity>
  )
}

const $dropletBtn: ViewStyle = {
  position: "absolute",
  top: -10,
  alignSelf: "center",
  width: 32,
  height: 32,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
}

const $dropletEmoji: TextStyle = {
  fontSize: 16,
  textAlign: "center",
}
