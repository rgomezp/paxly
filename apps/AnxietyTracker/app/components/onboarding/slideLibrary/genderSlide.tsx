import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { Genders } from "@/types/Gender"
import { ganon } from "@/services/ganon/ganon"
import { OneSignal } from "react-native-onesignal"

type GenderSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/1w/planty.webp")

const options: MultipleChoiceOption<Genders>[] = [
  { id: Genders.FEMALE, label: "Female" },
  { id: Genders.MALE, label: "Male" },
  { id: Genders.PREFER_NOT_TO_SAY, label: "Prefer not to say" },
]

export function genderSlide({ onSelection }: GenderSlideProps): ISlide {
  // Read saved gender from ganon
  const savedGender = ganon.get("gender") as Genders | null
  const initialSelected = savedGender ? [savedGender] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`GenderSlide: buttonPressed: ${optionId}`)

    const selectedGender = optionId as Genders

    // Save to ganon
    try {
      ganon.set("gender", selectedGender)
      Log.info(`GenderSlide: Saved gender: ${selectedGender}`)
    } catch (e) {
      Log.error(`GenderSlide: Error saving gender: ${e}`)
    }

    // Add OneSignal tag
    try {
      OneSignal.User.addTag("gender", selectedGender)
      Log.info(`GenderSlide: Added OneSignal tag: gender=${selectedGender}`)
    } catch (e) {
      Log.error(`GenderSlide: Error adding OneSignal tag: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "gender",
    title: "What is your gender?",
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
