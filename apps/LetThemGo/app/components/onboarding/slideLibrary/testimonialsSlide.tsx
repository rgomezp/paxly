import { View, Dimensions, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { Text } from "@/components/Text"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle, TextStyle, ImageStyle } from "react-native"
import type { ISlide } from "@/types/ISlide"

const testimonialCirclesImage: ImageRequireSource = require("../../../../assets/images/testimonial_circles.png")

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

interface Testimonial {
  name: string
  text: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($card)}>
      <View style={themed($cardHeader)}>
        <Text style={themed($userName)}>{testimonial.name}</Text>
        <View style={themed($starsContainer)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <ThemedFontAwesome5Icon
              key={star}
              name="star"
              size={16}
              color="#FFBB50"
              style={themed($star)}
              solid
            />
          ))}
        </View>
      </View>
      <Text style={themed($testimonialText)}>{testimonial.text}</Text>
    </View>
  )
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
      <Text style={themed($ratingHelpText)}>
        Giving us a rating helps us mend more people&apos;s hearts just like yours
      </Text>
      {displayTestimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </View>
  )
}

const $card: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  borderColor: theme.colors.border,
  borderRadius: 12,
  borderWidth: 1,
  elevation: 5,
  marginBottom: 16,
  padding: 16,
  shadowColor: theme.colors.text,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: theme.isDark ? 0.3 : 0.1,
  shadowRadius: 3.84,
})

const $cardHeader: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 12,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  paddingHorizontal: 20,
  paddingVertical: 10,
})

const $imageContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  marginBottom: 12,
})

const $ratingHelpText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 12,
  textAlign: "center",
  marginBottom: 24,
  paddingHorizontal: 10,
  lineHeight: 16,
})

const $testimonialImage: ThemedStyle<ImageStyle> = () => ({
  height: 120,
  width: "100%",
})

const $star: ThemedStyle<TextStyle> = () => ({
  marginLeft: 2,
})

const $starsContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flexDirection: "row",
})

const $testimonialText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 14,
  fontStyle: "italic",
  lineHeight: 20,
})

const $userName: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  flex: 1,
  fontSize: 16,
  fontWeight: "600",
})
