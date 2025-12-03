import AwardManager from "./AwardManager"
import { IAwardData } from "@/types/IAwardData"
import { AWARD_SEQUENCE } from "@/data/AwardSequence"

// Mock dependencies
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

jest.mock("@/managers/LessonManager", () => ({
  __esModule: true,
  default: {
    getCompletedLessons: jest.fn(() => []),
  },
}))

jest.mock("@/utils/Log", () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
  },
}))

describe("AwardManager", () => {
  let ganon: { get: jest.Mock; set: jest.Mock }
  let LessonManager: { getCompletedLessons: jest.Mock }

  beforeEach(() => {
    jest.clearAllMocks()

    // Get the mocked ganon and reset its storage
    const ganonModule = require("@/services/ganon/ganon")
    ganon = ganonModule.ganon

    // Get the mocked LessonManager
    const lessonManagerModule = require("@/managers/LessonManager")
    LessonManager = lessonManagerModule.default

    // Reset storage by creating a fresh storage object
    const freshStorage: Record<string, any> = {}
    ganon.get.mockImplementation((key: string) => freshStorage[key])
    ganon.set.mockImplementation((key: string, value: any) => {
      freshStorage[key] = value
    })

    // Reset completed lessons
    LessonManager.getCompletedLessons.mockReturnValue([])
  })

  describe("shouldAwardOnFirstTwoLessons", () => {
    it("should return true for first lesson completion with no awards", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", { earnedAwardIds: [], lastAwardDate: 0 })

      const result = AwardManager.shouldAwardOnFirstTwoLessons()
      expect(result).toBe(true)
    })

    it("should return true for second lesson completion with one award", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.shouldAwardOnFirstTwoLessons()
      expect(result).toBe(true)
    })

    it("should return false for first lesson if award already given", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.shouldAwardOnFirstTwoLessons()
      expect(result).toBe(false)
    })

    it("should return false for second lesson if two awards already given", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.shouldAwardOnFirstTwoLessons()
      expect(result).toBe(false)
    })

    it("should return false for third lesson completion", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.shouldAwardOnFirstTwoLessons()
      expect(result).toBe(false)
    })
  })

  describe("checkAwardAvailability", () => {
    beforeEach(() => {
      // Mock Math.random to be deterministic for testing
      jest.spyOn(Math, "random").mockReturnValue(0.6) // 60% - above 50% threshold
    })

    afterEach(() => {
      jest.spyOn(Math, "random").mockRestore()
    })

    it("should return true for first lesson completion", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", { earnedAwardIds: [], lastAwardDate: 0 })

      const result = AwardManager.checkAwardAvailability()
      expect(result).toBe(true)
    })

    it("should return true for second lesson completion", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.checkAwardAvailability()
      expect(result).toBe(true)
    })

    it("should return false if less than 2 lessons completed", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
      })

      const result = AwardManager.checkAwardAvailability()
      expect(result).toBe(false)
    })

    it("should return false if less than 3 days since last award", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      })

      const result = AwardManager.checkAwardAvailability()
      expect(result).toBe(false)
    })

    it("should return false if all awards are earned", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: AWARD_SEQUENCE.map((a) => a.id),
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000,
      })

      const result = AwardManager.checkAwardAvailability()
      expect(result).toBe(false)
    })

    it("should return true if all requirements met and random chance succeeds", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
      })

      jest.spyOn(Math, "random").mockReturnValue(0.3) // 30% - below 50% threshold

      const result = AwardManager.checkAwardAvailability()
      expect(result).toBe(true)
    })

    it("should return false if all requirements met but random chance fails", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
      })

      jest.spyOn(Math, "random").mockReturnValue(0.6) // 60% - above 50% threshold

      const result = AwardManager.checkAwardAvailability()
      expect(result).toBe(false)
    })
  })

  describe("getNextAward", () => {
    it("should return first award for first lesson completion", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", { earnedAwardIds: [], lastAwardDate: 0 })

      const result = AwardManager.getNextAward()
      expect(result).toEqual(AWARD_SEQUENCE[0])
    })

    it("should return second award for second lesson completion", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.getNextAward()
      expect(result).toEqual(AWARD_SEQUENCE[1])
    })

    it("should return null if all awards are earned", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: AWARD_SEQUENCE.map((a) => a.id),
        lastAwardDate: 0,
      })

      const result = AwardManager.getNextAward()
      expect(result).toBeNull()
    })

    it("should return null if deterministic requirements not met", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000,
      })

      const result = AwardManager.getNextAward()
      expect(result).toBeNull()
    })

    it("should return next award if requirements are met", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
      })

      const result = AwardManager.getNextAward()
      expect(result).toEqual(AWARD_SEQUENCE[2])
    })
  })

  describe("award", () => {
    it("should award first award on first lesson completion", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", { earnedAwardIds: [], lastAwardDate: 0 })

      const result = AwardManager.award()
      expect(result).toEqual(AWARD_SEQUENCE[0])

      const awardData = ganon.get("awardData") as IAwardData
      expect(awardData.earnedAwardIds).toHaveLength(1)
      expect(awardData.earnedAwardIds[0]).toBe(AWARD_SEQUENCE[0].id)
      expect(awardData.lastAwardDate).toBeGreaterThan(0)
    })

    it("should award second award on second lesson completion", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.award()
      expect(result).toEqual(AWARD_SEQUENCE[1])

      const awardData = ganon.get("awardData") as IAwardData
      expect(awardData.earnedAwardIds).toHaveLength(2)
      expect(awardData.earnedAwardIds[1]).toBe(AWARD_SEQUENCE[1].id)
    })

    it("should not award if availability check fails", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      })

      const result = AwardManager.award()
      expect(result).toBeNull()
    })

    it("should award when skipping availability check if requirements are met", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
      })

      const result = AwardManager.award(true) // Skip availability check
      expect(result).toEqual(AWARD_SEQUENCE[2])

      const awardData = ganon.get("awardData") as IAwardData
      expect(awardData.earnedAwardIds).toHaveLength(3)
    })

    it("should not award when skipping availability check if requirements not met", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000,
      })

      const result = AwardManager.award(true) // Skip availability check
      expect(result).toBeNull()
    })

    it("should return null if all awards are earned", () => {
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2"])
      ganon.set("awardData", {
        earnedAwardIds: AWARD_SEQUENCE.map((a) => a.id),
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000,
      })

      const result = AwardManager.award(true)
      expect(result).toBeNull()
    })
  })

  describe("duplicate prevention", () => {
    it("should prevent duplicate awards when sequence is reordered", () => {
      // Simulate a user who earned awards in old order: [sneakers, green-thumb]
      // But now green-thumb is at index 2 in the sequence
      // User has 2 awards, so expectedIndex = 2
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[2].id], // sneakers (0), green-thumb (2)
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000,
      })

      // Should not award green-thumb (index 2) again - should find next unearned from index 2
      // Since index 2 is already earned, it will find index 3 (back-pack)
      const result = AwardManager.award(true)
      expect(result).not.toBeNull()
      expect(result?.id).not.toBe("green-thumb") // Should not duplicate
      expect(result?.id).not.toBe("sneakers") // Should not duplicate

      const awardData = ganon.get("awardData") as IAwardData
      expect(awardData.earnedAwardIds).toHaveLength(3)
      expect(awardData.earnedAwardIds).toContain("sneakers")
      expect(awardData.earnedAwardIds).toContain("green-thumb")
      // Should not have duplicates
      expect(new Set(awardData.earnedAwardIds).size).toBe(3)
    })

    it("should find unearned award from beginning if needed", () => {
      // User has awards from later in sequence but missing early ones
      LessonManager.getCompletedLessons.mockReturnValue(["lesson1", "lesson2", "lesson3"])
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[2].id, AWARD_SEQUENCE[3].id], // green-thumb, back-pack
        lastAwardDate: Date.now() - 4 * 24 * 60 * 60 * 1000,
      })

      // Should find and award sneakers (index 0) or miracle-legumes (index 1)
      const result = AwardManager.award(true)
      expect(result).toBeTruthy()
      expect(result?.id).not.toBe("green-thumb")
      expect(result?.id).not.toBe("back-pack")
    })
  })

  describe("getEarnedAwards", () => {
    it("should return empty array when no awards earned", () => {
      ganon.set("awardData", { earnedAwardIds: [], lastAwardDate: 0 })

      const result = AwardManager.getEarnedAwards()
      expect(result).toEqual([])
    })

    it("should return earned awards in sequence order", () => {
      ganon.set("awardData", {
        earnedAwardIds: [AWARD_SEQUENCE[0].id, AWARD_SEQUENCE[2].id, AWARD_SEQUENCE[1].id],
        lastAwardDate: 0,
      })

      const result = AwardManager.getEarnedAwards()
      expect(result).toHaveLength(3)
      // Should be in sequence order, not the order they were earned
      expect(result[0]).toEqual(AWARD_SEQUENCE[0])
      expect(result[1]).toEqual(AWARD_SEQUENCE[1])
      expect(result[2]).toEqual(AWARD_SEQUENCE[2])
    })

    it("should return all awards when all are earned", () => {
      ganon.set("awardData", {
        earnedAwardIds: AWARD_SEQUENCE.map((a) => a.id),
        lastAwardDate: 0,
      })

      const result = AwardManager.getEarnedAwards()
      expect(result).toHaveLength(AWARD_SEQUENCE.length)
      expect(result).toEqual(AWARD_SEQUENCE)
    })
  })

  describe("getAllAwards", () => {
    it("should return all awards in sequence", () => {
      const result = AwardManager.getAllAwards()
      expect(result).toEqual(AWARD_SEQUENCE)
      expect(result).toHaveLength(AWARD_SEQUENCE.length)
    })
  })
})

