import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { YesNoChoices } from "@/types/YesNo"
import { ganon } from "@/services/ganon/ganon"

type TrackAnxietyTriggersSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/5m/planty.webp")

const options: MultipleChoiceOption<YesNoChoices>[] = [
  { id: YesNoChoices.YES, label: "Yes" },
  { id: YesNoChoices.NO, label: "No" },
]

export function trackAnxietyTriggersSlide({ onSelection }: TrackAnxietyTriggersSlideProps): ISlide {
  // Read saved checkSocialMedia from ganon (keeping old key for data compatibility)
  const savedChoice = ganon.get("checkSocialMedia") as YesNoChoices | null
  const initialSelected = savedChoice ? [savedChoice] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`TrackAnxietyTriggersSlide: buttonPressed: ${optionId}`)

    const selectedChoice = optionId as YesNoChoices

    // Save to ganon (keeping old key for data compatibility)
    try {
      ganon.set("checkSocialMedia", selectedChoice)
      Log.info(`TrackAnxietyTriggersSlide: Saved checkSocialMedia: ${selectedChoice}`)
    } catch (e) {
      Log.error(`TrackAnxietyTriggersSlide: Error saving checkSocialMedia: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "checkSocialMedia", // Keeping old ID for compatibility
    title: "Do you want to track anxiety triggers?",
    description: "This helps us personalize your tracking experience",
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

