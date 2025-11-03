import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"
import IJournalEntry from "@/types/IJournalEntry"

const JournalEntryModel = types
  .model("JournalEntry", {
    text: types.string,
    date: types.number, // epoch ms
  })

export const JournalStoreModel = types
  .model("JournalStore", {
    entries: types.optional(types.array(JournalEntryModel), []),
  })
  .views((self) => ({
    get sortedEntries() {
      return self.entries.slice().sort((a, b) => b.date - a.date)
    },
  }))
  .actions((self) => ({
    loadFromGanon() {
      const items = (ganon.get("journalEntries") ?? []) as IJournalEntry[]
      self.entries.replace(items)
    },
    clearAll() {
      self.entries.replace([])
      ganon.set("journalEntries", [])
    },
    create(text: string) {
      const entry = { text, date: Date.now() }
      self.entries.push(entry)
      // Persist to ganon
      try {
        ganon.set("journalEntries", self.entries.slice())
      } catch (e) {
        // noop; persistence errors shouldn't break UI updates
      }
      return entry
    },
    deleteByDate(timestamp: number) {
      const next = self.entries.slice().filter((e) => e.date !== timestamp)
      self.entries.replace(next)
      ganon.set("journalEntries", next)
    },
    updateByDate(timestamp: number, newText: string) {
      const idx = self.entries.findIndex((e) => e.date === timestamp)
      if (idx >= 0) {
        self.entries[idx].text = newText
        // Persist to ganon
        try {
          ganon.set("journalEntries", self.entries.slice())
        } catch (e) {
          // noop; persistence errors shouldn't break UI updates
        }
      }
    },
    afterCreate() {
      this.loadFromGanon()
    },
  }))

export interface JournalStore extends Instance<typeof JournalStoreModel> {}
export interface JournalStoreSnapshot extends SnapshotOut<typeof JournalStoreModel> {}


