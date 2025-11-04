import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { YesNoChoices } from "@/types/YesNo"
import { ganon } from "@/services/ganon/ganon"

type CheckSocialMediaSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/5m/planty.webp")

const options: MultipleChoiceOption<YesNoChoices>[] = [
  { id: YesNoChoices.YES, label: "Yes" },
  { id: YesNoChoices.NO, label: "No" },
]

export function checkSocialMediaSlide({ onSelection }: CheckSocialMediaSlideProps): ISlide {
  // Read saved checkSocialMedia from ganon
  const savedChoice = ganon.get("checkSocialMedia") as YesNoChoices | null
  const initialSelected = savedChoice ? [savedChoice] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`CheckSocialMediaSlide: buttonPressed: ${optionId}`)

    const selectedChoice = optionId as YesNoChoices

    // Save to ganon
    try {
      ganon.set("checkSocialMedia", selectedChoice)
      Log.info(`CheckSocialMediaSlide: Saved checkSocialMedia: ${selectedChoice}`)
    } catch (e) {
      Log.error(`CheckSocialMediaSlide: Error saving checkSocialMedia: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "checkSocialMedia",
    title: "Do you check your ex's social media?",
    description: "Be honest - we're here to help",
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

