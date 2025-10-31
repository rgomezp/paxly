import { View, Dimensions } from "react-native"
import { Text } from "@/components/Text"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle, TextStyle } from "react-native"
import type { ISlide } from "@/types/ISlide"

type TestimonialsSlideProps = {
  onSelection?: () => void
}

export function testimonialsSlide({ onSelection: _onSelection }: TestimonialsSlideProps): ISlide {
  return {
    id: "testimonials",
    title: "What others are saying",
    description: "Join thousands of happy users",
    component: <TestimonialComponent />,
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
  const { themed, theme } = useAppTheme()

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
              color={theme.colors.palette.accent500}
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
      name: "Cora McKenzie",
      text: "I love this app! It has helped me learn so much about the world.",
    },
    {
      name: "Joel Worth",
      text: "I love this app! It has helped me learn so much about the world.",
    },
  ]

  // Show only first testimonial on small screens
  const displayTestimonials = isSmallScreen ? testimonials.slice(0, 1) : testimonials

  return (
    <View style={themed($container)}>
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

const $star: ThemedStyle<ViewStyle> = () => ({
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
