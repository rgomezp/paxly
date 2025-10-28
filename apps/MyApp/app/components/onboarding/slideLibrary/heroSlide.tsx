import { View, Text as RNText, Image, ImageRequireSource } from "react-native"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, TextStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"

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
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      {/* Hero Mockup Section */}
      <View style={themed($mockupContainer)}>
        <Image source={logoImage} style={themed($logoImage)} resizeMode="contain" />
      </View>

      {/* Benefits Section */}
      <View style={themed($benefitsContainer)}>
        {benefits.map((benefit, index) => (
          <View key={index} style={themed($benefitRow)}>
            <View style={themed($iconContainer)}>
              <ThemedFontAwesome5Icon
                name={benefit.icon}
                size={28}
                color={theme.colors.palette.accent500}
                solid
              />
            </View>
            <View style={themed($benefitTextContainer)}>
              <RNText style={themed($benefitTitle)}>{benefit.title}</RNText>
              <RNText style={themed($benefitDescription)}>{benefit.description}</RNText>
            </View>
          </View>
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

const $benefitRow: ThemedStyle<ViewStyle> = () => ({
  alignItems: "flex-start",
  flexDirection: "row",
  gap: 16,
  width: "100%",
})

const $iconContainer: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  backgroundColor: theme.isDark ? "#191015" : "#F5F5F5",
  borderRadius: 12,
  height: 56,
  justifyContent: "center",
  width: 56,
})

const $benefitTextContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  minWidth: 0,
})

const $benefitTitle: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.isDark ? "#F4F2F1" : "#1A1A1A",
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 4,
})

const $benefitDescription: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.isDark ? "#B6ACA6" : "#666666",
  fontSize: 15,
  lineHeight: 22,
})
