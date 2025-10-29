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
   * Calculate what should be displayed based on the elapsed time
   */
  static calculateDisplay(): ProgressData | null {
    const data = this.getNoContactData()
    if (!data) {
      return null
    }

    const now = Date.now()
    const timeElapsed = now - data.lastContacted
    const goalDuration = this.GOAL_DURATIONS[data.currentGoal]
    const progress = Math.min(timeElapsed / goalDuration, 1)
    const timeRemaining = Math.max(goalDuration - timeElapsed, 0)

    // Calculate how to display the time
    const timeDisplay = this.formatTimeDisplay(timeElapsed, goalDuration)

    return {
      progress,
      timeDisplay,
      currentGoal: data.currentGoal,
      goalDuration,
      timeRemaining,
      timeElapsed,
    }
  }

  /**
   * Format time display based on elapsed time and goal duration
   */
  private static formatTimeDisplay(timeElapsed: number, goalDuration: number): TimeDisplay {
    const days = timeElapsed / (24 * 60 * 60 * 1000)
    const weeks = timeElapsed / (7 * 24 * 60 * 60 * 1000)
    const months = timeElapsed / (30 * 24 * 60 * 60 * 1000)

    // If less than a day, show hours and minutes
    if (days < 1) {
      const totalHours = timeElapsed / (60 * 60 * 1000)
      const hours = Math.floor(totalHours)
      const minutes = Math.floor((totalHours - hours) * 60)

      if (hours === 0) {
        return {
          primary: `${minutes}m`,
          primaryLabel: "minutes",
        }
      }

      return {
        primary: `${hours}h`,
        secondary: minutes > 0 ? `${minutes}m` : undefined,
        primaryLabel: "hours",
        secondaryLabel: "minutes",
      }
    }

    // If less than a week, show days and hours
    if (days < 7) {
      const wholeDays = Math.floor(days)
      const remainingHours = Math.floor((days - wholeDays) * 24)

      return {
        primary: `${wholeDays}d`,
        secondary: remainingHours > 0 ? `${remainingHours}h` : undefined,
        primaryLabel: wholeDays === 1 ? "day" : "days",
        secondaryLabel: remainingHours === 1 ? "hour" : "hours",
      }
    }

    // If less than a month, show weeks and days
    if (weeks < 4) {
      const wholeWeeks = Math.floor(weeks)
      const remainingDays = Math.floor((weeks - wholeWeeks) * 7)

      return {
        primary: `${wholeWeeks}w`,
        secondary: remainingDays > 0 ? `${remainingDays}d` : undefined,
        primaryLabel: wholeWeeks === 1 ? "week" : "weeks",
        secondaryLabel: remainingDays === 1 ? "day" : "days",
      }
    }

    // Show months and days
    const wholeMonths = Math.floor(months)
    const remainingDays = Math.floor((months - wholeMonths) * 30)

    return {
      primary: `${wholeMonths}m`,
      secondary: remainingDays > 0 ? `${remainingDays}d` : undefined,
      primaryLabel: wholeMonths === 1 ? "month" : "months",
      secondaryLabel: remainingDays === 1 ? "day" : "days",
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

    const daysRemaining = Math.ceil(progressData.timeRemaining / (24 * 60 * 60 * 1000))

    if (daysRemaining <= 1) {
      return "less than 1 day"
    } else if (daysRemaining === 1) {
      return "1 day"
    } else {
      return `${daysRemaining} days`
    }
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
      default:
        return "1 month"
    }
  }
}

