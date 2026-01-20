import { ganon } from "@/services/ganon/ganon"
import { IHelpUsageCounters } from "@/types/IHelpUsageCounters"
import FreeUserUsageManager from "./FreeUserUsageManager"

const DEFAULT_COUNTERS: IHelpUsageCounters = {
  im_anxious_count: 0,
  panic_attack_count: 0,
}

export default class HelpUsageManager {
  /**
   * Gets the current help usage counters from storage, falling back to defaults.
   */
  static getCounters(): IHelpUsageCounters {
    const stored = (ganon.get("helpUsageCounters") as IHelpUsageCounters | undefined) ?? null

    if (!stored) {
      return { ...DEFAULT_COUNTERS }
    }

    return {
      im_anxious_count: stored.im_anxious_count ?? 0,
      panic_attack_count: stored.panic_attack_count ?? 0,
    }
  }

  private static saveCounters(counters: IHelpUsageCounters) {
    ganon.set("helpUsageCounters", counters)
  }

  static incrementImAnxious() {
    const counters = this.getCounters()
    const updated: IHelpUsageCounters = {
      ...counters,
      im_anxious_count: counters.im_anxious_count + 1,
    }
    this.saveCounters(updated)
  }

  static incrementPanicAttack() {
    const counters = this.getCounters()
    const updated: IHelpUsageCounters = {
      ...counters,
      panic_attack_count: counters.panic_attack_count + 1,
    }
    this.saveCounters(updated)
  }

  static hasReachedImAnxiousLimit(
    limit: number = FreeUserUsageManager.getDefaultFreeLimit(),
  ): boolean {
    return this.getCounters().im_anxious_count >= limit
  }

  static hasReachedPanicAttackLimit(
    limit: number = FreeUserUsageManager.getDefaultFreeLimit(),
  ): boolean {
    return this.getCounters().panic_attack_count >= limit
  }
}
