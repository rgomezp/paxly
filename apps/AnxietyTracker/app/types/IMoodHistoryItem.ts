import { Activity } from "./Activities"
import { IMood } from "./IMood"

export interface IMoodHistoryItem {
  mood: IMood
  activity: Activity
  notes: string
  anxietyRating?: number // 1-5 rating
  date: number // timestamp
}
