import { FC, useState, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  ViewStyle,
  ScrollView as RNScrollView,
  useWindowDimensions,
  Pressable,
  TextStyle,
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { AppStackScreenProps } from "@/navigators"
import { MoodGraph, AnxietyGraph, Quote, Text } from "@/components"
import { HomeDrawer } from "../drawers/HomeDrawer"
import type { Theme, ThemedStyle } from "@/theme"
import { useHomeDrawerSections } from "./HomeDrawerSections"
import BadgeManager from "@/managers/BadgeManager"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { SmileyIcon, TrophyIcon, BookOpenIcon, EnvelopeIcon } from "phosphor-react-native"
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
  // State for graph page index
  const [currentGraphPage, setCurrentGraphPage] = useState(0)
  const graphScrollViewRef = useRef<RNScrollView>(null)

  // Update badge state when screen is focused
  useFocusEffect(
    useCallback(() => {
      setBadgeToShow(BadgeManager.shouldShowBadgeWithType())
    }, []),
  )

  const handleGraphPageChange = (pageIndex: number) => {
    setCurrentGraphPage(pageIndex)
    graphScrollViewRef.current?.scrollTo({ x: pageIndex * width, animated: true })
  }

  const handleGraphScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x
    const pageIndex = Math.round(offsetX / width)
    setCurrentGraphPage(pageIndex)
  }

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
            <View style={themed($graphsSection)}>
              <Text preset="subheading" style={themed($sectionTitle)}>
                Logs this week
              </Text>
              <View style={themed($graphButtonsRow)}>
                <Pressable
                  onPress={() => handleGraphPageChange(0)}
                  style={themed([$graphButton, currentGraphPage === 0 && $graphButtonActive])}
                >
                  <Text
                    style={themed([
                      $graphButtonText,
                      currentGraphPage === 0 && $graphButtonTextActive,
                    ])}
                  >
                    Anxiety
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleGraphPageChange(1)}
                  style={themed([$graphButton, currentGraphPage === 1 && $graphButtonActive])}
                >
                  <Text
                    style={themed([
                      $graphButtonText,
                      currentGraphPage === 1 && $graphButtonTextActive,
                    ])}
                  >
                    Moods
                  </Text>
                </Pressable>
              </View>
              <RNScrollView
                ref={graphScrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleGraphScroll}
                style={themed($graphScrollView)}
              >
                <View style={{ width }}>
                  <AnxietyGraph showTitle={false} />
                </View>
                <View style={{ width }}>
                  <MoodGraph showTitle={false} />
                </View>
              </RNScrollView>
            </View>
            <View style={[themed($buttonsWrapper), { width: containerWidth, gap }]}>
              <ActionCard
                onPress={() => navigate("MoodLogs", undefined)}
                icon={SmileyIcon}
                label="My logs"
                style={{ width: cardWidth, maxWidth: cardWidth }}
              />
              <ActionCard
                onPress={() => navigate("JournalLogs", undefined)}
                icon={BookOpenIcon}
                label="Journal entries"
                style={{ width: cardWidth, maxWidth: cardWidth }}
              />
              <ActionCard
                onPress={() => navigate("LetterToMyself", undefined)}
                icon={EnvelopeIcon}
                label="Letter to Myself"
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
  marginVertical: 34,
  alignSelf: "center",
}

const $graphsSection: ViewStyle = {
  marginBottom: 22,
}

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  paddingHorizontal: spacing.lg,
})

const $graphButtonsRow: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: 16,
  gap: 8,
  marginBottom: 16,
  justifyContent: "flex-end",
}

const $graphButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingVertical: 6,
  paddingHorizontal: spacing.md,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.border,
  alignItems: "center",
  justifyContent: "center",
})

const $graphButtonActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  borderColor: colors.tint,
})

const $graphButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  fontWeight: "600",
  color: colors.text,
})

const $graphButtonTextActive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
})

const $graphScrollView: ViewStyle = {
  flexGrow: 0,
}

const $bottomSpacing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.xxxl,
})
