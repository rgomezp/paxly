import { ganon } from "@/services/ganon/ganon"

const FREE_USER_MOOD_LOG_COUNT_KEY = "freeUserMoodLogCount"
const FREE_USER_JOURNAL_LOG_COUNT_KEY = "freeUserJournalLogCount"
const DEFAULT_FREE_LIMIT = 2 // Fallback if feature flag is not available

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
   * @param limit - The limit to check against (from feature flags). Defaults to DEFAULT_FREE_LIMIT if not provided.
   */
  static hasReachedMoodLogLimit(limit: number = DEFAULT_FREE_LIMIT): boolean {
    return this.getMoodLogCount() >= limit
  }

  /**
   * Checks if free user has reached the journal log limit
   * @param limit - The limit to check against (from feature flags). Defaults to DEFAULT_FREE_LIMIT if not provided.
   */
  static hasReachedJournalLogLimit(limit: number = DEFAULT_FREE_LIMIT): boolean {
    return this.getJournalLogCount() >= limit
  }

  /**
   * Resets both counts (useful for testing or if user upgrades)
   */
  static resetCounts(): void {
    ganon.set(FREE_USER_MOOD_LOG_COUNT_KEY, 0)
    ganon.set(FREE_USER_JOURNAL_LOG_COUNT_KEY, 0)
  }

  /**
   * Gets the default free limit constant (fallback value)
   */
  static getDefaultFreeLimit(): number {
    return DEFAULT_FREE_LIMIT
  }
}

