import UserManager from "@/managers/UserManager"
import Log from "@/utils/Log"
import { useEffect, useState, useMemo } from "react"
import { ISlide } from "@/types/ISlide"
import { nicknameSlide } from "../slideLibrary/nicknameSlide"
import { testimonialsSlide } from "../slideLibrary/testimonialsSlide"
import { heroSlide } from "../slideLibrary/heroSlide"
import { problemSolutionSlide } from "../slideLibrary/problemSolutionSlide"
import { referralSourceSlide } from "../slideLibrary/referralSourceSlide"
import { howItWorksSlide } from "../slideLibrary/howItWorksSlide"
import { lastContactSlide } from "../slideLibrary/lastContactSlide"
import { genderSlide } from "../slideLibrary/genderSlide"
import { ageSlide } from "../slideLibrary/ageSlide"
import { relationshipDurationSlide } from "../slideLibrary/relationshipDurationSlide"
import { isFirstBreakupSlide } from "../slideLibrary/isFirstBreakupSlide"
import { noContactReasonSlide } from "../slideLibrary/noContactReasonSlide"
import { checkSocialMediaSlide } from "../slideLibrary/checkSocialMediaSlide"
import { contactTemptationSituationsSlide } from "../slideLibrary/contactTemptationSituationsSlide"
import { whoEndedItSlide } from "../slideLibrary/whoEndedItSlide"
import { mascotNameSlide } from "../slideLibrary/mascotNameSlide"
import { mascotIntroSlide } from "../slideLibrary/mascotIntroSlide"
import { loadingSlide } from "../slideLibrary/loadingSlide"
import { moodReminderFrequencySlide } from "../slideLibrary/moodReminderFrequencySlide"
import { moodTrackingIntroSlide } from "../slideLibrary/moodTrackingIntroSlide"
import { wowMomentSlide } from "../slideLibrary/wowMomentSlide"

export const useSlides = (onSelection?: () => void) => {
  const [nickname, setNickname] = useState<string | null>(null)

  // Load nickname when component mounts
  useEffect(() => {
    const loadNickname = async () => {
      try {
        const user = await UserManager.getUser()
        setNickname(user?.nickname || null)
      } catch (error) {
        Log.error(`Error loading nickname: ${error}`)
      }
    }
    loadNickname()
  }, [])

  // Helper function to create personalized descriptions using template replacement
  // Future feature: This can be used for personalized slide descriptions
  // const getPersonalizedDescription = (baseDescription: string): string => {
  //   if (!nickname) {
  //     return baseDescription
  //       .replace(/\{nickname\},?\s*/g, "")
  //       .replace(/,\s*$/, "")
  //       .replace(/\s+/g, " ")
  //       .trim()
  //   }
  //   return baseDescription.replace(/\{nickname\}/g, nickname)
  // }

  // Future feature: Handle referral source selection
  // const handleReferralSourceSelection = (source: string) => {
  //   setShowReferralCodeSlide(source === ReferralSource.FRIENDS_OR_FAMILY)
  //   onSelection?.()
  // }

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
      heroSlide({ onSelection }), // Authority (research mention) + Unity ("we're here")
      problemSolutionSlide({ onSelection }), // Unity ("we've all been there", "together")
      howItWorksSlide({ onSelection }), // Social Proof ("join thousands")

      // Commitment/Consistency - Getting user commitments
      nicknameSlide({ onSelection, refreshNickname }), // Commitment (name)
      mascotNameSlide({ onSelection }), // Commitment (mascot name)
      mascotIntroSlide({ onSelection }), // Liking (personalized interaction)
      testimonialsSlide({ onSelection }), // Social Proof (user testimonials, 10k+ users)

      // Data collection slides
      lastContactSlide({ onSelection }),
      genderSlide({ onSelection }),
      ageSlide({ onSelection }),
      relationshipDurationSlide({ onSelection }),
      isFirstBreakupSlide({ onSelection }),
      noContactReasonSlide({ onSelection }),
      checkSocialMediaSlide({ onSelection }),
      contactTemptationSituationsSlide({ onSelection }),
      whoEndedItSlide({ onSelection }),

      // Setup slides
      moodTrackingIntroSlide({ onSelection }),
      moodReminderFrequencySlide({ onSelection }),

      // Final slides
      referralSourceSlide({ onSelection }),
      loadingSlide({ onSelection }),
    ],
    [onSelection],
  )

  return { slides, nickname }
}
