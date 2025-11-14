import { FC } from "react"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { LessonPlayer } from "@/components/lessons/LessonPlayer"
import { ViewStyle } from "react-native"
import TodaysLessonManager from "@/managers/TodaysLessonManager"
import DailyTaskManager from "@/managers/DailyTaskManager"
import LessonManager from "@/managers/LessonManager"
import AwardManager from "@/managers/AwardManager"
import { navigate } from "@/navigators/navigationUtilities"

interface SingleLessonScreenProps extends AppStackScreenProps<"SingleLesson"> {}

export const SingleLessonScreen: FC<SingleLessonScreenProps> = ({ route, navigation }) => {
  const { lessonId } = route.params

  const handleComplete = () => {
    // Mark lesson as completed
    LessonManager.markCompleted(lessonId)

    // Check if this is today's lesson and mark it as complete
    const todaysLessonId = TodaysLessonManager.getTodaysLesson()
    if (todaysLessonId === lessonId) {
      DailyTaskManager.markCompleted("lesson")
    }

    // Check if an award is available and navigate to claim screen
    if (AwardManager.checkAwardAvailability()) {
      navigate("ClaimAward", undefined)
    } else {
      navigation.goBack()
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$contentContainer}>
      <LessonPlayer lessonId={lessonId} onComplete={handleComplete} />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  flex: 1,
}
