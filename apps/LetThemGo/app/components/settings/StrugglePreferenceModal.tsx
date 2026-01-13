import { View, ViewStyle, TextStyle } from "react-native"
import {
  MultipleChoiceSelector,
  type MultipleChoiceOption,
} from "@/components/onboarding/shared/MultipleChoiceSelector"
import { StrugglePreference, StrugglePreferenceLabels } from "@/types/StrugglePreference"
import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"

interface StrugglePreferenceModalProps {
  onClose: () => void
}

const options: MultipleChoiceOption<StrugglePreference>[] = [
  {
    id: StrugglePreference.CONTACT,
    label: StrugglePreferenceLabels[StrugglePreference.CONTACT],
  },
  {
    id: StrugglePreference.CHECK_SOCIALS,
    label: StrugglePreferenceLabels[StrugglePreference.CHECK_SOCIALS],
  },
]

export function StrugglePreferenceModal({ onClose }: StrugglePreferenceModalProps) {
  const { themed } = useAppTheme()

  // Read saved preference from ganon
  const savedPreference = ganon.get("strugglePreference")
  const initialSelected = savedPreference ? [savedPreference] : []

  const buttonPressed = (optionId: string) => {
    Log.info(`StrugglePreferenceModal: buttonPressed: ${optionId}`)

    const selectedPreference = optionId as StrugglePreference

    // Save to ganon
    try {
      ganon.set("strugglePreference", selectedPreference)
      Log.info(`StrugglePreferenceModal: Saved strugglePreference: ${selectedPreference}`)
    } catch (e) {
      Log.error(`StrugglePreferenceModal: Error saving strugglePreference: ${e}`)
    }

    // Trigger update event to refresh settings screen and HelpModal
    EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)

    // Close modal after selection
    onClose()
  }

  return (
    <View style={themed($container)}>
      <Text
        style={themed($descriptionText)}
        text="This setting helps us personalize the language in the Help modal on your home screen. Choose what you struggle with most."
      />
      <MultipleChoiceSelector
        options={options}
        onSelection={buttonPressed}
        allowMultiple={false}
        initialSelectedOptions={initialSelected}
        maxOptions={10}
      />
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
  marginBottom: 20,
  paddingHorizontal: 10,
})
