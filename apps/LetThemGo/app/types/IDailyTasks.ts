export type DailyTaskKey = "mood" | "lesson" | "journal"

export interface IDailyTasks {
  // YYYY-MM-DD in user's local timezone
  dateKey: string
  mood: boolean
  lesson: boolean
  journal: boolean
}

export const DEFAULT_DAILY_TASKS: IDailyTasks = {
  dateKey: "",
  mood: false,
  lesson: false,
  journal: false,
}
