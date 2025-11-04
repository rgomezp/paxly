import { CardLessonConfig } from "@/types/lessons/ICardLessonConfig"
import { Text } from ".."
import { ScrollView, View } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { CommitBar } from "./primitives/CommitBar"
import { LessonCard } from "./primitives/LessonCard"
import { LessonHeader } from "./LessonHeader"

export function CardLesson({
  config,
  onComplete,
}: {
  config: CardLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  return (
    <View style={themed(() => ({ flex: 1 }))}>
      <LessonHeader title={config.title} subtitle={config.goal} />
      <ScrollView style={themed(() => ({ flex: 1, padding: theme.spacing.md }))}>
        {config.cards.map((c, i) => (
          <LessonCard key={i} tone={c.type === "tip" ? "tip" : "default"}>
            <Text>{"body" in c ? c.body : (c as any).caption}</Text>
          </LessonCard>
        ))}
      </ScrollView>
      <View
        style={themed(() => ({
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }))}
      >
        <CommitBar text={config.commitment?.text} onDone={onComplete} />
      </View>
    </View>
  )
}
