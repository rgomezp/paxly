export interface IDailyStreak {
  /**
   * Last date (YYYY-MM-DD in user's local timezone) the user completed
   * any daily task (mood / lesson / journal).
   */
  lastCompletedDateKey: string | null

  /**
   * Current consecutive-days streak for daily task completion.
   */
  current: number

  /**
   * Best (all-time) streak for daily task completion.
   */
  best: number
}

export const DEFAULT_DAILY_STREAK: IDailyStreak = {
  lastCompletedDateKey: null,
  current: 0,
  best: 0,
}

