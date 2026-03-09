import { FC, useEffect, useState, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  ScrollView,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  ImageBackground,
} from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text, Mascot } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import UserManager from "@/managers/UserManager"
import RectangularButton from "@/components/buttons/RectangularButton"
import DailyTasksTimeline from "@/components/DailyTasksTimeline"
import DailyStreakSection from "@/components/DailyStreakSection"
import HelpModal from "@/components/modals/HelpModal"
import MedicalDisclaimerModal from "@/components/modals/MedicalDisclaimerModal"
import { useMedicalDisclaimer } from "@/hooks/useMedicalDisclaimer"
import Log from "@/utils/Log"
import { useFocusEffect } from "@react-navigation/native"
import { createAudioPlayer } from "expo-audio"
import { presentPaywallSafely } from "@/thirdParty/revenueCatUtils"
import AnalyticsManager from "@/managers/AnalyticsManager"
import { OneSignal } from "react-native-onesignal"
import { ThemedStyle } from "@/theme"
import { ganon } from "@/services/ganon/ganon"
import { EventRegister } from "@/utils/EventEmitter"
import { GLOBAL_EVENTS } from "@/constants/events"
import DailyStreakManager from "@/managers/DailyStreakManager"
import { msUntilNextLocalMidnight } from "@/utils/date"
import StoreReviewManager from "@/managers/StoreReviewManager"
import { showToast } from "@/utils/toast"
import EnjoyPaxlyBanner from "@/components/home/EnjoyPaxlyBanner"

// Module-level variable to track if chime has been played (persists across component remounts)
let hasPlayedChime = false

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ route }) {
  const insets = useSafeAreaInsets()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const { themed, theme, themeContext } = useAppTheme()
  const hasShownPaywallRef = useRef<string | null>(null)
  const { showModal, acceptDisclaimer } = useMedicalDisclaimer()
  const [dailyStreakCurrent, setDailyStreakCurrent] = useState(
    () => DailyStreakManager.getState().current,
  )
  const [enjoyBannerResponded, setEnjoyBannerResponded] = useState<boolean>(
    () => (ganon.get("enjoyBannerResponded") as boolean | undefined) ?? false,
  )

  useEffect(() => {
    OneSignal.InAppMessages.addTrigger("home_screen_loaded", "true")
    return () => {
      OneSignal.InAppMessages.removeTrigger("home_screen_loaded")
    }
  }, [])

  const name = UserManager.getUser()?.nickname ?? UserManager.getUser()?.first ?? "Friend"

  // Listen for setting updates
  useEffect(() => {
    const handleUpdate = () => {
      setDailyStreakCurrent(DailyStreakManager.getState().current)
      setEnjoyBannerResponded((ganon.get("enjoyBannerResponded") as boolean | undefined) ?? false)
    }

    EventRegister.on(GLOBAL_EVENTS.UPDATE_ALL, handleUpdate)
    handleUpdate() // Initial load

    return () => {
      EventRegister.off(GLOBAL_EVENTS.UPDATE_ALL, handleUpdate)
    }
  }, [])

  // Keep daily streak value fresh across focus and local midnight.
  useEffect(() => {
    const refresh = () => setDailyStreakCurrent(DailyStreakManager.getState().current)
    refresh()

    const id = setTimeout(refresh, msUntilNextLocalMidnight())
    return () => clearTimeout(id)
  }, [refreshTrigger])

  const onPressEnjoyBanner = () => {
    const analytics = AnalyticsManager.getInstance()
    analytics.logEvent("enjoy_banner_pressed", { source: "home_two_day_streak" })

    Alert.alert(
      "Are you enjoying Paxly?",
      undefined,
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            analytics.logEvent("enjoy_banner_response_no", { source: "home_two_day_streak" })
            ganon.set("enjoyBannerResponded", true)
            ganon.set("enjoyBannerSaidNo", true)
            setEnjoyBannerResponded(true)
            showToast("Thank you, your response has been recorded.")
          },
        },
        {
          text: "Yes",
          onPress: () => {
            analytics.logEvent("enjoy_banner_response_yes", { source: "home_two_day_streak" })
            ganon.set("enjoyBannerResponded", true)
            setEnjoyBannerResponded(true)
            void StoreReviewManager.requestReview(true)
          },
        },
      ],
      { cancelable: true },
    )
  }

  // Generate header text based on struggle preference
  const getHeaderText = () => {
    const timeOfDay = new Date().getHours()
    let greeting = ""
    if (timeOfDay < 12) {
      greeting = "Good morning"
    } else if (timeOfDay < 18) {
      greeting = "Good afternoon"
    } else {
      greeting = "Good evening"
    }
    return `${greeting}, ${name}`
  }

  // Play melancholy chime only once per session
  useEffect(() => {
    if (hasPlayedChime) {
      return
    }

    hasPlayedChime = true

    const playChime = () => {
      try {
        const sound = createAudioPlayer(require("../../assets/sounds/melancholy-chime.mp3"))
        sound.volume = 1.0
        sound.play()

        // Set up listener for auto-cleanup when playback finishes
        // Use a flag to prevent double cleanup if the listener fires multiple times
        // (e.g., if both playback status update and setTimeout fire, or listener is triggered twice)
        let isCleanedUp = false
        const removeListener = sound.addListener("playbackStatusUpdate", (status: any) => {
          if (status.didJustFinish && !isCleanedUp) {
            isCleanedUp = true
            sound.remove()
            removeListener.remove()
          }
        })
      } catch (error) {
        Log.error("HomeScreen: Failed to play melancholy chime:", error)
      }
    }

    playChime()
  }, [])

  // Show paywall if rc_offering_id is provided in route params
  useEffect(() => {
    const rcOfferingId = route.params?.rc_offering_id
    if (rcOfferingId && hasShownPaywallRef.current !== rcOfferingId) {
      hasShownPaywallRef.current = rcOfferingId
      Log.info(`HomeScreen: Showing paywall with rc_offering_id: ${rcOfferingId}`)
      presentPaywallSafely(rcOfferingId).catch((error) => {
        Log.error(`HomeScreen: Error presenting paywall: ${error}`)
      })
    }
  }, [route.params?.rc_offering_id])

  // Refresh dependent UI (e.g., daily tasks) when screen regains focus
  useFocusEffect(
    useCallback(() => {
      setRefreshTrigger((prev) => prev + 1)
    }, []),
  )

  const logoSource =
    themeContext === "dark"
      ? require("../../assets/logos/text_logo_dark.png")
      : require("../../assets/logos/text_logo.png")

  const backgroundSource =
    themeContext === "dark"
      ? require("../../assets/images/background_dark.png")
      : require("../../assets/images/background.png")

  // TEMP: force show in dev for testing (remove later).
  const shouldShowEnjoyBanner = (__DEV__ || dailyStreakCurrent >= 2) && !enjoyBannerResponded

  return (
    <>
      <ImageBackground source={backgroundSource} style={$backgroundImage} resizeMode="cover">
        <ScrollView
          style={themed($scrollViewContainer)}
          contentContainerStyle={themed($scrollContentContainer)}
        >
          {/* Top section with logo and blob */}
          <View style={themed({ backgroundColor: "transparent", paddingTop: insets.top })} />
          {shouldShowEnjoyBanner ? (
            <EnjoyPaxlyBanner name={name} onPress={onPressEnjoyBanner} />
          ) : null}
          <View style={themed($logoContainer)}>
            <Image source={logoSource} style={themed($logo)} resizeMode="contain" />
          </View>
          <View style={themed($blobContainer)}>
            <Mascot width={400} height={180} />
          </View>

          {/* Content card with rounded top corners */}
          <View style={themed($contentCard)}>
            <View>
              <Text
                text={getHeaderText()}
                preset="heading"
                style={themed({
                  color: theme.colors.text,
                  fontSize: 24,
                  paddingHorizontal: 20,
                  textAlign: "center",
                })}
              />
            </View>
            <View style={$resetButtonContainer}>
              <RectangularButton
                buttonText="Help"
                onClick={() => setIsHelpModalVisible(true)}
                icon="exclamation-triangle"
              />
            </View>
            <DailyTasksTimeline refreshToken={refreshTrigger} />
            <DailyStreakSection refreshToken={refreshTrigger} />
          </View>
        </ScrollView>
      </ImageBackground>
      <HelpModal
        visible={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
        onLessonActivated={() => {}}
        onIContacted={() => {
          Log.info("HomeScreen: User reset the streak")
          AnalyticsManager.getInstance().logEvent("no_contact_relapse")
          setRefreshTrigger((prev) => prev + 1)
        }}
      />
      <MedicalDisclaimerModal
        visible={showModal}
        onAccept={acceptDisclaimer}
        onDismiss={() => {
          // Modal can be dismissed, but it will show again next time if not accepted
        }}
      />
    </>
  )
})

const $backgroundImage: ViewStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
}

const $scrollViewContainer: ViewStyle = {
  flex: 1,
}

const $scrollContentContainer: ViewStyle = {
  flexGrow: 1,
}

const $contentCard: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  borderTopLeftRadius: 34,
  borderTopRightRadius: 34,
  paddingTop: 24,
  paddingHorizontal: 20,
  marginTop: 20,
  // Extend card background below to cover overscroll bounce
  marginBottom: -1000,
  paddingBottom: 1024, // 24 original + 1000 extension
})

const $logoContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 16,
  paddingHorizontal: 20,
}

const $logo: ImageStyle = {
  width: 200,
  height: 60,
}

const $resetButtonContainer: ViewStyle = {
  marginTop: 24,
  paddingHorizontal: 40,
}

const $blobContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
}
