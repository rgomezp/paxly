import { FC, useState, useEffect } from "react"
import { View, TextInput, ViewStyle, TextStyle } from "react-native"
import BottomModal from "./BottomModal"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import RectangularButton from "@/components/buttons/RectangularButton"
import WhyItDidntWorkManager from "@/managers/WhyItDidntWorkManager"
import { WhyItDidntWorkSection } from "@/types/IWhyItDidntWorkReason"
import StoreReviewManager from "@/managers/StoreReviewManager"

interface AddReasonModalProps {
  visible: boolean
  onClose: () => void
  section: WhyItDidntWorkSection
}

const SECTION_INFO: Record<
  WhyItDidntWorkSection,
  { title: string; description: string; example: string; placeholder: string }
> = {
  needsNotMet: {
    title: "Needs that weren't met",
    description: "What you needed but didn't receive",
    example: "I needed consistency. They were hot and cold.",
    placeholder: "I needed consistency. They were hot and cold.",
  },
  valuesDidntAlign: {
    title: "Values that didn't align",
    description: "Core beliefs that were incompatible",
    example: "I value honesty. They often lied about small things.",
    placeholder: "I value honesty. They often lied about small things.",
  },
  repeatedConflicts: {
    title: "Repeated conflicts",
    description: "Patterns that kept resurfacing",
    example: "We kept fighting about the same issues every week.",
    placeholder: "We kept fighting about the same issues every week.",
  },
  thingsIKeptExcusing: {
    title: "Things I kept excusing",
    description: "Behaviors you overlooked but shouldn't have",
    example: "I excused their disrespectful comments to my friends.",
    placeholder: "I excused their disrespectful comments to my friends.",
  },
  howIFeltMostOfTheTime: {
    title: "How I felt most of the time",
    description: "Your emotional experience in the relationship",
    example: "I felt anxious and on edge most of the time.",
    placeholder: "I felt anxious and on edge most of the time.",
  },
}

const AddReasonModal: FC<AddReasonModalProps> = function AddReasonModal({
  visible,
  onClose,
  section,
}) {
  const { themed, theme } = useAppTheme()
  const [text, setText] = useState("")
  const sectionInfo = SECTION_INFO[section]

  useEffect(() => {
    if (visible) {
      // Reset form when modal opens
      setText("")
    }
  }, [visible])

  const trimmedText = text.trim()
  const isValid = trimmedText.length > 0

  const handleSave = async () => {
    if (!isValid) return

    WhyItDidntWorkManager.addReason(section, trimmedText)
    StoreReviewManager.requestReview()
    onClose()
  }

  return (
    <BottomModal visible={visible} onClose={onClose} maxHeight="90%">
      <View style={themed($container)}>
        <Text text={`Add to ${sectionInfo.title}`} preset="heading" style={themed($title)} />
        <Text
          text={`Keep it short, factual, and non-judgmental. Example: "${sectionInfo.example}"`}
          size="sm"
          style={themed($helperText)}
        />

        <View style={themed($inputContainer)}>
          <Text text="Your reason" preset="formLabel" style={themed($label)} />
          <View style={themed($inputWrapper)}>
            <TextInput
              placeholder={sectionInfo.placeholder}
              placeholderTextColor={theme.colors.textDim}
              value={text}
              onChangeText={setText}
              multiline
              style={themed($input)}
              textAlignVertical="top"
              maxLength={200}
            />
          </View>
          <Text text={`${text.length}/200`} size="xs" style={themed($charCount)} />
        </View>

        <View style={themed($buttonRow)}>
          <View style={themed($cancelButtonWrapper)}>
            <RectangularButton
              buttonText="Cancel"
              onClick={onClose}
              lightBackground
              customStyles={themed($buttonStyle)}
            />
          </View>
          <View style={themed($addButtonWrapper)}>
            <RectangularButton
              buttonText="Add"
              onClick={handleSave}
              isDisabled={!isValid}
              customStyles={themed($buttonStyle)}
            />
          </View>
        </View>
      </View>
    </BottomModal>
  )
}

export default AddReasonModal

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: 8,
})

const $helperText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  marginBottom: theme.spacing.lg,
  lineHeight: 20,
})

const $label: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: theme.spacing.sm,
})

const $inputContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.lg,
})

const $inputWrapper: ThemedStyle<ViewStyle> = (theme) => ({
  borderRadius: theme.spacing.sm,
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral400,
  backgroundColor: theme.colors.palette.neutral200,
  minHeight: 100,
  padding: theme.spacing.sm,
})

const $input: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 16,
  lineHeight: 22,
  minHeight: 80,
})

const $charCount: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  marginTop: theme.spacing.xs,
  textAlign: "right",
})

const $buttonRow: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacing.sm,
  marginTop: theme.spacing.md,
})

const $cancelButtonWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $addButtonWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 2,
})

const $buttonStyle: ThemedStyle<ViewStyle> = () => ({
  margin: 0,
  minWidth: 0,
})
