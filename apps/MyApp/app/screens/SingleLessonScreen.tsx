import { FC } from "react"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { LessonPlayer } from "@/components/lessons/LessonPlayer"
// import { useNavigation } from "@react-navigation/native"

interface SingleLessonScreenProps extends AppStackScreenProps<"SingleLesson"> {}

export const SingleLessonScreen: FC<SingleLessonScreenProps> = () => {
  return (
    <Screen>
      <LessonPlayer lessonId="d1_stabilize_intro" onComplete={() => {}} />
    </Screen>
  )
}
