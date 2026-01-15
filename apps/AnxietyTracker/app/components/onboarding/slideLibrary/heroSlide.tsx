import { View, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"
import { IconTextItem } from "../shared/IconTextItem"

const logoImage: ImageRequireSource = require("../../../../assets/images/onboarding/joyful_girl.png")

type HeroSlideProps = {
  onSelection?: () => void
}

interface Benefit {
  icon: string
  title: string
  description: string
}

export function heroSlide({ onSelection: _onSelection }: HeroSlideProps): ISlide {
  return {
    id: "hero",
    title: "We're here to help.",
    description: "Understanding your anxiety patterns is the first step toward managing them.",
    component: <HeroComponent />,
    textPlacement: "top",
  }
}

const benefits: Benefit[] = [
  {
    icon: "chart-line",
    title: "Track your anxiety",
    description: "Log your daily mood and anxiety levels to identify patterns",
  },
  {
    icon: "first-aid",
    title: "Find help when panic hits",
    description: "Get instant access to calming tools and resources",
  },
]

const HeroComponent: React.FC = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      {/* Hero Mockup Section */}
      <View style={themed($mockupContainer)}>
        <ExpoImage source={logoImage} style={themed($logoImage)} contentFit="contain" />
      </View>

      {/* Benefits Section */}
      <View style={themed($benefitsContainer)}>
        {benefits.map((benefit, index) => (
          <IconTextItem
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
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

const $mockupContainer: ThemedStyle<ViewStyle> = () => ({
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

const $benefitsContainer: ThemedStyle<ViewStyle> = () => ({
  gap: 20,
  width: "100%",
})
