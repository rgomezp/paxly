import TodaysLessonManager from "./TodaysLessonManager"
import { STORAGE_KEYS } from "@/services/ganon/StorageMapping"
import { MODULE_ORDER } from "@/data/ModuleDisplayNames"
import { ITodaysLessonState } from "@/types/ITodaysLessonState"

// Create mock storage that will be shared
// Note: jest.mock is hoisted, so we need to use a factory function
const mockStorage: Record<string, any> = {}

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

const mockIsCompleted = jest.fn((lessonId: string) => false)

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
    // stabilize module (3 lessons)
    "stabilize-1": { id: "stabilize-1", moduleId: "stabilize", title: "Stabilize 1" },
    "stabilize-2": { id: "stabilize-2", moduleId: "stabilize", title: "Stabilize 2" },
    "stabilize-3": { id: "stabilize-3", moduleId: "stabilize", title: "Stabilize 3" },
    // body_downshift module (2 lessons)
    "body_downshift-1": { id: "body_downshift-1", moduleId: "body_downshift", title: "Body Downshift 1" },
    "body_downshift-2": { id: "body_downshift-2", moduleId: "body_downshift", title: "Body Downshift 2" },
    // cognitive_aid module (2 lessons)
    "cognitive_aid-1": { id: "cognitive_aid-1", moduleId: "cognitive_aid", title: "Cognitive Aid 1" },
    "cognitive_aid-2": { id: "cognitive_aid-2", moduleId: "cognitive_aid", title: "Cognitive Aid 2" },
    // special_cases module (should be excluded)
    "special_cases-1": { id: "special_cases-1", moduleId: "special_cases", title: "Special Cases 1" },
  }
  return {
    LESSONS: mockLessons,
  }
})

describe("TodaysLessonManager", () => {
  let mockGetLocalDateKey: jest.Mock
  let currentDate: Date
  let ganon: { get: jest.Mock; set: jest.Mock }

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    mockIsCompleted.mockImplementation((lessonId: string) => false)

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

  describe("Round-robin module selection", () => {
    it("should select first lesson from first module on first day", () => {
      const lessonId = TodaysLessonManager.getTodaysLesson()

      expect(lessonId).toBe("stabilize-1")
      expect(ganon.set).toHaveBeenCalledWith(
        STORAGE_KEYS.dailyLesson,
        expect.objectContaining({
          dateKey: "2024-01-01",
          lessonId: "stabilize-1",
          moduleIndex: 0,
          moduleLessonIndices: { stabilize: 1 },
        }),
      )
    })

    it("should advance to next module on next day", () => {
      // Day 1: stabilize module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("stabilize-1")

      // Day 2: body_downshift module
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("body_downshift-1")

      expect(ganon.set).toHaveBeenLastCalledWith(
        STORAGE_KEYS.dailyLesson,
        expect.objectContaining({
          dateKey: "2024-01-02",
          lessonId: "body_downshift-1",
          moduleIndex: 1,
          moduleLessonIndices: { stabilize: 1, body_downshift: 1 },
        }),
      )
    })

    it("should cycle through all modules and return to first module", () => {
      const dates = [
        new Date("2024-01-01T10:00:00Z"),
        new Date("2024-01-02T10:00:00Z"),
        new Date("2024-01-03T10:00:00Z"),
        new Date("2024-01-04T10:00:00Z"),
      ]

      const expectedLessons = ["stabilize-1", "body_downshift-1", "cognitive_aid-1", "stabilize-2"]

      dates.forEach((date, index) => {
        currentDate = date
        const lessonId = TodaysLessonManager.getTodaysLesson()
        expect(lessonId).toBe(expectedLessons[index])
      })
    })

    it("should advance to next module even if previous lesson was not completed", () => {
      // Day 1: stabilize module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("stabilize-1")

      // Don't mark as completed - simulate user not completing it

      // Day 2: should still advance to next module
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("body_downshift-1")
    })

    it("should exclude completed lessons from selection", () => {
      // Mark stabilize-1 as completed
      mockIsCompleted.mockImplementation((lessonId: string) => lessonId === "stabilize-1")

      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = TodaysLessonManager.getTodaysLesson()

      // Should skip stabilize-1 and select stabilize-2
      expect(lessonId).toBe("stabilize-2")
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
        const lessonId = TodaysLessonManager.getTodaysLesson()
        expect(lessonId).not.toBe("special_cases-1")
        expect(lessonId).not.toBeNull()
      })
    })

    it("should skip modules with no uncompleted lessons", () => {
      // Mark all body_downshift lessons as completed
      mockIsCompleted.mockImplementation((lessonId: string) =>
        lessonId.startsWith("body_downshift"),
      )

      // Day 1: stabilize module
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("stabilize-1")

      // Day 2: should skip body_downshift (all completed) and go to cognitive_aid
      currentDate = new Date("2024-01-02T10:00:00Z")
      const day2Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day2Lesson).toBe("cognitive_aid-1")
    })

    it("should return null if all modules have no uncompleted lessons", () => {
      // Mark all lessons as completed
      mockIsCompleted.mockImplementation(() => true)

      currentDate = new Date("2024-01-01T10:00:00Z")
      const lessonId = TodaysLessonManager.getTodaysLesson()

      expect(lessonId).toBeNull()
    })

    it("should track lesson indices within each module correctly", () => {
      // Day 1: stabilize-1
      currentDate = new Date("2024-01-01T10:00:00Z")
      const day1Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day1Lesson).toBe("stabilize-1")

      // Day 2: body_downshift-1
      currentDate = new Date("2024-01-02T10:00:00Z")
      TodaysLessonManager.getTodaysLesson()

      // Day 3: cognitive_aid-1
      currentDate = new Date("2024-01-03T10:00:00Z")
      TodaysLessonManager.getTodaysLesson()

      // Day 4: stabilize-2 (second lesson in stabilize module)
      currentDate = new Date("2024-01-04T10:00:00Z")
      const day4Lesson = TodaysLessonManager.getTodaysLesson()
      expect(day4Lesson).toBe("stabilize-2")

      // Verify the state was saved correctly
      const state = ganon.get(STORAGE_KEYS.dailyLesson) as ITodaysLessonState
      expect(state.moduleLessonIndices).toEqual({
        stabilize: 2,
        body_downshift: 1,
        cognitive_aid: 1,
      })
    })

    it("should return the same lesson for the same day if already selected", () => {
      currentDate = new Date("2024-01-01T10:00:00Z")

      // First call
      const lesson1 = TodaysLessonManager.getTodaysLesson()
      expect(lesson1).toBe("stabilize-1")

      // Second call on same day should return same lesson
      const lesson2 = TodaysLessonManager.getTodaysLesson()
      expect(lesson2).toBe("stabilize-1")

      // Should only set once
      expect(ganon.set).toHaveBeenCalledTimes(1)
    })

    it("should handle round-robin within a module when cycling back", () => {
      // Go through all mocked modules once (stabilize, body_downshift, cognitive_aid)
      const mockedModules = ["stabilize", "body_downshift", "cognitive_aid"]
      const dates = mockedModules.map((_, i) => new Date(`2024-01-${String(i + 1).padStart(2, "0")}T10:00:00Z`))

      dates.forEach((date) => {
        currentDate = date
        TodaysLessonManager.getTodaysLesson()
      })

      // Next day should cycle back to first module (stabilize) and select second lesson
      currentDate = new Date("2024-01-04T10:00:00Z")
      const lessonId = TodaysLessonManager.getTodaysLesson()

      // Should be second lesson from stabilize module
      expect(lessonId).toBe("stabilize-2")
    })
  })
})
