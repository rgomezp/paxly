import { ganon } from "@/services/ganon/ganon"
import { DEFAULT_DAILY_STREAK, IDailyStreak } from "@/types/IDailyStreak"
import { getLocalDateKey } from "@/utils/date"

const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/
const MS_PER_DAY = 24 * 60 * 60 * 1000

function parseLocalDateKey(dateKey: string): Date {
  // Use local noon to avoid DST edge cases around midnight.
  const [y, m, d] = dateKey.split("-").map((n) => Number(n))
  return new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0, 0)
}

function dayDiffLocal(aKey: string, bKey: string): number {
  const a = parseLocalDateKey(aKey).getTime()
  const b = parseLocalDateKey(bKey).getTime()
  return Math.round((a - b) / MS_PER_DAY)
}

export default class DailyStreakManager {
  private static ensureNormalized(): IDailyStreak {
    const stored = ganon.get("dailyStreak") as IDailyStreak | undefined

    if (!stored) {
      ganon.set("dailyStreak", DEFAULT_DAILY_STREAK)
      return DEFAULT_DAILY_STREAK
    }

    const normalized: IDailyStreak = {
      ...DEFAULT_DAILY_STREAK,
      ...stored,
      lastCompletedDateKey: stored.lastCompletedDateKey ?? null,
    }

    // If the stored key is malformed, drop it rather than trying to interpret it.
    if (normalized.lastCompletedDateKey && !DATE_KEY_RE.test(normalized.lastCompletedDateKey)) {
      const repaired: IDailyStreak = { ...normalized, current: 0, lastCompletedDateKey: null }
      ganon.set("dailyStreak", repaired)
      return repaired
    }

    // If the user has missed at least one whole day (gap >= 2), the streak is no longer alive.
    if (normalized.lastCompletedDateKey) {
      const todayKey = getLocalDateKey()
      const gap = dayDiffLocal(todayKey, normalized.lastCompletedDateKey)
      if (gap >= 2) {
        const repaired: IDailyStreak = { ...normalized, current: 0, lastCompletedDateKey: null }
        ganon.set("dailyStreak", repaired)
        return repaired
      }
    }

    return normalized
  }

  static getState(): IDailyStreak {
    return this.ensureNormalized()
  }

  /**
   * Call whenever the user completes any daily task. This will:
   * - increment the streak if yesterday was completed
   * - start a new streak if there was a gap
   * - no-op if today's completion was already recorded
   */
  static recordDailyTaskCompletion(dateKey: string = getLocalDateKey()): IDailyStreak {
    const state = this.ensureNormalized()

    // Already counted for today.
    if (state.lastCompletedDateKey === dateKey) {
      return state
    }

    let nextCurrent = 1
    if (state.lastCompletedDateKey) {
      const gap = dayDiffLocal(dateKey, state.lastCompletedDateKey)
      if (gap === 1) {
        nextCurrent = Math.max(1, state.current + 1)
      } else {
        // gap >= 2 (or unexpected), start over at 1
        nextCurrent = 1
      }
    }

    const nextBest = Math.max(state.best, nextCurrent)
    const updated: IDailyStreak = {
      ...state,
      lastCompletedDateKey: dateKey,
      current: nextCurrent,
      best: nextBest,
    }

    ganon.set("dailyStreak", updated)
    return updated
  }
}

