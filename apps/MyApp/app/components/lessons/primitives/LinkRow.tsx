import { Text } from "@/components/Text"
import { LessonCard } from "./LessonCard"
import { useAppTheme } from "@/utils/useAppTheme"

export function LinkRow({ label, action }: { label: string; action: string }) {
  const { themed, theme } = useAppTheme()
  return (
    <LessonCard>
      <Text style={themed(() => ({ color: theme.colors.text }))}>{label}</Text>
      <Text style={themed(() => ({ color: theme.colors.textDim, marginTop: 4 }))}>
        Action: {action}
      </Text>
    </LessonCard>
  )
}
