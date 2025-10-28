import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"

type FitnessGoalsSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/logo.png")

const options: MultipleChoiceOption[] = [
  { id: "get_stronger", label: "Get stronger" },
  { id: "build_muscle", label: "Build muscle" },
  { id: "improve_endurance", label: "Improve endurance" },
  { id: "lose_fat", label: "Lose fat" },
]

export function fitnessGoalsSlide({ onSelection }: FitnessGoalsSlideProps): ISlide {
  return {
    id: "fitnessGoals",
    title: "What are your fitness goals?",
    description: "This will help us personalize your experience",
    component: (
      <MultipleChoiceSelector
        options={options}
        heroImage={heroImage}
        onSelection={() => onSelection?.()}
      />
    ),
  }
}


