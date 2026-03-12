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

    it("should advance to next module in phase 1 on next day when previous lesson was completed", () => {
      // Day 1: what_anxiety_is module (first in phase 1)
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("what_anxiety_is-1")

      // Mark day 1 lesson as completed so we advance to next
      mockIsCompleted.mockImplementation((lessonId: string) => lessonId === "what_anxiety_is-1")

      // Day 2: first uncompleted is now what_anxiety_is-2 (next in program order)
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("what_anxiety_is-2")

      expect(ganon.set).toHaveBeenLastCalledWith(
        STORAGE_KEYS.dailyLesson,
        expect.objectContaining({
          dateKey: "2024-01-02",
          lessonId: "what_anxiety_is-2",
          currentPhase: 1,
          moduleIndex: 0,
          moduleLessonIndices: expect.objectContaining({ what_anxiety_is: 2 }),
        }),
      )
    })

    it("should cycle through lessons in program order (complete one to get next)", () => {
      const dates = [
        new Date("2024-01-01T10:00:00Z"),
        new Date("2024-01-02T10:00:00Z"),
        new Date("2024-01-03T10:00:00Z"),
        new Date("2024-01-04T10:00:00Z"),
        new Date("2024-01-05T10:00:00Z"),
      ]

      // Program order: what_anxiety_is-1, what_anxiety_is-2, nervous_system_101-1, nervous_system_101-2, ...
      const expectedLessons = [
        "what_anxiety_is-1",
        "what_anxiety_is-2",
        "nervous_system_101-1",
        "nervous_system_101-2",
        "anxiety_vs_panic-1",
      ]

      const completed = new Set<string>()
      mockIsCompleted.mockImplementation((lessonId: string) => completed.has(lessonId))

      dates.forEach((date, index) => {
        currentDate = date
        const lessonId = DailyLessonManager.getTodaysLesson()
        expect(lessonId).toBe(expectedLessons[index])
        completed.add(lessonId!)
      })
    })

    it("should not advance when previous lesson was not completed (show first uncompleted)", () => {
      // Day 1: what_anxiety_is module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("what_anxiety_is-1")

      // Don't mark as completed - simulate user missing several days

      // Day 2: should still show first uncompleted (what_anxiety_is-1), not jump ahead
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("what_anxiety_is-1")
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

    it("should skip modules with no uncompleted lessons (first uncompleted in order)", () => {
      // Mark what_anxiety_is and nervous_system_101 and anxiety_vs_panic as completed
      mockIsCompleted.mockImplementation((lessonId: string) =>
        lessonId.startsWith("what_anxiety_is") ||
        lessonId.startsWith("nervous_system_101") ||
        lessonId.startsWith("anxiety_vs_panic"),
      )

      // Day 1: first uncompleted is mood_vs_emotion_vs_state-1
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("mood_vs_emotion_vs_state-1")

      // Day 2: still first uncompleted until they complete it
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("mood_vs_emotion_vs_state-1")

      // After completing, next is mood_vs_emotion_vs_state-2
      mockIsCompleted.mockImplementation((lessonId: string) =>
        lessonId.startsWith("what_anxiety_is") ||
        lessonId.startsWith("nervous_system_101") ||
        lessonId.startsWith("anxiety_vs_panic") ||
        lessonId === "mood_vs_emotion_vs_state-1",
      )
      currentDate = new Date("2024-01-03T10:00:00Z")
      const day3Lesson = DailyLessonManager.getTodaysLesson()
      expect(day3Lesson).toBe("mood_vs_emotion_vs_state-2")
    })

    it("should return null if all modules have no uncompleted lessons", () => {
      // Mark all lessons as completed
      mockIsCompleted.mockImplementation(() => true)

      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      expect(lessonId).toBeNull()
    })

    it("should track lesson indices within each module correctly (program order)", () => {
      const completed = new Set<string>()
      mockIsCompleted.mockImplementation((lessonId: string) => completed.has(lessonId))

      // Day 1: what_anxiety_is-1
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("what_anxiety_is-1")
      completed.add(day1Lesson!)

      // Day 2: what_anxiety_is-2
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("what_anxiety_is-2")
      completed.add(day2Lesson!)

      // Day 3: nervous_system_101-1
      currentDate = new Date("2024-01-03T10:00:00Z")
      const day3Lesson = DailyLessonManager.getTodaysLesson()
      expect(day3Lesson).toBe("nervous_system_101-1")
      completed.add(day3Lesson!)

      // Day 4: nervous_system_101-2
      currentDate = new Date("2024-01-04T10:00:00Z")
      const day4Lesson = DailyLessonManager.getTodaysLesson()
      expect(day4Lesson).toBe("nervous_system_101-2")

      // Verify the state was saved correctly for day 4
      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(1)
      expect(state.lessonId).toBe("nervous_system_101-2")
      expect(state.moduleLessonIndices).toEqual(
        expect.objectContaining({ nervous_system_101: 2 }),
      )
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

    it("should give second lesson from first module after completing first (program order)", () => {
      // Day 1: what_anxiety_is-1
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1 = DailyLessonManager.getTodaysLesson()
      expect(day1).toBe("what_anxiety_is-1")

      mockIsCompleted.mockImplementation((lessonId: string) => lessonId === "what_anxiety_is-1")

      // Day 2: first uncompleted is what_anxiety_is-2
      currentDate = new Date("2024-01-02T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()
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

    it("should go through phase 2 in program order after phase 1 is complete", () => {
      // Complete all phase 1 lessons
      mockIsCompleted.mockImplementation((lessonId: string) => {
        return (
          lessonId.startsWith("what_anxiety_is") ||
          lessonId.startsWith("nervous_system_101") ||
          lessonId.startsWith("anxiety_vs_panic") ||
          lessonId.startsWith("mood_vs_emotion_vs_state")
        )
      })

      // Day 1: first uncompleted in phase 2 is anxiety_escalation_ladder-1
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("anxiety_escalation_ladder-1")

      // Day 2: without completing day 1, still first uncompleted
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Same = DailyLessonManager.getTodaysLesson()
      expect(day2Same).toBe("anxiety_escalation_ladder-1")

      // After completing day 1, day 3 is anxiety_escalation_ladder-2 (next in program order)
      mockIsCompleted.mockImplementation((lessonId: string) => {
        return (
          lessonId.startsWith("what_anxiety_is") ||
          lessonId.startsWith("nervous_system_101") ||
          lessonId.startsWith("anxiety_vs_panic") ||
          lessonId.startsWith("mood_vs_emotion_vs_state") ||
          lessonId === "anxiety_escalation_ladder-1"
        )
      })
      currentDate = new Date("2024-01-03T10:00:00Z")
      const day3Lesson = DailyLessonManager.getTodaysLesson()
      expect(day3Lesson).toBe("anxiety_escalation_ladder-2")

      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(2)
    })
  })
})
