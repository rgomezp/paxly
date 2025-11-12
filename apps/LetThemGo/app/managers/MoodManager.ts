import { ganon } from "@/services/ganon/ganon"
import { rootStoreSingleton } from "@/models"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { Activity } from "@/types/Activities"
import { ALL_MOODS, MOODS, MoodId } from "@/types/Moods"
import DailyTaskManager from "@/managers/DailyTaskManager"

export default class MoodManager {
  static getHistory(): IMoodHistoryItem[] {
    return ganon.get("moodHistory") ?? []
  }

  static clearHistory() {
    ganon.set("moodHistory", [])
  }

  static create(params: { moodId: MoodId; activity: Activity; notes?: string }): IMoodHistoryItem {
    const { moodId, activity, notes } = params
    const mood = MOODS[moodId]
    const item: IMoodHistoryItem = {
      mood,
      activity,
      notes: notes ?? "",
      date: Date.now(),
    }

    const history = MoodManager.getHistory()
    history.push(item)
    ganon.set("moodHistory", history)
    try {
      // Update MST store so observers react immediately
      rootStoreSingleton.moodStore.add(item)
    } catch {
      // If store not available for some reason, ignore; persistence is already done
    }
    // Mark the daily task as completed for today
    try {
      DailyTaskManager.markCompleted("mood")
    } catch {
      // Ignore errors
    }
    return item
  }

  static deleteByDate(timestamp: number) {
    const history = MoodManager.getHistory().filter((i) => i.date !== timestamp)
    ganon.set("moodHistory", history)
  }

  // Chart helpers
  static countByMood(): Record<MoodId, number> {
    const counts: Record<MoodId, number> = Object.fromEntries(
      ALL_MOODS.map((m) => [m, 0]),
    ) as Record<MoodId, number>
    for (const item of MoodManager.getHistory()) {
      const id = MoodManager.resolveMoodId(item)
      if (id) counts[id] += 1
    }
    return counts
  }

  static dailyCount(lastNDays = 7): { date: string; count: number }[] {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - (lastNDays - 1))

    const byDay: Record<string, number> = {}
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      byDay[key] = 0
    }

    for (const item of MoodManager.getHistory()) {
      const key = new Date(item.date).toISOString().slice(0, 10)
      if (key in byDay) byDay[key] += 1
    }

    return Object.entries(byDay).map(([date, count]) => ({ date, count }))
  }

  private static resolveMoodId(item: IMoodHistoryItem): MoodId | undefined {
    const found = Object.entries(MOODS).find(([, mood]) => mood.title === item.mood.title)
    return found?.[0] as MoodId | undefined
  }

  /**
   * Populates mood history with dummy data for the past week.
   * Useful for screenshots or testing.
   */
  static populateDummyData() {
    const now = new Date()
    const items: IMoodHistoryItem[] = []

    // Sample moods and activities for variety
    const moodOptions: MoodId[] = [
      MoodId.Sad,
      MoodId.Anxious,
      MoodId.Stressed,
      MoodId.Lonely,
      MoodId.Hopeful,
      MoodId.Calm,
      MoodId.Content,
      MoodId.Grateful,
      MoodId.Peaceful,
      MoodId.Confident,
      MoodId.Reflective,
      MoodId.Balanced,
      MoodId.Frustrated,
      MoodId.Empty,
      MoodId.Joyful,
    ]

    const activityOptions: Activity[] = [
      Activity.Exercise,
      Activity.Meditation,
      Activity.Reading,
      Activity.Writing,
      Activity.Music,
      Activity.Nature,
      Activity.Working,
      Activity.Socializing,
      Activity.Eating,
      Activity.DrinkingCoffee,
      Activity.WatchingTV,
      Activity.BedRotting,
      Activity.Other,
    ]

    // Create 1-3 mood entries per day for the past 7 days
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(now)
      date.setDate(date.getDate() - dayOffset)
      date.setHours(0, 0, 0, 0)

      // Random number of entries per day (1-3)
      const entriesPerDay = Math.floor(Math.random() * 3) + 1

      for (let entryIndex = 0; entryIndex < entriesPerDay; entryIndex++) {
        // Random time during the day (between 8 AM and 10 PM)
        const hour = Math.floor(Math.random() * 14) + 8
        const minute = Math.floor(Math.random() * 60)
        const entryDate = new Date(date)
        entryDate.setHours(hour, minute, 0, 0)

        // Pick random mood and activity
        const moodId = moodOptions[Math.floor(Math.random() * moodOptions.length)]
        const activity = activityOptions[Math.floor(Math.random() * activityOptions.length)]
        const mood = MOODS[moodId]

        const item: IMoodHistoryItem = {
          mood,
          activity,
          notes: entryIndex === 0 ? "" : "", // Sometimes add notes, mostly empty
          date: entryDate.getTime(),
        }

        items.push(item)
      }
    }

    // Sort by date (oldest first)
    items.sort((a, b) => a.date - b.date)

    // Get existing history and merge
    const existingHistory = MoodManager.getHistory()
    const mergedHistory = [...existingHistory, ...items]

    // Save to ganon
    ganon.set("moodHistory", mergedHistory)

    // Update MST store by reloading from ganon
    try {
      rootStoreSingleton.moodStore.loadFromGanon()
    } catch {
      // If store not available, that's okay - persistence is already done
    }

    return items.length
  }
}
