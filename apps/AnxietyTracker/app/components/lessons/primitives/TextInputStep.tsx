import { Text } from "@/components/Text"
import { TextInput } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState, useEffect } from "react"
import { LessonCard } from "./LessonCard"
import LessonResponseManager from "@/managers/LessonResponseManager"

export function TextInputStep({
  prompt,
  placeholder,
  onDone,
  lessonId,
  inputId,
}: {
  prompt: string
  placeholder?: string
  onDone?: (value: string) => void
  lessonId?: string
  inputId?: string
}) {
  const { themed, theme } = useAppTheme()
  const [value, setValue] = useState("")

  // Load saved response on mount if lessonId and inputId are provided
  useEffect(() => {
    if (lessonId && inputId) {
      const saved = LessonResponseManager.getResponse(lessonId, inputId)
      if (saved) {
        setValue(saved)
      }
    }
  }, [lessonId, inputId])

  // Save response on change if lessonId and inputId are provided
  const handleChange = (text: string) => {
    setValue(text)
    if (lessonId && inputId) {
      LessonResponseManager.saveResponse(lessonId, inputId, text)
    }
  }

  return (
    <LessonCard>
      <Text>{prompt}</Text>
      <TextInput
        style={themed(() => ({
          marginTop: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
          color: theme.colors.text,
          minHeight: 44,
          backgroundColor: theme.colors.textInputBackground,
        }))}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textDim}
        value={value}
        onChangeText={handleChange}
        onSubmitEditing={() => onDone?.(value)}
        autoFocus
      />
    </LessonCard>
  )
}
