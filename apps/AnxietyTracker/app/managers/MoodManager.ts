import { ganon } from "@/services/ganon/ganon"
import { rootStoreSingleton } from "@/models"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { Activity, ALL_ACTIVITIES } from "@/types/Activities"
import { ALL_MOODS, MOODS, MoodId } from "@/types/Moods"
import { MoodCategory } from "@/types/MoodCategory"
import DailyTaskManager from "@/managers/DailyTaskManager"
import AnalyticsManager from "@/managers/AnalyticsManager"
import Log from "@/utils/Log"

export default class MoodManager {
  static getHistory(): IMoodHistoryItem[] {
    return ganon.get("moodHistory") ?? []
  }

  static clearHistory() {
    ganon.set("moodHistory", [])
  }

  static create(params: {
    moodId: MoodId
    activity: Activity
    notes?: string
    anxietyRating?: number
  }): IMoodHistoryItem {
    const { moodId, activity, notes, anxietyRating } = params
    const mood = MOODS[moodId]
    const item: IMoodHistoryItem = {
      mood,
      activity,
      notes: notes ?? "",
      anxietyRating,
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

    AnalyticsManager.getInstance().logEvent("mood_logged", {
      moodId: moodId,
      activity: activity,
      hasNotes: !!notes,
      notesLength: notes?.length ?? 0,
      anxietyRating: anxietyRating,
    })

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

  /**
   * Returns the top mood category for a specific date based on the most frequent mood category logged that day.
   * Returns null if no moods were logged on that date.
   */
  static getTopMoodCategoryForDate(date: Date): MoodCategory | null {
    const dateKey = date.toISOString().slice(0, 10)
    const history = MoodManager.getHistory()

    // Filter moods for the given date
    const moodsOnDate = history.filter((item) => {
      const itemKey = new Date(item.date).toISOString().slice(0, 10)
      return itemKey === dateKey
    })

    if (moodsOnDate.length === 0) {
      return null
    }

    // Count by category
    const categoryCounts: Record<MoodCategory, number> = {
      [MoodCategory.Positive]: 0,
      [MoodCategory.Negative]: 0,
      [MoodCategory.Neutral]: 0,
    }

    for (const item of moodsOnDate) {
      categoryCounts[item.mood.category] += 1
    }

    // Find the category with the highest count
    let topCategory: MoodCategory = MoodCategory.Neutral
    let maxCount = 0

    for (const [category, count] of Object.entries(categoryCounts)) {
      if (count > maxCount) {
        maxCount = count
        topCategory = Number(category) as MoodCategory
      }
    }

    return topCategory
  }

  private static resolveMoodId(item: IMoodHistoryItem): MoodId | undefined {
    const found = Object.entries(MOODS).find(([, mood]) => mood.title === item.mood.title)
    return found?.[0] as MoodId | undefined
  }

  /**
   * Returns moods sorted with the top 3 most logged moods first, followed by the top 3 most recently logged moods
   * (excluding the top 3 most logged), if at least 10 total logs exist. Otherwise returns moods in their original order.
   */
  static getSortedMoods(): MoodId[] {
    const history = MoodManager.getHistory()
    const totalLogs = history.length
    const minLogsForPersonalization = 10

    // If we have less than the minimum logs, return original order
    if (totalLogs < minLogsForPersonalization) {
      return ALL_MOODS
    }

    // Count mood occurrences
    const moodCounts: Record<MoodId, number> = Object.fromEntries(
      ALL_MOODS.map((moodId) => [moodId, 0]),
    ) as Record<MoodId, number>

    history.forEach((item) => {
      const moodId = MoodManager.resolveMoodId(item)
      if (moodId) {
        moodCounts[moodId] = (moodCounts[moodId] || 0) + 1
      }
    })

    // Get top 3 most logged moods (sorted by count, descending)
    const topMostLoggedMoods = Object.entries(moodCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([moodId]) => moodId as MoodId)

    // Get top 3 most recently logged moods (excluding the top 3 most logged)
    // Sort history by date descending (most recent first)
    const sortedByDate = [...history].sort((a, b) => b.date - a.date)

    // Extract unique moods from most recent entries, excluding top 3 most logged
    const recentMoods: MoodId[] = []
    const seenMoods = new Set<MoodId>()

    for (const item of sortedByDate) {
      const moodId = MoodManager.resolveMoodId(item)
      if (
        moodId &&
        !topMostLoggedMoods.includes(moodId) &&
        !seenMoods.has(moodId) &&
        recentMoods.length < 3
      ) {
        recentMoods.push(moodId)
        seenMoods.add(moodId)
      }
    }

    // Combine: top 3 most logged, then top 3 most recent, then the rest
    const prioritizedMoods = [...topMostLoggedMoods, ...recentMoods]
    return [...prioritizedMoods, ...ALL_MOODS.filter((m) => !prioritizedMoods.includes(m))]
  }

  /**
   * Returns activities sorted with the top 3 most logged activities first, followed by the top 3 most recently logged activities
   * (excluding the top 3 most logged), if at least 10 total logs exist. Otherwise returns activities in their original order.
   */
  static getSortedActivities(): Activity[] {
    const history = MoodManager.getHistory()
    const totalLogs = history.length
    const minLogsForPersonalization = 10

    // If we have less than the minimum logs, return original order
    if (totalLogs < minLogsForPersonalization) {
      return ALL_ACTIVITIES
    }

    // Count activity occurrences
    const activityCounts: Record<Activity, number> = Object.fromEntries(
      ALL_ACTIVITIES.map((activity) => [activity, 0]),
    ) as Record<Activity, number>

    history.forEach((item) => {
      activityCounts[item.activity] = (activityCounts[item.activity] || 0) + 1
    })

    // Get top 3 most logged activities (sorted by count, descending)
    const topMostLoggedActivities = Object.entries(activityCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([activity]) => activity as Activity)

    // Get top 3 most recently logged activities (excluding the top 3 most logged)
    // Sort history by date descending (most recent first)
    const sortedByDate = [...history].sort((a, b) => b.date - a.date)

    // Extract unique activities from most recent entries, excluding top 3 most logged
    const recentActivities: Activity[] = []
    const seenActivities = new Set<Activity>()

    for (const item of sortedByDate) {
      if (
        !topMostLoggedActivities.includes(item.activity) &&
        !seenActivities.has(item.activity) &&
        recentActivities.length < 3
      ) {
        recentActivities.push(item.activity)
        seenActivities.add(item.activity)
      }
    }

    // Combine: top 3 most logged, then top 3 most recent, then the rest
    const prioritizedActivities = [...topMostLoggedActivities, ...recentActivities]
    return [
      ...prioritizedActivities,
      ...ALL_ACTIVITIES.filter((a) => !prioritizedActivities.includes(a)),
    ]
  }

  /**
   * Populates mood history with dummy data for the past week.
   * Useful for screenshots or testing.
   */
  static populateDummyData() {
    Log.info("🔥 Populating mood history with dummy data for the past week")
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
