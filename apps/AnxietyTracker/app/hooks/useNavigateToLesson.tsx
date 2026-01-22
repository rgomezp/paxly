import { useState, useCallback } from "react"
import { useNavigation } from "@react-navigation/native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useMedicalDisclaimer } from "./useMedicalDisclaimer"
import MedicalDisclaimerModal from "@/components/modals/MedicalDisclaimerModal"

/**
 * Hook that provides a function to navigate to a lesson, showing the medical disclaimer
 * modal first if it hasn't been accepted yet.
 *
 * @returns Object with:
 * - navigateToLesson: function to call with lessonId to navigate
 * - disclaimerModal: JSX element for the disclaimer modal (should be rendered in component)
 */
export function useNavigateToLesson() {
  const navigation = useNavigation<AppStackScreenProps<"Settings">["navigation"]>()
  const { showModal, acceptDisclaimer } = useMedicalDisclaimer()
  const [pendingLessonId, setPendingLessonId] = useState<string | null>(null)

  const navigateToLesson = useCallback(
    (lessonId: string) => {
      if (showModal) {
        // Store the lesson ID to navigate after disclaimer is accepted
        setPendingLessonId(lessonId)
      } else {
        // Navigate immediately if disclaimer already accepted
        navigation.navigate("SingleLesson", { lessonId })
      }
    },
    [showModal, navigation],
  )

  const handleAcceptDisclaimer = useCallback(() => {
    acceptDisclaimer()
    // Navigate to the pending lesson if there is one
    if (pendingLessonId) {
      navigation.navigate("SingleLesson", { lessonId: pendingLessonId })
      setPendingLessonId(null)
    }
  }, [acceptDisclaimer, pendingLessonId, navigation])

  const handleDismiss = useCallback(() => {
    // Clear the pending lesson ID to dismiss the modal
    setPendingLessonId(null)
  }, [])

  const disclaimerModal = (
    <MedicalDisclaimerModal
      visible={showModal && pendingLessonId !== null}
      onAccept={handleAcceptDisclaimer}
      onDismiss={handleDismiss}
    />
  )

  return {
    navigateToLesson,
    disclaimerModal,
  }
}
