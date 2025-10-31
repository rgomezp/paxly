import { View, Image, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"
import { IconTextItem } from "../shared/IconTextItem"

const logoImage: ImageRequireSource = require("../../../../assets/images/planty/6m/planty.webp")

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
    title: "Let go. Heal your heart.",
    description: "Guided no contact, daily check-ins, and journaling to move on.",
    component: <HeroComponent />,
  }
}

const benefits: Benefit[] = [
  {
    icon: "route",
    title: "No Contact Tracker",
    description: "See your streak since last reach-out",
  },
  {
    icon: "heart",
    title: "Mood + Journal",
    description: "Express, process, and release daily",
  },
  {
    icon: "seedling",
    title: "Healing Prompts",
    description: "Grow acceptance one day at a time",
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
