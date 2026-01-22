import { LESSONS } from "@/data/LessonRegistry"
import { IM_ANXIOUS_LESSON_DEFINITIONS } from "@/data/lessons/ImAnxiousLessons"
import { IM_HAVING_A_PANIC_ATTACK_LESSON_DEFINITIONS } from "@/data/lessons/ImHavingAPanicAttackLessons"
import { CardLesson } from "./CardLesson"
import { PracticeLesson } from "./PracticeLesson"
import { JournalLesson } from "./JournalLesson"
import { BuilderLesson } from "./BuilderLesson"
import { CardLessonConfig } from "@/types/lessons/ICardLessonConfig"
import { PracticeLessonConfig } from "@/types/lessons/IPracticeLessonConfig"
import { JournalLessonConfig } from "@/types/lessons/IJournalLessonConfig"
import { BuilderLessonConfig } from "@/types/lessons/IBuilderLessonConfig"
import { Text } from "../Text"

export function LessonPlayer({
  lessonId,
  onComplete,
}: {
  lessonId: string
  onComplete?: () => void
}) {
  // Check regular lessons, urge lessons, and panic attack lessons
  const cfg =
    LESSONS[lessonId] ||
    IM_ANXIOUS_LESSON_DEFINITIONS[lessonId] ||
    IM_HAVING_A_PANIC_ATTACK_LESSON_DEFINITIONS[lessonId]
  if (!cfg) return <Text>Unknown lesson: {lessonId}</Text>
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
