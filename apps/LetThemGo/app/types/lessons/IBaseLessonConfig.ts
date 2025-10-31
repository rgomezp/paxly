import { LessonFormat } from "./LessonFormat"
import { ModuleId } from "./ModuleId"

export interface BaseLessonConfig {
  id: string
  moduleId: ModuleId
  title: string
  goal: string
  estMinutes: number
  format: LessonFormat
  gating?: { minHoursBeforeNext?: number; requires?: string[] }
  commitment?: { text: string; duration?: "today" | "week" | "custom" }
  checkIn?: { mood?: boolean; urge?: boolean; sleep?: boolean }
  nextOnComplete?: string
}
