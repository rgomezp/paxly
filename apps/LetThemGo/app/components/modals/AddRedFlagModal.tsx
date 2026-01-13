import { FC, useState, useEffect } from "react"
import { View, TextInput, ViewStyle, TextStyle } from "react-native"
import BottomModal from "./BottomModal"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import RectangularButton from "@/components/buttons/RectangularButton"
import RedFlagsManager from "@/managers/RedFlagsManager"
import StoreReviewManager from "@/managers/StoreReviewManager"

interface AddRedFlagModalProps {
  visible: boolean
  onClose: () => void
}

const EXAMPLE = "They dismissed my feelings when I tried to communicate."
const PLACEHOLDER = "They dismissed my feelings when I tried to communicate."

const AddRedFlagModal: FC<AddRedFlagModalProps> = function AddRedFlagModal({
  visible,
  onClose,
}) {
  const { themed, theme } = useAppTheme()
  const [text, setText] = useState("")

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

    RedFlagsManager.addFlag(trimmedText)
    StoreReviewManager.requestReview()
    onClose()
  }

  return (
    <BottomModal visible={visible} onClose={onClose} maxHeight="90%">
      <View style={themed($container)}>
        <Text text="Add Red Flag" preset="heading" style={themed($title)} />
        <Text
          text={`Keep it short, factual, and non-judgmental. Example: "${EXAMPLE}"`}
          size="sm"
          style={themed($helperText)}
        />

        <View style={themed($inputContainer)}>
          <Text text="Your red flag" preset="formLabel" style={themed($label)} />
          <View style={themed($inputWrapper)}>
            <TextInput
              placeholder={PLACEHOLDER}
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

export default AddRedFlagModal

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

