export function msUntilNextLocalMidnight(): number {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return Math.max(0, tomorrow.getTime() - now.getTime())
}


