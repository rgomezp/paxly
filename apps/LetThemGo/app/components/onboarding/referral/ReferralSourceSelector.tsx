import RectangularButton from "@/components/buttons/RectangularButton"
import AnalyticsManager from "@/managers/AnalyticsManager"
import { useAppTheme } from "@/utils/useAppTheme"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useState } from "react"

export const ReferralSource = {
  FRIENDS_OR_FAMILY: "FRIENDS_OR_FAMILY",
  TIKTOK: "TIKTOK",
  APP_STORE: "APP_STORE",
  INSTAGRAM: "INSTAGRAM",
  FACEBOOK: "FACEBOOK",
  YOUTUBE: "YOUTUBE",
  SNAPCHAT: "SNAPCHAT",
  REDDIT: "REDDIT",
  OTHER: "OTHER",
} as const

type ReferralSourceType = (typeof ReferralSource)[keyof typeof ReferralSource]

const colors = {
  grayBorder: "#ddd",
  black: "#000000",
  white: "#FFFFFF",
  lightGray: "#f0f0f0",
  darkGray: "#888",
  mediumGray: "#666",
} as const

interface ReferralSourceSelectorProps {
  showTitle?: boolean
  onSelection?: (source: ReferralSourceType) => void
}

const ReferralSourceSelector = ({ showTitle = true, onSelection }: ReferralSourceSelectorProps) => {
  const { theme, themeContext } = useAppTheme()
  const isDark = themeContext === "dark"
  const [selectedSource, setSelectedSource] = useState<ReferralSourceType | null>(null)

  const getSourceEnglishName = (source: ReferralSourceType): string => {
    switch (source) {
      case ReferralSource.FRIENDS_OR_FAMILY:
        return "friends_or_family"
      case ReferralSource.TIKTOK:
        return "tiktok"
      case ReferralSource.APP_STORE:
        return "app_store"
      case ReferralSource.INSTAGRAM:
        return "instagram"
      case ReferralSource.FACEBOOK:
        return "facebook"
      case ReferralSource.YOUTUBE:
        return "youtube"
      case ReferralSource.SNAPCHAT:
        return "snapchat"
      case ReferralSource.REDDIT:
        return "reddit"
      case ReferralSource.OTHER:
        return "other"
      default:
        return String(source).toLowerCase()
    }
  }

  const handleSourceSelect = (source: ReferralSourceType) => {
    // Set selected source
    setSelectedSource(source)

    // Log analytics event
    const englishSourceName = getSourceEnglishName(source)
    AnalyticsManager.getInstance().logEvent("referral_source", {
      source: englishSourceName,
    })

    onSelection?.(source)
  }

  const getSourceDisplayName = (source: ReferralSourceType): string => {
    switch (source) {
      case ReferralSource.FRIENDS_OR_FAMILY:
        return "Friends or Family"
      case ReferralSource.TIKTOK:
        return "TikTok"
      case ReferralSource.APP_STORE:
        return "App Store"
      case ReferralSource.INSTAGRAM:
        return "Instagram"
      case ReferralSource.FACEBOOK:
        return "Facebook"
      case ReferralSource.YOUTUBE:
        return "YouTube"
      case ReferralSource.SNAPCHAT:
        return "Snapchat"
      case ReferralSource.REDDIT:
        return "Reddit"
      case ReferralSource.OTHER:
        return "Other"
      default:
        return source
    }
  }

  const sources: ReferralSourceType[] = [
    ReferralSource.APP_STORE,
    ReferralSource.REDDIT,
    ReferralSource.FRIENDS_OR_FAMILY,
    ReferralSource.TIKTOK,
    ReferralSource.INSTAGRAM,
    ReferralSource.FACEBOOK,
    ReferralSource.YOUTUBE,
    ReferralSource.SNAPCHAT,
    ReferralSource.OTHER,
  ]

  const getTitleColor = () => (isDark ? styles.titleDark : styles.titleLight)
  const getScrollHintTextColor = () =>
    isDark ? styles.scrollHintTextDark : styles.scrollHintTextLight

  return (
    <View style={styles.container}>
      {showTitle && (
        <Text style={[styles.title, getTitleColor()]}>{"How did you hear about us?"}</Text>
      )}
      <View style={styles.scrollWrapper}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
          indicatorStyle={themeContext === "dark" ? "white" : "black"}
        >
          <View style={styles.optionsContainer}>
            {sources.map((source) => (
              <RectangularButton
                key={source}
                buttonText={getSourceDisplayName(source)}
                onClick={() => handleSourceSelect(source)}
                width={"70%"}
                textStyle={styles.buttonText}
                customStyles={styles.buttonCustom}
                testID={`referral-source-${source}`}
                isSelected={selectedSource === source}
              />
            ))}
          </View>
        </ScrollView>
        <View style={[styles.scrollHint, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.scrollHintText, getScrollHintTextColor()]}>
            Scroll for more options
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonCustom: {
    marginVertical: 2,
  },
  buttonText: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  optionsContainer: {
    alignItems: "center",
    gap: 12,
  },
  scrollContainer: {
    flex: 1,
    width: 400,
  },
  scrollContent: {
    paddingBottom: 40, // Extra space for the hint
  },
  scrollHint: {
    alignItems: "center",
    borderTopColor: colors.grayBorder,
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    marginHorizontal: 20,
    paddingVertical: 8,
    position: "absolute",
    right: 0,
  },
  scrollHintText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  scrollHintTextDark: {
    color: colors.darkGray,
  },
  scrollHintTextLight: {
    color: colors.mediumGray,
  },
  scrollWrapper: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  titleDark: {
    color: colors.white,
  },
  titleLight: {
    color: colors.black,
  },
})

export default ReferralSourceSelector
