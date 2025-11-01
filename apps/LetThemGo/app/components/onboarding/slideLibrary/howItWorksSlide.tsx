import { View, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"
import { IconTextItem, type IconTextData } from "../shared/IconTextItem"

const logoImage: ImageRequireSource = require("../../../../assets/images/watering_jug.png")

type HowItWorksSlideProps = {
  onSelection?: () => void
}

const steps: IconTextData[] = [
  {
    icon: "hand-paper",
    title: "Set No Contact",
    description: "Decide your intention and start your streak",
  },
  {
    icon: "calendar-check",
    title: "Check In Daily",
    description: "Track mood and reflect in a quick journal",
  },
  {
    icon: "chart-line",
    title: "Watch Healing Grow",
    description: "Grow out of your pain one day at a time",
  },
]

export function howItWorksSlide({ onSelection: _onSelection }: HowItWorksSlideProps): ISlide {
  return {
    id: "howItWorks",
    title: "How it helps",
    component: <HowItWorksComponent />,
  }
}

const HowItWorksComponent: React.FC = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      {/* Image Section */}
      <View style={themed($imageContainer)}>
        <ExpoImage source={logoImage} style={themed($logoImage)} contentFit="contain" />
      </View>

      {/* Steps Section */}
      <View style={themed($stepsContainer)}>
        {steps.map((step, index) => (
          <IconTextItem
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 20,
  paddingVertical: 40,
})

const $imageContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 40,
  width: "100%",
})

const $logoImage: ThemedStyle<ImageStyle> = () => ({
  height: 140,
  width: 140,
  maxHeight: "90%",
  maxWidth: "90%",
})

const $stepsContainer: ThemedStyle<ViewStyle> = () => ({
  gap: 20,
  width: "100%",
})
