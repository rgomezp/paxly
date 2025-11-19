import { View } from "react-native"
import { Text } from "@/components/Text"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle, TextStyle } from "react-native"

export interface Testimonial {
  name: string
  text: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
  style?: ViewStyle
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, style }) => {
  const { themed } = useAppTheme()

  return (
    <View style={[themed($card), style]}>
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

const $card: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  borderColor: theme.colors.border,
  borderRadius: 12,
  borderWidth: 1,
  elevation: 5,
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

const $starsContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flexDirection: "row",
})

const $star: ThemedStyle<TextStyle> = () => ({
  marginLeft: 2,
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
