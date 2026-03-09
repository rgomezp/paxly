import { ganon } from "@/services/ganon/ganon"
import { getLocalDateKey } from "@/utils/date"
import { LESSONS } from "@/data/LessonRegistry"
import { IDailyLessonState } from "@/types/IDailyLessonState"
import { STORAGE_KEYS } from "@/services/ganon/StorageMapping"
import LessonManager from "./LessonManager"
import { MODULE_ORDER, MODULE_PHASES } from "@/data/ModuleDisplayNames"
import { ModuleId } from "@/types/lessons/ModuleId"

export default class DailyLessonManager {
  /**
   * Gets today's lesson. If none exists or it's a new day, selects a new one.
   */
  static getTodaysLesson(): string | null {
    const todayKey = getLocalDateKey()
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState | undefined

    // If we have a lesson for today, return it
    if (state && state.dateKey === todayKey && state.lessonId) {
      return state.lessonId
    }

    // Otherwise, select a new lesson for today
    return this.selectTodaysLesson()
  }

  /**
   * Returns all curriculum lessons in program order (phase order, then MODULE_ORDER within phase,
   * then lesson order within module). Excludes phase 0 (on-demand) modules.
   */
  private static getLessonsInProgramOrder(): string[] {
    const modulesByPhase = this.getModulesByPhase()
    const phases = Array.from(modulesByPhase.keys())
      .filter((p) => p >= 1)
      .sort((a, b) => a - b)
    const result: string[] = []
    const lessonIds = Object.keys(LESSONS)
    for (const phase of phases) {
      const modules = modulesByPhase.get(phase) ?? []
      for (const moduleId of modules) {
        const moduleLessons = lessonIds
          .filter((id) => LESSONS[id].moduleId === moduleId)
          .sort((a, b) => lessonIds.indexOf(a) - lessonIds.indexOf(b))
        result.push(...moduleLessons)
      }
    }
    return result
  }

  /**
   * Groups modules by phase for phase-based round-robin selection
   */
  private static getModulesByPhase(): Map<number, ModuleId[]> {
    const modulesByPhase = new Map<number, ModuleId[]>()

    for (const [moduleId, phase] of Object.entries(MODULE_PHASES)) {
      if (!modulesByPhase.has(phase)) {
        modulesByPhase.set(phase, [])
      }
      modulesByPhase.get(phase)!.push(moduleId as ModuleId)
    }

    // Sort modules within each phase by MODULE_ORDER
    for (const [, modules] of modulesByPhase.entries()) {
      modules.sort((a, b) => {
        const indexA = MODULE_ORDER.indexOf(a)
        const indexB = MODULE_ORDER.indexOf(b)
        return indexA - indexB
      })
    }

    return modulesByPhase
  }

  /**
   * Checks if all lessons in a phase are completed
   */
  private static isPhaseComplete(phaseModules: ModuleId[]): boolean {
    for (const moduleId of phaseModules) {
      const moduleLessons = Object.keys(LESSONS).filter(
        (lessonId) =>
          LESSONS[lessonId].moduleId === moduleId && !LessonManager.isCompleted(lessonId),
      )
      if (moduleLessons.length > 0) {
        return false
      }
    }
    return true
  }

  /**
   * Selects today's lesson by picking the first uncompleted lesson in program order.
   * Does not advance by calendar day—if the user missed days, they still get the next
   * lesson they haven't completed, avoiding jumping ahead in the program.
   */
  private static selectTodaysLesson(): string | null {
    const todayKey = getLocalDateKey()

    // Re-check state after getting lesson list to avoid race conditions
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState | undefined
    if (state && state.dateKey === todayKey && state.lessonId) {
      return state.lessonId
    }

    const orderedLessonIds = this.getLessonsInProgramOrder()
    const firstUncompleted = orderedLessonIds.find((id) => !LessonManager.isCompleted(id))
    if (!firstUncompleted) {
      return null
    }

    // Persist state so we return the same lesson for the rest of the day
    const lesson = LESSONS[firstUncompleted]
    const modulesByPhase = this.getModulesByPhase()
    const phase = lesson ? (MODULE_PHASES[lesson.moduleId] ?? 1) : 1
    const phaseModules = modulesByPhase.get(phase) ?? []
    const moduleIndex =
      phaseModules.indexOf(lesson?.moduleId ?? "") >= 0 ? phaseModules.indexOf(lesson.moduleId) : 0
    const moduleLessonIndices = { ...(state?.moduleLessonIndices ?? {}) }
    if (lesson) {
      const lessonIds = Object.keys(LESSONS)
      const inModule = lessonIds
        .filter((id) => LESSONS[id].moduleId === lesson.moduleId)
        .sort((a, b) => lessonIds.indexOf(a) - lessonIds.indexOf(b))
      const idx = inModule.indexOf(firstUncompleted)
      if (idx >= 0) {
        moduleLessonIndices[lesson.moduleId] = idx + 1
      }
    }

    const newState: IDailyLessonState = {
      dateKey: todayKey,
      lessonId: firstUncompleted,
      currentPhase: phase,
      moduleIndex,
      moduleLessonIndices,
    }
    ganon.set(STORAGE_KEYS.dailyLesson, newState)
    return firstUncompleted
  }

  /**
   * Gets the next uncompleted lesson after today's lesson.
   * If today's lesson is not completed, returns today's lesson.
   * If today's lesson is completed, returns the next available lesson.
   */
  static getTodaysOrNextLesson(): string | null {
    const todaysLessonId = this.getTodaysLesson()

    // If no lesson exists, return null
    if (!todaysLessonId) {
      return null
    }

    // If today's lesson is not completed, return it
    if (!LessonManager.isCompleted(todaysLessonId)) {
      return todaysLessonId
    }

    // Today's lesson is completed, find the next one
    return this.getNextLesson()
  }

  /**
   * Gets the next uncompleted lesson without saving state.
   * Returns the first uncompleted lesson after today's lesson in program order.
   */
  private static getNextLesson(): string | null {
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState | undefined
    const todaysLessonId = state?.lessonId
    const orderedLessonIds = this.getLessonsInProgramOrder()

    const startIndex = todaysLessonId ? orderedLessonIds.indexOf(todaysLessonId) + 1 : 0
    for (let i = startIndex; i < orderedLessonIds.length; i++) {
      if (!LessonManager.isCompleted(orderedLessonIds[i])) {
        return orderedLessonIds[i]
      }
    }
    return null
  }

  /**
   * Marks today's lesson as completed
   */
  static markCompleted(): void {
    const todayKey = getLocalDateKey()
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState | undefined

    if (state && state.dateKey === todayKey) {
      // The lesson is already tracked, completion is handled by DailyTaskManager
      // This method exists for potential future use if we need to track completion separately
    }
  }
}
