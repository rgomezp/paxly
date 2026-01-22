import { View, ViewStyle } from "react-native"
import {
  MultipleChoiceSelector,
  type MultipleChoiceOption,
} from "@/components/onboarding/shared/MultipleChoiceSelector"
import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import EventRegister from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"

type NatureSoundType = "waves" | "birds"

interface NatureSoundTypeModalProps {
  onClose: () => void
}

const options: MultipleChoiceOption<NatureSoundType>[] = [
  {
    id: "waves",
    label: "Waves",
  },
  {
    id: "birds",
    label: "Birds",
  },
]

export function NatureSoundTypeModal({ onClose }: NatureSoundTypeModalProps) {
  const { themed } = useAppTheme()

  // Read saved sound type from ganon, default to "waves"
  const savedSoundType = (ganon.get("natureSoundType") as NatureSoundType | null) ?? "waves"
  const initialSelected = [savedSoundType]

  const buttonPressed = (optionId: string) => {
    Log.info(`NatureSoundTypeModal: buttonPressed: ${optionId}`)

    const selectedSoundType = optionId as NatureSoundType

    // Save to ganon
    try {
      ganon.set("natureSoundType", selectedSoundType)
      Log.info(`NatureSoundTypeModal: Saved natureSoundType: ${selectedSoundType}`)
    } catch (e) {
      Log.error(`NatureSoundTypeModal: Error saving natureSoundType: ${e}`)
    }

    // Trigger update event to refresh settings screen
    EventRegister.emit(GLOBAL_EVENTS.UPDATE_ALL)

    // Close modal after selection
    onClose()
  }

  return (
    <View style={themed($container)}>
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
