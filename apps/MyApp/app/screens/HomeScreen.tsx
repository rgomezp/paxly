import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text, DrawerIconButton } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme } from "@/theme"
import { getHomeDrawerSections } from "./HomeDrawerSections"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import UserManager from "@/managers/UserManager"
import { NoContactProgressWheel } from "@/components/NoContactProgressWheel"
import NoContactManager from "@/managers/NoContactManager"
import RectangularButton from "@/components/buttons/RectangularButton"
import DailyTasksTimeline from "@/components/DailyTasksTimeline"
import { navigate } from "@/navigators/navigationUtilities"
import HelpModal from "@/components/modals/HelpModal"
import Log from "@/utils/Log"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  // For navigation without typing, import hook inline when wiring button

  const sections = getHomeDrawerSections()
  const insets = useSafeAreaInsets()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)

  // Initialize no contact data if needed
  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  const name = UserManager.getUser()?.nickname ?? UserManager.getUser()?.first ?? "Friend"

  return (
    <>
      <HomeDrawer
        sections={sections}
        renderContent={({
          themed,
          theme,
          toggleDrawer,
        }: {
          themed: any
          theme: Theme
          toggleDrawer: () => void
        }) => (
          <ScrollView
            style={themed([$contentContainer, { backgroundColor: theme.colors.background }])}
          >
            <View style={themed({ backgroundColor: theme.colors.background })}>
              {/* Hamburger button at top */}
              <View style={themed([$hamburgerContainer, { paddingTop: insets.top }])}>
                <DrawerIconButton onPress={toggleDrawer} />
              </View>

              {/* Header Section */}
              <View style={themed($headerSection)}>
                <Text
                  text={`${name}, you've been no contact for:`}
                  preset="heading"
                  style={themed({ color: theme.colors.text, fontSize: 24, textAlign: "center" })}
                />
              </View>

              {/* Progress Wheel */}
              <NoContactProgressWheel refreshTrigger={refreshTrigger} />
              <DailyTasksTimeline onPressMood={() => navigate("MoodLogger")} />
              <View style={themed($resetButtonContainer)}>
                <RectangularButton
                  buttonText="Help"
                  onClick={() => setIsHelpModalVisible(true)}
                  icon="exclamation-triangle"
                />
              </View>
            </View>
          </ScrollView>
        )}
      />
      <HelpModal
        visible={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
        onThoughtContact={() => {
          Log.info("HomeScreen: User selected 'I'm thinking about contacting'")
          // TODO: Navigate to resources or show support
        }}
        onNeedEmotionalSupport={() => {
          Log.info("HomeScreen: User selected 'I need emotional support'")
          // TODO: Navigate to resources or show support
        }}
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

const $hamburgerContainer: ViewStyle = {
  alignItems: "flex-end",
  paddingRight: 20,
  paddingTop: 20,
}

const $headerSection: ViewStyle = {
  marginBottom: 24,
  paddingHorizontal: 20,
}

const $resetButtonContainer: ViewStyle = {
  marginTop: 24,
  paddingHorizontal: 40,
}
