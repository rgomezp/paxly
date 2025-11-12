import { Text } from "@/components/Text"
import { TextInput } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import { LessonCard } from "./LessonCard"

export function TextInputStep({
  prompt,
  placeholder,
  onDone,
}: {
  prompt: string
  placeholder?: string
  onDone?: (value: string) => void
}) {
  const { themed, theme } = useAppTheme()
  const [value, setValue] = useState("")

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
        }))}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textDim}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onDone?.(value)}
        autoFocus
      />
    </LessonCard>
  )
}
