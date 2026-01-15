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
import { mascotNameSlide } from "../slideLibrary/mascotNameSlide"
import { mascotIntroSlide } from "../slideLibrary/mascotIntroSlide"
import { moodReminderFrequencySlide } from "../slideLibrary/moodReminderFrequencySlide"
import { moodTrackingIntroSlide } from "../slideLibrary/moodTrackingIntroSlide"
import { wowMomentSlide } from "../slideLibrary/wowMomentSlide"
import { freeToTrySlide } from "../slideLibrary/freeToTrySlide"
import { reminderBellSlide } from "../slideLibrary/reminderBellSlide"
import { FlagContext } from "@/hooks/useFlags"
import { MascotNames } from "@/types/MascotName"
import { ganon } from "@/services/ganon/ganon"

export const useSlides = (onSelection?: () => void) => {
  const flagContext = useContext(FlagContext)
  if (!flagContext) {
    throw new Error("useSlides must be used within a FlagProvider")
  }
  const { useFeatureFlags } = flagContext
  const [nickname, setNickname] = useState<string | null>(null)
  const [mascotName, setMascotName] = useState<MascotNames | null>(null)

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

    const loadMascotName = async () => {
      try {
        const storedMascotName = ganon.get("mascotName") as MascotNames | null
        setMascotName(storedMascotName || null)
      } catch (error) {
        Log.error(`Error loading mascot name: ${error}`)
      }
    }

    loadNickname()
    loadMascotName()
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

  // Helper function to refresh mascot name after it's saved
  const refreshMascotName = async () => {
    try {
      const storedMascotName = ganon.get("mascotName") as MascotNames | null
      setMascotName(storedMascotName || null)
    } catch (error) {
      Log.error(`Error refreshing mascot name: ${error}`)
    }
  }

  const slides: ISlide[] = useMemo(
    () => [
      // First 5 screens: Wow moment and key principles
      wowMomentSlide({ onSelection }), // Reciprocity (valuable insight) + Authority (research-backed) - WOW MOMENT
      heroSlide({ onSelection }), // Authority (research mention) + Unity ("we're here")
      problemSolutionSlide({ onSelection }), // Unity ("we've all been there", "together")
      howItWorksSlide({ onSelection }), // Social Proof ("join thousands")

      // Commitment/Consistency - Getting user commitments
      nicknameSlide({ onSelection, refreshNickname }), // Commitment (name)

      // Data collection slides
      genderSlide({ onSelection }),
      ageSlide({ onSelection }),
      anxietySeveritySlide({ onSelection }),
      anxietyTriggersSlide({ onSelection }),
      anxietyDurationSlide({ onSelection }),

      mascotNameSlide({ onSelection, refreshMascotName }), // Commitment (mascot name)
      mascotIntroSlide({ onSelection, mascotName }), // Liking (personalized interaction)
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
    [onSelection, leadup_slides, mascotName],
  )

  return { slides, nickname }
}
