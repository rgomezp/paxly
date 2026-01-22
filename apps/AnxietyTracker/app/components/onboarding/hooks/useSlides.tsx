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
import { whatMadeYouOpenSlide } from "../slideLibrary/whatMadeYouOpenSlide"
import { anxietyFeelingsSlide } from "../slideLibrary/anxietyFeelingsSlide"
import { copingStyleSlide } from "../slideLibrary/copingStyleSlide"
import { intentCommitmentSlide } from "../slideLibrary/intentCommitmentSlide"
import { sleepDurationSlide } from "../slideLibrary/sleepDurationSlide"
import { lifeSatisfactionSlide } from "../slideLibrary/lifeSatisfactionSlide"
import { goalAchievementSlide } from "../slideLibrary/goalAchievementSlide"
import { FlagContext } from "@/hooks/useFlags"

export const useSlides = (onSelection?: () => void) => {
  const flagContext = useContext(FlagContext)
  if (!flagContext) {
    throw new Error("useSlides must be used within a FlagProvider")
  }
  const { useFeatureFlags } = flagContext
  const [nickname, setNickname] = useState<string | null>(null)

  const { leadup_slides, testimonials_slide } = useFeatureFlags()

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
      // First screen: What made you open Paxly today?
      whatMadeYouOpenSlide({ onSelection }), // Understanding user's current state

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
      anxietyFeelingsSlide({ onSelection }), // Anxiety Profile - understand their anxiety without labels
      anxietySeveritySlide({ onSelection }),
      anxietyTriggersSlide({ onSelection }),
      anxietyDurationSlide({ onSelection }),
      copingStyleSlide({ onSelection }), // Coping Style - strength-based framing
      intentCommitmentSlide({ onSelection }), // Intent & Commitment - understand motivation without pressure
      sleepDurationSlide({ onSelection }),
      lifeSatisfactionSlide({ onSelection }),
      goalAchievementSlide({ onSelection }),

      // Setup slides
      moodTrackingIntroSlide({ onSelection }),
      moodReminderFrequencySlide({ onSelection }),

      congratulationsAwardSlide({ onSelection }), // Award first award
      ...(testimonials_slide ? [testimonialsSlide({ onSelection })] : []), // Social Proof (user testimonials, 10k+ users)

      // Final slides
      referralSourceSlide({ onSelection }),

      ...(leadup_slides
        ? [freeToTrySlide({ onSelection }), reminderBellSlide({ onSelection })]
        : []),
    ],
    [onSelection, leadup_slides, testimonials_slide],
  )

  return { slides, nickname }
}
