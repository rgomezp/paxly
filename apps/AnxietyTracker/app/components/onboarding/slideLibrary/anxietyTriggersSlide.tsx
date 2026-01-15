import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ContactTemptationSituationsChoices } from "@/types/ContactTemptationSituations"
import { ganon } from "@/services/ganon/ganon"

type AnxietyTriggersSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<ContactTemptationSituationsChoices>[] = [
  { id: ContactTemptationSituationsChoices.WHEN_LONELY, label: "In social situations" },
  { id: ContactTemptationSituationsChoices.WHEN_SAD, label: "When I'm stressed" },
  {
    id: ContactTemptationSituationsChoices.WHEN_SEEING_THEIR_POSTS,
    label: "At work or school",
  },
  { id: ContactTemptationSituationsChoices.ON_SPECIAL_DATES, label: "In the morning" },
  { id: ContactTemptationSituationsChoices.WHEN_DRUNK, label: "Before bed" },
]

export function anxietyTriggersSlide({
  onSelection,
}: AnxietyTriggersSlideProps): ISlide {
  // Read saved anxietyTriggerSituation from ganon
  const savedTrigger = ganon.get("anxietyTriggerSituation") as ContactTemptationSituationsChoices | null
  const initialSelected = savedTrigger ? [savedTrigger] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`AnxietyTriggersSlide: buttonPressed: ${optionId}`)

    const selectedTrigger = optionId as ContactTemptationSituationsChoices

    // Save to ganon with new key
    try {
      ganon.set("anxietyTriggerSituation", selectedTrigger)
      Log.info(
        `AnxietyTriggersSlide: Saved anxietyTriggerSituation: ${selectedTrigger}`,
      )
    } catch (e) {
      Log.error(`AnxietyTriggersSlide: Error saving anxietyTriggerSituation: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "anxietyTriggerSituation",
    title: "When do you experience anxiety most?",
    component: (
      <MultipleChoiceSelector
        options={options}
        onSelection={buttonPressed}
        allowMultiple={false}
        maxOptions={5}
        initialSelectedOptions={initialSelected}
        onAutoAdvance={onSelection}
      />
    ),
  }
}

