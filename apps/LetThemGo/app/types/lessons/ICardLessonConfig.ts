import { BaseLessonConfig } from "./IBaseLessonConfig"

export interface CardLessonConfig extends BaseLessonConfig {
  format: "card"
  cards: Array<
    | { type: "text"; body: string }
    | { type: "tip"; body: string }
    | { type: "image"; uri: string; caption?: string }
    | { type: "qa"; question: string; options: string[] }
  >
}
