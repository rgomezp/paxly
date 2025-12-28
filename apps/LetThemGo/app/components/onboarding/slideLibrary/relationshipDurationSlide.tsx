import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { RelationshipDurations } from "@/types/RelationshipDuration"
import { ganon } from "@/services/ganon/ganon"

type RelationshipDurationSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/2m/planty.webp")

const options: MultipleChoiceOption<RelationshipDurations>[] = [
  { id: RelationshipDurations.ZERO_TO_SIX_MONTHS, label: "0-6 months" },
  { id: RelationshipDurations.SIX_TO_TWELVE_MONTHS, label: "6-12 months" },
  { id: RelationshipDurations.ONE_TO_THREE_YEARS, label: "1-3 years" },
  { id: RelationshipDurations.OVER_THREE_YEARS, label: "Over 3 years" },
]

export function relationshipDurationSlide({ onSelection }: RelationshipDurationSlideProps): ISlide {
  // Read saved relationshipDuration from ganon
  const savedDuration = ganon.get("relationshipDuration") as RelationshipDurations | null
  const initialSelected = savedDuration ? [savedDuration] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`RelationshipDurationSlide: buttonPressed: ${optionId}`)

    const selectedDuration = optionId as RelationshipDurations

    // Save to ganon
    try {
      ganon.set("relationshipDuration", selectedDuration)
      Log.info(`RelationshipDurationSlide: Saved relationshipDuration: ${selectedDuration}`)
    } catch (e) {
      Log.error(`RelationshipDurationSlide: Error saving relationshipDuration: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "relationshipDuration",
    title: "How long were you together for?",
    description: "This helps us understand your journey",
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
