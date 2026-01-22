import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { RelationshipDurations } from "@/types/RelationshipDuration"
import { ganon } from "@/services/ganon/ganon"

type AnxietySeveritySlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<RelationshipDurations>[] = [
  { id: RelationshipDurations.ZERO_TO_SIX_MONTHS, label: "Mild - occasional worry" },
  { id: RelationshipDurations.SIX_TO_TWELVE_MONTHS, label: "Moderate - regular anxiety" },
  { id: RelationshipDurations.ONE_TO_THREE_YEARS, label: "Severe - frequent episodes" },
  { id: RelationshipDurations.OVER_THREE_YEARS, label: "Very severe - constant anxiety" },
]

export function anxietySeveritySlide({ onSelection }: AnxietySeveritySlideProps): ISlide {
  // Read saved anxietySeverity from ganon
  const savedSeverity = ganon.get("anxietySeverity") as RelationshipDurations | null
  const initialSelected = savedSeverity ? [savedSeverity] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`AnxietySeveritySlide: buttonPressed: ${optionId}`)

    const selectedSeverity = optionId as RelationshipDurations

    // Save to ganon with new key
    try {
      ganon.set("anxietySeverity", selectedSeverity)
      Log.info(`AnxietySeveritySlide: Saved anxietySeverity: ${selectedSeverity}`)
    } catch (e) {
      Log.error(`AnxietySeveritySlide: Error saving anxietySeverity: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "anxietySeverity",
    title: "How would you describe your anxiety?",
    description: "This helps us understand your experience",
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
