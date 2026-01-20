import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"

type SleepDurationChoices = "less_than_6_hours" | "6_to_8_hours" | "9_to_10_hours" | "10_plus_hours"

type SleepDurationSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<SleepDurationChoices>[] = [
  { id: "less_than_6_hours", label: "< 6 hours" },
  { id: "6_to_8_hours", label: "6-8 hours" },
  { id: "9_to_10_hours", label: "9-10 hours" },
  { id: "10_plus_hours", label: "10+ hours" },
]

export function sleepDurationSlide({ onSelection }: SleepDurationSlideProps): ISlide {
  // Read saved sleepDuration from ganon
  const savedSleepDuration = ganon.get("sleepDuration") as SleepDurationChoices | null
  const initialSelected = savedSleepDuration ? [savedSleepDuration] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`SleepDurationSlide: buttonPressed: ${optionId}`)

    const selectedSleepDuration = optionId as SleepDurationChoices

    // Save to ganon
    try {
      ganon.set("sleepDuration", selectedSleepDuration)
      Log.info(`SleepDurationSlide: Saved sleepDuration: ${selectedSleepDuration}`)
    } catch (e) {
      Log.error(`SleepDurationSlide: Error saving sleepDuration: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "sleepDuration",
    title: "How long do you usually sleep at night?",
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

