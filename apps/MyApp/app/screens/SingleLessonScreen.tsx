import { FC } from "react"
import { ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { LessonPlayer } from "@/components/lessons/LessonPlayer"
// import { useNavigation } from "@react-navigation/native"

interface SingleLessonScreenProps extends AppStackScreenProps<"SingleLesson"> {}

export const SingleLessonScreen: FC<SingleLessonScreenProps> = ({ route, navigation }) => {
  const { lessonId } = route.params
  return (
    <Screen preset="fixed" contentContainerStyle={$centerContent}>
      <LessonPlayer lessonId={lessonId} onComplete={() => navigation.goBack()} />
    </Screen>
  )
}

const $centerContent: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
