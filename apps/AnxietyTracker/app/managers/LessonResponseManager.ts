import { ganon } from "@/services/ganon/ganon"
import { ILessonResponses } from "@/types/ILessonResponses"

export default class LessonResponseManager {
  /**
   * Generate storage key for a lesson input
   */
  private static getStorageKey(lessonId: string, inputId: string): string {
    return `${lessonId}:${inputId}`
  }

  /**
   * Save a text response for a lesson input
   */
  static saveResponse(lessonId: string, inputId: string, text: string): void {
    const responses = (ganon.get("lessonResponses") ?? {}) as ILessonResponses
    const key = this.getStorageKey(lessonId, inputId)
    responses[key] = text
    ganon.set("lessonResponses", responses)
  }

  /**
   * Load a text response for a lesson input
   */
  static getResponse(lessonId: string, inputId: string): string | undefined {
    const responses = (ganon.get("lessonResponses") ?? {}) as ILessonResponses
    const key = this.getStorageKey(lessonId, inputId)
    return responses[key]
  }

  /**
   * Load all responses for a lesson
   */
  static getLessonResponses(lessonId: string): Record<string, string> {
    const responses = (ganon.get("lessonResponses") ?? {}) as ILessonResponses
    const lessonResponses: Record<string, string> = {}
    const prefix = `${lessonId}:`

    for (const [key, value] of Object.entries(responses)) {
      if (key.startsWith(prefix)) {
        const inputId = key.substring(prefix.length)
        lessonResponses[inputId] = value
      }
    }

    return lessonResponses
  }

  /**
   * Clear a specific response
   */
  static clearResponse(lessonId: string, inputId: string): void {
    const responses = (ganon.get("lessonResponses") ?? {}) as ILessonResponses
    const key = this.getStorageKey(lessonId, inputId)
    delete responses[key]
    ganon.set("lessonResponses", responses)
  }

  /**
   * Clear all responses for a lesson
   */
  static clearLessonResponses(lessonId: string): void {
    const responses = (ganon.get("lessonResponses") ?? {}) as ILessonResponses
    const prefix = `${lessonId}:`
    const keysToDelete = Object.keys(responses).filter((key) => key.startsWith(prefix))

    for (const key of keysToDelete) {
      delete responses[key]
    }

    ganon.set("lessonResponses", responses)
  }
}
