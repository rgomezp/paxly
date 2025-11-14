import { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { MoodGraph, Quote } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme, ThemedStyle } from "@/theme"
import { useHomeDrawerSections } from "./HomeDrawerSections"
import NoContactManager from "@/managers/NoContactManager"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { SmileyIcon, TrophyIcon, BookOpenIcon } from "phosphor-react-native"
import { navigate } from "@/navigators/navigationUtilities"
import { CircularButton } from "@/components/buttons/CircularButton"

interface MeScreenProps extends AppStackScreenProps<"Me"> {}

export const MeScreen: FC<MeScreenProps> = observer(function MeScreen() {
  const sections = useHomeDrawerSections()
  // Content should not add its own top inset; header already accounts for it
  const contentInsets = useSafeAreaInsetsStyle([])
  const { themed } = useAppTheme()

  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  return (
    <>
      <HomeDrawer
        sections={sections}
        renderContent={({
          themed: themedDrawer,
          theme: _theme,
          toggleDrawer: _toggleDrawer,
        }: {
          themed: any
          theme: Theme
          toggleDrawer: () => void
        }) => (
          <ScrollView style={[themedDrawer($container), contentInsets]}>
            <Quote />
            <View style={themed($buttonsWrapper)}>
              <CircularButton
                onPress={() => navigate("MoodLogs", undefined)}
                icon={SmileyIcon}
                label="Moods"
              />
              <CircularButton
                onPress={() => navigate("JournalLogs", undefined)}
                icon={BookOpenIcon}
                label="Journal"
              />
              <CircularButton
                onPress={() => navigate("MyStuff", undefined)}
                icon={TrophyIcon}
                label="My Stuff"
              />
            </View>
            <MoodGraph />
            <View style={themed($bottomSpacing)} />
          </ScrollView>
        )}
      />
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
}

const $buttonsWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 62,
  marginBottom: 64,
  paddingHorizontal: 16,
  gap: 24,
}

const $bottomSpacing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.xxxl,
})
