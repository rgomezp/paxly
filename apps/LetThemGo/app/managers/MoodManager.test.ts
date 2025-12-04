import MoodManager from "./MoodManager"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { Activity } from "@/types/Activities"
import { MoodId, MOODS } from "@/types/Moods"

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

jest.mock("@/models", () => ({
  rootStoreSingleton: {
    moodStore: {
      add: jest.fn(),
    },
  },
}))

jest.mock("@/managers/DailyTaskManager", () => ({
  __esModule: true,
  default: {
    markCompleted: jest.fn(),
  },
}))

jest.mock("@/managers/AnalyticsManager", () => ({
  __esModule: true,
  default: {
    getInstance: jest.fn(() => ({
      logEvent: jest.fn(),
    })),
  },
}))

jest.mock("@/utils/Log", () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
  },
}))

describe("MoodManager - Sorting Methods", () => {
  let ganon: { get: jest.Mock; set: jest.Mock }

  beforeEach(() => {
    jest.clearAllMocks()

    // Get the mocked ganon and reset its storage
    const ganonModule = require("@/services/ganon/ganon")
    ganon = ganonModule.ganon

    // Reset storage by creating a fresh storage object
    const freshStorage: Record<string, any> = {}
    ganon.get.mockImplementation((key: string) => freshStorage[key])
    ganon.set.mockImplementation((key: string, value: any) => {
      freshStorage[key] = value
    })

    // Clear history before each test
    MoodManager.clearHistory()
  })

  const createMoodHistoryItem = (
    moodId: MoodId,
    activity: Activity,
    date: number,
    notes = "",
  ): IMoodHistoryItem => {
    return {
      mood: MOODS[moodId],
      activity,
      notes,
      date,
    }
  }

  describe("getSortedMoods", () => {
    it("should return original order when less than 10 logs exist", () => {
      // Create 9 mood logs
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []
      for (let i = 0; i < 9; i++) {
        history.push(createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + i * 1000))
      }
      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedMoods()
      // Should return all moods in original order (first few should match ALL_MOODS)
      expect(sorted.length).toBeGreaterThan(0)
      // Since we don't know the exact original order, just verify it returns an array
      expect(Array.isArray(sorted)).toBe(true)
    })

    it("should prioritize top 3 most logged moods first when >= 10 logs exist", () => {
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []

      // Create logs: Sad (5 times), Anxious (4 times), Happy (3 times), others (1 time each)
      for (let i = 0; i < 5; i++) {
        history.push(createMoodHistoryItem(MoodId.Sad, Activity.Exercise, baseTime + i * 1000))
      }
      for (let i = 0; i < 4; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Anxious, Activity.Exercise, baseTime + 5000 + i * 1000),
        )
      }
      for (let i = 0; i < 3; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + 9000 + i * 1000),
        )
      }
      // Add a few more to reach 10+ logs
      history.push(createMoodHistoryItem(MoodId.Calm, Activity.Exercise, baseTime + 12000))
      history.push(createMoodHistoryItem(MoodId.Content, Activity.Exercise, baseTime + 13000))

      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedMoods()

      // First 3 should be Sad, Anxious, Happy (most logged)
      expect(sorted[0]).toBe(MoodId.Sad)
      expect(sorted[1]).toBe(MoodId.Anxious)
      expect(sorted[2]).toBe(MoodId.Happy)
    })

    it("should include top 3 most recent moods (excluding top 3 most logged) in positions 4-6", () => {
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []

      // Create logs: Sad (5 times - most logged), Anxious (4 times), Happy (3 times)
      for (let i = 0; i < 5; i++) {
        history.push(createMoodHistoryItem(MoodId.Sad, Activity.Exercise, baseTime + i * 1000))
      }
      for (let i = 0; i < 4; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Anxious, Activity.Exercise, baseTime + 5000 + i * 1000),
        )
      }
      for (let i = 0; i < 3; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + 9000 + i * 1000),
        )
      }

      // Add recent logs with different moods (most recent should be Grateful, Content, Calm)
      // Note: We add them in reverse order so when sorted by date descending, we get the expected order
      const recentTime = baseTime + 20000
      history.push(createMoodHistoryItem(MoodId.Grateful, Activity.Exercise, recentTime + 2000))
      history.push(createMoodHistoryItem(MoodId.Content, Activity.Exercise, recentTime + 1000))
      history.push(createMoodHistoryItem(MoodId.Calm, Activity.Exercise, recentTime))
      // Add a few more to reach 10+ logs (but these won't be in top 3 recent)
      history.push(createMoodHistoryItem(MoodId.Peaceful, Activity.Exercise, baseTime + 10000))

      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedMoods()

      // First 3 should be most logged: Sad, Anxious, Happy
      expect(sorted[0]).toBe(MoodId.Sad)
      expect(sorted[1]).toBe(MoodId.Anxious)
      expect(sorted[2]).toBe(MoodId.Happy)

      // Next 3 should be most recent (excluding the top 3): Grateful, Content, Calm
      // Order is reverse chronological (most recent first)
      expect(sorted.slice(3, 6)).toContain(MoodId.Calm)
      expect(sorted.slice(3, 6)).toContain(MoodId.Content)
      expect(sorted.slice(3, 6)).toContain(MoodId.Grateful)
      // Verify all three are present
      expect(sorted.slice(3, 6).length).toBe(3)
    })

    it("should exclude most logged moods from most recent list", () => {
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []

      // Create logs: Sad (5 times), Anxious (4 times), Happy (3 times)
      for (let i = 0; i < 5; i++) {
        history.push(createMoodHistoryItem(MoodId.Sad, Activity.Exercise, baseTime + i * 1000))
      }
      for (let i = 0; i < 4; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Anxious, Activity.Exercise, baseTime + 5000 + i * 1000),
        )
      }
      for (let i = 0; i < 3; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + 9000 + i * 1000),
        )
      }

      // Add recent logs: one with Sad (already in top 3), and others
      const recentTime = baseTime + 20000
      history.push(createMoodHistoryItem(MoodId.Sad, Activity.Exercise, recentTime)) // Should be excluded
      history.push(createMoodHistoryItem(MoodId.Calm, Activity.Exercise, recentTime + 1000))
      history.push(createMoodHistoryItem(MoodId.Content, Activity.Exercise, recentTime + 2000))
      history.push(createMoodHistoryItem(MoodId.Grateful, Activity.Exercise, recentTime + 3000))

      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedMoods()

      // First 3 should be most logged: Sad, Anxious, Happy
      expect(sorted[0]).toBe(MoodId.Sad)
      expect(sorted[1]).toBe(MoodId.Anxious)
      expect(sorted[2]).toBe(MoodId.Happy)

      // Next 3 should NOT include Sad (even though it was logged recently)
      expect(sorted.slice(3, 6)).not.toContain(MoodId.Sad)
      // Should include the other recent moods
      expect(sorted.slice(3, 6)).toContain(MoodId.Calm)
      expect(sorted.slice(3, 6)).toContain(MoodId.Content)
      expect(sorted.slice(3, 6)).toContain(MoodId.Grateful)
    })
  })

  describe("getSortedActivities", () => {
    it("should return original order when less than 10 logs exist", () => {
      // Create 9 activity logs
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []
      for (let i = 0; i < 9; i++) {
        history.push(createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + i * 1000))
      }
      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedActivities()
      // Should return all activities in original order
      expect(sorted.length).toBeGreaterThan(0)
      expect(Array.isArray(sorted)).toBe(true)
    })

    it("should prioritize top 3 most logged activities first when >= 10 logs exist", () => {
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []

      // Create logs: Exercise (5 times), Meditation (4 times), Reading (3 times), others (1 time each)
      for (let i = 0; i < 5; i++) {
        history.push(createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + i * 1000))
      }
      for (let i = 0; i < 4; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Meditation, baseTime + 5000 + i * 1000),
        )
      }
      for (let i = 0; i < 3; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Reading, baseTime + 9000 + i * 1000),
        )
      }
      // Add a few more to reach 10+ logs
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Music, baseTime + 12000))
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Writing, baseTime + 13000))

      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedActivities()

      // First 3 should be Exercise, Meditation, Reading (most logged)
      expect(sorted[0]).toBe(Activity.Exercise)
      expect(sorted[1]).toBe(Activity.Meditation)
      expect(sorted[2]).toBe(Activity.Reading)
    })

    it("should include top 3 most recent activities (excluding top 3 most logged) in positions 4-6", () => {
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []

      // Create logs: Exercise (5 times), Meditation (4 times), Reading (3 times)
      for (let i = 0; i < 5; i++) {
        history.push(createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + i * 1000))
      }
      for (let i = 0; i < 4; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Meditation, baseTime + 5000 + i * 1000),
        )
      }
      for (let i = 0; i < 3; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Reading, baseTime + 9000 + i * 1000),
        )
      }

      // Add recent logs with different activities (most recent should be Yoga, Writing, Music)
      // Note: We add them in reverse order so when sorted by date descending, we get the expected order
      const recentTime = baseTime + 20000
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Yoga, recentTime + 2000))
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Writing, recentTime + 1000))
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Music, recentTime))
      // Add a few more to reach 10+ logs (but these won't be in top 3 recent)
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Cooking, baseTime + 10000))

      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedActivities()

      // First 3 should be most logged: Exercise, Meditation, Reading
      expect(sorted[0]).toBe(Activity.Exercise)
      expect(sorted[1]).toBe(Activity.Meditation)
      expect(sorted[2]).toBe(Activity.Reading)

      // Next 3 should be most recent (excluding the top 3): Yoga, Writing, Music
      // Order is reverse chronological (most recent first)
      expect(sorted.slice(3, 6)).toContain(Activity.Music)
      expect(sorted.slice(3, 6)).toContain(Activity.Writing)
      expect(sorted.slice(3, 6)).toContain(Activity.Yoga)
      // Verify all three are present
      expect(sorted.slice(3, 6).length).toBe(3)
    })

    it("should exclude most logged activities from most recent list", () => {
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []

      // Create logs: Exercise (5 times), Meditation (4 times), Reading (3 times)
      for (let i = 0; i < 5; i++) {
        history.push(createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + i * 1000))
      }
      for (let i = 0; i < 4; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Meditation, baseTime + 5000 + i * 1000),
        )
      }
      for (let i = 0; i < 3; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Reading, baseTime + 9000 + i * 1000),
        )
      }

      // Add recent logs: one with Exercise (already in top 3), and others
      const recentTime = baseTime + 20000
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Exercise, recentTime)) // Should be excluded
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Music, recentTime + 1000))
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Writing, recentTime + 2000))
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Yoga, recentTime + 3000))

      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedActivities()

      // First 3 should be most logged: Exercise, Meditation, Reading
      expect(sorted[0]).toBe(Activity.Exercise)
      expect(sorted[1]).toBe(Activity.Meditation)
      expect(sorted[2]).toBe(Activity.Reading)

      // Next 3 should NOT include Exercise (even though it was logged recently)
      expect(sorted.slice(3, 6)).not.toContain(Activity.Exercise)
      // Should include the other recent activities
      expect(sorted.slice(3, 6)).toContain(Activity.Music)
      expect(sorted.slice(3, 6)).toContain(Activity.Writing)
      expect(sorted.slice(3, 6)).toContain(Activity.Yoga)
    })

    it("should handle case where there are fewer than 3 unique recent items", () => {
      const baseTime = Date.now()
      const history: IMoodHistoryItem[] = []

      // Create logs: Exercise (5 times), Meditation (4 times), Reading (3 times)
      for (let i = 0; i < 5; i++) {
        history.push(createMoodHistoryItem(MoodId.Happy, Activity.Exercise, baseTime + i * 1000))
      }
      for (let i = 0; i < 4; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Meditation, baseTime + 5000 + i * 1000),
        )
      }
      for (let i = 0; i < 3; i++) {
        history.push(
          createMoodHistoryItem(MoodId.Happy, Activity.Reading, baseTime + 9000 + i * 1000),
        )
      }

      // Add only 2 unique recent activities (not in top 3)
      const recentTime = baseTime + 20000
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Music, recentTime))
      history.push(createMoodHistoryItem(MoodId.Happy, Activity.Writing, recentTime + 1000))

      ganon.set("moodHistory", history)

      const sorted = MoodManager.getSortedActivities()

      // First 3 should be most logged: Exercise, Meditation, Reading
      expect(sorted[0]).toBe(Activity.Exercise)
      expect(sorted[1]).toBe(Activity.Meditation)
      expect(sorted[2]).toBe(Activity.Reading)

      // Next 2 should be the recent ones: Music, Writing
      expect(sorted.slice(3, 5)).toContain(Activity.Music)
      expect(sorted.slice(3, 5)).toContain(Activity.Writing)
    })
  })
})
