import { ganon } from "@/services/ganon/ganon"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import IJournalEntry from "@/types/IJournalEntry"
import LessonManager from "./LessonManager"

const DEFAULT_FREE_LIMIT = 2 // Fallback if feature flag is not available

export default class FreeUserUsageManager {
  /**
   * Gets the current mood log count for free users by reading from moodHistory array
   */
  static getMoodLogCount(): number {
    const moodHistory = (ganon.get("moodHistory") ?? []) as IMoodHistoryItem[]
    return moodHistory.length
  }

  /**
   * Gets the current journal log count for free users by reading from journalEntries array
   */
  static getJournalLogCount(): number {
    const journalEntries = (ganon.get("journalEntries") ?? []) as IJournalEntry[]
    return journalEntries.length
  }

  /**
   * Gets the current lesson completion count for free users
   */
  static getLessonCompletionCount(): number {
    const completedLessons = LessonManager.getCompletedLessons()
    return completedLessons.length
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
   * Checks if free user has reached the lesson completion limit (for Pégate rewards)
   * @param limit - The limit to check against (from feature flags). Defaults to DEFAULT_FREE_LIMIT if not provided.
   */
  static hasReachedLessonCompletionLimit(limit: number = DEFAULT_FREE_LIMIT): boolean {
    return this.getLessonCompletionCount() >= limit
  }

  /**
   * Gets the default free limit constant (fallback value)
   */
  static getDefaultFreeLimit(): number {
    return DEFAULT_FREE_LIMIT
  }
}
