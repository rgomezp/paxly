import UserManager from "@/managers/UserManager"
import Log from "@/utils/Log"
import { useEffect, useState, useMemo, useContext } from "react"
import { ISlide } from "@/types/ISlide"
import { nicknameSlide } from "../slideLibrary/nicknameSlide"
import { testimonialsSlide } from "../slideLibrary/testimonialsSlide"
import { heroSlide } from "../slideLibrary/heroSlide"
import { problemSolutionSlide } from "../slideLibrary/problemSolutionSlide"
import { referralSourceSlide } from "../slideLibrary/referralSourceSlide"
import { howItWorksSlide } from "../slideLibrary/howItWorksSlide"
import { genderSlide } from "../slideLibrary/genderSlide"
import { ageSlide } from "../slideLibrary/ageSlide"
import { anxietySeveritySlide } from "../slideLibrary/anxietySeveritySlide"
import { anxietyTriggersSlide } from "../slideLibrary/anxietyTriggersSlide"
import { anxietyDurationSlide } from "../slideLibrary/anxietyDurationSlide"
import { moodReminderFrequencySlide } from "../slideLibrary/moodReminderFrequencySlide"
import { moodTrackingIntroSlide } from "../slideLibrary/moodTrackingIntroSlide"
import { wowMomentSlide } from "../slideLibrary/wowMomentSlide"
import { freeToTrySlide } from "../slideLibrary/freeToTrySlide"
import { reminderBellSlide } from "../slideLibrary/reminderBellSlide"
import { congratulationsAwardSlide } from "../slideLibrary/congratulationsAwardSlide"
import { FlagContext } from "@/hooks/useFlags"

export const useSlides = (onSelection?: () => void) => {
  const flagContext = useContext(FlagContext)
  if (!flagContext) {
    throw new Error("useSlides must be used within a FlagProvider")
  }
  const { useFeatureFlags } = flagContext
  const [nickname, setNickname] = useState<string | null>(null)

  const { leadup_slides } = useFeatureFlags()

  // Load nickname when component mounts
  useEffect(() => {
    const loadNickname = async () => {
      try {
        const user = UserManager.getUser()
        setNickname(user?.nickname || null)
      } catch (error) {
        Log.error(`Error loading nickname: ${error}`)
      }
    }

    loadNickname()
  }, [])

  // Helper function to refresh nickname after it's saved
  const refreshNickname = async () => {
    try {
      const user = UserManager.getUser()
      setNickname(user?.nickname || null)
    } catch (error) {
      Log.error(`Error refreshing nickname: ${error}`)
    }
  }

  const slides: ISlide[] = useMemo(
    () => [
      // First 5 screens: Wow moment and key principles
      wowMomentSlide({ onSelection }), // Reciprocity (valuable insight) + Authority (research-backed) - WOW MOMENT
      problemSolutionSlide({ onSelection }), // Unity ("we've all been there", "together")
      heroSlide({ onSelection }), // Authority (research mention) + Unity ("we're here")
      howItWorksSlide({ onSelection }), // Social Proof ("join thousands")

      // Commitment/Consistency - Getting user commitments
      nicknameSlide({ onSelection, refreshNickname }), // Commitment (name)

      // Data collection slides
      genderSlide({ onSelection }),
      ageSlide({ onSelection }),
      anxietySeveritySlide({ onSelection }),
      anxietyTriggersSlide({ onSelection }),
      anxietyDurationSlide({ onSelection }),

      congratulationsAwardSlide({ onSelection }), // Award first award

      testimonialsSlide({ onSelection }), // Social Proof (user testimonials, 10k+ users)

      // Setup slides
      moodTrackingIntroSlide({ onSelection }),
      moodReminderFrequencySlide({ onSelection }),

      // Final slides
      referralSourceSlide({ onSelection }),

      ...(leadup_slides
        ? [freeToTrySlide({ onSelection }), reminderBellSlide({ onSelection })]
        : []),
    ],
    [onSelection, leadup_slides],
  )

  return { slides, nickname }
}
