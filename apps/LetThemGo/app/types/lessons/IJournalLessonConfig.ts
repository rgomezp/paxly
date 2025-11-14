import { BaseLessonConfig } from "./IBaseLessonConfig"

export interface JournalLessonConfig extends BaseLessonConfig {
  format: "journal"
  template?: "cbt_5col" | "unsent_letter" | "post_date_debrief" | "custom"
  fields: Array<
    | { name: string; kind: "text"; label: string }
    | { name: string; kind: "shortText"; label: string; maxLen?: number; inputId?: string }
    | { name: string; kind: "longText"; label: string; minWords?: number; inputId?: string }
    | { name: string; kind: "radio"; label: string; options: string[] }
    | { name: string; kind: "slider"; label: string; min: number; max: number; step?: number }
    | { name: string; kind: "checkbox"; label: string }
  >
  autosaveTag?: string
}
