import { FC, useEffect, useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, ScrollView as RNScrollView, useWindowDimensions } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { AppStackScreenProps } from "@/navigators"
import { MoodGraph, Quote } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme, ThemedStyle } from "@/theme"
import { useHomeDrawerSections } from "./HomeDrawerSections"
import NoContactManager from "@/managers/NoContactManager"
import BadgeManager from "@/managers/BadgeManager"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { SmileyIcon, TrophyIcon, BookOpenIcon, WrenchIcon } from "phosphor-react-native"
import { navigate } from "@/navigators/navigationUtilities"
import { ActionCard } from "@/components/buttons/ActionCard"
import { BadgeType } from "@/types/IBadgeData"

interface MeScreenProps extends AppStackScreenProps<"Me"> {}

export const MeScreen: FC<MeScreenProps> = observer(function MeScreen() {
  const sections = useHomeDrawerSections()
  // Content should not add its own top inset; header already accounts for it
  const contentInsets = useSafeAreaInsetsStyle([])
  const { themed } = useAppTheme()
  const { width } = useWindowDimensions()

  // Calculate card width and container width for centering
  // Use a consistent gap value
  const gap = 10
  const horizontalPadding = 32
  const cardWidth = (width - horizontalPadding - gap) / 2
  const containerWidth = 2 * cardWidth + gap

  // State for badge visibility (updates when screen is focused)
  const [badgeToShow, setBadgeToShow] = useState(() => BadgeManager.shouldShowBadgeWithType())

  useEffect(() => {
    NoContactManager.initializeNoContactData()
  }, [])

  // Update badge state when screen is focused
  useFocusEffect(
    useCallback(() => {
      setBadgeToShow(BadgeManager.shouldShowBadgeWithType())
    }, []),
  )

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
          <RNScrollView style={[themedDrawer($container), contentInsets]}>
            <MoodGraph />
            <View style={[themed($buttonsWrapper), { width: containerWidth, gap }]}>
              <ActionCard
                onPress={() => navigate("MoodLogs", undefined)}
                icon={SmileyIcon}
                label="Mood logs"
                style={{ width: cardWidth, maxWidth: cardWidth }}
              />
              <ActionCard
                onPress={() => navigate("JournalLogs", undefined)}
                icon={BookOpenIcon}
                label="Journal entries"
                style={{ width: cardWidth, maxWidth: cardWidth }}
              />
              <ActionCard
                onPress={() => navigate("BreakupTools", undefined)}
                icon={WrenchIcon}
                label="Healing Tools"
                style={{ width: cardWidth, maxWidth: cardWidth }}
                badge={badgeToShow === BadgeType.LETTER_TO_MYSELF}
              />
              <ActionCard
                onPress={() => navigate("MyStuff", undefined)}
                icon={TrophyIcon}
                label="My Stuff"
                badge={badgeToShow === BadgeType.MY_STUFF}
                style={{ width: cardWidth, maxWidth: cardWidth }}
              />
            </View>
            <Quote />
            <View style={themed($bottomSpacing)} />
          </RNScrollView>
        )}
      />
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $buttonsWrapper: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "stretch",
  marginTop: 62,
  marginBottom: 34,
  alignSelf: "center",
}

const $bottomSpacing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.xxxl,
})
