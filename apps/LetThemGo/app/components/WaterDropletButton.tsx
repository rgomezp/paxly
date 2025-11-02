import { TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import PlantyManager from "@/managers/PlantyManager"

interface WaterDropletButtonProps {
  onPress?: () => void
}

export function WaterDropletButton({ onPress }: WaterDropletButtonProps) {
  const { theme } = useAppTheme()

  const handlePress = () => {
    PlantyManager.markWateredToday()
    onPress?.()
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
}

const $dropletEmoji: TextStyle = {
  fontSize: 16,
  textAlign: "center",
}
