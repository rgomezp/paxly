import { ganon } from "@/services/ganon/ganon"
import IJournalEntry from "@/types/IJournalEntry"

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
    return entry
  }

  static deleteByDate(timestamp: number) {
    const entries = JournalManager.getEntries().filter((e) => e.date !== timestamp)
    ganon.set("journalEntries", entries)
  }
}


