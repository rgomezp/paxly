import { ganon } from "@/services/ganon/ganon"
import IJournalEntry from "@/types/IJournalEntry"
import AnalyticsManager from "./AnalyticsManager"

export default class JournalManager {
  static getEntries(): IJournalEntry[] {
    return ganon.get("journalEntries") ?? []
  }

  static clearAll() {
    ganon.set("journalEntries", [])
  }

  static create(text: string): IJournalEntry {
    const entry: IJournalEntry = {
      text,
      date: Date.now(),
    }

    const entries = JournalManager.getEntries()
    entries.push(entry)
    ganon.set("journalEntries", entries)

    AnalyticsManager.getInstance().logEvent("journal_entry_created", {
      textLength: text.length,
    })

    return entry
  }

  static deleteByDate(timestamp: number) {
    const entries = JournalManager.getEntries().filter((e) => e.date !== timestamp)
    ganon.set("journalEntries", entries)
  }

  static updateByDate(timestamp: number, newText: string) {
    const entries = JournalManager.getEntries()
    const index = entries.findIndex((e) => e.date === timestamp)
    if (index >= 0) {
      entries[index] = { ...entries[index], text: newText }
      ganon.set("journalEntries", entries)
    }
  }
}
