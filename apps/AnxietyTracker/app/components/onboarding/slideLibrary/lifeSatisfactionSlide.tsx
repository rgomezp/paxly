import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"

type LifeSatisfactionChoices = "very_satisfied" | "normal" | "unsatisfied"

type LifeSatisfactionSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<LifeSatisfactionChoices>[] = [
  { id: "very_satisfied", label: "Very Satisfied" },
  { id: "normal", label: "Normal" },
  { id: "unsatisfied", label: "Unsatisfied" },
]

export function lifeSatisfactionSlide({ onSelection }: LifeSatisfactionSlideProps): ISlide {
  // Read saved lifeSatisfaction from ganon
  const savedLifeSatisfaction = ganon.get("lifeSatisfaction") as LifeSatisfactionChoices | null
  const initialSelected = savedLifeSatisfaction ? [savedLifeSatisfaction] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`LifeSatisfactionSlide: buttonPressed: ${optionId}`)

    const selectedLifeSatisfaction = optionId as LifeSatisfactionChoices

    // Save to ganon
    try {
      ganon.set("lifeSatisfaction", selectedLifeSatisfaction)
      Log.info(`LifeSatisfactionSlide: Saved lifeSatisfaction: ${selectedLifeSatisfaction}`)
    } catch (e) {
      Log.error(`LifeSatisfactionSlide: Error saving lifeSatisfaction: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "lifeSatisfaction",
    title: "How satisfied are you with your life?",
    component: (
      <MultipleChoiceSelector
        options={options}
        onSelection={buttonPressed}
        allowMultiple={false}
        maxOptions={3}
        initialSelectedOptions={initialSelected}
        onAutoAdvance={onSelection}
      />
    ),
    textAlignment: "center",
  }
}
