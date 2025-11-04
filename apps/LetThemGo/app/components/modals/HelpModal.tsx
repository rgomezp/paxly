import { View, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"
import { useNavigation } from "@react-navigation/native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { URGE_LESSONS } from "@/data/LessonRegistry"

interface HelpModalProps {
  visible: boolean
  onClose: () => void
  onLessonActivated: () => void
  onIContacted: () => void
}

type ButtonProps = {
  id: string
  buttonText: string
  onClick: () => void
  isPaidFeature?: boolean
  icon?: string
}

const BUTTON_TO_LESSON_MAP: Record<string, string> = {
  sleep_poorly: "mini_sleep_rescue",
  feeling_down: "w6_move_body",
  ruminating: "d9_rumination_cap",
  i_contacted: "mini_repair_relapse",
}

// Helper function to randomly select an urge lesson
const getRandomUrgeLesson = (): string => {
  const randomIndex = Math.floor(Math.random() * URGE_LESSONS.length)
  return URGE_LESSONS[randomIndex]
}

export default function HelpModal({
  visible,
  onClose,
  onLessonActivated,
  onIContacted,
}: HelpModalProps) {
  const { theme, themed } = useAppTheme()
  const navigation = useNavigation<AppStackScreenProps<"SingleLesson">["navigation"]>()

  const handleOptionPress = (callback: () => void) => {
    callback()
    onClose()
  }

  const buttons: ButtonProps[] = [
    {
      id: "urge_to_contact",
      buttonText: "I have the urge to contact",
      icon: "exclamation-triangle",
      isPaidFeature: true,
      onClick: () => {
        handleOptionPress(onLessonActivated)
        const randomLessonId = getRandomUrgeLesson()
        navigation.navigate("SingleLesson", { lessonId: randomLessonId })
      },
    },
    /* {
      id: "sleep_poorly",
      buttonText: "I'm having trouble sleeping",
      icon: "bed",
      onClick: () => {
        handleOptionPress(onLessonActivated)
        navigation.navigate("SingleLesson", { lessonId: BUTTON_TO_LESSON_MAP["sleep_poorly"] })
      },
    },
    {
      id: "feeling_down",
      buttonText: "I'm feeling down",
      icon: "sad-tear",
      onClick: () => {
        handleOptionPress(onLessonActivated)
        navigation.navigate("SingleLesson", { lessonId: BUTTON_TO_LESSON_MAP["feeling_down"] })
      },
    },
    {
      id: "ruminating",
      buttonText: "I'm ruminating",
      icon: "brain",
      onClick: () => {
        handleOptionPress(onLessonActivated)
        navigation.navigate("SingleLesson", { lessonId: BUTTON_TO_LESSON_MAP["ruminating"] })
      },
    }, */
    {
      id: "i_contacted",
      buttonText: "I contacted",
      onClick: () => {
        handleOptionPress(onIContacted)
        navigation.navigate("SingleLesson", { lessonId: BUTTON_TO_LESSON_MAP["i_contacted"] })
      },
    },
  ]

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <View style={themed($container)}>
        <Text
          text="How can we help?"
          preset="subheading"
          style={themed([$title, { color: theme.colors.text }])}
        />

        <View style={themed($optionsContainer)}>
          {buttons.map((b) => (
            <RectangularButton
              key={b.id}
              buttonText={b.buttonText}
              onClick={b.onClick}
              width="100%"
              customStyles={$buttonSpacing}
              icon={b.icon}
              isSelected={b.id === "i_contacted"}
              isPaidFeature={b.isPaidFeature}
            />
          ))}
        </View>
      </View>
    </BottomModal>
  )
}

const $container: ViewStyle = {
  alignItems: "stretch",
}

const $title: ViewStyle & TextStyle = {
  marginBottom: 20,
  textAlign: "center",
}

const $optionsContainer: ViewStyle = {
  gap: 24,
  paddingBottom: 50,
}

const $buttonSpacing: ViewStyle = {
  margin: 0,
}
