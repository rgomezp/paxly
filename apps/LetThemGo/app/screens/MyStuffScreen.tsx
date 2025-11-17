import { FC, useMemo, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, ImageStyle, ScrollView, Image } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import AwardManager from "@/managers/AwardManager"
import BadgeManager from "@/managers/BadgeManager"
import { IAward } from "@/types/IAward"
import type { ThemedStyle } from "@/theme"
import { getAwardImage } from "@/data/AwardImageRegistry"

interface MyStuffScreenProps extends AppStackScreenProps<"MyStuff"> {}

export const MyStuffScreen: FC<MyStuffScreenProps> = observer(function MyStuffScreen() {
  const insets = useSafeAreaInsets()
  const { themed } = useAppTheme()

  // Clear badge when user visits My Stuff screen
  useEffect(() => {
    BadgeManager.clearBadge()
  }, [])

  const allAwards = AwardManager.getAllAwards()
  const earnedAwards = AwardManager.getEarnedAwards()
  const earnedAwardIds = new Set(earnedAwards.map((a) => a.id))

  // Group awards into rows (shelves) - 3 awards per shelf
  const AWARDS_PER_SHELF = 3
  const shelves = useMemo(() => {
    const rows: IAward[][] = []
    for (let i = 0; i < allAwards.length; i += AWARDS_PER_SHELF) {
      rows.push(allAwards.slice(i, i + AWARDS_PER_SHELF))
    }
    return rows
  }, [allAwards])

  const renderAward = (award: IAward, _index: number) => {
    const isEarned = earnedAwardIds.has(award.id)
    const awardImage = getAwardImage(award.id)

    return (
      <View key={award.id} style={themed($awardContainer)}>
        <View style={themed([$awardSlot, !isEarned && $awardSlotEmpty])}>
          {isEarned && awardImage && (
            <Image source={awardImage} style={$awardImage} resizeMode="contain" />
          )}
        </View>
        <Text style={themed($awardName)} numberOfLines={1}>
          {isEarned ? award.name : "???"}
        </Text>
      </View>
    )
  }

  const renderShelf = (shelf: IAward[], shelfIndex: number) => (
    <View key={`shelf-${shelfIndex}`} style={themed($shelfContainer)}>
      <View style={themed($shelfContent)}>
        {shelf.map((award, index) => renderAward(award, index))}
        {/* Fill remaining slots if shelf is not full */}
        {shelf.length < AWARDS_PER_SHELF &&
          Array.from({ length: AWARDS_PER_SHELF - shelf.length }).map((_, index) => (
            <View key={`empty-${index}`} style={themed($awardContainer)}>
              <View style={themed([$awardSlot, $awardSlotEmpty])} />
            </View>
          ))}
      </View>
      <View style={themed($shelfBase)} />
    </View>
  )

  return (
    <Screen preset="scroll" style={themed($container)}>
      <View style={[themed($headerContainer), { paddingTop: insets.top + 16 }]}>
        <Text text="My Stuff" preset="heading" style={themed($title)} />
        <Text text="Earn rewards by completing lessons!" preset="subheading" />
      </View>
      <ScrollView
        contentContainerStyle={themed($scrollContent)}
        showsVerticalScrollIndicator={false}
      >
        {shelves.map((shelf, index) => renderShelf(shelf, index))}
      </ScrollView>
    </Screen>
  )
})

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
})

const $headerContainer: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 24,
}

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: 8,
})

const $subtitle: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 14,
})

const $scrollContent: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 32,
}

const $shelfContainer: ViewStyle = {
  marginBottom: 32,
}

const $shelfContent: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 8,
  gap: 12,
}

const $shelfBase: ThemedStyle<ViewStyle> = (theme) => ({
  height: 4,
  backgroundColor: theme.colors.card,
  borderRadius: 2,
  opacity: 0.3,
})

const $awardContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  maxWidth: "33%",
}

const $awardSlot: ThemedStyle<ViewStyle> = (theme) => ({
  width: "100%",
  aspectRatio: 1,
  backgroundColor: theme.colors.card,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: theme.colors.border,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 8,
  minHeight: 80,
})

const $awardSlotEmpty: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  borderColor: theme.colors.border,
  borderStyle: "dashed",
  opacity: 0.3,
})

const $awardImage: ImageStyle = {
  width: "100%",
  height: "100%",
}

const $awardName: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 12,
  fontWeight: "600",
  textAlign: "center",
  marginBottom: 4,
})
