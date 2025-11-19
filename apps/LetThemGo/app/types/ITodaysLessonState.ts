export interface ITodaysLessonState {
  // YYYY-MM-DD in user's local timezone
  dateKey: string
  lessonId: string | null
  lastIndex?: number // Deprecated: kept for backward compatibility
  // Phase-based round-robin module selection state
  currentPhase?: number // Current phase (1-5)
  moduleIndex?: number // Current module index within the current phase
  moduleLessonIndices?: Record<string, number> // Tracks lesson index within each module
}
