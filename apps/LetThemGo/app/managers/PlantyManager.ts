import { ganon } from "@/services/ganon/ganon"
import { getLocalDateKey } from "@/utils/date"
import { ILastWateredData } from "@/types/ILastWateredData"

export default class PlantyManager {
  private static getLastWateredData(): ILastWateredData {
    const data = ganon.get("lastWateredData") as ILastWateredData | undefined
    if (!data) {
      const defaultData: ILastWateredData = {
        lastWatered: 0,
      }
      ganon.set("lastWateredData", defaultData)
      return defaultData
    }
    return data
  }

  static hasWateredToday(): boolean {
    const today = getLocalDateKey()
    const data = this.getLastWateredData()
    if (!data.lastWatered) return false
    const lastWateredDate = getLocalDateKey(new Date(data.lastWatered))
    return lastWateredDate === today
  }

  static markWateredToday(): void {
    const today = new Date()
    const data = this.getLastWateredData()
    const updatedData: ILastWateredData = {
      ...data,
      lastWatered: today.getTime(),
    }
    ganon.set("lastWateredData", updatedData)
  }
}
