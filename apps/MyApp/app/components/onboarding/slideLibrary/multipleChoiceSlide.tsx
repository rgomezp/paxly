import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"

type MultipleChoiceSlideProps = {
  onSelection?: () => void
  allowMultipleSelections?: boolean
  maxSelections?: number
}

const heroImage: ImageRequireSource = require("../../../../assets/images/logo.png")

const options: MultipleChoiceOption[] = [
  { id: "get_stronger", label: "Get stronger" },
  { id: "build_muscle", label: "Build muscle" },
  { id: "improve_endurance", label: "Improve endurance" },
  { id: "lose_fat", label: "Lose fat" },
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
    id: "fitnessGoals",
    title: "What are your fitness goals?",
    description: "This will help us personalize your experience",
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
