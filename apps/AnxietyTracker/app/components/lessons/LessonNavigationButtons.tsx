import { View, StyleSheet } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"

const buttonContainerStyles = StyleSheet.create({
  noHorizontalMargin: {
    marginLeft: 0,
    marginRight: 0,
  },
})

interface LessonNavigationButtonsProps {
  onBack: () => void
  onNext: () => void
  isFirst: boolean
  isLast: boolean
  nextButtonText?: string
}

export function LessonNavigationButtons({
  onBack,
  onNext,
  isFirst,
  isLast,
  nextButtonText,
}: LessonNavigationButtonsProps) {
  const { themed, theme } = useAppTheme()

  return (
    <View
      style={themed(() => ({
        flexDirection: "row",
        gap: theme.spacing.sm,
      }))}
    >
      <View style={themed(() => ({ flex: 1 }))}>
        <RectangularButton
          width="100%"
          buttonText="Back"
          onClick={onBack}
          isDisabled={isFirst}
          customStyles={buttonContainerStyles.noHorizontalMargin}
        />
      </View>
      <View style={themed(() => ({ flex: 3 }))}>
        <RectangularButton
          width="100%"
          buttonText={nextButtonText || (isLast ? "Finish" : "Next")}
          onClick={onNext}
          customStyles={buttonContainerStyles.noHorizontalMargin}
        />
      </View>
    </View>
  )
}
