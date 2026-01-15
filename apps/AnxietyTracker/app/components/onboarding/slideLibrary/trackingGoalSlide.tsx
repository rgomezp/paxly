import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { NoContactReasonChoices } from "@/types/NoContactReason"
import { ganon } from "@/services/ganon/ganon"

type TrackingGoalSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/4m/planty.webp")

const options: MultipleChoiceOption<NoContactReasonChoices>[] = [
  { id: NoContactReasonChoices.TAKE_BACK_CONTROL, label: "Understand my anxiety patterns" },
  { id: NoContactReasonChoices.GET_EX_BACK, label: "Reduce my anxiety levels" },
  { id: NoContactReasonChoices.MOVE_ON, label: "Build better coping strategies" },
  { id: NoContactReasonChoices.DONT_KNOW, label: "I'm not sure yet" },
]

export function trackingGoalSlide({ onSelection }: TrackingGoalSlideProps): ISlide {
  // Read saved noContactReason from ganon (keeping old key for data compatibility)
  const savedReason = ganon.get("noContactReason") as NoContactReasonChoices | null
  const initialSelected = savedReason ? [savedReason] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`TrackingGoalSlide: buttonPressed: ${optionId}`)

    const selectedReason = optionId as NoContactReasonChoices

    // Save to ganon (keeping old key for data compatibility)
    try {
      ganon.set("noContactReason", selectedReason)
      Log.info(`TrackingGoalSlide: Saved noContactReason: ${selectedReason}`)
    } catch (e) {
      Log.error(`TrackingGoalSlide: Error saving noContactReason: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "noContactReason", // Keeping old ID for compatibility
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

