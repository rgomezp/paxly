import UserManager from "@/managers/UserManager"
import Log from "@/utils/Log"
import { useAppTheme } from "@/utils/useAppTheme"
import { useEffect, useState } from "react"
import { ReferralSource } from "../referral/ReferralSourceSelector"
import { ISlide } from "@/types/ISlide"
import NameInput from "@/components/NameInput"

export const useSlides = (onSelection?: () => void) => {
  const { themeContext } = useAppTheme()
  const titleColor = themeContext === "dark" ? "white" : "black"
  const [showReferralCodeSlide, setShowReferralCodeSlide] = useState(false)
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
  const getPersonalizedDescription = (baseDescription: string): string => {
    if (!nickname) {
      // If no nickname, replace {nickname} with empty string and clean up any resulting double spaces or commas
      return baseDescription
        .replace(/\{nickname\},?\s*/g, "")
        .replace(/,\s*$/, "") // Remove trailing comma
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim()
    }

    // Replace {nickname} with the actual nickname
    return baseDescription.replace(/\{nickname\}/g, nickname)
  }

  const handleReferralSourceSelection = (source: string) => {
    // Only show referral code slide if referral hasn't been used and source is friends/family
    setShowReferralCodeSlide(source === ReferralSource.FRIENDS_OR_FAMILY)
    onSelection?.()
  }

  // Helper function to refresh nickname after it's saved
  const refreshNickname = async () => {
    try {
      const user = await UserManager.getUser()
      setNickname(user?.nickname || null)
    } catch (error) {
      Log.error(`Error refreshing nickname: ${error}`)
    }
  }

  const baseSlides: ISlide[] = [
    {
      id: "name_input",
      title: "What should we call you?",
      component: (
        <NameInput
          showTitle={false}
          onSelection={() => {
            refreshNickname()
            onSelection?.()
          }}
        />
      ),
      titleColor,
    },
  ]

  const slides: ISlide[] = [...baseSlides]

  return { slides, nickname }
}
