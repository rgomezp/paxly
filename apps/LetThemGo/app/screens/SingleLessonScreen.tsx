import { FC, useState, useRef } from "react"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { LessonPlayer } from "@/components/lessons/LessonPlayer"
import { ViewStyle } from "react-native"
import DailyLessonManager from "@/managers/DailyLessonManager"
import DailyTaskManager from "@/managers/DailyTaskManager"
import LessonManager from "@/managers/LessonManager"
import AwardManager from "@/managers/AwardManager"
import LessonCompletionManager from "@/managers/LessonCompletionManager"
import { navigate } from "@/navigators/navigationUtilities"

interface SingleLessonScreenProps extends AppStackScreenProps<"SingleLesson"> {}

export const SingleLessonScreen: FC<SingleLessonScreenProps> = ({ route, navigation }) => {
  const { lessonId } = route.params
  const [startedAt] = useState(() => Date.now())
  const hasCompletedRef = useRef(false)

  // Determine the flow (how the lesson was accessed)
  const getFlow = (): string => {
    const todaysLessonId = DailyLessonManager.getTodaysLesson()
    if (todaysLessonId === lessonId) {
      return "daily"
    }
    return "manual"
  }

  const handleComplete = async () => {
    // Prevent duplicate completion tracking
    if (hasCompletedRef.current) {
      return
    }
    hasCompletedRef.current = true

    const completedAt = Date.now()

    // Save completion to Firestore (fire and forget)
    LessonCompletionManager.saveCompletion({
      lessonId,
      startedAt,
      completedAt,
      flow: getFlow(),
    }).catch(() => {
      // Error is already logged in LessonCompletionManager
      // Continue with lesson completion flow even if tracking fails
    })

    // Mark lesson as completed
    LessonManager.markCompleted(lessonId)

    // Check if this is today's lesson and mark it as complete
    const todaysLessonId = DailyLessonManager.getTodaysLesson()
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
