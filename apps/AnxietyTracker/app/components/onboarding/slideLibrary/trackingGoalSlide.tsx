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
  // Read saved trackingGoal from ganon
  const savedGoal = ganon.get("trackingGoal") as NoContactReasonChoices | null
  const initialSelected = savedGoal ? [savedGoal] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`TrackingGoalSlide: buttonPressed: ${optionId}`)

    const selectedGoal = optionId as NoContactReasonChoices

    // Save to ganon with new key
    try {
      ganon.set("trackingGoal", selectedGoal)
      Log.info(`TrackingGoalSlide: Saved trackingGoal: ${selectedGoal}`)
    } catch (e) {
      Log.error(`TrackingGoalSlide: Error saving trackingGoal: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "trackingGoal",
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

