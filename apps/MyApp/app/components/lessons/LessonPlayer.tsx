import { LESSONS } from "@/data/LessonRegistry"
import { CardLesson } from "./CardLesson"
import { PracticeLesson } from "./PracticeLesson"
import { JournalLesson } from "./JournalLesson"
import { BuilderLesson } from "./BuilderLesson"
import { CardLessonConfig } from "@/types/lessons/ICardLessonConfig"
import { PracticeLessonConfig } from "@/types/lessons/IPracticeLessonConfig"
import { JournalLessonConfig } from "@/types/lessons/IJournalLessonConfig"
import { BuilderLessonConfig } from "@/types/lessons/IBuilderLessonConfig"
import { Screen } from "../Screen"
import { Text } from "../Text"

export function LessonPlayer({
  lessonId,
  onComplete,
}: {
  lessonId: string
  onComplete?: () => void
}) {
  const cfg = LESSONS[lessonId]
  if (!cfg)
    return (
      <Screen>
        <Text>Unknown lesson: {lessonId}</Text>
      </Screen>
    )
  switch (cfg.format) {
    case "card":
      return <CardLesson config={cfg as CardLessonConfig} onComplete={onComplete} />
    case "practice":
      return <PracticeLesson config={cfg as PracticeLessonConfig} onComplete={onComplete} />
    case "journal":
      return <JournalLesson config={cfg as JournalLessonConfig} onComplete={onComplete} />
    case "builder":
      return <BuilderLesson config={cfg as BuilderLessonConfig} onComplete={onComplete} />
  }
}
