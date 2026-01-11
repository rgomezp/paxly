import { FC, useMemo, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ScrollView, ViewStyle, TextStyle, Pressable } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { useStores } from "@/models"
import { useHeader } from "@/utils/useHeader"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import LetterToMyselfManager from "@/managers/LetterToMyselfManager"
import { ILetterToMyself } from "@/types/ILetterToMyself"
import BadgeManager from "@/managers/BadgeManager"
import { BadgeType } from "@/types/IBadgeData"

interface LetterInboxScreenProps extends AppStackScreenProps<"LetterInbox"> {}

export const LetterInboxScreen: FC<LetterInboxScreenProps> = observer(function LetterInboxScreen({
  navigation,
}) {
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const { letterToMyselfStore } = useStores()
  const deliveredLetters = letterToMyselfStore.deliveredLetters

  // Clear badge when user visits Letter Inbox screen
  useEffect(() => {
    BadgeManager.clearBadge(BadgeType.LETTER_TO_MYSELF)
  }, [])

  const handleLetterPress = (letter: ILetterToMyself) => {
    LetterToMyselfManager.markAsRead(letter.id)
    navigation.navigate("LetterReader", { letterId: letter.id })
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const $containerInsetStyle = useMemo(() => ({ paddingTop: 16 }), [])
  const $contentInsetStyle = useMemo(() => ({ paddingBottom: insets.bottom + 20 }), [insets.bottom])

  useHeader(
    {
      title: "Letter Inbox",
      LeftActionComponent: (
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={themed($headerAction)}
        >
          <ThemedFontAwesome5Icon name="chevron-left" color={theme.colors.text} size={18} solid />
        </Pressable>
      ),
    },
    [],
  )

  return (
    <View style={[themed($container), $containerInsetStyle]}>
      <ScrollView
        style={themed($scroll)}
        contentContainerStyle={$contentInsetStyle}
        showsVerticalScrollIndicator={true}
      >
        {deliveredLetters.length === 0 ? (
          <View style={themed($emptyState)}>
            <Text
              text="No letters yet"
              preset="subheading"
              style={themed({ color: theme.colors.textDim })}
            />
            <Text
              text="Letters you write will appear here when they're delivered."
              style={themed([$emptyStateText, { color: theme.colors.textDim }])}
            />
          </View>
        ) : (
          deliveredLetters.map((letter) => (
            <Pressable
              key={letter.id}
              onPress={() => handleLetterPress(letter)}
              style={themed([$letterCard, !letter.isRead && $letterCardUnread])}
            >
              <View style={themed($letterCardHeader)}>
                <Text
                  text={formatDate(letter.deliverAt)}
                  style={themed([
                    $letterDate,
                    !letter.isRead && { color: theme.colors.tint, fontWeight: "600" },
                  ])}
                />
                {!letter.isRead && (
                  <View style={themed($unreadBadge)}>
                    <Text text="New" style={themed($unreadBadgeText)} />
                  </View>
                )}
              </View>
              <Text
                text={letter.text}
                numberOfLines={3}
                style={themed([$letterPreview, !letter.isRead && { fontWeight: "500" }])}
              />
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  )
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $scroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 20,
})

const $emptyState: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 60,
})

const $emptyStateText: ThemedStyle<TextStyle> = () => ({
  marginTop: 12,
  textAlign: "center",
  fontSize: 14,
})

const $letterCard: ThemedStyle<ViewStyle> = (theme) => ({
  padding: 16,
  borderRadius: 12,
  backgroundColor: theme.colors.textInputBackground,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: theme.colors.border,
})

const $letterCardUnread: ThemedStyle<ViewStyle> = (theme) => ({
  borderColor: theme.colors.tint,
  borderWidth: 2,
})

const $letterCardHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
})

const $letterDate: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 14,
  fontWeight: "500",
})

const $unreadBadge: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.tint,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
})

const $unreadBadgeText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.background,
  fontSize: 10,
  fontWeight: "700",
})

const $letterPreview: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 14,
  lineHeight: 20,
})

const $headerAction: ThemedStyle<ViewStyle> = () => ({
  padding: 8,
  minWidth: 40,
  alignItems: "center",
  justifyContent: "center",
})
