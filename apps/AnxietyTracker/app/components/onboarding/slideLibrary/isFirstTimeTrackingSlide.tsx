import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { YesNoChoices } from "@/types/YesNo"
import { ganon } from "@/services/ganon/ganon"

type IsFirstTimeTrackingSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/3m/planty.webp")

const options: MultipleChoiceOption<YesNoChoices>[] = [
  { id: YesNoChoices.YES, label: "Yes" },
  { id: YesNoChoices.NO, label: "No" },
]

export function isFirstTimeTrackingSlide({ onSelection }: IsFirstTimeTrackingSlideProps): ISlide {
  // Read saved isFirstBreakup from ganon (keeping old key for data compatibility)
  const savedChoice = ganon.get("isFirstBreakup") as YesNoChoices | null
  const initialSelected = savedChoice ? [savedChoice] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`IsFirstTimeTrackingSlide: buttonPressed: ${optionId}`)

    const selectedChoice = optionId as YesNoChoices

    // Save to ganon (keeping old key for data compatibility)
    try {
      ganon.set("isFirstBreakup", selectedChoice)
      Log.info(`IsFirstTimeTrackingSlide: Saved isFirstBreakup: ${selectedChoice}`)
    } catch (e) {
      Log.error(`IsFirstTimeTrackingSlide: Error saving isFirstBreakup: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "isFirstBreakup", // Keeping old ID for compatibility
    title: "Is this your first time tracking anxiety?",
    description: "This helps us personalize your experience",
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

