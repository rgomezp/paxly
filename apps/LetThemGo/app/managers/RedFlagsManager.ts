import { rootStoreSingleton } from "@/models/helpers/useStores"
import { IRedFlag } from "@/types/IRedFlag"
import AnalyticsManager from "./AnalyticsManager"

export default class RedFlagsManager {
  static addFlag(text: string): IRedFlag {
    const flag: IRedFlag = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: text.trim(),
      createdAt: Date.now(),
      isLocked: true, // Flags are always locked once created
    }

    // Update both ganon and the store for reactivity
    rootStoreSingleton.redFlagsStore.addFlag(flag)
    AnalyticsManager.getInstance().logEvent("red_flag_added")
    return flag
  }

  static getFlags(): IRedFlag[] {
    return rootStoreSingleton.redFlagsStore.flags.slice()
  }
}

