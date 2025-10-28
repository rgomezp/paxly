import UserManager from "@/managers/UserManager"
import Log from "@/utils/Log"
import { useColorScheme } from "react-native"
import { useEffect, useState, useMemo } from "react"
import NameInput from "@/components/NameInput"
import { ISlide } from "@/types/ISlide"

export const useSlides = (onSelection?: () => void) => {
  const colorScheme = useColorScheme()
  const themeContext = colorScheme || "light"
  const titleColor = themeContext === "dark" ? "white" : "black"
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
    ],
    [titleColor, onSelection],
  )

  return { slides, nickname }
}
