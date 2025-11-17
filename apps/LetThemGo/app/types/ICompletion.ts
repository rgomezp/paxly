export interface ICompletion {
  lessonId: string
  startedAt: number
  completedAt: number
  durationSec: number
  appVersion: string
  flow: string
  createdAt: number
  email?: string
}
