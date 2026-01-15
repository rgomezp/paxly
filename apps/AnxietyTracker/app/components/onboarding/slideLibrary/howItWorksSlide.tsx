import { View, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"
import { IconTextItem, type IconTextData } from "../shared/IconTextItem"

const logoImage: ImageRequireSource = require("../../../../assets/images/onboarding/watering_jug.png")

type HowItWorksSlideProps = {
  onSelection?: () => void
}

const steps: IconTextData[] = [
  {
    icon: "chart-line",
    title: "Track Daily",
    description: "Log your anxiety levels and mood each day",
  },
  {
    icon: "book",
    title: "Reflect & Learn",
    description: "Journal your thoughts and identify patterns",
  },
  {
    icon: "seedling",
    title: "Find Relief",
    description: "Get instant access to calming tools and resources",
  },
]

export function howItWorksSlide({ onSelection: _onSelection }: HowItWorksSlideProps): ISlide {
  return {
    id: "howItWorks",
    title: "Start your journey today",
    description: "Join thousands who are building awareness and managing their anxiety better.",
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
