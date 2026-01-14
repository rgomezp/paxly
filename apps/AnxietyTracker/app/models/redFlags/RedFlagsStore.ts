import { types, Instance } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"
import { IRedFlag } from "@/types/IRedFlag"

export const RedFlagsStoreModel = types
  .model("RedFlagsStore", {
    flags: types.optional(types.array(types.frozen<IRedFlag>()), []),
  })
  .views((self) => ({
    get sortedFlags() {
      // Sort by creation date (newest first)
      return self.flags.slice().sort((a, b) => b.createdAt - a.createdAt)
    },
    get hasFlags() {
      return self.flags.length > 0
    },
  }))
  .actions((self) => ({
    loadFromGanon() {
      const data = ganon.get("redFlags") as
        | { flags: IRedFlag[]; isLocked?: boolean }
        | null
        | undefined
      if (data) {
        // Migrate old data: ensure all flags are locked
        const flags = (data.flags || []).map((flag) => ({
          ...flag,
          isLocked: true,
        }))
        self.flags.replace(flags)
      }
    },
    addFlag(flag: IRedFlag) {
      self.flags.push(flag)
      this.persist()
    },
    clear() {
      self.flags.replace([])
      ganon.set("redFlags", { flags: [] })
    },
    persist() {
      try {
        ganon.set("redFlags", {
          flags: self.flags.slice(),
        })
      } catch {
        // noop; persistence errors shouldn't break UI updates
      }
    },
    afterCreate() {
      this.loadFromGanon()
    },
  }))

export interface RedFlagsStore extends Instance<typeof RedFlagsStoreModel> {}
