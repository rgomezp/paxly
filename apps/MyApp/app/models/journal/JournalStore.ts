import { Instance, SnapshotOut, types } from "mobx-state-tree"

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
    clearAll() {
      self.entries.replace([])
    },
    create(text: string) {
      const entry = { text, date: Date.now() }
      self.entries.push(entry)
      return entry
    },
    deleteByDate(timestamp: number) {
      const idx = self.entries.findIndex((e) => e.date === timestamp)
      if (idx >= 0) self.entries.splice(idx, 1)
    },
    updateByDate(timestamp: number, newText: string) {
      const idx = self.entries.findIndex((e) => e.date === timestamp)
      if (idx >= 0) self.entries[idx].text = newText
    },
  }))

export interface JournalStore extends Instance<typeof JournalStoreModel> {}
export interface JournalStoreSnapshot extends SnapshotOut<typeof JournalStoreModel> {}


