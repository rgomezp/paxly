import { ganon } from "@/services/ganon/ganon"
import { rootStoreSingleton } from "@/models"
import { STORAGE_KEYS } from "@/services/ganon/StorageMapping"
import AnalyticsManager from "./AnalyticsManager"

interface CompletedLessonsState {
  lessonIds: string[]
  lastUpdated: number
}

export default class LessonManager {
  /**
   * Marks a lesson as completed
   */
  static markCompleted(lessonId: string): void {
    const state = this.getState()
    if (!state.lessonIds.includes(lessonId)) {
      state.lessonIds.push(lessonId)
      state.lastUpdated = Date.now()
      ganon.set(STORAGE_KEYS.completedLessons, state)
      try {
        // Update MST store so observers react immediately
        rootStoreSingleton.lessonStore.markCompleted(lessonId)
      } catch {
        // If store not available for some reason, ignore; persistence is already done
      }
      // Log analytics event
      AnalyticsManager.getInstance().logEvent("lesson_completed", {
        lesson_id: lessonId,
      })
    }
  }

  /**
   * Checks if a lesson has been completed
   */
  static isCompleted(lessonId: string): boolean {
    const state = this.getState()
    return state.lessonIds.includes(lessonId)
  }

  /**
   * Gets all completed lesson IDs
   */
  static getCompletedLessons(): string[] {
    const state = this.getState()
    return [...state.lessonIds]
  }

  /**
   * Gets the completion state
   */
  private static getState(): CompletedLessonsState {
    const stored = ganon.get(STORAGE_KEYS.completedLessons) as CompletedLessonsState | undefined
    if (!stored) {
      const fresh: CompletedLessonsState = {
        lessonIds: [],
        lastUpdated: Date.now(),
      }
      ganon.set(STORAGE_KEYS.completedLessons, fresh)
      return fresh
    }
    return stored
  }

  /**
   * Clears all completion data (for testing/debugging)
   */
  static clearAll(): void {
    ganon.set(STORAGE_KEYS.completedLessons, {
      lessonIds: [],
      lastUpdated: Date.now(),
    })
    try {
      rootStoreSingleton.lessonStore.clear()
    } catch {
      // If store not available, that's okay - persistence is already done
    }
  }
}
