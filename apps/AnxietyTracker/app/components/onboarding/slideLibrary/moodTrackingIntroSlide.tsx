import { View, ViewStyle, Text as RNText, TextStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ISlide } from "@/types/ISlide"
import type { ThemedStyle } from "@/theme"
import { MoodGraph } from "@/components/MoodGraph"

type MoodTrackingIntroSlideProps = {
  onSelection?: () => void
}

// Fake data showing mood improving over the last week
// Each day has total mood logs, with distribution of negative/neutral/positive
// Totals vary day by day to be more realistic
const fakeMoodData = [
  { key: "mon", label: "mon", negative: 4, neutral: 1, positive: 1, total: 6 },
  { key: "tue", label: "tue", negative: 3, neutral: 1, positive: 0, total: 4 },
  { key: "wed", label: "wed", negative: 2, neutral: 2, positive: 1, total: 5 },
  { key: "thu", label: "thu", negative: 1, neutral: 1, positive: 2, total: 4 },
  { key: "fri", label: "fri", negative: 1, neutral: 1, positive: 3, total: 5 },
  { key: "sat", label: "sat", negative: 0, neutral: 1, positive: 4, total: 5 },
  { key: "sun", label: "sun", negative: 0, neutral: 0, positive: 6, total: 6 },
]

function MoodTrackingIntroComponent({ onSelection: _onSelection }: MoodTrackingIntroSlideProps) {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($chartContainer)}>
        <MoodGraph
          demoData={fakeMoodData}
          showTitle={false}
          chartHeight={120}
          containerStyle={themed($graphWrapper)}
        />
      </View>

      {/* Explanation text */}
      <View style={themed($explanationContainer)}>
        <RNText style={themed([$explanationText])}>
          We&apos;ll send you gentle reminders to help you stay consistent.
        </RNText>
      </View>
    </View>
  )
}

export function moodTrackingIntroSlide({
  onSelection: _onSelection,
}: MoodTrackingIntroSlideProps): ISlide {
  return {
    id: "moodTrackingIntro",
    title: "Track your mood and watch yourself heal",
    description: "See your progress over time with daily mood tracking",
    component: <MoodTrackingIntroComponent onSelection={_onSelection} />,
    textPlacement: "top",
  }
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 20,
})

const $chartContainer: ThemedStyle<ViewStyle> = () => ({
  width: "90%",
  alignSelf: "center",
  marginBottom: 24,
})

const $graphWrapper: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
})

const $explanationContainer: ThemedStyle<ViewStyle> = () => ({
  paddingHorizontal: 8,
  marginTop: 8,
})

const $explanationText: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 14,
  textAlign: "center",
  lineHeight: 20,
  color: theme.colors.text,
})
