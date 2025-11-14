export interface ITodaysLessonState {
  // YYYY-MM-DD in user's local timezone
  dateKey: string
  lessonId: string | null
  lastIndex?: number // Deprecated: kept for backward compatibility
  // Round-robin module selection state
  moduleIndex?: number // Current module index in the round-robin
  moduleLessonIndices?: Record<string, number> // Tracks lesson index within each module
}
