import { FC, useEffect, useState, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle, Image, ImageStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import UserManager from "@/managers/UserManager"
import { NoContactProgressWheel } from "@/components/NoContactProgressWheel"
import NoContactManager from "@/managers/NoContactManager"
import RectangularButton from "@/components/buttons/RectangularButton"
import DailyTasksTimeline from "@/components/DailyTasksTimeline"
import HelpModal from "@/components/modals/HelpModal"
import Log from "@/utils/Log"
import { useFocusEffect } from "@react-navigation/native"
import { createAudioPlayer } from "expo-audio"
import { NatureSoundsSection } from "@/components/NatureSoundsSection"
import { presentPaywallSafely } from "@/thirdParty/revenueCatUtils"

// Module-level variable to track if chime has been played (persists across component remounts)
let hasPlayedChime = false

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ route }) {
  const insets = useSafeAreaInsets()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const { themed, theme, themeContext } = useAppTheme()
  const hasShownPaywallRef = useRef<string | null>(null)

  // Initialize no contact data if needed
  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  const name = UserManager.getUser()?.nickname ?? UserManager.getUser()?.first ?? "Friend"

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
        const removeListener = sound.addListener("playbackStatusUpdate", (status: any) => {
          if (status.didJustFinish) {
            sound.remove()
            removeListener.remove()
          }
        })

        // Auto-cleanup after playback completes
        setTimeout(() => {
          try {
            if (sound.isLoaded) {
              sound.remove()
              removeListener.remove()
            }
          } catch {
            // Sound already removed, ignore
          }
        }, 3000) // 3 second buffer for cleanup
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

  return (
    <>
      <ScrollView style={themed([$contentContainer, { backgroundColor: theme.colors.background }])}>
        <View
          style={themed({ backgroundColor: theme.colors.background, paddingTop: insets.top })}
        />
        <View style={themed($logoContainer)}>
          <Image source={logoSource} style={themed($logo)} resizeMode="contain" />
        </View>
        <View style={themed($headerSection)}>
          <Text
            text={`${name}, you've been no contact for:`}
            preset="heading"
            style={themed({
              color: theme.colors.text,
              fontSize: 24,
              paddingHorizontal: 20,
              textAlign: "center",
            })}
          />
        </View>
        <NoContactProgressWheel refreshTrigger={refreshTrigger} />
        <View style={$resetButtonContainer}>
          <RectangularButton
            buttonText="Help"
            onClick={() => setIsHelpModalVisible(true)}
            icon="exclamation-triangle"
          />
        </View>
        <DailyTasksTimeline refreshToken={refreshTrigger} />
        <NatureSoundsSection />
      </ScrollView>
      <HelpModal
        visible={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
        onLessonActivated={() => {}}
        onIContacted={() => {
          Log.info("HomeScreen: User reset the streak")
          NoContactManager.resetStreak()
          setRefreshTrigger((prev) => prev + 1)
        }}
      />
    </>
  )
})

const $contentContainer: ViewStyle = {
  flex: 1,
}

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

const $headerSection: ViewStyle = {
  marginVertical: 24,
  paddingHorizontal: 20,
}

const $resetButtonContainer: ViewStyle = {
  marginTop: 24,
  paddingHorizontal: 40,
}
