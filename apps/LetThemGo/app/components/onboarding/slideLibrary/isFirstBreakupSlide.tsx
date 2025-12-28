import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { YesNoChoices } from "@/types/YesNo"
import { ganon } from "@/services/ganon/ganon"

type IsFirstBreakupSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/3m/planty.webp")

const options: MultipleChoiceOption<YesNoChoices>[] = [
  { id: YesNoChoices.YES, label: "Yes" },
  { id: YesNoChoices.NO, label: "No" },
]

export function isFirstBreakupSlide({ onSelection }: IsFirstBreakupSlideProps): ISlide {
  // Read saved isFirstBreakup from ganon
  const savedChoice = ganon.get("isFirstBreakup") as YesNoChoices | null
  const initialSelected = savedChoice ? [savedChoice] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`IsFirstBreakupSlide: buttonPressed: ${optionId}`)

    const selectedChoice = optionId as YesNoChoices

    // Save to ganon
    try {
      ganon.set("isFirstBreakup", selectedChoice)
      Log.info(`IsFirstBreakupSlide: Saved isFirstBreakup: ${selectedChoice}`)
    } catch (e) {
      Log.error(`IsFirstBreakupSlide: Error saving isFirstBreakup: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "isFirstBreakup",
    title: "Is this your first break up together?",
    description: "This helps us understand your situation",
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
