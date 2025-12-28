import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"
import IJournalEntry from "@/types/IJournalEntry"
import AnalyticsManager from "@/managers/AnalyticsManager"

const JournalEntryModel = types.model("JournalEntry", {
  text: types.string,
  date: types.number, // epoch ms
  prompt: types.maybe(types.string),
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
      // Ensure prompt is explicitly undefined if missing, to match the model type
      const mappedItems = items.map((item) => ({
        text: item.text,
        date: item.date,
        prompt: item.prompt ?? undefined,
      }))
      self.entries.replace(mappedItems)
    },
    clearAll() {
      self.entries.replace([])
      ganon.set("journalEntries", [])
    },
    create(text: string, prompt?: string) {
      const entry = { text, date: Date.now(), prompt }
      self.entries.push(entry)
      // Persist to ganon
      try {
        ganon.set("journalEntries", self.entries.slice())
      } catch {
        // noop; persistence errors shouldn't break UI updates
      }

      AnalyticsManager.getInstance().logEvent("journal_entry_created", {
        textLength: text.length,
      })

      return entry
    },
    deleteByDate(timestamp: number) {
      const next = self.entries.slice().filter((e) => e.date !== timestamp)
      self.entries.replace(next)
      ganon.set("journalEntries", next)
    },
    updateByDate(timestamp: number, newText: string, prompt?: string) {
      const idx = self.entries.findIndex((e) => e.date === timestamp)
      if (idx >= 0) {
        self.entries[idx].text = newText
        // Always update prompt: set to undefined to clear, or to the provided value
        self.entries[idx].prompt = prompt
        // Persist to ganon
        try {
          ganon.set("journalEntries", self.entries.slice())
        } catch {
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
