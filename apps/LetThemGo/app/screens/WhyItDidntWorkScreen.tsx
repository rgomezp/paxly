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
import AddReasonModal from "@/components/modals/AddReasonModal"
import { WhyItDidntWorkSection } from "@/types/IWhyItDidntWorkReason"

interface WhyItDidntWorkScreenProps extends AppStackScreenProps<"WhyItDidntWork"> {}

// Screen component for managing reasons why the relationship didn't work

const SECTION_INFO: Record<WhyItDidntWorkSection, { title: string; description: string }> = {
  needsNotMet: {
    title: "Needs that weren't met",
    description: "What you needed but didn't receive",
  },
  valuesDidntAlign: {
    title: "Values that didn't align",
    description: "Core beliefs that were incompatible",
  },
  repeatedConflicts: {
    title: "Repeated conflicts",
    description: "Patterns that kept resurfacing",
  },
  thingsIKeptExcusing: {
    title: "Things I kept excusing",
    description: "Behaviors you overlooked but shouldn't have",
  },
  howIFeltMostOfTheTime: {
    title: "How I felt most of the time",
    description: "Your emotional experience in the relationship",
  },
}

const SECTION_ICONS: Record<WhyItDidntWorkSection, string> = {
  needsNotMet: "heart-broken",
  valuesDidntAlign: "balance-scale",
  repeatedConflicts: "exclamation-triangle",
  thingsIKeptExcusing: "eye-slash",
  howIFeltMostOfTheTime: "sad-tear",
}

const SECTION_ORDER: WhyItDidntWorkSection[] = [
  "needsNotMet",
  "valuesDidntAlign",
  "repeatedConflicts",
  "thingsIKeptExcusing",
  "howIFeltMostOfTheTime",
]

const HEADER_COPY =
  "This relationship didn't meet your needs — and that matters. When doubt or sadness creeps in, come back here. These are your truths, written when you were clear. They're here to remind you why it didn't work, so you can honor your feelings and move forward."

const EXPLANATION_COPY =
  "Once you add a reason, it becomes permanent. You can always add new ones, but existing reasons can't be edited or removed. This prevents rewriting history, stops emotional editing during lonely moments, and creates a truth snapshot that's psychologically powerful."

export const WhyItDidntWorkScreen: FC<WhyItDidntWorkScreenProps> = observer(
  function WhyItDidntWorkScreen() {
    const { themed, theme } = useAppTheme()
    const insets = useSafeAreaInsets()
    const { whyItDidntWorkStore } = useStores()
    const [selectedSectionForModal, setSelectedSectionForModal] =
      useState<WhyItDidntWorkSection | null>(null)

    const reasonsBySection = whyItDidntWorkStore.reasonsBySection
    const hasReasons = whyItDidntWorkStore.hasReasons

    const handleAddReason = (section: WhyItDidntWorkSection) => {
      setSelectedSectionForModal(section)
    }

    const handleCloseModal = () => {
      setSelectedSectionForModal(null)
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
            <Text text="Why It Didn't Work" preset="heading" style={themed($title)} />
            <Text text={HEADER_COPY} style={themed($headerCopy)} />

            <View style={themed($explanationBox)}>
              <Text text={EXPLANATION_COPY} style={themed($explanationText)} />
            </View>

            {!hasReasons && (
              <View style={themed($emptyState)}>
                <Text
                  text="Start by adding your first reason. Be honest, be kind to yourself, and remember: these are facts, not judgments."
                  style={themed($emptyStateText)}
                />
              </View>
            )}

            {SECTION_ORDER.map((section) => {
              const reasons = reasonsBySection[section] || []
              const sectionInfo = SECTION_INFO[section]

              return (
                <View key={section} style={themed($sectionContainer)}>
                  <View style={themed($sectionHeader)}>
                    <Text
                      text={sectionInfo.title}
                      preset="subheading"
                      weight="bold"
                      style={themed($sectionTitle)}
                    />
                    {sectionInfo.description && (
                      <Text
                        text={sectionInfo.description}
                        size="sm"
                        style={themed($sectionDescription)}
                      />
                    )}
                  </View>

                  <RectangularButton
                    isPaidFeature
                    buttonText="Add reason"
                    onClick={() => handleAddReason(section)}
                    width="100%"
                    icon="plus"
                    customStyles={themed($addButton)}
                  />

                  {reasons.length === 0 ? (
                    <View style={themed($emptySection)}>
                      <Text
                        text="No reasons added yet"
                        size="sm"
                        style={themed($emptySectionText)}
                      />
                    </View>
                  ) : (
                    reasons.map((reason) => (
                      <View key={reason.id}>
                        <View style={themed($reasonRow)}>
                          <View style={[themed($iconBox), { backgroundColor: theme.colors.card }]}>
                            <ThemedFontAwesome5Icon
                              name={SECTION_ICONS[reason.section]}
                              color={theme.colors.text}
                              size={18}
                              solid
                            />
                          </View>
                          <View style={$rowContent}>
                            <Text style={themed([$reasonText, { color: theme.colors.text }])}>
                              {reason.text}
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
              )
            })}
          </ScrollView>
        </View>

        {selectedSectionForModal && (
          <AddReasonModal
            visible={!!selectedSectionForModal}
            onClose={handleCloseModal}
            section={selectedSectionForModal}
          />
        )}
      </View>
    )
  },
)

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

const $sectionHeader: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
})

const $sectionTitle: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.tint,
  marginBottom: 4,
})

const $sectionDescription: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
})

const $emptySection: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.md,
  backgroundColor: theme.colors.palette.neutral200,
  borderRadius: theme.spacing.sm,
})

const $emptySectionText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontStyle: "italic",
})

const $reasonRow: ViewStyle = {
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

const $reasonText: TextStyle = {
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
