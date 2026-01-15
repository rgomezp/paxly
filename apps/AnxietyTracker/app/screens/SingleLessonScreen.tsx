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
import { shouldShowRateLesson } from "@/utils/lessonFeedback"

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
    const flow = getFlow()

    try {
      // Mark lesson as completed
      LessonManager.markCompleted(lessonId)

      // Check if this is today's lesson and mark it as complete
      const todaysLessonId = DailyLessonManager.getTodaysLesson()
      if (todaysLessonId === lessonId) {
        DailyTaskManager.markCompleted("lesson")
      }

      const awardAvailable = AwardManager.checkAwardAvailability()

      // Randomly decide whether to show the RateLesson screen (~50% of completions)
      const shouldShowRate = await shouldShowRateLesson()

      if (shouldShowRate) {
        navigate("RateLesson", {
          lessonId,
          startedAt,
          completedAt,
          flow,
          awardAvailable,
        })
        return
      }

      // No rating screen – save completion immediately (without helpful flag)
      LessonCompletionManager.saveCompletion({
        lessonId,
        startedAt,
        completedAt,
        flow,
      }).catch((error) => {
        // Error is already logged in LessonCompletionManager
        console.error("[SingleLessonScreen] Error saving completion:", error)
        // Continue with lesson completion flow even if tracking fails
      })

      // Navigate based on award availability
      if (awardAvailable) {
        navigate("ClaimAward", undefined)
      } else {
        navigation.goBack()
      }
    } catch (error) {
      console.error("[SingleLessonScreen] Error in handleComplete:", error)
      // Handle errors gracefully - still try to navigate appropriately
      // Check award availability again in case it wasn't set before the error
      try {
        const awardAvailable = AwardManager.checkAwardAvailability()
        if (awardAvailable) {
          navigate("ClaimAward", undefined)
        } else {
          navigation.goBack()
        }
      } catch (navError) {
        console.error("[SingleLessonScreen] Error during navigation fallback:", navError)
        // Last resort: just go back
        navigation.goBack()
      }
    }
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$contentContainer}
      safeAreaEdges={["bottom", "left", "right"]}
    >
      <LessonPlayer lessonId={lessonId} onComplete={handleComplete} />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  flex: 1,
}
