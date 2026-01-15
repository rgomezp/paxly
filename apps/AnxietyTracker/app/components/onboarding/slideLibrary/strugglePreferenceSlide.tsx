import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { StrugglePreference, StrugglePreferenceLabels } from "@/types/StrugglePreference"
import { ganon } from "@/services/ganon/ganon"
import { OneSignal } from "react-native-onesignal"

type StrugglePreferenceSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/1w/planty.webp")

const options: MultipleChoiceOption<StrugglePreference>[] = [
  {
    id: StrugglePreference.CONTACT,
    label: StrugglePreferenceLabels[StrugglePreference.CONTACT],
  },
  {
    id: StrugglePreference.CHECK_SOCIALS,
    label: StrugglePreferenceLabels[StrugglePreference.CHECK_SOCIALS],
  },
]

export function strugglePreferenceSlide({ onSelection }: StrugglePreferenceSlideProps): ISlide {
  // Read saved preference from ganon
  const savedPreference = ganon.get("strugglePreference")
  const initialSelected = savedPreference ? [savedPreference] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`StrugglePreferenceSlide: buttonPressed: ${optionId}`)

    const selectedPreference = optionId as StrugglePreference

    // Save to ganon
    try {
      ganon.set("strugglePreference", selectedPreference)
      Log.info(`StrugglePreferenceSlide: Saved strugglePreference: ${selectedPreference}`)
    } catch (e) {
      Log.error(`StrugglePreferenceSlide: Error saving strugglePreference: ${e}`)
    }

    // Add OneSignal tag
    try {
      OneSignal.User.addTag("struggle_preference", selectedPreference)
      Log.info(
        `StrugglePreferenceSlide: Added OneSignal tag: struggle_preference=${selectedPreference}`,
      )
    } catch (e) {
      Log.error(`StrugglePreferenceSlide: Error adding OneSignal tag: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "strugglePreference",
    title: "What do you want to focus on?",
    description:
      "This helps us personalize your tracking experience and the language we use throughout the app.",
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
