import { ImageRequireSource, StyleSheet } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { MascotNames } from "@/types/MascotName"
import { ganon } from "@/services/ganon/ganon"
import { Image as ExpoImage } from "expo-image"
import UserManager from "@/managers/UserManager"
import { OneSignal } from "react-native-onesignal"

type MascotNameSlideProps = {
  onSelection?: () => void
  refreshMascotName?: () => void
}

const heroImage: ImageRequireSource = require("../../../../assets/images/planty/1d/planty.webp")

const options: MultipleChoiceOption<MascotNames>[] = [
  { id: MascotNames.WILLOW, label: "Willow" },
  { id: MascotNames.CHLOE, label: "Chloe" },
  { id: MascotNames.OLIVE, label: "Olive" },
  { id: MascotNames.FLORA, label: "Flora" },
  { id: MascotNames.PENNY, label: "Penny" },
  { id: MascotNames.SPROUT, label: "Sprout" },
]

const styles = StyleSheet.create({
  heroImage: {
    height: 140,
    marginTop: -40,
    width: 140,
  },
})

export function mascotNameSlide({ onSelection, refreshMascotName }: MascotNameSlideProps): ISlide {
  // Read saved mascotName from ganon
  const savedMascotName = ganon.get("mascotName") as MascotNames | null
  const initialSelected = savedMascotName ? [savedMascotName] : []

  // Read nickname from UserManager
  const user = UserManager.getUser()
  const nickname = user?.nickname || ""
  const greeting = nickname ? `Hi, ${nickname}!` : "Hi!"

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

    // Refresh mascot name in slide state so downstream slides see the latest value
    refreshMascotName?.()

    // Tag OneSignal user with mascot name
    try {
      const capitalizedSelectedMascotName =
        selectedMascotName.charAt(0).toUpperCase() + selectedMascotName.slice(1).toLowerCase()
      OneSignal.User.addTag("mascot_name", capitalizedSelectedMascotName)
      Log.info(`MascotNameSlide: Added OneSignal tag: mascot_name=${selectedMascotName}`)
    } catch (e) {
      Log.error(`MascotNameSlide: Error adding OneSignal tag: ${e}`)
    }

    // Auto-advance when shouldAutoAdvance is true
    if (shouldAutoAdvance) {
      onSelection?.()
    }
  }

  return {
    id: "mascotName",
    title: "Meet your new friend!",
    description: `> ${greeting} What will you name me?`,
    component: (
      <>
        <ExpoImage source={heroImage} style={styles.heroImage} contentFit="contain" />
        <MultipleChoiceSelector
          options={options}
          onSelection={buttonPressed}
          allowMultiple={false}
          initialSelectedOptions={initialSelected}
          onAutoAdvance={onSelection}
        />
      </>
    ),
  }
}
