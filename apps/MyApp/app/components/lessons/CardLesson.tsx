import { CardLessonConfig } from "@/types/lessons/ICardLessonConfig"
import { Header, Screen, Text } from ".."
import { ScrollView } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { CommitBar } from "./primitives/CommitBar"
import { LessonCard } from "./primitives/LessonCard"

export function CardLesson({
  config,
  onComplete,
}: {
  config: CardLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  return (
    <Screen>
      <Header title={config.title} />
      <Text preset="subheading">{config.goal}</Text>
      <ScrollView style={themed(() => ({ padding: theme.spacing.md }))}>
        {config.cards.map((c, i) => (
          <LessonCard key={i} tone={c.type === "tip" ? "tip" : "default"}>
            <Text>{"body" in c ? c.body : (c as any).caption}</Text>
          </LessonCard>
        ))}
      </ScrollView>
      <CommitBar text={config.commitment?.text} onDone={onComplete} />
    </Screen>
  )
}
