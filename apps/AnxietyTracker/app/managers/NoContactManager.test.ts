import NoContactManager from "./NoContactManager"
import { NoContactGoal } from "@/types/INoContactData"

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

jest.mock("@/utils/Log", () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
  },
}))

describe("NoContactManager - Time Display Formatting", () => {
  let ganon: { get: jest.Mock; set: jest.Mock }
  const MS_PER_DAY = 24 * 60 * 60 * 1000

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
  })

  const createNoContactData = (
    daysAgo: number,
    currentGoal: NoContactGoal = NoContactGoal.OneMonth,
  ) => {
    const now = Date.now()
    const lastContacted = now - daysAgo * MS_PER_DAY
    return {
      lastContacted,
      timesContacted: 0,
      currentGoal,
    }
  }

  describe("formatTimeDisplay (via calculateDisplay)", () => {
    it("should show '0 days' for less than 1 day", () => {
      const data = createNoContactData(0.5) // 12 hours ago
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("0 days")
      expect(result?.timeDisplay.primaryLabel).toBe("days")
      expect(result?.timeDisplay.secondary).toBeUndefined()
    })

    it("should show days for less than 7 days", () => {
      const data = createNoContactData(3) // 3 days ago
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("3 days")
      expect(result?.timeDisplay.primaryLabel).toBe("days")
      expect(result?.timeDisplay.secondary).toBeUndefined()
    })

    it("should show singular 'day' for 1 day", () => {
      const data = createNoContactData(1)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("1 day")
    })

    it("should show weeks and days for less than 4 weeks", () => {
      const data = createNoContactData(10) // 1 week 3 days
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toContain("week")
      expect(result?.timeDisplay.primaryLabel).toBe("weeks")
      expect(result?.timeDisplay.secondary).toBeDefined()
      expect(result?.timeDisplay.secondaryLabel).toBe("days")
    })

    it("should show singular 'week' for 1 week", () => {
      const data = createNoContactData(7)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("1 week")
    })

    it("should show months and days for less than 335 days", () => {
      const data = createNoContactData(60) // 2 months
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toContain("month")
      expect(result?.timeDisplay.primaryLabel).toBe("months")
    })

    it("should show singular 'month' for 1 month", () => {
      const data = createNoContactData(30)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("1 month")
    })

    it("should show '11 months X days' for 335-364 days (avoiding '12 months' display)", () => {
      // Test at 335 days (the threshold)
      const data335 = createNoContactData(335)
      ganon.set("noContactData", data335)

      const result335 = NoContactManager.calculateDisplay()
      expect(result335).toBeDefined()
      expect(result335?.timeDisplay.primary).toBe("11 months")
      expect(result335?.timeDisplay.primaryLabel).toBe("months")
      expect(result335?.timeDisplay.secondary).toBeDefined() // Should have remaining days

      // Test at 363 days (close to 1 year, like in the screenshot)
      const data363 = createNoContactData(363)
      ganon.set("noContactData", data363)

      const result363 = NoContactManager.calculateDisplay()
      expect(result363).toBeDefined()
      expect(result363?.timeDisplay.primary).toBe("11 months")
      expect(result363?.timeDisplay.primaryLabel).toBe("months")
      // Should show remaining days (363 - 330 = 33 days)
      expect(result363?.timeDisplay.secondary).toBe("33 days")
    })

    it("should show '1 year' at exactly 365 days", () => {
      const data = createNoContactData(365)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("1 year")
      expect(result?.timeDisplay.primaryLabel).toBe("years")
    })

    it("should show '1 year' with days for more than 365 days", () => {
      const data = createNoContactData(400) // 1 year and 35 days
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("1 year")
      expect(result?.timeDisplay.primaryLabel).toBe("years")
      expect(result?.timeDisplay.secondary).toBeDefined()
      expect(result?.timeDisplay.secondaryLabel).toBe("days")
      // 400 - 365 = 35 days
      expect(result?.timeDisplay.secondary).toBe("35 days")
    })

    it("should show '2 years' at 2 years", () => {
      const data = createNoContactData(730) // 2 years
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("2 years")
      expect(result?.timeDisplay.primaryLabel).toBe("years")
    })

    it("should show '2 years' with days for more than 2 years", () => {
      const data = createNoContactData(800) // 2 years and 70 days
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("2 years")
      expect(result?.timeDisplay.primaryLabel).toBe("years")
      expect(result?.timeDisplay.secondary).toBeDefined()
      expect(result?.timeDisplay.secondaryLabel).toBe("days")
      // 800 - 730 = 70 days
      expect(result?.timeDisplay.secondary).toBe("70 days")
    })

    it("should show '3 years' at 3 years", () => {
      const data = createNoContactData(1095) // 3 years
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      expect(result?.timeDisplay.primary).toBe("3 years")
      expect(result?.timeDisplay.primaryLabel).toBe("years")
    })

    it("should never show '12 months' when approaching 1 year", () => {
      // Test various days between 335-365 to ensure we never see "12 months"
      for (let days = 335; days < 365; days++) {
        const data = createNoContactData(days)
        ganon.set("noContactData", data)

        const result = NoContactManager.calculateDisplay()
        expect(result).toBeDefined()
        expect(result?.timeDisplay.primary).not.toContain("12 months")
        // Should show "11 months" instead
        if (days < 365) {
          expect(result?.timeDisplay.primary).toBe("11 months")
        }
      }
    })

    it("should handle edge case at 334 days (just before threshold)", () => {
      const data = createNoContactData(334)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      // Should still show months (not yet at 335 threshold)
      expect(result?.timeDisplay.primaryLabel).toBe("months")
      expect(result?.timeDisplay.primary).toContain("month")
    })

    it("should handle edge case at 335 days (at threshold)", () => {
      const data = createNoContactData(335)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      // Should switch to "11 months" display
      expect(result?.timeDisplay.primary).toBe("11 months")
      expect(result?.timeDisplay.primaryLabel).toBe("months")
    })

    it("should handle edge case at 364 days (just before 1 year)", () => {
      const data = createNoContactData(364)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      // Should show "11 months" with remaining days
      expect(result?.timeDisplay.primary).toBe("11 months")
      expect(result?.timeDisplay.primaryLabel).toBe("months")
      expect(result?.timeDisplay.secondary).toBeDefined()
    })

    it("should handle edge case at 366 days (just after 1 year)", () => {
      const data = createNoContactData(366)
      ganon.set("noContactData", data)

      const result = NoContactManager.calculateDisplay()
      expect(result).toBeDefined()
      // Should show "1 year" with remaining days
      expect(result?.timeDisplay.primary).toBe("1 year")
      expect(result?.timeDisplay.primaryLabel).toBe("years")
      expect(result?.timeDisplay.secondary).toBe("1 day")
      expect(result?.timeDisplay.secondaryLabel).toBe("days")
    })
  })

  describe("Goal progression", () => {
    it("should select appropriate goal based on elapsed time", () => {
      // Test various time points
      // Note: The goal selection finds the smallest goal LARGER than elapsed time
      // So 1 day elapsed selects OneWeek (next goal), not OneDay
      const testCases = [
        { days: 0.5, expectedGoal: NoContactGoal.OneDay }, // Less than 1 day -> OneDay
        { days: 1, expectedGoal: NoContactGoal.OneWeek }, // 1 day -> OneWeek (next goal)
        { days: 7, expectedGoal: NoContactGoal.TwoWeeks }, // 7 days -> TwoWeeks (next goal)
        { days: 14, expectedGoal: NoContactGoal.OneMonth }, // 14 days -> OneMonth (next goal)
        { days: 30, expectedGoal: NoContactGoal.TwoMonths }, // 30 days -> TwoMonths (next goal)
        { days: 60, expectedGoal: NoContactGoal.ThreeMonths }, // 60 days -> ThreeMonths (next goal)
        { days: 90, expectedGoal: NoContactGoal.FourMonths }, // 90 days -> FourMonths (next goal)
        { days: 120, expectedGoal: NoContactGoal.FiveMonths }, // 120 days -> FiveMonths (next goal)
        { days: 150, expectedGoal: NoContactGoal.SixMonths }, // 150 days -> SixMonths (next goal)
        { days: 180, expectedGoal: NoContactGoal.OneYear }, // 180 days -> OneYear (next goal)
        { days: 365, expectedGoal: NoContactGoal.TwoYears }, // 365 days -> TwoYears (next goal)
        { days: 730, expectedGoal: NoContactGoal.ThreeYears }, // 730 days -> ThreeYears (next goal)
        { days: 1095, expectedGoal: NoContactGoal.FourYears }, // 1095 days -> FourYears (next goal)
        { days: 1460, expectedGoal: NoContactGoal.FiveYears }, // 1460 days -> FiveYears (next goal)
        { days: 1825, expectedGoal: NoContactGoal.FiveYears }, // 1825 days -> FiveYears (max goal)
      ]

      testCases.forEach(({ days, expectedGoal }) => {
        const data = createNoContactData(days, NoContactGoal.OneDay)
        ganon.set("noContactData", data)

        const result = NoContactManager.calculateDisplay()
        expect(result?.currentGoal).toBe(expectedGoal)
      })
    })
  })
})
