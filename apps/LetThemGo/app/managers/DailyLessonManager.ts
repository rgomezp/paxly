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
   * Selects today's lesson using a phase-based round-robin algorithm.
   * Round-robins through modules within the current phase until all lessons
   * in that phase are complete, then advances to the next phase.
   * Excludes special cases lessons and completed lessons from daily lesson selection.
   */
  private static selectTodaysLesson(): string | null {
    const todayKey = getLocalDateKey()

    // Re-check state after getting lesson list to avoid race conditions
    // If another call already selected a lesson for today, use that instead
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState | undefined
    if (state && state.dateKey === todayKey && state.lessonId) {
      return state.lessonId
    }

    const modulesByPhase = this.getModulesByPhase()
    if (modulesByPhase.size === 0) {
      return null
    }

    // Determine current phase (start at phase 1 if none set)
    let currentPhase = state?.currentPhase ?? 1
    const phases = Array.from(modulesByPhase.keys()).sort((a, b) => a - b)

    // Find the first phase that has uncompleted lessons
    while (currentPhase <= phases[phases.length - 1]) {
      if (!modulesByPhase.has(currentPhase)) {
        currentPhase++
        continue
      }

      const phaseModules = modulesByPhase.get(currentPhase)!

      // If this phase is complete, move to next phase
      if (this.isPhaseComplete(phaseModules)) {
        currentPhase++
        continue
      }

      // We found a phase with uncompleted lessons
      // Get the module index within this phase (or -1 if starting fresh)
      const lastModuleIndex = state?.currentPhase === currentPhase ? (state?.moduleIndex ?? -1) : -1
      const startModuleIndex = (lastModuleIndex + 1) % phaseModules.length

      // Try to find a lesson from modules in this phase
      let currentModuleIndex = startModuleIndex
      let attempts = 0
      const maxAttempts = phaseModules.length

      while (attempts < maxAttempts) {
        const currentModuleId = phaseModules[currentModuleIndex]

        // Get all lessons for the current module, excluding completed ones
        const moduleLessons = Object.keys(LESSONS)
          .filter(
            (lessonId) =>
              LESSONS[lessonId].moduleId === currentModuleId &&
              !LessonManager.isCompleted(lessonId),
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
          const newState: IDailyLessonState = {
            dateKey: todayKey,
            lessonId,
            currentPhase,
            moduleIndex: currentModuleIndex,
            moduleLessonIndices: updatedModuleLessonIndices,
          }
          ganon.set(STORAGE_KEYS.dailyLesson, newState)

          return lessonId
        }

        // No uncompleted lessons in this module, try next module in phase
        currentModuleIndex = (currentModuleIndex + 1) % phaseModules.length
        attempts++
      }

      // All modules in this phase exhausted, move to next phase
      currentPhase++
    }

    // All phases exhausted, no lessons available
    return null
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
   * This is used to show the next lesson when today's lesson is completed.
   */
  private static getNextLesson(): string | null {
    const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState | undefined
    const todaysLessonId = state?.lessonId

    // If we have today's lesson, find its module and advance from there
    const advancedModuleLessonIndices = { ...(state?.moduleLessonIndices ?? {}) }
    if (todaysLessonId && state) {
      const todaysLesson = LESSONS[todaysLessonId]
      if (todaysLesson) {
        const moduleId = todaysLesson.moduleId
        // Advance the lesson index for today's module
        const currentIndex = advancedModuleLessonIndices[moduleId] ?? 0
        advancedModuleLessonIndices[moduleId] = currentIndex + 1
      }
    }

    const modulesByPhase = this.getModulesByPhase()
    if (modulesByPhase.size === 0) {
      return null
    }

    // Start from the current phase and module index
    let currentPhase = state?.currentPhase ?? 1
    const phases = Array.from(modulesByPhase.keys()).sort((a, b) => a - b)

    // Find the first phase that has uncompleted lessons
    while (currentPhase <= phases[phases.length - 1]) {
      if (!modulesByPhase.has(currentPhase)) {
        currentPhase++
        continue
      }

      const phaseModules = modulesByPhase.get(currentPhase)!

      // If this phase is complete, move to next phase
      if (this.isPhaseComplete(phaseModules)) {
        currentPhase++
        continue
      }

      // We found a phase with uncompleted lessons
      // Start from the current module index (or next if today's lesson was from this phase)
      const lastModuleIndex = state?.currentPhase === currentPhase ? (state?.moduleIndex ?? -1) : -1
      const startModuleIndex = (lastModuleIndex + 1) % phaseModules.length

      // Try to find a lesson from modules in this phase
      let currentModuleIndex = startModuleIndex
      let attempts = 0
      const maxAttempts = phaseModules.length

      while (attempts < maxAttempts) {
        const currentModuleId = phaseModules[currentModuleIndex]

        // Get all lessons for the current module, excluding completed ones
        const moduleLessons = Object.keys(LESSONS)
          .filter(
            (lessonId) =>
              LESSONS[lessonId].moduleId === currentModuleId &&
              !LessonManager.isCompleted(lessonId),
          )
          .sort((a, b) => {
            // Sort by original order in LESSONS to maintain consistency
            const orderA = Object.keys(LESSONS).indexOf(a)
            const orderB = Object.keys(LESSONS).indexOf(b)
            return orderA - orderB
          })

        if (moduleLessons.length > 0) {
          // Found uncompleted lessons in this module
          // Use the advanced lesson index for this module
          const currentLessonIndex = advancedModuleLessonIndices[currentModuleId] ?? 0

          // Select the lesson at the current index (round-robin within the module)
          const selectedLessonIndex = currentLessonIndex % moduleLessons.length
          const lessonId = moduleLessons[selectedLessonIndex]

          // Return the next lesson without saving state
          return lessonId
        }

        // No uncompleted lessons in this module, try next module in phase
        currentModuleIndex = (currentModuleIndex + 1) % phaseModules.length
        attempts++
      }

      // All modules in this phase exhausted, move to next phase
      currentPhase++
    }

    // All phases exhausted, no lessons available
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
