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
  { id: NoContactReasonChoices.TAKE_BACK_CONTROL, label: "Take back control of my life" },
  { id: NoContactReasonChoices.GET_EX_BACK, label: "Try to get my ex back" },
  { id: NoContactReasonChoices.MOVE_ON, label: "To move on" },
  { id: NoContactReasonChoices.DONT_KNOW, label: "I don't know" },
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
    title: "Why did you decide to start no contact?",
    description: "This helps us understand your motivation",
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

