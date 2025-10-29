import { View, Image, ImageRequireSource } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"
import { IconTextItem, type IconTextData } from "../shared/IconTextItem"

const logoImage: ImageRequireSource = require("../../../../assets/images/logo.png")

type HowItWorksSlideProps = {
  onSelection?: () => void
}

const steps: IconTextData[] = [
  {
    icon: "check-square",
    title: "Pick Plan",
    description: "Choose your training program",
  },
  {
    icon: "dumbbell",
    title: "Log Sets",
    description: "Track your workouts",
  },
  {
    icon: "chart-line",
    title: "See Progress",
    description: "Watch your strength grow",
  },
]

export function howItWorksSlide({ onSelection: _onSelection }: HowItWorksSlideProps): ISlide {
  return {
    id: "howItWorks",
    title: "How It Works",
    description: "Takes ~60 seconds to start.",
    component: <HowItWorksComponent />,
  }
}

const HowItWorksComponent: React.FC = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      {/* Image Section */}
      <View style={themed($imageContainer)}>
        <Image source={logoImage} style={themed($logoImage)} resizeMode="contain" />
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
