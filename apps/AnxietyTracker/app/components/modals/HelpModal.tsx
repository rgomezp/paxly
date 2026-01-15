import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { Text } from "@/components"
import BottomModal from "./BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"
import { useNavigation } from "@react-navigation/native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { URGE_LESSONS } from "@/data/UrgeLessons"
import { RELAPSE_LESSON_IDS } from "@/data/RelapseLessons"
import { GearIcon } from "phosphor-react-native"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"

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

// Helper function to randomly select an urge lesson
const getRandomUrgeLesson = (): string => {
  const randomIndex = Math.floor(Math.random() * URGE_LESSONS.length)
  return URGE_LESSONS[randomIndex]
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
  const navigation = useNavigation<AppStackScreenProps<"Settings">["navigation"]>()

  const handleOptionPress = (callback: () => void) => {
    callback()
    onClose()
  }

  const handleSettingsPress = () => {
    onClose()
    navigation.navigate("Settings")
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
    {
      id: "i_contacted",
      buttonText: "I contacted",
      onClick: () => {
        handleOptionPress(onIContacted)
        const randomRelapseLessonId = getRandomRelapseLesson()
        navigation.navigate("SingleLesson", { lessonId: randomRelapseLessonId })
      },
    },
  ]

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <View style={themed($container)}>
        <View style={themed($headerContainer)}>
          <Text
            text="How can we help?"
            preset="subheading"
            style={themed([$title, { color: theme.colors.text }])}
          />
          <TouchableOpacity onPress={handleSettingsPress} style={themed($settingsButton)}>
            <ThemedPhosphorIcon Component={GearIcon} size={24} />
          </TouchableOpacity>
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

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
  position: "relative",
}

const $title: ViewStyle & TextStyle = {
  textAlign: "center",
  flex: 1,
}

const $settingsButton: ViewStyle = {
  position: "absolute",
  right: 0,
  padding: 8,
}

const $optionsContainer: ViewStyle = {
  gap: 24,
  paddingBottom: 50,
}

const $buttonSpacing: ViewStyle = {
  margin: 0,
}
