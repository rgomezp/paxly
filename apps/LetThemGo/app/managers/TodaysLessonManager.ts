import { ganon } from "@/services/ganon/ganon"
import { getLocalDateKey } from "@/utils/date"
import { LESSONS } from "@/data/LessonRegistry"
import { ITodaysLessonState } from "@/types/ITodaysLessonState"
import { STORAGE_KEYS } from "@/services/ganon/StorageMapping"
import LessonManager from "./LessonManager"

export default class TodaysLessonManager {
  /**
   * Gets today's lesson. If none exists or it's a new day, selects a new one.
   */
  static getTodaysLesson(): string | null {
    const todayKey = getLocalDateKey()
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as ITodaysLessonState | undefined

    // If we have a lesson for today, return it
    if (state && state.dateKey === todayKey && state.lessonId) {
      return state.lessonId
    }

    // Otherwise, select a new lesson for today
    return this.selectTodaysLesson()
  }

  /**
   * Selects today's lesson (rotates through available lessons)
   * Excludes special cases lessons and completed lessons from daily lesson selection
   */
  private static selectTodaysLesson(): string | null {
    // Filter out special cases lessons and completed lessons from daily lesson selection
    const eligibleLessonIds = Object.keys(LESSONS).filter(
      (lessonId) =>
        LESSONS[lessonId].moduleId !== "special_cases" && !LessonManager.isCompleted(lessonId),
    )

    if (eligibleLessonIds.length === 0) {
      return null
    }

    const todayKey = getLocalDateKey()

    // Re-check state after getting lesson list to avoid race conditions
    // If another call already selected a lesson for today, use that instead
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as ITodaysLessonState | undefined
    if (state && state.dateKey === todayKey && state.lessonId) {
      return state.lessonId
    }

    // Get the last lesson index used (or -1 if none)
    const lastIndex = state?.lastIndex ?? -1

    // Rotate to the next lesson
    const nextIndex = (lastIndex + 1) % eligibleLessonIds.length
    const lessonId = eligibleLessonIds[nextIndex]

    // Save the selection
    const newState: ITodaysLessonState = {
      dateKey: todayKey,
      lessonId,
      lastIndex: nextIndex,
    }
    ganon.set(STORAGE_KEYS.dailyLesson, newState)

    return lessonId
  }

  /**
   * Marks today's lesson as completed
   */
  static markCompleted(): void {
    const todayKey = getLocalDateKey()
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as ITodaysLessonState | undefined

    if (state && state.dateKey === todayKey) {
      // The lesson is already tracked, completion is handled by DailyTaskManager
      // This method exists for potential future use if we need to track completion separately
    }
  }
}
