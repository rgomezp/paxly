/**
 * Encapsulated helper for deciding whether to show the RateLesson screen.
 * Currently uses a simple 50% random chance.
 */
export function shouldShowRateLesson(): boolean {
  return Math.random() < 0.5
}
