import { useState } from "react"
import { ganon } from "@/services/ganon/ganon"

/**
 * Hook to manage medical disclaimer acceptance state.
 * Checks if the user has accepted the disclaimer and provides a function to accept it.
 *
 * @returns Object with:
 * - hasAccepted: boolean indicating if disclaimer has been accepted
 * - showModal: boolean indicating if modal should be shown
 * - acceptDisclaimer: function to accept the disclaimer
 */
export function useMedicalDisclaimer() {
  const [hasAccepted, setHasAccepted] = useState<boolean>(() => {
    return ganon.get("hasAcceptedMedicalDisclaimer") ?? false
  })

  const showModal = !hasAccepted

  const acceptDisclaimer = () => {
    ganon.set("hasAcceptedMedicalDisclaimer", true)
    setHasAccepted(true)
  }

  return {
    hasAccepted,
    showModal,
    acceptDisclaimer,
  }
}
