import { View, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"

const brainImage: ImageRequireSource = require("../../../../assets/images/onboarding/brain.webp")

type WowMomentSlideProps = {
  onSelection?: () => void
}

export function wowMomentSlide({ onSelection: _onSelection }: WowMomentSlideProps): ISlide {
  return {
    id: "wowMoment",
    title: "Anxiety is real 🧠",
    description: "Research shows anxiety affects millions of people, and tracking your patterns can help you understand and manage it better.",
    component: <WowMomentComponent />,
    textPlacement: "bottom",
    textAlignment: "center",
  }
}

const WowMomentComponent: React.FC = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      {/* Main Image */}
      <View style={themed($imageContainer)}>
        <ExpoImage source={brainImage} style={themed($image)} contentFit="contain" />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 20,
  paddingVertical: 20,
})

const $imageContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 24,
  width: "100%",
})

const $image: ThemedStyle<ImageStyle> = () => ({
  height: 160,
  width: 160,
  maxHeight: "90%",
  maxWidth: "90%",
})
