import { ganon } from "@/services/ganon/ganon"
import INoContactData, { NoContactGoal } from "@/types/INoContactData"
import Log from "@/utils/Log"

interface TimeDisplay {
  primary: string // e.g., "20d", "2w", "1m"
  secondary?: string // e.g., "5h 12m", "3d", "2w"
  primaryLabel: string // e.g., "days", "weeks", "months"
  secondaryLabel?: string
}

interface ProgressData {
  progress: number // 0 to 1
  timeDisplay: TimeDisplay
  currentGoal: NoContactGoal
  goalDuration: number // in milliseconds
  timeRemaining: number // in milliseconds
  timeElapsed: number // in milliseconds
}

export default class NoContactManager {
  private static readonly GOAL_DURATIONS: Record<NoContactGoal, number> = {
    [NoContactGoal.OneDay]: 1 * 24 * 60 * 60 * 1000,
    [NoContactGoal.OneWeek]: 7 * 24 * 60 * 60 * 1000,
    [NoContactGoal.TwoWeeks]: 14 * 24 * 60 * 60 * 1000,
    [NoContactGoal.OneMonth]: 30 * 24 * 60 * 60 * 1000,
    [NoContactGoal.TwoMonths]: 60 * 24 * 60 * 60 * 1000,
    [NoContactGoal.ThreeMonths]: 90 * 24 * 60 * 60 * 1000,
    [NoContactGoal.FourMonths]: 120 * 24 * 60 * 60 * 1000,
    [NoContactGoal.FiveMonths]: 150 * 24 * 60 * 60 * 1000,
    [NoContactGoal.SixMonths]: 180 * 24 * 60 * 60 * 1000,
    [NoContactGoal.OneYear]: 365 * 24 * 60 * 60 * 1000,
    [NoContactGoal.TwoYears]: 2 * 365 * 24 * 60 * 60 * 1000,
    [NoContactGoal.ThreeYears]: 3 * 365 * 24 * 60 * 60 * 1000,
    [NoContactGoal.FourYears]: 4 * 365 * 24 * 60 * 60 * 1000,
    [NoContactGoal.FiveYears]: 5 * 365 * 24 * 60 * 60 * 1000,
  }

  /**
   * Get current no contact data from storage
   */
  static getNoContactData(): INoContactData | undefined {
    return ganon.get("noContactData")
  }

  /**
   * Initialize default no contact data if it doesn't exist
   */
  static initializeNoContactData(): void {
    const existing = this.getNoContactData()
    if (!existing) {
      const defaultData: INoContactData = {
        lastContacted: Date.now(),
        timesContacted: 0,
        currentGoal: NoContactGoal.OneMonth,
      }
      ganon.set("noContactData", defaultData)
      Log.info("NoContactManager: Initialized default no contact data")
    }
  }

  /**
   * Find the smallest goal that is larger than the elapsed time
   */
  private static findAppropriateGoal(timeElapsed: number): NoContactGoal {
    const goalOrder = [
      NoContactGoal.OneDay,
      NoContactGoal.OneWeek,
      NoContactGoal.TwoWeeks,
      NoContactGoal.OneMonth,
      NoContactGoal.TwoMonths,
      NoContactGoal.ThreeMonths,
      NoContactGoal.FourMonths,
      NoContactGoal.FiveMonths,
      NoContactGoal.SixMonths,
      NoContactGoal.OneYear,
      NoContactGoal.TwoYears,
      NoContactGoal.ThreeYears,
      NoContactGoal.FourYears,
      NoContactGoal.FiveYears,
    ]

    // Find the smallest goal that is larger than elapsed time
    for (const goal of goalOrder) {
      const goalDuration = this.GOAL_DURATIONS[goal]
      if (timeElapsed < goalDuration) {
        return goal
      }
    }

    // If elapsed time exceeds all goals, return the largest goal
    return NoContactGoal.FiveYears
  }

  /**
   * Calculate what should be displayed based on the elapsed time
   */
  static calculateDisplay(): ProgressData | null {
    const data = this.getNoContactData()
    if (!data) {
      return null
    }

    const now = Date.now()
    const timeElapsed = now - data.lastContacted

    // Find the appropriate goal based on elapsed time (smallest goal larger than elapsed time)
    const appropriateGoal = this.findAppropriateGoal(timeElapsed)
    const goalDuration = this.GOAL_DURATIONS[appropriateGoal]

    // Update the stored goal if it changed
    if (appropriateGoal !== data.currentGoal) {
      this.updateGoal(appropriateGoal)
    }

    const progress = Math.min(timeElapsed / goalDuration, 1)
    const timeRemaining = Math.max(goalDuration - timeElapsed, 0)

    // Calculate how to display the time
    const timeDisplay = this.formatTimeDisplay(timeElapsed, goalDuration)

    return {
      progress,
      timeDisplay,
      currentGoal: appropriateGoal,
      goalDuration,
      timeRemaining,
      timeElapsed,
    }
  }

  /**
   * Format time display based on elapsed time and goal duration
   */
  private static formatTimeDisplay(timeElapsed: number, _goalDuration: number): TimeDisplay {
    const days = timeElapsed / (24 * 60 * 60 * 1000)
    const weeks = timeElapsed / (7 * 24 * 60 * 60 * 1000)
    const months = timeElapsed / (30 * 24 * 60 * 60 * 1000)
    const years = timeElapsed / (365 * 24 * 60 * 60 * 1000)

    // Day is the smallest unit: if less than a day, show 0 days
    if (days < 1) {
      return {
        primary: "0 days",
        primaryLabel: "days",
      }
    }

    // If less than a week, show whole days only
    if (days < 7) {
      const wholeDays = Math.floor(days)
      const daysLabel = wholeDays === 1 ? "day" : "days"

      return {
        primary: `${wholeDays} ${daysLabel}`,
        primaryLabel: "days",
      }
    }

    // If less than a month, show weeks and remaining days
    if (weeks < 4) {
      const wholeWeeks = Math.floor(weeks)
      const remainingDays = Math.floor((weeks - wholeWeeks) * 7)

      const weeksLabel = wholeWeeks === 1 ? "week" : "weeks"
      const daysLabel = remainingDays === 1 ? "day" : "days"

      return {
        primary: `${wholeWeeks} ${weeksLabel}`,
        secondary: remainingDays > 0 ? `${remainingDays} ${daysLabel}` : undefined,
        primaryLabel: "weeks",
        secondaryLabel: remainingDays > 0 ? "days" : undefined,
      }
    }

    // If less than 335 days (approximately 11.2 months), show months and remaining days
    // Once we reach 335 days, switch to years to avoid confusing "12 months" displays
    // This ensures that when approaching 1 year goal, we show years instead of "12 months X days"
    if (days < 335) {
      const wholeMonths = Math.floor(months)
      const remainingDays = Math.floor((months - wholeMonths) * 30)

      const monthsLabel = wholeMonths === 1 ? "month" : "months"
      const daysLabel = remainingDays === 1 ? "day" : "days"

      return {
        primary: `${wholeMonths} ${monthsLabel}`,
        secondary: remainingDays > 0 ? `${remainingDays} ${daysLabel}` : undefined,
        primaryLabel: "months",
        secondaryLabel: remainingDays > 0 ? "days" : undefined,
      }
    }

    // Show years and remaining months
    const wholeYears = Math.floor(years)

    // If we don't have a full year yet (between 335-365 days), show as "11 months X days"
    // to avoid confusing "12 months" display
    if (wholeYears === 0) {
      const cappedMonths = 11
      const remainingDays = Math.floor(days - cappedMonths * 30)
      const daysLabel = remainingDays === 1 ? "day" : "days"

      return {
        primary: `${cappedMonths} months`,
        secondary: remainingDays > 0 ? `${remainingDays} ${daysLabel}` : undefined,
        primaryLabel: "months",
        secondaryLabel: remainingDays > 0 ? "days" : undefined,
      }
    }

    // Calculate remaining days after whole years
    const daysInWholeYears = wholeYears * 365
    const remainingDays = Math.floor(days - daysInWholeYears)

    const yearsLabel = wholeYears === 1 ? "year" : "years"
    const daysLabel = remainingDays === 1 ? "day" : "days"

    return {
      primary: `${wholeYears} ${yearsLabel}`,
      secondary: remainingDays > 0 ? `${remainingDays} ${daysLabel}` : undefined,
      primaryLabel: "years",
      secondaryLabel: remainingDays > 0 ? "days" : undefined,
    }
  }

  /**
   * Reset the streak if the user made contact and increment times contacted
   */
  static resetStreak(): void {
    const data = this.getNoContactData()
    if (!data) {
      this.initializeNoContactData()
      return
    }

    const updatedData: INoContactData = {
      lastContacted: Date.now(),
      timesContacted: data.timesContacted + 1,
      currentGoal: data.currentGoal,
    }

    ganon.set("noContactData", updatedData)
    Log.info(`NoContactManager: Reset streak. Total contacts: ${updatedData.timesContacted}`)
  }

  /**
   * Update the current goal
   */
  static updateGoal(newGoal: NoContactGoal): void {
    const data = this.getNoContactData()
    if (!data) {
      this.initializeNoContactData()
      return
    }

    const updatedData: INoContactData = {
      ...data,
      currentGoal: newGoal,
    }

    ganon.set("noContactData", updatedData)
    Log.info(`NoContactManager: Updated goal to ${NoContactGoal[newGoal]}`)
  }

  /**
   * Get the goal name as a string
   */
  static getGoalName(goal: NoContactGoal): string {
    return NoContactGoal[goal]
  }

  /**
   * Get the goal duration in milliseconds
   */
  static getGoalDuration(goal: NoContactGoal): number {
    return this.GOAL_DURATIONS[goal]
  }

  /**
   * Get formatted time remaining for display
   */
  static getTimeRemainingDisplay(): string | null {
    const progressData = this.calculateDisplay()
    if (!progressData) {
      return null
    }

    const daysRemaining = Math.floor(progressData.timeRemaining / (24 * 60 * 60 * 1000))

    if (daysRemaining <= 0) {
      return "less than 1 day"
    }
    if (daysRemaining === 1) {
      return "1 day"
    }
    return `${daysRemaining} days`
  }

  /**
   * Get goal description for display
   */
  static getGoalDisplayName(goal: NoContactGoal): string {
    switch (goal) {
      case NoContactGoal.OneDay:
        return "1 day"
      case NoContactGoal.OneWeek:
        return "1 week"
      case NoContactGoal.TwoWeeks:
        return "2 weeks"
      case NoContactGoal.OneMonth:
        return "1 month"
      case NoContactGoal.TwoMonths:
        return "2 months"
      case NoContactGoal.ThreeMonths:
        return "3 months"
      case NoContactGoal.FourMonths:
        return "4 months"
      case NoContactGoal.FiveMonths:
        return "5 months"
      case NoContactGoal.SixMonths:
        return "6 months"
      case NoContactGoal.OneYear:
        return "1 year"
      case NoContactGoal.TwoYears:
        return "2 years"
      case NoContactGoal.ThreeYears:
        return "3 years"
      case NoContactGoal.FourYears:
        return "4 years"
      case NoContactGoal.FiveYears:
        return "5 years"
      default:
        return "1 month"
    }
  }

  /**
   * Update the last contacted date
   */
  static updateLastContactedDate(newDate: Date): void {
    const data = this.getNoContactData()
    if (!data) {
      const defaultData: INoContactData = {
        lastContacted: newDate.getTime(),
        timesContacted: 0,
        currentGoal: NoContactGoal.OneMonth,
      }
      ganon.set("noContactData", defaultData)
      Log.info(
        `NoContactManager: Initialized and set last contacted date to ${newDate.toISOString()}`,
      )
      return
    }

    const updatedData: INoContactData = {
      ...data,
      lastContacted: newDate.getTime(),
    }

    ganon.set("noContactData", updatedData)
    Log.info(`NoContactManager: Updated last contacted date to ${newDate.toISOString()}`)
  }
}
