import { ganon } from "@/services/ganon/ganon"
import { rootStoreSingleton } from "@/models/helpers/useStores"
import { IWhyItDidntWorkReason, WhyItDidntWorkSection } from "@/types/IWhyItDidntWorkReason"

export default class WhyItDidntWorkManager {
  static addReason(section: WhyItDidntWorkSection, text: string): IWhyItDidntWorkReason {
    const reason: IWhyItDidntWorkReason = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      section,
      text: text.trim(),
      createdAt: Date.now(),
      isLocked: true, // Reasons are always locked once created
    }

    // Update both ganon and the store for reactivity
    rootStoreSingleton.whyItDidntWorkStore.addReason(reason)
    return reason
  }

  static getReasons(): IWhyItDidntWorkReason[] {
    return rootStoreSingleton.whyItDidntWorkStore.reasons.slice()
  }
}

