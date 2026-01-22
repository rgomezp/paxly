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

interface LetterReaderScreenProps extends AppStackScreenProps<"LetterReader"> {}

export const LetterReaderScreen: FC<LetterReaderScreenProps> = observer(
  function LetterReaderScreen({ navigation, route }) {
    const { themed, theme } = useAppTheme()
    const insets = useSafeAreaInsets()
    const { letterToMyselfStore } = useStores()
    const letterId = route.params.letterId

    const letter = letterToMyselfStore.letters.find((l) => l.id === letterId)
    const isRead = letter?.isRead ?? false

    useEffect(() => {
      if (letterId && !isRead) {
        LetterToMyselfManager.markAsRead(letterId)
      }
    }, [letterId, isRead])

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }

    const $containerInsetStyle = useMemo(() => ({ paddingTop: 16 }), [])
    const $contentInsetStyle = useMemo(
      () => ({ paddingBottom: insets.bottom + 20 }),
      [insets.bottom],
    )

    useHeader(
      {
        title: "Your Letter",
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

    if (!letter) {
      return (
        <View style={[themed($container), $containerInsetStyle]}>
          <Text text="Letter not found" style={themed({ color: theme.colors.text })} />
        </View>
      )
    }

    return (
      <View style={[themed($container), $containerInsetStyle]}>
        <ScrollView
          style={themed($scroll)}
          contentContainerStyle={$contentInsetStyle}
          showsVerticalScrollIndicator={true}
        >
          <Text
            text={formatDate(letter.deliverAt)}
            style={themed([$letterDate, { color: theme.colors.textDim }])}
          />
          <Text text={letter.text} style={themed($letterText)} />
        </ScrollView>
      </View>
    )
  },
)

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $scroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 20,
})

const $letterDate: ThemedStyle<TextStyle> = () => ({
  fontSize: 14,
  marginBottom: 16,
})

const $letterText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  lineHeight: 24,
})

const $headerAction: ThemedStyle<ViewStyle> = () => ({
  padding: 8,
  minWidth: 40,
  alignItems: "center",
  justifyContent: "center",
})
