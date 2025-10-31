import { types, Instance } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"

// Keep the item shape flexible by storing snapshots as frozen
export const MoodStoreModel = types
  .model("MoodStore", {
    history: types.optional(types.array(types.frozen<IMoodHistoryItem>()), []),
  })
  .actions((self) => ({
    loadFromGanon() {
      const items = (ganon.get("moodHistory") ?? []) as IMoodHistoryItem[]
      self.history.replace(items)
    },
    add(item: IMoodHistoryItem) {
      self.history.push(item)
      // Persist to ganon
      try {
        ganon.set("moodHistory", self.history.slice())
      } catch (e) {
        // noop; persistence errors shouldn't break UI updates
      }
    },
    clear() {
      self.history.replace([])
      ganon.set("moodHistory", [])
    },
    deleteByDate(timestamp: number) {
      const next = self.history.slice().filter((i) => i.date !== timestamp)
      self.history.replace(next)
      ganon.set("moodHistory", next)
    },
    afterCreate() {
      this.loadFromGanon()
    },
  }))

export interface MoodStore extends Instance<typeof MoodStoreModel> {}
