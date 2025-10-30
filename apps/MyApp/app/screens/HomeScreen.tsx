import { FC, useEffect, useState, useCallback } from "react"
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

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const insets = useSafeAreaInsets()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const { themed, theme } = useAppTheme()

  // Initialize no contact data if needed
  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  const name = UserManager.getUser()?.nickname ?? UserManager.getUser()?.first ?? "Friend"

  // Refresh dependent UI (e.g., daily tasks) when screen regains focus
  useFocusEffect(
    useCallback(() => {
      setRefreshTrigger((prev) => prev + 1)
    }, []),
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
            style={themed({ color: theme.colors.text, fontSize: 24, textAlign: "center" })}
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
  marginBottom: 24,
  paddingHorizontal: 20,
}

const $resetButtonContainer: ViewStyle = {
  marginTop: 24,
  paddingHorizontal: 40,
}
