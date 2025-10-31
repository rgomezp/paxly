import { useState } from "react"
import { StyleSheet, View } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "@/components/buttons/RectangularButton"
import DatePickerModal from "@/components/modals/DatePickerModal"
import { Image as ExpoImage } from "expo-image"

type LastContactSlideProps = {
  onSelection?: () => void
}

function LastContactComponent({ onSelection }: LastContactSlideProps) {
  const { theme } = useAppTheme()
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="lastContactSlide"
    >
      <View style={styles.heroContainer}>
        <ExpoImage
          source={require("../../../../assets/images/planty/1d/planty_serious.webp")}
          style={styles.hero}
          contentFit="contain"
        />
      </View>
      <RectangularButton
        buttonText="Set last contact date"
        onClick={() => setIsPickerVisible(true)}
        width={260}
        fontSize={18}
      />
      <DatePickerModal
        visible={isPickerVisible}
        onClose={() => {
          setIsPickerVisible(false)
          onSelection?.()
        }}
      />
    </View>
  )
}

export function lastContactSlide({ onSelection }: LastContactSlideProps): ISlide {
  return {
    id: "lastContactDate",
    title: "When was your last contact?",
    description: "We'll start your streak from that date",
    component: <LastContactComponent onSelection={onSelection} />,
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  hero: {
    height: 140,
    width: 300,
  },
  heroContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
})
