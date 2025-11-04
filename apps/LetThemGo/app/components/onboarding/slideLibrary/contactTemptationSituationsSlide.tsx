import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ContactTemptationSituationsChoices } from "@/types/ContactTemptationSituations"
import { ganon } from "@/services/ganon/ganon"

type ContactTemptationSituationsSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<ContactTemptationSituationsChoices>[] = [
  { id: ContactTemptationSituationsChoices.WHEN_LONELY, label: "When I'm lonely" },
  { id: ContactTemptationSituationsChoices.WHEN_SAD, label: "When I'm sad" },
  {
    id: ContactTemptationSituationsChoices.WHEN_SEEING_THEIR_POSTS,
    label: "When seeing their posts",
  },
  { id: ContactTemptationSituationsChoices.ON_SPECIAL_DATES, label: "On special dates" },
  { id: ContactTemptationSituationsChoices.WHEN_DRUNK, label: "When I'm drunk" },
]

export function contactTemptationSituationsSlide({
  onSelection,
}: ContactTemptationSituationsSlideProps): ISlide {
  // Read saved contactTemptationSituations from ganon
  const savedSituation = ganon.get(
    "contactTemptationSituation",
  ) as ContactTemptationSituationsChoices | null
  const initialSelected = savedSituation ? [savedSituation] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`ContactTemptationSituationsSlide: buttonPressed: ${optionId}`)

    const selectedSituation = optionId as ContactTemptationSituationsChoices

    // Save to ganon
    try {
      ganon.set("contactTemptationSituation", selectedSituation)
      Log.info(
        `ContactTemptationSituationsSlide: Saved contactTemptationSituation: ${selectedSituation}`,
      )
    } catch (e) {
      Log.error(`ContactTemptationSituationsSlide: Error saving contactTemptationSituation: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "contactTemptationSituation",
    title: "In which situations do you most want to contact your ex?",
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
