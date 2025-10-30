import { CardLessonConfig } from "@/types/lessons/ICardLessonConfig"
import { Text } from ".."
import { ScrollView } from "react-native"
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
    <>
      <LessonHeader title={config.title} subtitle={config.goal} />
      <ScrollView style={themed(() => ({ padding: theme.spacing.md }))}>
        {config.cards.map((c, i) => (
          <LessonCard key={i} tone={c.type === "tip" ? "tip" : "default"}>
            <Text>{"body" in c ? c.body : (c as any).caption}</Text>
          </LessonCard>
        ))}
      </ScrollView>
      <CommitBar text={config.commitment?.text} onDone={onComplete} />
    </>
  )
}
