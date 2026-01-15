import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { RelationshipDurations } from "@/types/RelationshipDuration"
import { ganon } from "@/services/ganon/ganon"

type AnxietySeveritySlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/2m/planty.webp")

const options: MultipleChoiceOption<RelationshipDurations>[] = [
  { id: RelationshipDurations.ZERO_TO_SIX_MONTHS, label: "Mild - occasional worry" },
  { id: RelationshipDurations.SIX_TO_TWELVE_MONTHS, label: "Moderate - regular anxiety" },
  { id: RelationshipDurations.ONE_TO_THREE_YEARS, label: "Severe - frequent episodes" },
  { id: RelationshipDurations.OVER_THREE_YEARS, label: "Very severe - constant anxiety" },
]

export function anxietySeveritySlide({ onSelection }: AnxietySeveritySlideProps): ISlide {
  // Read saved relationshipDuration from ganon (keeping old key for data compatibility)
  const savedDuration = ganon.get("relationshipDuration") as RelationshipDurations | null
  const initialSelected = savedDuration ? [savedDuration] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`AnxietySeveritySlide: buttonPressed: ${optionId}`)

    const selectedDuration = optionId as RelationshipDurations

    // Save to ganon (keeping old key for data compatibility)
    try {
      ganon.set("relationshipDuration", selectedDuration)
      Log.info(`AnxietySeveritySlide: Saved relationshipDuration: ${selectedDuration}`)
    } catch (e) {
      Log.error(`AnxietySeveritySlide: Error saving relationshipDuration: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "relationshipDuration", // Keeping old ID for compatibility
    title: "How would you describe your anxiety?",
    description: "This helps us understand your experience",
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

