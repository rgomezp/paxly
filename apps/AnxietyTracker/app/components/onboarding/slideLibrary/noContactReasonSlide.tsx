import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { NoContactReasonChoices } from "@/types/NoContactReason"
import { ganon } from "@/services/ganon/ganon"

type NoContactReasonSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/4m/planty.webp")

const options: MultipleChoiceOption<NoContactReasonChoices>[] = [
  { id: NoContactReasonChoices.TAKE_BACK_CONTROL, label: "Understand my anxiety patterns" },
  { id: NoContactReasonChoices.GET_EX_BACK, label: "Reduce my anxiety levels" },
  { id: NoContactReasonChoices.MOVE_ON, label: "Build better coping strategies" },
  { id: NoContactReasonChoices.DONT_KNOW, label: "I'm not sure yet" },
]

export function noContactReasonSlide({ onSelection }: NoContactReasonSlideProps): ISlide {
  // Read saved noContactReason from ganon
  const savedReason = ganon.get("noContactReason") as NoContactReasonChoices | null
  const initialSelected = savedReason ? [savedReason] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`NoContactReasonSlide: buttonPressed: ${optionId}`)

    const selectedReason = optionId as NoContactReasonChoices

    // Save to ganon
    try {
      ganon.set("noContactReason", selectedReason)
      Log.info(`NoContactReasonSlide: Saved noContactReason: ${selectedReason}`)
    } catch (e) {
      Log.error(`NoContactReasonSlide: Error saving noContactReason: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "noContactReason",
    title: "What's your main goal with tracking?",
    description: "This helps us understand what you want to achieve",
    component: (
      <MultipleChoiceSelector
        options={options}
        heroImage={heroImage}
        onSelection={buttonPressed}
        allowMultiple={false}
        initialSelectedOptions={initialSelected}
        onAutoAdvance={onSelection}
      />
    ),
  }
}
