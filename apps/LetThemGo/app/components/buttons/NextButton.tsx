import { StyleSheet, View } from "react-native"
import RectangularButton from "./RectangularButton"
import Language from "@/internationalization/Language"
import { triggerLightHaptic } from "../../utils/hapticFeedback"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"

type IProps = {
  scrollTo: () => void
  onPressOverride?: () => void
  isDisabled?: boolean
  backgroundColor?: string
}

export default function NextButton({
  scrollTo,
  onPressOverride,
  isDisabled,
  backgroundColor,
}: IProps) {
  const lang = Language.current

  const handlePress = () => {
    if (onPressOverride) {
      onPressOverride()
    } else {
      scrollTo()
    }
    triggerLightHaptic()
  }

  return (
    <View style={styles.container}>
      <RectangularButton
        buttonText={LANGUAGE_COPY.words.next[lang]}
        onClick={handlePress}
        icon="arrow-right"
        width={120}
        fontSize={16}
        isDisabled={isDisabled}
        backgroundColor={backgroundColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
