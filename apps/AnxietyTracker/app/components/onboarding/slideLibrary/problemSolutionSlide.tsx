import { View, ImageRequireSource, Text } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, TextStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"

type ProblemSolutionSlideProps = {
  onSelection?: () => void
}

const solutionImage: ImageRequireSource = require("../../../../assets/images/onboarding/peaceful_girl.png")

const quotes: string[] = [
  "I feel anxious all the time but I don't know what triggers it or when it happens most.",
  "My anxiety comes in waves and I wish I could understand the patterns better.",
  "I want to track my anxiety but I don't know where to start or how to make it a habit.",
  "Sometimes I feel fine, other times I'm overwhelmed - I need to see the bigger picture.",
  "I know tracking would help but I keep forgetting to do it or don't know what to track.",
]

export function problemSolutionSlide({
  onSelection: _onSelection,
}: ProblemSolutionSlideProps): ISlide {
  return {
    id: "problem_solution",
    title: "Feeling lost with your anxiety?",
    description: "We help you find calm through tracking, games, lessons, and tools.",
    component: <ProblemSolutionComponent />,
    textPlacement: "bottom",
    textAlignment: "left",
  }
}

const ProblemSolutionComponent: React.FC = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($contentContainer)}>
        {/* Before/Problem Section */}
        <View style={themed($beforeSection)}>
          <View style={themed($imageContainer)}>
            <View style={themed($quoteCollageContainer)}>
              {quotes.map((quote, index) => {
                const row = Math.floor(index / 2)
                const col = index % 2
                const rotation = ((index % 3) - 1) * 6
                const offsetX = (col === 0 ? -6 : 6) + ((index % 3) - 1) * 5
                const offsetY = row * 35 + (index % 2 === 0 ? -5 : 5)
                return (
                  <View
                    key={index}
                    style={[
                      themed($quoteCard),
                      {
                        left: `${10 + col * 40}%`,
                        top: `${10 + row * 20}%`,
                        transform: [
                          { rotate: `${rotation}deg` },
                          { translateX: offsetX },
                          { translateY: offsetY },
                        ],
                        zIndex: quotes.length - index,
                      },
                    ]}
                  >
                    <Text style={themed($quoteText)}>{quote}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
        {/* VS Divider */}
        <View style={themed($vsContainer)}>
          <View style={themed($vsTextContainer)}>
            <Text style={themed($vsText)}>VS</Text>
          </View>
        </View>
        {/* After/Solution Section */}
        <View style={themed($afterSection)}>
          <View style={themed($imageContainer)}>
            <ExpoImage source={solutionImage} style={themed($image)} contentFit="contain" />
          </View>
        </View>
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
})

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
})

const $beforeSection: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 3,
  gap: 8,
})

const $afterSection: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
  gap: 8,
})

const $imageContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  aspectRatio: 1,
  justifyContent: "center",
})

const $image: ThemedStyle<ImageStyle> = () => ({
  height: "100%",
  width: "100%",
})

const $vsContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  zIndex: 10,
})

const $vsTextContainer: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  backgroundColor: theme.colors.background,
  borderRadius: 20,
  borderColor: theme.colors.border,
  borderWidth: 2,
  height: 40,
  justifyContent: "center",
  width: 40,
})

const $vsText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 14,
  fontWeight: "bold",
})

const $quoteCollageContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  width: "100%",
})

const $quoteCard: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.card,
  borderColor: theme.colors.border,
  borderRadius: 8,
  borderWidth: 1,
  elevation: 3,
  maxWidth: 140,
  paddingHorizontal: 8,
  paddingVertical: 6,
  position: "absolute",
  shadowColor: theme.colors.text,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  width: 140,
})

const $quoteText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 9,
  lineHeight: 12,
})
