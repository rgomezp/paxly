import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"

type MultipleChoiceSlideProps = {
  onSelection?: () => void
  allowMultipleSelections?: boolean
  maxSelections?: number
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/4m/planty.webp")

enum Choices {
  NO_CONTACT = "no_contact",
  FEEL_BETTER = "feel_better",
  TRACK_MOOD = "track_mood",
  JOURNALING = "journaling",
}

const options: MultipleChoiceOption<Choices>[] = [
  { id: Choices.NO_CONTACT, label: "Stay no contact" },
  { id: Choices.FEEL_BETTER, label: "Feel better faster" },
  { id: Choices.TRACK_MOOD, label: "Track my moods" },
  { id: Choices.JOURNALING, label: "Build a journaling habit" },
]

export function multipleChoiceSlide({
  onSelection,
  allowMultipleSelections = false,
  maxSelections,
}: MultipleChoiceSlideProps): ISlide {
  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`MultipleChoiceSlide: buttonPressed: ${optionId}`)

    switch (optionId) {
      case Choices.NO_CONTACT:
        break
      case Choices.FEEL_BETTER:
        break
      case Choices.TRACK_MOOD:
        break
      case Choices.JOURNALING:
        break
      default:
        break
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "healingGoals",
    title: "What do you want help with?",
    description: "Choose what matters most right now",
    component: (
      <MultipleChoiceSelector
        options={options}
        heroImage={heroImage}
        onSelection={buttonPressed}
        allowMultiple={allowMultipleSelections}
        maxSelections={maxSelections}
        onAutoAdvance={onSelection}
      />
    ),
  }
}
