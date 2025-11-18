import { View } from "react-native"
import { Text } from "@/components/Text"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle, TextStyle } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { TestimonialCard, type Testimonial } from "../shared/TestimonialCard"

type FreeToTrySlideProps = {
  onSelection?: () => void
}

export function freeToTrySlide({ onSelection: _onSelection }: FreeToTrySlideProps): ISlide {
  return {
    id: "freeToTry",
    title: "Try Let Them Go for free",
    description: "No risk, no commitment.",
    component: <FreeToTryComponent />,
    textPlacement: "top",
    textAlignment: "center",
  }
}

const FreeToTryComponent: React.FC = () => {
  const { themed, theme } = useAppTheme()

  const testimonial: Testimonial = {
    name: "Alex M.",
    text: "Having guidance through this process has been invaluable. The daily lessons have helped me understand and process my emotions and move on.",
  }

  return (
    <View style={themed($container)}>
      <View style={themed($contentContainer)}>
        <ThemedFontAwesome5Icon name="shield-alt" size={64} color={theme.colors.tint} solid />
        <TestimonialCard testimonial={testimonial} style={themed($cardSpacing)} />
        <Text style={themed($subText)}>
          Start your healing journey completely free. You&apos;ll have full access to try everything
          before deciding.
        </Text>
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 20,
  paddingVertical: 40,
})

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
  justifyContent: "space-evenly",
  width: "100%",
  paddingHorizontal: 10,
})

const $subText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 16,
  textAlign: "center",
  lineHeight: 24,
})

const $cardSpacing: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
})
