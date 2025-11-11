import { ganon } from "@/services/ganon/ganon"

const FREE_USER_MOOD_LOG_COUNT_KEY = "freeUserMoodLogCount"
const FREE_USER_JOURNAL_LOG_COUNT_KEY = "freeUserJournalLogCount"
const FREE_LIMIT = 2

export default class FreeUserUsageManager {
  /**
   * Gets the current mood log count for free users
   */
  static getMoodLogCount(): number {
    return ganon.get(FREE_USER_MOOD_LOG_COUNT_KEY) ?? 0
  }

  /**
   * Gets the current journal log count for free users
   */
  static getJournalLogCount(): number {
    return ganon.get(FREE_USER_JOURNAL_LOG_COUNT_KEY) ?? 0
  }

  /**
   * Increments the mood log count for free users
   */
  static incrementMoodLogCount(): number {
    const current = this.getMoodLogCount()
    const newCount = current + 1
    ganon.set(FREE_USER_MOOD_LOG_COUNT_KEY, newCount)
    return newCount
  }

  /**
   * Increments the journal log count for free users
   */
  static incrementJournalLogCount(): number {
    const current = this.getJournalLogCount()
    const newCount = current + 1
    ganon.set(FREE_USER_JOURNAL_LOG_COUNT_KEY, newCount)
    return newCount
  }

  /**
   * Checks if free user has reached the mood log limit
   */
  static hasReachedMoodLogLimit(): boolean {
    return this.getMoodLogCount() >= FREE_LIMIT
  }

  /**
   * Checks if free user has reached the journal log limit
   */
  static hasReachedJournalLogLimit(): boolean {
    return this.getJournalLogCount() >= FREE_LIMIT
  }

  /**
   * Resets both counts (useful for testing or if user upgrades)
   */
  static resetCounts(): void {
    ganon.set(FREE_USER_MOOD_LOG_COUNT_KEY, 0)
    ganon.set(FREE_USER_JOURNAL_LOG_COUNT_KEY, 0)
  }

  /**
   * Gets the free limit constant
   */
  static getFreeLimit(): number {
    return FREE_LIMIT
  }
}

