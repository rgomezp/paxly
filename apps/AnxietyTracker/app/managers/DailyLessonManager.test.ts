import DailyLessonManager from "./DailyLessonManager"
import { STORAGE_KEYS } from "@/services/ganon/StorageMapping"
import { IDailyLessonState } from "@/types/IDailyLessonState"

// Mock dependencies - these need to be hoisted
jest.mock("@/services/ganon/ganon", () => {
  const storage: Record<string, any> = {}
  return {
    ganon: {
      get: jest.fn((key: string) => storage[key]),
      set: jest.fn((key: string, value: any) => {
        storage[key] = value
      }),
    },
  }
})

jest.mock("@/utils/date", () => ({
  getLocalDateKey: jest.fn(),
}))

const mockIsCompleted = jest.fn((_lessonId: string) => false)

jest.mock("@/managers/LessonManager", () => {
  return {
    __esModule: true,
    default: {
      isCompleted: jest.fn((lessonId: string) => mockIsCompleted(lessonId)),
    },
  }
})

// Create mock lessons for testing
jest.mock("@/data/LessonRegistry", () => {
  const mockLessons: Record<string, any> = {
    // Phase 1 modules
    // what_anxiety_is module (2 lessons) - first in phase 1
    "what_anxiety_is-1": {
      id: "what_anxiety_is-1",
      moduleId: "what_anxiety_is",
      title: "What Anxiety Is 1",
    },
    "what_anxiety_is-2": {
      id: "what_anxiety_is-2",
      moduleId: "what_anxiety_is",
      title: "What Anxiety Is 2",
    },
    // nervous_system_101 module (2 lessons)
    "nervous_system_101-1": {
      id: "nervous_system_101-1",
      moduleId: "nervous_system_101",
      title: "Nervous System 101 1",
    },
    "nervous_system_101-2": {
      id: "nervous_system_101-2",
      moduleId: "nervous_system_101",
      title: "Nervous System 101 2",
    },
    // anxiety_vs_panic module (2 lessons)
    "anxiety_vs_panic-1": {
      id: "anxiety_vs_panic-1",
      moduleId: "anxiety_vs_panic",
      title: "Anxiety vs Panic 1",
    },
    "anxiety_vs_panic-2": {
      id: "anxiety_vs_panic-2",
      moduleId: "anxiety_vs_panic",
      title: "Anxiety vs Panic 2",
    },
    // mood_vs_emotion_vs_state module (2 lessons)
    "mood_vs_emotion_vs_state-1": {
      id: "mood_vs_emotion_vs_state-1",
      moduleId: "mood_vs_emotion_vs_state",
      title: "Mood vs Emotion vs State 1",
    },
    "mood_vs_emotion_vs_state-2": {
      id: "mood_vs_emotion_vs_state-2",
      moduleId: "mood_vs_emotion_vs_state",
      title: "Mood vs Emotion vs State 2",
    },
    // Phase 2 modules
    // anxiety_escalation_ladder module (2 lessons)
    "anxiety_escalation_ladder-1": {
      id: "anxiety_escalation_ladder-1",
      moduleId: "anxiety_escalation_ladder",
      title: "Anxiety Escalation Ladder 1",
    },
    "anxiety_escalation_ladder-2": {
      id: "anxiety_escalation_ladder-2",
      moduleId: "anxiety_escalation_ladder",
      title: "Anxiety Escalation Ladder 2",
    },
    // triggers module (2 lessons)
    "triggers-1": { id: "triggers-1", moduleId: "triggers", title: "Triggers 1" },
    "triggers-2": { id: "triggers-2", moduleId: "triggers", title: "Triggers 2" },
    // im_having_a_panic_attack module (should be excluded from daily lessons)
    "im_having_a_panic_attack-1": {
      id: "im_having_a_panic_attack-1",
      moduleId: "im_having_a_panic_attack",
      title: "Panic Attack 1",
    },
  }
  return {
    LESSONS: mockLessons,
  }
})

describe("DailyLessonManager", () => {
  let mockGetLocalDateKey: jest.Mock
  let currentDate: Date
  let ganon: { get: jest.Mock; set: jest.Mock }

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    mockIsCompleted.mockImplementation((_lessonId: string) => false)

    // Get the mocked ganon and reset its storage
    const ganonModule = require("@/services/ganon/ganon")
    ganon = ganonModule.ganon

    // Reset storage by creating a fresh storage object
    const freshStorage: Record<string, any> = {}
    ganon.get.mockImplementation((key: string) => freshStorage[key])
    ganon.set.mockImplementation((key: string, value: any) => {
      freshStorage[key] = value
    })

    // Setup date mock
    currentDate = new Date("2024-01-01T10:00:00Z")
    const dateModule = require("@/utils/date")
    mockGetLocalDateKey = dateModule.getLocalDateKey
    mockGetLocalDateKey.mockImplementation((date?: Date) => {
      const d = date || currentDate
      const year = d.getFullYear()
      const month = (d.getMonth() + 1).toString().padStart(2, "0")
      const day = d.getDate().toString().padStart(2, "0")
      return `${year}-${month}-${day}`
    })
  })

  describe("Phase-based round-robin module selection", () => {
    it("should select first lesson from first phase 1 module on first day", () => {
      const lessonId = DailyLessonManager.getTodaysLesson()

      // Phase 1 starts with what_anxiety_is (first in MODULE_ORDER for phase 1)
      expect(lessonId).toBe("what_anxiety_is-1")
      expect(ganon.set).toHaveBeenCalledWith(
        STORAGE_KEYS.dailyLesson,
        expect.objectContaining({
          dateKey: "2024-01-01",
          lessonId: "what_anxiety_is-1",
          currentPhase: 1,
          moduleIndex: 0,
          moduleLessonIndices: { what_anxiety_is: 1 },
        }),
      )
    })

    it("should advance to next module in phase 1 on next day", () => {
      // Day 1: what_anxiety_is module (first in phase 1)
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("what_anxiety_is-1")

      // Day 2: nervous_system_101 module (second in phase 1)
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("nervous_system_101-1")

      expect(ganon.set).toHaveBeenLastCalledWith(
        STORAGE_KEYS.dailyLesson,
        expect.objectContaining({
          dateKey: "2024-01-02",
          lessonId: "nervous_system_101-1",
          currentPhase: 1,
          moduleIndex: 1,
          moduleLessonIndices: { what_anxiety_is: 1, nervous_system_101: 1 },
        }),
      )
    })

    it("should cycle through all phase 1 modules and return to first module", () => {
      const dates = [
        new Date("2024-01-01T10:00:00Z"),
        new Date("2024-01-02T10:00:00Z"),
        new Date("2024-01-03T10:00:00Z"),
        new Date("2024-01-04T10:00:00Z"),
        new Date("2024-01-05T10:00:00Z"),
      ]

      // Phase 1 modules in order: what_anxiety_is, nervous_system_101, anxiety_vs_panic, mood_vs_emotion_vs_state
      const expectedLessons = [
        "what_anxiety_is-1",
        "nervous_system_101-1",
        "anxiety_vs_panic-1",
        "mood_vs_emotion_vs_state-1",
        "what_anxiety_is-2", // Cycles back to first module in phase 1
      ]

      dates.forEach((date, index) => {
        currentDate = date
        const lessonId = DailyLessonManager.getTodaysLesson()
        expect(lessonId).toBe(expectedLessons[index])
      })
    })

    it("should advance to next module in phase even if previous lesson was not completed", () => {
      // Day 1: what_anxiety_is module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("what_anxiety_is-1")

      // Don't mark as completed - simulate user not completing it

      // Day 2: should still advance to next module in phase 1
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("nervous_system_101-1")
    })

    it("should exclude completed lessons from selection", () => {
      // Mark what_anxiety_is-1 as completed
      mockIsCompleted.mockImplementation((lessonId: string) => lessonId === "what_anxiety_is-1")

      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      // Should skip what_anxiety_is-1 and select what_anxiety_is-2
      expect(lessonId).toBe("what_anxiety_is-2")
    })

    it("should exclude special_cases module from selection", () => {
      // Get all lessons for a few days to ensure special_cases is never selected
      const dates = [
        new Date("2024-01-01T10:00:00Z"),
        new Date("2024-01-02T10:00:00Z"),
        new Date("2024-01-03T10:00:00Z"),
        new Date("2024-01-04T10:00:00Z"),
        new Date("2024-01-05T10:00:00Z"),
      ]

      dates.forEach((date) => {
        currentDate = date
        const lessonId = DailyLessonManager.getTodaysLesson()
        expect(lessonId).not.toBe("im_having_a_panic_attack-1")
        expect(lessonId).not.toBeNull()
      })
    })

    it("should skip modules with no uncompleted lessons within the phase", () => {
      // Mark all anxiety_vs_panic lessons as completed
      mockIsCompleted.mockImplementation((lessonId: string) =>
        lessonId.startsWith("anxiety_vs_panic"),
      )

      // Day 1: what_anxiety_is module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("what_anxiety_is-1")

      // Day 2: nervous_system_101 module
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("nervous_system_101-1")

      // Day 3: should skip anxiety_vs_panic (all completed) and go to mood_vs_emotion_vs_state
      currentDate = new Date("2024-01-03T10:00:00Z")
      const day3Lesson = DailyLessonManager.getTodaysLesson()
      expect(day3Lesson).toBe("mood_vs_emotion_vs_state-1")
    })

    it("should return null if all modules have no uncompleted lessons", () => {
      // Mark all lessons as completed
      mockIsCompleted.mockImplementation(() => true)

      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      expect(lessonId).toBeNull()
    })

    it("should track lesson indices within each module correctly", () => {
      // Day 1: what_anxiety_is-1
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("what_anxiety_is-1")

      // Day 2: nervous_system_101-1
      currentDate = new Date("2024-01-02T10:00:00Z")
      DailyLessonManager.getTodaysLesson()

      // Day 3: anxiety_vs_panic-1
      currentDate = new Date("2024-01-03T10:00:00Z")
      DailyLessonManager.getTodaysLesson()

      // Day 4: mood_vs_emotion_vs_state-1
      currentDate = new Date("2024-01-04T10:00:00Z")
      DailyLessonManager.getTodaysLesson()

      // Day 5: what_anxiety_is-2 (second lesson in what_anxiety_is module, cycles back)
      currentDate = new Date("2024-01-05T10:00:00Z")
      const day5Lesson = DailyLessonManager.getTodaysLesson()
      expect(day5Lesson).toBe("what_anxiety_is-2")

      // Verify the state was saved correctly
      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(1)
      expect(state.moduleLessonIndices).toEqual({
        what_anxiety_is: 2,
        nervous_system_101: 1,
        anxiety_vs_panic: 1,
        mood_vs_emotion_vs_state: 1,
      })
    })

    it("should return the same lesson for the same day if already selected", () => {
      currentDate = new Date("2024-01-01T10:00:00Z")

      // First call
      const lesson1 = DailyLessonManager.getTodaysLesson()
      expect(lesson1).toBe("what_anxiety_is-1")

      // Second call on same day should return same lesson
      const lesson2 = DailyLessonManager.getTodaysLesson()
      expect(lesson2).toBe("what_anxiety_is-1")

      // Should only set once
      expect(ganon.set).toHaveBeenCalledTimes(1)
    })

    it("should handle round-robin within phase 1 modules when cycling back", () => {
      // Go through all phase 1 modules once (what_anxiety_is, nervous_system_101, anxiety_vs_panic, mood_vs_emotion_vs_state)
      const phase1Modules = [
        "what_anxiety_is",
        "nervous_system_101",
        "anxiety_vs_panic",
        "mood_vs_emotion_vs_state",
      ]
      const dates = phase1Modules.map(
        (_, i) => new Date(`2024-01-${String(i + 1).padStart(2, "0")}T10:00:00Z`),
      )

      dates.forEach((date) => {
        currentDate = date
        DailyLessonManager.getTodaysLesson()
      })

      // Next day should cycle back to first module in phase 1 (what_anxiety_is) and select second lesson
      currentDate = new Date("2024-01-05T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      // Should be second lesson from what_anxiety_is module
      expect(lessonId).toBe("what_anxiety_is-2")
    })

    it("should only advance to phase 2 when phase 1 is complete", () => {
      // Complete all phase 1 lessons
      mockIsCompleted.mockImplementation((lessonId: string) => {
        return (
          lessonId.startsWith("what_anxiety_is") ||
          lessonId.startsWith("nervous_system_101") ||
          lessonId.startsWith("anxiety_vs_panic") ||
          lessonId.startsWith("mood_vs_emotion_vs_state")
        )
      })

      // Day 1: Should start with phase 2 (attachment) since phase 1 is complete
      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      expect(lessonId).toBe("anxiety_escalation_ladder-1")

      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(2)
    })

    it("should round-robin through phase 2 modules after phase 1 is complete", () => {
      // Complete all phase 1 lessons
      mockIsCompleted.mockImplementation((lessonId: string) => {
        return (
          lessonId.startsWith("what_anxiety_is") ||
          lessonId.startsWith("nervous_system_101") ||
          lessonId.startsWith("anxiety_vs_panic") ||
          lessonId.startsWith("mood_vs_emotion_vs_state")
        )
      })

      // Day 1: attachment-1 (first in phase 2)
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("anxiety_escalation_ladder-1")

      // Day 2: triggers-1 (second in phase 2)
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("triggers-1")

      // Day 3: attachment-2 (cycles back to first module in phase 2)
      currentDate = new Date("2024-01-03T10:00:00Z")
      const day3Lesson = DailyLessonManager.getTodaysLesson()
      expect(day3Lesson).toBe("anxiety_escalation_ladder-2")

      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(2)
    })
  })
})
