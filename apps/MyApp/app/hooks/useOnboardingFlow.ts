import { useEffect, useState } from "react"
import { ganon } from "@/services/ganon/ganon"
import { GLOBAL_EVENTS } from "@/constants/events"
import EventRegister from "@/utils/EventEmitter"
import MigrationManager from "@/migrations/MigrationManager"

export default function useOnboardingFlow() {
  const [isOnboardComplete, setIsOnboardingComplete] = useState<boolean | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [stateChanged, setStateChanged] = useState(0)

  EventRegister.on(GLOBAL_EVENTS.ONBOARDING_COMPLETE, () => {
    setStateChanged(stateChanged + 1)
  })

  useEffect(() => {
    const fetchValueFromDb = async () => {
      if (MigrationManager.getInstance().isRunningMigrations()) {
        await MigrationManager.getInstance().waitForMigrations()
      }

      const finishedOnboarding = ganon.get("finishedOnboarding") ?? false

      setIsOnboardingComplete(finishedOnboarding)
      setIsLoading(false)
    }

    fetchValueFromDb()
  }, [stateChanged])

  // Return undefined while loading to prevent premature rendering
  return isLoading ? undefined : isOnboardComplete
}
