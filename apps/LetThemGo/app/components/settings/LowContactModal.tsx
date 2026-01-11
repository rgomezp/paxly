import { View, ViewStyle, TextStyle } from "react-native"
import { useState } from "react"
import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components"
import { Switch } from "@/components/Toggle/Switch"
import RectangularButton from "@/components/buttons/RectangularButton"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"

interface LowContactModalProps {
  onClose: () => void
}

export function LowContactModal({ onClose }: LowContactModalProps) {
  const { themed } = useAppTheme()

  // Read saved preference from ganon
  const [isLowContact, setIsLowContact] = useState(ganon.get("lowContact") ?? false)

  const handleToggle = (value: boolean) => {
    Log.info(`LowContactModal: Toggled to ${value}`)

    // Update local state immediately
    setIsLowContact(value)

    // Save to ganon
    try {
      ganon.set("lowContact", value)
      Log.info(`LowContactModal: Saved lowContact: ${value}`)
    } catch (e) {
      Log.error(`LowContactModal: Error saving lowContact: ${e}`)
    }

    // Trigger update event to refresh settings screen and HomeScreen
    EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)
  }

  return (
    <View style={themed($container)}>
      <Text
        style={themed($descriptionText)}
        text="Some relationships require low contact rather than no contact. For example, if you're co-parenting, you may need to maintain minimal communication about your children. Enable this setting to personalize the language on your home screen."
      />
      <View style={themed($toggleContainer)}>
        <Text style={themed($toggleLabel)} text="Low contact" />
        <Switch value={isLowContact} onValueChange={handleToggle} />
      </View>
      <View style={themed($buttonContainer)}>
        <RectangularButton buttonText="Done" onClick={onClose} width="100%" />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
})

const $descriptionText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  fontSize: 14,
  color: theme.colors.textDim,
  marginBottom: 24,
  paddingHorizontal: 10,
})

const $toggleContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 10,
})

const $toggleLabel: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 16,
  color: theme.colors.text,
  flex: 1,
})

const $buttonContainer: ThemedStyle<ViewStyle> = () => ({
  marginTop: 24,
  paddingHorizontal: 10,
})
