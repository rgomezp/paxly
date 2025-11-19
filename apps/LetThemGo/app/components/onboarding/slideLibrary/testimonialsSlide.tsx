import { View, Dimensions, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle, TextStyle, ImageStyle } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { TestimonialCard, type Testimonial } from "../shared/TestimonialCard"

const testimonialCirclesImage: ImageRequireSource = require("../../../../assets/images/onboarding/testimonial_circles.png")

type TestimonialsSlideProps = {
  onSelection?: () => void
}

export function testimonialsSlide({ onSelection: _onSelection }: TestimonialsSlideProps): ISlide {
  return {
    id: "testimonials",
    title: "Leave us a rating",
    description: "Help us reach more people who need us!",
    component: <TestimonialComponent />,
    showStoreReview: true,
  }
}

const TestimonialComponent: React.FC = () => {
  const { width } = Dimensions.get("window")
  const { themed } = useAppTheme()
  const isSmallScreen = width <= 375 // iPhone SE width is 375px

  const testimonials: Testimonial[] = [
    {
      name: "Sarah K.",
      text: "I love this app. It has helped me so much to process my grief and move on.",
    },
    {
      name: "Meghan L.",
      text: "I'm so grateful for this app. It's a daily reminder of how far I've come.",
    },
  ]

  // Show only first testimonial on small screens
  const displayTestimonials = isSmallScreen ? testimonials.slice(0, 1) : testimonials

  return (
    <View style={themed($container)}>
      {/* testimonials circles graphic */}
      <View style={themed($imageContainer)}>
        <ExpoImage
          source={testimonialCirclesImage}
          style={themed($testimonialImage)}
          contentFit="contain"
        />
      </View>
      <View style={themed($socialProofHeader)}>
        <Text style={themed($userCountText)}>Join 10,000+ people on their healing journey</Text>
        <Text style={themed($ratingHelpText)}>
          Your rating helps us reach more people who need support
        </Text>
      </View>
      {displayTestimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} style={themed($cardSpacing)} />
      ))}
    </View>
  )
}

const $cardSpacing: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 16,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  paddingHorizontal: 20,
  paddingVertical: 10,
})

const $imageContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  marginBottom: 12,
})

const $socialProofHeader: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 24,
  alignSelf: "stretch",
  alignItems: "center",
})

const $userCountText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
  marginBottom: 8,
  paddingHorizontal: 10,
})

const $ratingHelpText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 12,
  textAlign: "center",
  paddingHorizontal: 10,
  lineHeight: 16,
})

const $testimonialImage: ThemedStyle<ImageStyle> = () => ({
  height: 120,
  width: "100%",
})
