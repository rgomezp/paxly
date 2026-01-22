export function msUntilNextLocalMidnight(): number {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return Math.max(0, tomorrow.getTime() - now.getTime())
}

export function getLocalDateKey(date: Date = new Date()): string {
  // Build YYYY-MM-DD in the user's local timezone
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
