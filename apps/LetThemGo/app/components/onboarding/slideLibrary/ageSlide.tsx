import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { AgeRanges } from "@/types/AgeRange"
import { ganon } from "@/services/ganon/ganon"
import { OneSignal } from "react-native-onesignal"

type AgeSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/1m/planty.webp")

const options: MultipleChoiceOption<AgeRanges>[] = [
  { id: AgeRanges.SEVENTEEN_OR_UNDER, label: "17 or under" },
  { id: AgeRanges.EIGHTEEN_TO_TWENTY_FIVE, label: "18-25" },
  { id: AgeRanges.TWENTY_SIX_TO_THIRTY_FIVE, label: "26-35" },
  { id: AgeRanges.THIRTY_SIX_TO_FORTY_FIVE, label: "36-45" },
  { id: AgeRanges.FORTY_SIX_TO_FIFTY_FIVE, label: "46-55" },
  { id: AgeRanges.FIFTY_SIX_PLUS, label: "56+" },
]

export function ageSlide({ onSelection }: AgeSlideProps): ISlide {
  // Read saved ageRange from ganon
  const savedAgeRange = ganon.get("ageRange") as AgeRanges | null
  const initialSelected = savedAgeRange ? [savedAgeRange] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`AgeSlide: buttonPressed: ${optionId}`)

    const selectedAgeRange = optionId as AgeRanges

    // Save to ganon
    try {
      ganon.set("ageRange", selectedAgeRange)
      Log.info(`AgeSlide: Saved ageRange: ${selectedAgeRange}`)
    } catch (e) {
      Log.error(`AgeSlide: Error saving ageRange: ${e}`)
    }

    // Add OneSignal tag
    try {
      OneSignal.User.addTag("ageRange", selectedAgeRange)
      Log.info(`AgeSlide: Added OneSignal tag: ageRange=${selectedAgeRange}`)
    } catch (e) {
      Log.error(`AgeSlide: Error adding OneSignal tag: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "ageRange",
    title: "What is your age?",
    description: "This helps us personalize your experience",
    component: (
      <MultipleChoiceSelector
        options={options}
        heroImage={heroImage}
        onSelection={buttonPressed}
        allowMultiple={false}
        maxOptions={6}
        initialSelectedOptions={initialSelected}
        onAutoAdvance={onSelection}
      />
    ),
  }
}
