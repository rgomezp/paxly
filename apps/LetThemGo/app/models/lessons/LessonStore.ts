import { types, Instance } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"
import { STORAGE_KEYS } from "@/services/ganon/StorageMapping"

interface CompletedLessonsState {
  lessonIds: string[]
  lastUpdated: number
}

export const LessonStoreModel = types
  .model("LessonStore", {
    completedLessonIds: types.optional(types.array(types.string), []),
  })
  .actions((self) => ({
    loadFromGanon() {
      const stored = ganon.get(STORAGE_KEYS.completedLessons) as CompletedLessonsState | undefined
      if (stored?.lessonIds) {
        self.completedLessonIds.replace(stored.lessonIds)
      } else {
        self.completedLessonIds.replace([])
      }
    },
    markCompleted(lessonId: string) {
      if (!self.completedLessonIds.includes(lessonId)) {
        self.completedLessonIds.push(lessonId)
        // Persist to ganon
        try {
          const state: CompletedLessonsState = {
            lessonIds: self.completedLessonIds.slice(),
            lastUpdated: Date.now(),
          }
          ganon.set(STORAGE_KEYS.completedLessons, state)
        } catch {
          // noop; persistence errors shouldn't break UI updates
        }
      }
    },
    clear() {
      self.completedLessonIds.replace([])
      ganon.set(STORAGE_KEYS.completedLessons, {
        lessonIds: [],
        lastUpdated: Date.now(),
      })
    },
    afterCreate() {
      this.loadFromGanon()
    },
  }))
  .views((self) => ({
    isCompleted(lessonId: string): boolean {
      return self.completedLessonIds.includes(lessonId)
    },
    getCompletedLessons(): string[] {
      return self.completedLessonIds.slice()
    },
  }))

export interface LessonStore extends Instance<typeof LessonStoreModel> {}
