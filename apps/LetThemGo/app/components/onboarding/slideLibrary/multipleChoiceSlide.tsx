import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { GoalChoices } from "@/types/GoalChoice"
import { ganon } from "@/services/ganon/ganon"

type MultipleChoiceSlideProps = {
  onSelection?: () => void
  allowMultipleSelections?: boolean
  maxSelections?: number
}

const options: MultipleChoiceOption<GoalChoices>[] = [
  { id: GoalChoices.NO_CONTACT, label: "Stay no contact" },
  { id: GoalChoices.FEEL_BETTER, label: "Feel better faster" },
  { id: GoalChoices.TRACK_MOOD, label: "Track my moods" },
  { id: GoalChoices.JOURNALING, label: "Build a journaling habit" },
  { id: GoalChoices.BUILD_SELF_ESTEEM, label: "Build self-esteem" },
  { id: GoalChoices.PROCESS_EMOTIONS, label: "Process my emotions" },
  { id: GoalChoices.FIND_CLOSURE, label: "Find closure" },
  { id: GoalChoices.REDUCE_ANXIETY, label: "Reduce anxiety" },
  { id: GoalChoices.IMPROVE_SLEEP, label: "Improve sleep" },
  { id: GoalChoices.BUILD_CONFIDENCE, label: "Build confidence" },
  { id: GoalChoices.HEAL_HEARTBREAK, label: "Heal from heartbreak" },
  { id: GoalChoices.FOCUS_ON_MYSELF, label: "Focus on myself" },
]

export function multipleChoiceSlide({
  onSelection,
  allowMultipleSelections = false,
  maxSelections,
}: MultipleChoiceSlideProps): ISlide {
  // Read saved goals from ganon
  const savedGoals = (ganon.get("goals") ?? []) as GoalChoices[]
  const initialSelected = savedGoals

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`MultipleChoiceSlide: buttonPressed: ${optionId}`)

    // Get current goals array from ganon
    const currentGoals = (ganon.get("goals") ?? []) as GoalChoices[]

    // Check if the goal is already in the array
    const goalIndex = currentGoals.indexOf(optionId as GoalChoices)

    let updatedGoals: GoalChoices[]
    if (goalIndex >= 0) {
      // Goal exists, remove it (toggle off)
      updatedGoals = currentGoals.filter((goal) => goal !== optionId)
      Log.info(`MultipleChoiceSlide: Removed goal ${optionId}`)
    } else {
      // Goal doesn't exist, add it (toggle on)
      updatedGoals = [...currentGoals, optionId as GoalChoices]
      Log.info(`MultipleChoiceSlide: Added goal ${optionId}`)
    }

    // Save updated goals array to ganon
    try {
      ganon.set("goals", updatedGoals)
      Log.info(`MultipleChoiceSlide: Updated goals: ${JSON.stringify(updatedGoals)}`)
    } catch (e) {
      Log.error(`MultipleChoiceSlide: Error saving goals: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "healingGoals",
    title: "What do you want help with?",
    description: "Choose what matters most right now",
    component: (
      <MultipleChoiceSelector
        options={options}
        onSelection={buttonPressed}
        allowMultiple={allowMultipleSelections}
        maxSelections={maxSelections}
        initialSelectedOptions={initialSelected}
        onAutoAdvance={onSelection}
      />
    ),
  }
}
