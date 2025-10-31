import { useEffect, useState } from "react"
import { ganon } from "@/services/ganon/ganon"
import { GLOBAL_EVENTS } from "@/constants/events"
import EventRegister from "@/utils/EventEmitter"
import MigrationManager from "@/migrations/MigrationManager"

export default function useOnboardingFlow() {
  const [isOnboardComplete, setIsOnboardingComplete] = useState<boolean | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

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

    // Set up event listeners
    const handleOnboardingComplete = () => setIsOnboardingComplete(true)
    const handleUpdateAll = () => {
      const finished = ganon.get("finishedOnboarding") ?? false
      setIsOnboardingComplete(finished)
    }

    EventRegister.on(GLOBAL_EVENTS.ONBOARDING_COMPLETE, handleOnboardingComplete)
    EventRegister.on(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)

    // Cleanup listeners on unmount
    return () => {
      EventRegister.off(GLOBAL_EVENTS.ONBOARDING_COMPLETE, handleOnboardingComplete)
      EventRegister.off(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)
    }
  }, [])
  // Return undefined while loading to prevent premature rendering
  return isLoading ? undefined : isOnboardComplete
}
