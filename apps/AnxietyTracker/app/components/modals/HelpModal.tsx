import { View, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"
import { IM_ANXIOUS_LESSON_IDS } from "@/data/lessons/ImAnxiousLessons"
import { RELAPSE_LESSON_IDS } from "@/data/lessons/ImHavingAPanicAttackLessons"
import { navigate } from "@/navigators/navigationUtilities"

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
  icon?: string
  isPaidFeature?: boolean
}

// Helper function to randomly select an urge lesson
const getRandomUrgeLesson = (): string => {
  const randomIndex = Math.floor(Math.random() * IM_ANXIOUS_LESSON_IDS.length)
  return IM_ANXIOUS_LESSON_IDS[randomIndex]
}

// Helper function to randomly select a relapse lesson
const getRandomRelapseLesson = (): string => {
  const randomIndex = Math.floor(Math.random() * RELAPSE_LESSON_IDS.length)
  return RELAPSE_LESSON_IDS[randomIndex]
}

export default function HelpModal({
  visible,
  onClose,
  onLessonActivated,
  onIContacted,
}: HelpModalProps) {
  const { theme, themed } = useAppTheme()

  const handleOptionPress = (callback: () => void) => {
    callback()
    onClose()
  }

  const buttons: ButtonProps[] = [
    {
      id: "im_anxious",
      buttonText: "I'm anxious",
      isPaidFeature: false,
      onClick: () => {
        handleOptionPress(onLessonActivated)
        const randomLessonId = getRandomUrgeLesson()
        navigate("SingleLesson", { lessonId: randomLessonId })
      },
    },
    {
      id: "im_having_a_panic_attack",
      buttonText: "I'm having a panic attack",
      icon: "exclamation-triangle",
      isPaidFeature: false,
      onClick: () => {
        handleOptionPress(onIContacted)
        const randomRelapseLessonId = getRandomRelapseLesson()
        navigate("SingleLesson", { lessonId: randomRelapseLessonId })
      },
    },
  ]

  return (
    <>
      <BottomModal visible={visible} onClose={onClose}>
        <View style={themed($container)}>
          <View style={themed($headerContainer)}>
            <Text
              text="How can we help?"
              preset="subheading"
              style={themed([$title, { color: theme.colors.text }])}
            />
          </View>

          <View style={themed($optionsContainer)}>
            {buttons.map((b) => (
              <RectangularButton
                key={b.id}
                buttonText={b.buttonText}
                onClick={b.onClick}
                width="100%"
                customStyles={$buttonSpacing}
                icon={b.icon}
                isPaidFeature={b.isPaidFeature}
                isSelected={b.id === "im_having_a_panic_attack"}
              />
            ))}
          </View>
        </View>
      </BottomModal>
    </>
  )
}

const $container: ViewStyle = {
  alignItems: "stretch",
}

const $headerContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
}

const $title: ViewStyle & TextStyle = {
  textAlign: "center",
}

const $optionsContainer: ViewStyle = {
  gap: 24,
  paddingBottom: 50,
}

const $buttonSpacing: ViewStyle = {
  margin: 0,
}
