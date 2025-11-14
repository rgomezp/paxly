import { ganon } from "@/services/ganon/ganon"
import { getLocalDateKey } from "@/utils/date"
import { LESSONS } from "@/data/LessonRegistry"
import { ITodaysLessonState } from "@/types/ITodaysLessonState"
import { STORAGE_KEYS } from "@/services/ganon/StorageMapping"
import LessonManager from "./LessonManager"
import { MODULE_ORDER } from "@/data/ModuleDisplayNames"

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
   * Selects today's lesson using a round-robin algorithm across modules.
   * Selects one uncompleted lesson from each module per day, advancing to the next module
   * each day regardless of whether the previous lesson was completed.
   * Excludes special cases lessons and completed lessons from daily lesson selection.
   */
  private static selectTodaysLesson(): string | null {
    const todayKey = getLocalDateKey()

    // Re-check state after getting lesson list to avoid race conditions
    // If another call already selected a lesson for today, use that instead
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as ITodaysLessonState | undefined
    if (state && state.dateKey === todayKey && state.lessonId) {
      return state.lessonId
    }

    // Get eligible modules (exclude special_cases)
    const eligibleModules = MODULE_ORDER.filter((moduleId) => moduleId !== "special_cases")

    if (eligibleModules.length === 0) {
      return null
    }

    // Get the last module index used (or -1 if none, meaning we start at module 0)
    const lastModuleIndex = state?.moduleIndex ?? -1

    // Advance to the next module (round-robin)
    const startModuleIndex = (lastModuleIndex + 1) % eligibleModules.length

    // Try to find a lesson from the current module or subsequent modules
    // (in case current module has no uncompleted lessons)
    let currentModuleIndex = startModuleIndex
    let attempts = 0
    const maxAttempts = eligibleModules.length

    while (attempts < maxAttempts) {
      const currentModuleId = eligibleModules[currentModuleIndex]

      // Get all lessons for the current module, excluding completed ones
      const moduleLessons = Object.keys(LESSONS)
        .filter(
          (lessonId) =>
            LESSONS[lessonId].moduleId === currentModuleId && !LessonManager.isCompleted(lessonId),
        )
        .sort((a, b) => {
          // Sort by original order in LESSONS to maintain consistency
          const orderA = Object.keys(LESSONS).indexOf(a)
          const orderB = Object.keys(LESSONS).indexOf(b)
          return orderA - orderB
        })

      if (moduleLessons.length > 0) {
        // Found uncompleted lessons in this module
        // Get the lesson index for this module (or 0 if none)
        const moduleLessonIndices = state?.moduleLessonIndices ?? {}
        const currentLessonIndex = moduleLessonIndices[currentModuleId] ?? 0

        // Select the lesson at the current index (round-robin within the module)
        const selectedLessonIndex = currentLessonIndex % moduleLessons.length
        const lessonId = moduleLessons[selectedLessonIndex]

        // Update the lesson index for this module
        const updatedModuleLessonIndices = {
          ...moduleLessonIndices,
          [currentModuleId]: selectedLessonIndex + 1,
        }

        // Save the selection
        const newState: ITodaysLessonState = {
          dateKey: todayKey,
          lessonId,
          moduleIndex: currentModuleIndex,
          moduleLessonIndices: updatedModuleLessonIndices,
        }
        ganon.set(STORAGE_KEYS.dailyLesson, newState)

        return lessonId
      }

      // No uncompleted lessons in this module, try next module
      currentModuleIndex = (currentModuleIndex + 1) % eligibleModules.length
      attempts++
    }

    // All modules exhausted, no lessons available
    return null
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
