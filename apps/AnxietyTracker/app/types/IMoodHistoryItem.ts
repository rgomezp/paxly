import { Activity } from "./Activities"
import { IMood } from "./IMood"

export interface IMoodHistoryItem {
  mood: IMood
  activity: Activity
  notes: string
  date: number // timestamp
}
