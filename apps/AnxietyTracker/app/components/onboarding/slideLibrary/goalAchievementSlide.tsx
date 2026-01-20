import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"

type GoalAchievementChoices = "always" | "often" | "sometimes" | "rarely"

type GoalAchievementSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<GoalAchievementChoices>[] = [
  { id: "always", label: "Always" },
  { id: "often", label: "Often" },
  { id: "sometimes", label: "Sometimes" },
  { id: "rarely", label: "Rarely" },
]

export function goalAchievementSlide({ onSelection }: GoalAchievementSlideProps): ISlide {
  // Read saved goalAchievement from ganon
  const savedGoalAchievement = ganon.get("goalAchievement") as GoalAchievementChoices | null
  const initialSelected = savedGoalAchievement ? [savedGoalAchievement] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`GoalAchievementSlide: buttonPressed: ${optionId}`)

    const selectedGoalAchievement = optionId as GoalAchievementChoices

    // Save to ganon
    try {
      ganon.set("goalAchievement", selectedGoalAchievement)
      Log.info(`GoalAchievementSlide: Saved goalAchievement: ${selectedGoalAchievement}`)
    } catch (e) {
      Log.error(`GoalAchievementSlide: Error saving goalAchievement: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "goalAchievement",
    title: "How often do you achieve your goals?",
    component: (
      <MultipleChoiceSelector
        options={options}
        onSelection={buttonPressed}
        allowMultiple={false}
        maxOptions={4}
        initialSelectedOptions={initialSelected}
        onAutoAdvance={onSelection}
      />
    ),
    textAlignment: "center",
  }
}

