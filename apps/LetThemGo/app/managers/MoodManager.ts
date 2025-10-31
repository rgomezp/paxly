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
    } catch (_e) {
      // If store not available for some reason, ignore; persistence is already done
    }
    // Mark the daily task as completed for today
    try {
      DailyTaskManager.markCompleted("mood")
    } catch (_e) {}
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
}


