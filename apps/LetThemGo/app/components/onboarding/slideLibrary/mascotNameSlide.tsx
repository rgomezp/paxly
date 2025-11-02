import { ImageRequireSource } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { MascotNames } from "@/types/MascotName"
import { ganon } from "@/services/ganon/ganon"

type MascotNameSlideProps = {
  onSelection?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/4m/planty.webp")

const options: MultipleChoiceOption<MascotNames>[] = [
  { id: MascotNames.PLANTY, label: "Planty" },
  { id: MascotNames.WILLOW, label: "Willow" },
  { id: MascotNames.CHLOE, label: "Chloe" },
  { id: MascotNames.OLIVE, label: "Olive" },
  { id: MascotNames.FLORA, label: "Flora" },
  { id: MascotNames.PENNY, label: "Penny" },
  { id: MascotNames.SPROUT, label: "Sprout" },
]

export function mascotNameSlide({ onSelection }: MascotNameSlideProps): ISlide {
  // Read saved mascotName from ganon
  const savedMascotName = ganon.get("mascotName") as MascotNames | null
  const initialSelected = savedMascotName ? [savedMascotName] : []

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`MascotNameSlide: buttonPressed: ${optionId}`)

    const selectedMascotName = optionId as MascotNames

    // Save to ganon
    try {
      ganon.set("mascotName", selectedMascotName)
      Log.info(`MascotNameSlide: Saved mascotName: ${selectedMascotName}`)
    } catch (e) {
      Log.error(`MascotNameSlide: Error saving mascotName: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "mascotName",
    title: "Meet your new friend!",
    description: "Hi! It's nice to meet you. What will you name me?",
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

