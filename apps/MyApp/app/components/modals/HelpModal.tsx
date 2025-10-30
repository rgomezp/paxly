import { View, ViewStyle, TextStyle } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"
import { useNavigation } from "@react-navigation/native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

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
}

const BUTTON_TO_LESSON_MAP: Record<string, string> = {
  urge_to_contact: "mini_wait_90",
  sleep_poorly: "mini_sleep_rescue",
  feeling_down: "w6_move_body",
  ruminating: "d9_rumination_cap",
  i_contacted: "mini_repair_relapse",
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
      onClick: () => {
        handleOptionPress(onLessonActivated)
        navigation.navigate("SingleLesson", { lessonId: BUTTON_TO_LESSON_MAP["urge_to_contact"] })
      },
    },
    {
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
    },
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
