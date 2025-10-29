import { ganon } from "@/services/ganon/ganon"
import { DEFAULT_DAILY_TASKS, DailyTaskKey, IDailyTasks } from "@/types/IDailyTasks"
import { getLocalDateKey } from "@/utils/date"

export default class DailyTaskManager {
  private static ensureToday(): IDailyTasks {
    const stored = ganon.get("dailyTasks") as IDailyTasks | undefined
    const todayKey = getLocalDateKey()

    if (!stored || stored.dateKey !== todayKey) {
      const fresh: IDailyTasks = { ...DEFAULT_DAILY_TASKS, dateKey: todayKey }
      ganon.set("dailyTasks", fresh)
      return fresh
    }

    return stored
  }

  static getState(): IDailyTasks {
    return this.ensureToday()
  }

  static isCompleted(task: DailyTaskKey): boolean {
    const state = this.ensureToday()
    return state[task]
  }

  static markCompleted(task: DailyTaskKey): IDailyTasks {
    const state = this.ensureToday()
    const updated: IDailyTasks = { ...state, [task]: true }
    ganon.set("dailyTasks", updated)
    return updated
  }
}


