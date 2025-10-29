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
import { multipleChoiceSlide } from "../slideLibrary/multipleChoiceSlide"

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
      const user = await UserManager.getUser()
      setNickname(user?.nickname || null)
    } catch (error) {
      Log.error(`Error refreshing nickname: ${error}`)
    }
  }

  const slides: ISlide[] = useMemo(
    () => [
      heroSlide({ onSelection }),
      problemSolutionSlide({ onSelection }),
      howItWorksSlide({ onSelection }),
      multipleChoiceSlide({ onSelection, allowMultipleSelections: true, maxSelections: 3 }),
      referralSourceSlide({ onSelection }),
      nicknameSlide({ onSelection, refreshNickname }),
      testimonialsSlide({ onSelection }),
    ],
    [onSelection],
  )

  return { slides, nickname }
}
