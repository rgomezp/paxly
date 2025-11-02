import { FC, useEffect, useState, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import UserManager from "@/managers/UserManager"
import { NoContactProgressWheel } from "@/components/NoContactProgressWheel"
import NoContactManager from "@/managers/NoContactManager"
import RectangularButton from "@/components/buttons/RectangularButton"
import DailyTasksTimeline from "@/components/DailyTasksTimeline"
import { navigate } from "@/navigators/navigationUtilities"
import HelpModal from "@/components/modals/HelpModal"
import Log from "@/utils/Log"
import { useFocusEffect } from "@react-navigation/native"
import { Audio } from "expo-av"
import { MessageIntoTheVoidSection } from "@/components/MessageIntoTheVoidSection"
import { NatureSoundsSection } from "@/components/NatureSoundsSection"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const insets = useSafeAreaInsets()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const { themed, theme } = useAppTheme()
  const hasPlayedChimeRef = useRef(false)

  // Initialize no contact data if needed
  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  const name = UserManager.getUser()?.nickname ?? UserManager.getUser()?.first ?? "Friend"

  // Play melancholy chime when navigating to Home (only once per session)
  const playMelancholyChime = useCallback(async () => {
    // Only play on first navigation (app startup or after onboarding)
    if (hasPlayedChimeRef.current) {
      return
    }

    hasPlayedChimeRef.current = true

    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/melancholy-chime.mp3"),
        {
          shouldPlay: true,
          volume: 1.0,
        },
      )

      // Set up status listener for auto-cleanup
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {
            // Ignore cleanup errors
          })
        }
      })

      // Auto-cleanup after playback completes
      setTimeout(() => {
        sound
          .getStatusAsync()
          .then((status) => {
            if (status.isLoaded) {
              sound.unloadAsync().catch(() => {
                // Ignore cleanup errors
              })
            }
          })
          .catch(() => {
            // Sound already unloaded, ignore
          })
      }, 3000) // 3 second buffer for cleanup
    } catch (error) {
      Log.error("HomeScreen: Failed to play melancholy chime:", error)
    }
  }, [])

  // Refresh dependent UI (e.g., daily tasks) when screen regains focus
  useFocusEffect(
    useCallback(() => {
      setRefreshTrigger((prev) => prev + 1)
      playMelancholyChime()
    }, [playMelancholyChime]),
  )

  return (
    <>
      <ScrollView style={themed([$contentContainer, { backgroundColor: theme.colors.background }])}>
        <View
          style={themed({ backgroundColor: theme.colors.background, paddingTop: insets.top })}
        />
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
        <DailyTasksTimeline
          refreshToken={refreshTrigger}
          onPressMood={() => navigate("MoodLogger")}
          onPressJournal={() => navigate("Journal")}
        />
        <MessageIntoTheVoidSection />
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

const $headerSection: ViewStyle = {
  marginVertical: 24,
  paddingHorizontal: 20,
}

const $resetButtonContainer: ViewStyle = {
  marginTop: 24,
  paddingHorizontal: 40,
}
