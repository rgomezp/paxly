import { TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import PlantyManager from "@/managers/PlantyManager"
import Sound from "react-native-sound"

interface WaterDropletButtonProps {
  onPress?: () => void
  /** If true, don't mark as watered (for demo/onboarding purposes) */
  isDemo?: boolean
}

export function WaterDropletButton({ onPress, isDemo = false }: WaterDropletButtonProps) {
  const { theme } = useAppTheme()

  const handlePress = () => {
    // Only mark as watered if it's not a demo
    if (!isDemo) {
      PlantyManager.markWateredToday()
    }

    // Call onPress first, before playing sound, so component unmount doesn't interrupt
    onPress?.()

    try {
      // Always create a fresh sound instance to avoid state issues
      const sound = new Sound(
        require("../../assets/sounds/droplet.mp3"),
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            console.error("WaterDropletButton: Failed to load droplet sound:", error)
            return
          }
          // Sound loaded successfully, start playing
          sound.setVolume(1.0)
          sound.play((playError) => {
            if (playError) {
              console.error("WaterDropletButton: Failed to play droplet sound:", playError)
            }
            // Auto-cleanup after playback completes
            sound.release()
          })
        },
      )
    } catch (error) {
      console.error("WaterDropletButton: Failed to create sound:", error)
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
