import { View, Image, ImageRequireSource, Text } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ViewStyle, TextStyle, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"

type ProblemSolutionSlideProps = {
  onSelection?: () => void
}

const problemImage: ImageRequireSource = require("../../../../assets/images/sad-face.png")
const solutionImage: ImageRequireSource = require("../../../../assets/images/welcome-face.png")

export function problemSolutionSlide({ onSelection: _onSelection }: ProblemSolutionSlideProps): ISlide {
  return {
    id: "problem_solution",
    title: "Tired of spinning your wheels?",
    description: "We turn workouts into visible progress.",
    component: <ProblemSolutionComponent />,
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
            <Image source={problemImage} style={themed($image)} resizeMode="contain" />
          </View>
          <View style={themed($labelContainer)}>
            <View style={themed($problemLabel)}>
              <View style={themed($indicator)} />
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
            <Image source={solutionImage} style={themed($image)} resizeMode="contain" />
          </View>
          <View style={themed($labelContainer)}>
            <View style={themed($solutionLabel)}>
              <View style={themed($indicator)} />
            </View>
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
  paddingHorizontal: 20,
  paddingVertical: 20,
})

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flexDirection: "row",
  gap: 12,
  justifyContent: "center",
  width: "100%",
})

const $beforeSection: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
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
  width: "100%",
})

const $image: ThemedStyle<ImageStyle> = () => ({
  height: "100%",
  width: "100%",
})

const $labelContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  width: "100%",
})

const $problemLabel: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  backgroundColor: theme.colors.palette.angry100,
  borderRadius: 12,
  flexDirection: "row",
  gap: 6,
  paddingHorizontal: 12,
  paddingVertical: 6,
})

const $solutionLabel: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  backgroundColor: theme.colors.palette.accent100,
  borderRadius: 12,
  flexDirection: "row",
  gap: 6,
  paddingHorizontal: 12,
  paddingVertical: 6,
})

const $indicator: ThemedStyle<ViewStyle> = () => ({
  borderRadius: 4,
  height: 8,
  width: 8,
})

const $vsContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  position: "absolute",
  top: "50%",
  transform: [{ translateY: -20 }],
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
