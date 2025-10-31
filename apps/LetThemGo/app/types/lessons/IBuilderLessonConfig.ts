import { BaseLessonConfig } from "./IBaseLessonConfig"

export interface BuilderLessonConfig extends BaseLessonConfig {
  format: "builder"
  sections: Array<{
    title: string
    items: Array<
      | { label: string; kind: "check" }
      | { label: string; kind: "picker"; options: string[] }
      | { label: string; kind: "contact"; source: "phonebook" | "manual" }
      | { label: string; kind: "datetime" }
      | { label: string; kind: "shortText" }
      | {
          label: string
          kind: "link"
          action: "openSettings" | "blockNumber" | "muteApp" | "deepLink"
          payload?: any
        }
    >
    minRequired?: number
    export?: { to: Array<"pdf" | "notes" | "shareSheet">; filename?: string }
  }>
}
