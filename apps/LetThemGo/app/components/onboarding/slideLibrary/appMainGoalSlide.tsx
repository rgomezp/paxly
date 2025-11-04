import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { AppMainGoalChoices } from "@/types/AppMainGoal"
import { ganon } from "@/services/ganon/ganon"

type AppMainGoalSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/2m/planty.webp")

const options: MultipleChoiceOption<AppMainGoalChoices>[] = [
  { id: AppMainGoalChoices.AVOID_CONTACTING, label: "Avoid contacting my ex" },
  { id: AppMainGoalChoices.PROCESS_EMOTIONS, label: "Process my emotions" },
  { id: AppMainGoalChoices.BUILD_UNDERSTANDING, label: "Build understanding" },
  { id: AppMainGoalChoices.OTHER, label: "Other" },
]

export function appMainGoalSlide({ onSelection }: AppMainGoalSlideProps): ISlide {
  // Read saved appMainGoal from ganon
  const savedGoal = ganon.get("appMainGoal") as AppMainGoalChoices | null
  const initialSelected = savedGoal ? [savedGoal] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`AppMainGoalSlide: buttonPressed: ${optionId}`)

    const selectedGoal = optionId as AppMainGoalChoices

    // Save to ganon
    try {
      ganon.set("appMainGoal", selectedGoal)
      Log.info(`AppMainGoalSlide: Saved appMainGoal: ${selectedGoal}`)
    } catch (e) {
      Log.error(`AppMainGoalSlide: Error saving appMainGoal: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "appMainGoal",
    title: "What is your main goal with this app?",
    description: "This helps us personalize your experience",
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

