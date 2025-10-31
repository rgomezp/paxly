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

const options: MultipleChoiceOption[] = [
  { id: "no_contact", label: "Stay no contact" },
  { id: "feel_better", label: "Feel better faster" },
  { id: "track_mood", label: "Track my moods" },
  { id: "journaling", label: "Build a journaling habit" },
]

export function multipleChoiceSlide({
  onSelection,
  allowMultipleSelections = false,
  maxSelections,
}: MultipleChoiceSlideProps): ISlide {
  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`MultipleChoiceSlide: buttonPressed: ${optionId}`)

    switch (optionId) {
      case "get_stronger":
        break
      case "build_muscle":
        break
      case "improve_endurance":
        break
      case "lose_fat":
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
