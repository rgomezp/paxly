export interface ITodaysLessonState {
  // YYYY-MM-DD in user's local timezone
  dateKey: string
  lessonId: string | null
  lastIndex?: number
}
