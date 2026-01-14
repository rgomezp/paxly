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
    // no_contact module (2 lessons) - first in phase 1
    "no_contact-1": { id: "no_contact-1", moduleId: "no_contact", title: "No Contact 1" },
    "no_contact-2": { id: "no_contact-2", moduleId: "no_contact", title: "No Contact 2" },
    // stabilize module (3 lessons)
    "stabilize-1": { id: "stabilize-1", moduleId: "stabilize", title: "Stabilize 1" },
    "stabilize-2": { id: "stabilize-2", moduleId: "stabilize", title: "Stabilize 2" },
    "stabilize-3": { id: "stabilize-3", moduleId: "stabilize", title: "Stabilize 3" },
    // body_downshift module (2 lessons)
    "body_downshift-1": {
      id: "body_downshift-1",
      moduleId: "body_downshift",
      title: "Body Downshift 1",
    },
    "body_downshift-2": {
      id: "body_downshift-2",
      moduleId: "body_downshift",
      title: "Body Downshift 2",
    },
    // cognitive_aid module (2 lessons)
    "cognitive_aid-1": {
      id: "cognitive_aid-1",
      moduleId: "cognitive_aid",
      title: "Cognitive Aid 1",
    },
    "cognitive_aid-2": {
      id: "cognitive_aid-2",
      moduleId: "cognitive_aid",
      title: "Cognitive Aid 2",
    },
    // Phase 2 modules
    // attachment module (2 lessons)
    "attachment-1": { id: "attachment-1", moduleId: "attachment", title: "Attachment 1" },
    "attachment-2": { id: "attachment-2", moduleId: "attachment", title: "Attachment 2" },
    // identity module (2 lessons)
    "identity-1": { id: "identity-1", moduleId: "identity", title: "Identity 1" },
    "identity-2": { id: "identity-2", moduleId: "identity", title: "Identity 2" },
    // special_cases module (should be excluded)
    "special_cases-1": {
      id: "special_cases-1",
      moduleId: "special_cases",
      title: "Special Cases 1",
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

      // Phase 1 starts with no_contact (first in MODULE_ORDER for phase 1)
      expect(lessonId).toBe("no_contact-1")
      expect(ganon.set).toHaveBeenCalledWith(
        STORAGE_KEYS.dailyLesson,
        expect.objectContaining({
          dateKey: "2024-01-01",
          lessonId: "no_contact-1",
          currentPhase: 1,
          moduleIndex: 0,
          moduleLessonIndices: { no_contact: 1 },
        }),
      )
    })

    it("should advance to next module in phase 1 on next day", () => {
      // Day 1: no_contact module (first in phase 1)
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("no_contact-1")

      // Day 2: stabilize module (second in phase 1)
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("stabilize-1")

      expect(ganon.set).toHaveBeenLastCalledWith(
        STORAGE_KEYS.dailyLesson,
        expect.objectContaining({
          dateKey: "2024-01-02",
          lessonId: "stabilize-1",
          currentPhase: 1,
          moduleIndex: 1,
          moduleLessonIndices: { no_contact: 1, stabilize: 1 },
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

      // Phase 1 modules in order: no_contact, stabilize, body_downshift, cognitive_aid
      const expectedLessons = [
        "no_contact-1",
        "stabilize-1",
        "body_downshift-1",
        "cognitive_aid-1",
        "no_contact-2", // Cycles back to first module in phase 1
      ]

      dates.forEach((date, index) => {
        currentDate = date
        const lessonId = DailyLessonManager.getTodaysLesson()
        expect(lessonId).toBe(expectedLessons[index])
      })
    })

    it("should advance to next module in phase even if previous lesson was not completed", () => {
      // Day 1: no_contact module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("no_contact-1")

      // Don't mark as completed - simulate user not completing it

      // Day 2: should still advance to next module in phase 1
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("stabilize-1")
    })

    it("should exclude completed lessons from selection", () => {
      // Mark no_contact-1 as completed
      mockIsCompleted.mockImplementation((lessonId: string) => lessonId === "no_contact-1")

      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      // Should skip no_contact-1 and select no_contact-2
      expect(lessonId).toBe("no_contact-2")
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
        expect(lessonId).not.toBe("special_cases-1")
        expect(lessonId).not.toBeNull()
      })
    })

    it("should skip modules with no uncompleted lessons within the phase", () => {
      // Mark all body_downshift lessons as completed
      mockIsCompleted.mockImplementation((lessonId: string) =>
        lessonId.startsWith("body_downshift"),
      )

      // Day 1: no_contact module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("no_contact-1")

      // Day 2: stabilize module
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("stabilize-1")

      // Day 3: should skip body_downshift (all completed) and go to cognitive_aid
      currentDate = new Date("2024-01-03T10:00:00Z")
      const day3Lesson = DailyLessonManager.getTodaysLesson()
      expect(day3Lesson).toBe("cognitive_aid-1")
    })

    it("should return null if all modules have no uncompleted lessons", () => {
      // Mark all lessons as completed
      mockIsCompleted.mockImplementation(() => true)

      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      expect(lessonId).toBeNull()
    })

    it("should track lesson indices within each module correctly", () => {
      // Day 1: no_contact-1
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("no_contact-1")

      // Day 2: stabilize-1
      currentDate = new Date("2024-01-02T10:00:00Z")
      DailyLessonManager.getTodaysLesson()

      // Day 3: body_downshift-1
      currentDate = new Date("2024-01-03T10:00:00Z")
      DailyLessonManager.getTodaysLesson()

      // Day 4: cognitive_aid-1
      currentDate = new Date("2024-01-04T10:00:00Z")
      DailyLessonManager.getTodaysLesson()

      // Day 5: no_contact-2 (second lesson in no_contact module, cycles back)
      currentDate = new Date("2024-01-05T10:00:00Z")
      const day5Lesson = DailyLessonManager.getTodaysLesson()
      expect(day5Lesson).toBe("no_contact-2")

      // Verify the state was saved correctly
      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(1)
      expect(state.moduleLessonIndices).toEqual({
        no_contact: 2,
        stabilize: 1,
        body_downshift: 1,
        cognitive_aid: 1,
      })
    })

    it("should return the same lesson for the same day if already selected", () => {
      currentDate = new Date("2024-01-01T10:00:00Z")

      // First call
      const lesson1 = DailyLessonManager.getTodaysLesson()
      expect(lesson1).toBe("no_contact-1")

      // Second call on same day should return same lesson
      const lesson2 = DailyLessonManager.getTodaysLesson()
      expect(lesson2).toBe("no_contact-1")

      // Should only set once
      expect(ganon.set).toHaveBeenCalledTimes(1)
    })

    it("should handle round-robin within phase 1 modules when cycling back", () => {
      // Go through all phase 1 modules once (no_contact, stabilize, body_downshift, cognitive_aid)
      const phase1Modules = ["no_contact", "stabilize", "body_downshift", "cognitive_aid"]
      const dates = phase1Modules.map(
        (_, i) => new Date(`2024-01-${String(i + 1).padStart(2, "0")}T10:00:00Z`),
      )

      dates.forEach((date) => {
        currentDate = date
        DailyLessonManager.getTodaysLesson()
      })

      // Next day should cycle back to first module in phase 1 (no_contact) and select second lesson
      currentDate = new Date("2024-01-05T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      // Should be second lesson from no_contact module
      expect(lessonId).toBe("no_contact-2")
    })

    it("should only advance to phase 2 when phase 1 is complete", () => {
      // Complete all phase 1 lessons
      mockIsCompleted.mockImplementation((lessonId: string) => {
        return (
          lessonId.startsWith("no_contact") ||
          lessonId.startsWith("stabilize") ||
          lessonId.startsWith("body_downshift") ||
          lessonId.startsWith("cognitive_aid")
        )
      })

      // Day 1: Should start with phase 2 (attachment) since phase 1 is complete
      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = DailyLessonManager.getTodaysLesson()

      expect(lessonId).toBe("attachment-1")

      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(2)
    })

    it("should round-robin through phase 2 modules after phase 1 is complete", () => {
      // Complete all phase 1 lessons
      mockIsCompleted.mockImplementation((lessonId: string) => {
        return (
          lessonId.startsWith("no_contact") ||
          lessonId.startsWith("stabilize") ||
          lessonId.startsWith("body_downshift") ||
          lessonId.startsWith("cognitive_aid")
        )
      })

      // Day 1: attachment-1 (first in phase 2)
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = DailyLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("attachment-1")

      // Day 2: identity-1 (second in phase 2)
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = DailyLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("identity-1")

      // Day 3: attachment-2 (cycles back to first module in phase 2)
      currentDate = new Date("2024-01-03T10:00:00Z")
      const day3Lesson = DailyLessonManager.getTodaysLesson()
      expect(day3Lesson).toBe("attachment-2")

      const state = ganon.get(STORAGE_KEYS.dailyLesson) as IDailyLessonState
      expect(state.currentPhase).toBe(2)
    })
  })
})
