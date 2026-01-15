import { FC, useEffect, useState, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle, Image, ImageStyle, ImageBackground } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import UserManager from "@/managers/UserManager"
import RectangularButton from "@/components/buttons/RectangularButton"
import DailyTasksTimeline from "@/components/DailyTasksTimeline"
import HelpModal from "@/components/modals/HelpModal"
import Log from "@/utils/Log"
import { useFocusEffect } from "@react-navigation/native"
import { createAudioPlayer } from "expo-audio"
import { presentPaywallSafely } from "@/thirdParty/revenueCatUtils"
import AnalyticsManager from "@/managers/AnalyticsManager"
import { OneSignal } from "react-native-onesignal"
import LottieView from "lottie-react-native"
import { ThemedStyle } from "@/theme"

// Module-level variable to track if chime has been played (persists across component remounts)
let hasPlayedChime = false

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ route }) {
  const insets = useSafeAreaInsets()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const { themed, theme, themeContext } = useAppTheme()
  const hasShownPaywallRef = useRef<string | null>(null)
  const blobLottieRef = useRef<LottieView>(null)

  useEffect(() => {
    OneSignal.InAppMessages.addTrigger("home_screen_loaded", "true")
    return () => {
      OneSignal.InAppMessages.removeTrigger("home_screen_loaded")
    }
  }, [])

  const name = UserManager.getUser()?.nickname ?? UserManager.getUser()?.first ?? "Friend"

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

  // Start blob animation when component mounts
  useEffect(() => {
    blobLottieRef.current?.play()
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

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={$backgroundImage}
        resizeMode="cover"
      >
        <ScrollView
          style={themed($scrollViewContainer)}
          contentContainerStyle={themed($scrollContentContainer)}
        >
          {/* Top section with logo and blob */}
          <View style={themed({ backgroundColor: "transparent", paddingTop: insets.top })} />
          <View style={themed($logoContainer)}>
            <Image source={logoSource} style={themed($logo)} resizeMode="contain" />
          </View>
          <View style={themed($blobContainer)}>
            <LottieView
              ref={blobLottieRef}
              source={require("../../assets/animations/blob.json")}
              loop
              style={themed($blobAnimation)}
            />
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
  backgroundColor: theme.colors.card,
  borderTopLeftRadius: 34,
  borderTopRightRadius: 34,
  paddingTop: 24,
  paddingHorizontal: 20,
  paddingBottom: 24,
  marginTop: 20,
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

const $blobAnimation: ViewStyle = {
  width: 400,
  height: 180,
}
