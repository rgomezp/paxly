import { BuilderLessonConfig } from "./IBuilderLessonConfig"
import { CardLessonConfig } from "./ICardLessonConfig"
import { JournalLessonConfig } from "./IJournalLessonConfig"
import { PracticeLessonConfig } from "./IPracticeLessonConfig"

export type ILessonConfig =
  | CardLessonConfig
  | PracticeLessonConfig
  | JournalLessonConfig
  | BuilderLessonConfig
