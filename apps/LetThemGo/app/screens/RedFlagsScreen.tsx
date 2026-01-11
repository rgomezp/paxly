import { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ScrollView, ViewStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Text } from "@/components"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import RectangularButton from "@/components/buttons/RectangularButton"
import { useStores } from "@/models"
import AddRedFlagModal from "@/components/modals/AddRedFlagModal"

interface RedFlagsScreenProps extends AppStackScreenProps<"RedFlags"> {}

const HEADER_COPY =
  "Red flags are warning signs that something isn't right. When doubt or sadness creeps in, come back here. These are your observations, written when you were clear. They're here to remind you of the patterns you noticed, so you can honor your intuition and move forward."

const EXPLANATION_COPY =
  "Once you add a red flag, it becomes permanent. You can always add new ones, but existing flags can't be edited or removed. This prevents rewriting history, stops emotional editing during lonely moments, and creates a truth snapshot that's psychologically powerful."

export const RedFlagsScreen: FC<RedFlagsScreenProps> = observer(function RedFlagsScreen() {
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const { redFlagsStore } = useStores()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const sortedFlags = redFlagsStore.sortedFlags
  const hasFlags = redFlagsStore.hasFlags

  const handleAddFlag = () => {
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  const $containerInsetStyle = useMemo(() => ({ paddingTop: 16 }), [])
  const $contentInsetStyle = useMemo(
    () => ({ paddingBottom: insets.bottom + 40 }),
    [insets.bottom],
  )

  return (
    <View style={themed($container)}>
      <View style={[themed($innerContainer), $containerInsetStyle]}>
        <ScrollView
          style={themed($scroll)}
          contentContainerStyle={$contentInsetStyle}
          showsVerticalScrollIndicator={true}
        >
          <Text text="Red Flags" preset="heading" style={themed($title)} />
          <Text text={HEADER_COPY} style={themed($headerCopy)} />

          <View style={themed($explanationBox)}>
            <Text text={EXPLANATION_COPY} style={themed($explanationText)} />
          </View>

          {!hasFlags && (
            <View style={themed($emptyState)}>
              <Text
                text="Start by adding your first red flag. Be honest, be kind to yourself, and remember: these are observations, not judgments."
                style={themed($emptyStateText)}
              />
            </View>
          )}

          <View style={themed($sectionContainer)}>
            <RectangularButton
              buttonText="Add red flag"
              onClick={handleAddFlag}
              width="100%"
              icon="plus"
              customStyles={themed($addButton)}
            />

            {sortedFlags.length === 0 ? (
              <View style={themed($emptySection)}>
                <Text
                  text="No red flags added yet"
                  size="sm"
                  style={themed($emptySectionText)}
                />
              </View>
            ) : (
              sortedFlags.map((flag) => (
                <View key={flag.id}>
                  <View style={themed($flagRow)}>
                    <View style={[themed($iconBox), { backgroundColor: theme.colors.card }]}>
                      <ThemedFontAwesome5Icon
                        name="exclamation-triangle"
                        color={theme.colors.text}
                        size={18}
                        solid
                      />
                    </View>
                    <View style={$rowContent}>
                      <Text style={themed([$flagText, { color: theme.colors.text }])}>
                        {flag.text}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[themed($divider), { backgroundColor: theme.colors.separator }]}
                  />
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      {isModalVisible && (
        <AddRedFlagModal visible={isModalVisible} onClose={handleCloseModal} />
      )}
    </View>
  )
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $innerContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $scroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingHorizontal: 26,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: 12,
})

const $headerCopy: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  lineHeight: 24,
  marginBottom: 24,
})

const $explanationBox: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.md,
  marginBottom: theme.spacing.lg,
  backgroundColor: theme.colors.palette.neutral200,
  borderRadius: theme.spacing.sm,
  borderLeftWidth: 3,
  borderLeftColor: theme.colors.tint,
})

const $explanationText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 14,
  lineHeight: 20,
})

const $emptyState: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.lg,
  marginBottom: theme.spacing.xl,
  backgroundColor: theme.colors.palette.neutral200,
  borderRadius: theme.spacing.md,
})

const $emptyStateText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 14,
  lineHeight: 20,
  textAlign: "center",
})

const $sectionContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.xl,
})

const $emptySection: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.md,
  backgroundColor: theme.colors.palette.neutral200,
  borderRadius: theme.spacing.sm,
  marginTop: theme.spacing.md,
})

const $emptySectionText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontStyle: "italic",
})

const $flagRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 12,
}

const $iconBox: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 12,
  marginRight: 12,
  alignItems: "center",
  justifyContent: "center",
}

const $rowContent: ViewStyle = {
  flex: 1,
}

const $flagText: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
}

const $divider: ViewStyle = {
  height: 1,
  marginVertical: 8,
}

const $addButton: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
})

