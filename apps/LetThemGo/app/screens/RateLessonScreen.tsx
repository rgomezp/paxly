import { FC, useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen, Text } from "@/components"
import RectangularButton from "@/components/buttons/RectangularButton"
import LessonCompletionManager from "@/managers/LessonCompletionManager"
import { useAppTheme } from "@/utils/useAppTheme"

type RateLessonScreenProps = AppStackScreenProps<"RateLesson">

export const RateLessonScreen: FC<RateLessonScreenProps> = ({ route, navigation }) => {
  const { lessonId, startedAt, completedAt, flow, awardAvailable } = route.params
  const { themed } = useAppTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (helpful: boolean | null) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      await LessonCompletionManager.saveCompletion({
        lessonId,
        startedAt,
        completedAt,
        flow,
        helpful,
      })
    } finally {
      // Navigate to the next step in the flow
      if (awardAvailable) {
        navigation.navigate("ClaimAward")
      } else {
        // Pop RateLesson and SingleLesson to return to the previous screen
        navigation.pop(2)
      }
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <View style={$content}>
        <Text style={themed($title)}>Did you find this lesson helpful?</Text>
        <Text style={themed($subtitle)}>
          Your feedback helps us understand what is working well and what could be improved.
        </Text>

        <View style={$buttonsRow}>
          <RectangularButton
            onClick={() => handleSubmit(true)}
            buttonText="Helpful"
            width="45%"
            isDisabled={isSubmitting}
            icon="thumbs-up"
          />
          <RectangularButton
            onClick={() => handleSubmit(false)}
            buttonText="Not really"
            width="45%"
            isDisabled={isSubmitting}
            icon="thumbs-down"
          />
        </View>

        <RectangularButton
          onClick={() => handleSubmit(null)}
          buttonText="Skip for now"
          width="60%"
          isDisabled={isSubmitting}
          lightBackground
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 24,
}

const $content: ViewStyle = {
  width: "100%",
  alignItems: "center",
  gap: 24,
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "600",
  textAlign: "center",
}

const $subtitle: TextStyle = {
  fontSize: 16,
  textAlign: "center",
  opacity: 0.8,
}

const $buttonsRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
}
