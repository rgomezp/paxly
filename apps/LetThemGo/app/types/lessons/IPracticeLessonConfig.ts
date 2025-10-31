import { BaseLessonConfig } from "./IBaseLessonConfig"

export interface PracticeLessonConfig extends BaseLessonConfig {
  format: "practice"
  steps: Array<
    | { t: "instruction"; body: string }
    | { t: "timer"; seconds: number; label?: string }
    | { t: "breath"; pattern: "4-7-8" | "box" | "physiological"; rounds: number }
    | { t: "audio"; asset: string }
    | { t: "check"; prompt: string }
  >
  autoAdvance?: boolean // default true
  haptics?: boolean // default true
}
