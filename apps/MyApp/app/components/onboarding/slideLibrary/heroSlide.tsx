import { View, Image, ImageRequireSource } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"
import { IconTextItem } from "../shared/IconTextItem"

const logoImage: ImageRequireSource = require("../../../../assets/images/logo.png")

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
    title: "Transform Your Strength",
    description: "Stronger in 8 weeks—no guesswork.",
    component: <HeroComponent />,
  }
}

const benefits: Benefit[] = [
  {
    icon: "check-circle",
    title: "Proven Results",
    description: "Science-backed training that delivers",
  },
  {
    icon: "route",
    title: "Clear Path",
    description: "Simple, straightforward approach",
  },
  {
    icon: "lightbulb",
    title: "No Guesswork",
    description: "Know exactly what to do, when",
  },
]

const HeroComponent: React.FC = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      {/* Hero Mockup Section */}
      <View style={themed($mockupContainer)}>
        <Image source={logoImage} style={themed($logoImage)} resizeMode="contain" />
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
