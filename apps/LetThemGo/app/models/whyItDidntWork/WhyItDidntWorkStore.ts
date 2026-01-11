import { types, Instance } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"
import { IWhyItDidntWorkReason } from "@/types/IWhyItDidntWorkReason"

export const WhyItDidntWorkStoreModel = types
  .model("WhyItDidntWorkStore", {
    reasons: types.optional(types.array(types.frozen<IWhyItDidntWorkReason>()), []),
  })
  .views((self) => ({
    get reasonsBySection() {
      const grouped: Record<string, IWhyItDidntWorkReason[]> = {
        needsNotMet: [],
        valuesDidntAlign: [],
        repeatedConflicts: [],
        thingsIKeptExcusing: [],
        howIFeltMostOfTheTime: [],
      }
      self.reasons.forEach((reason) => {
        if (grouped[reason.section]) {
          grouped[reason.section].push(reason)
        }
      })
      // Sort by creation date (newest first)
      Object.keys(grouped).forEach((key) => {
        grouped[key].sort((a, b) => b.createdAt - a.createdAt)
      })
      return grouped
    },
    get hasReasons() {
      return self.reasons.length > 0
    },
  }))
  .actions((self) => ({
    loadFromGanon() {
      const data = ganon.get("whyItDidntWork") as
        | { reasons: IWhyItDidntWorkReason[]; isLocked?: boolean }
        | null
        | undefined
      if (data) {
        // Migrate old data: ensure all reasons are locked
        const reasons = (data.reasons || []).map((reason) => ({
          ...reason,
          isLocked: true,
        }))
        self.reasons.replace(reasons)
      }
    },
    addReason(reason: IWhyItDidntWorkReason) {
      self.reasons.push(reason)
      this.persist()
    },
    clear() {
      self.reasons.replace([])
      ganon.set("whyItDidntWork", { reasons: [] })
    },
    persist() {
      try {
        ganon.set("whyItDidntWork", {
          reasons: self.reasons.slice(),
        })
      } catch {
        // noop; persistence errors shouldn't break UI updates
      }
    },
    afterCreate() {
      this.loadFromGanon()
    },
  }))

export interface WhyItDidntWorkStore extends Instance<typeof WhyItDidntWorkStoreModel> {}

