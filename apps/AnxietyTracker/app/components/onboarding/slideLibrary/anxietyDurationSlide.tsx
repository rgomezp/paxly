import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { AnxietyDurationChoices } from "@/types/WhoEndedIt"
import { ganon } from "@/services/ganon/ganon"

type AnxietyDurationSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<AnxietyDurationChoices>[] = [
  { id: AnxietyDurationChoices.LESS_THAN_6_MONTHS, label: "Less than 6 months" },
  { id: AnxietyDurationChoices.SIX_MONTHS_TO_TWO_YEARS, label: "6 months to 2 years" },
  { id: AnxietyDurationChoices.MORE_THAN_TWO_YEARS, label: "More than 2 years" },
]

export function anxietyDurationSlide({ onSelection }: AnxietyDurationSlideProps): ISlide {
  // Read saved anxietyDuration from ganon
  const savedDuration = ganon.get("anxietyDuration") as AnxietyDurationChoices | null
  const initialSelected = savedDuration ? [savedDuration] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`AnxietyDurationSlide: buttonPressed: ${optionId}`)

    const selectedDuration = optionId as AnxietyDurationChoices

    // Save to ganon with new key
    try {
      ganon.set("anxietyDuration", selectedDuration)
      Log.info(`AnxietyDurationSlide: Saved anxietyDuration: ${selectedDuration}`)
    } catch (e) {
      Log.error(`AnxietyDurationSlide: Error saving anxietyDuration: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "anxietyDuration",
    title: "How long have you been dealing with anxiety?",
    description: "This helps us understand your journey",
    component: (
      <MultipleChoiceSelector
        options={options}
        onSelection={buttonPressed}
        allowMultiple={false}
        initialSelectedOptions={initialSelected}
        onAutoAdvance={onSelection}
      />
    ),
  }
}
