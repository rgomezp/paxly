import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { WhoEndedItChoices } from "@/types/WhoEndedIt"
import { ganon } from "@/services/ganon/ganon"

type WhoEndedItSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/4m/planty.webp")

const options: MultipleChoiceOption<WhoEndedItChoices>[] = [
  { id: WhoEndedItChoices.ME, label: "Less than 6 months" },
  { id: WhoEndedItChoices.THEM, label: "6 months to 2 years" },
  { id: WhoEndedItChoices.MUTUAL, label: "More than 2 years" },
]

export function whoEndedItSlide({ onSelection }: WhoEndedItSlideProps): ISlide {
  // Read saved whoEndedIt from ganon
  const savedChoice = ganon.get("whoEndedIt") as WhoEndedItChoices | null
  const initialSelected = savedChoice ? [savedChoice] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`WhoEndedItSlide: buttonPressed: ${optionId}`)

    const selectedChoice = optionId as WhoEndedItChoices

    // Save to ganon
    try {
      ganon.set("whoEndedIt", selectedChoice)
      Log.info(`WhoEndedItSlide: Saved whoEndedIt: ${selectedChoice}`)
    } catch (e) {
      Log.error(`WhoEndedItSlide: Error saving whoEndedIt: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "whoEndedIt",
    title: "How long have you been dealing with anxiety?",
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
