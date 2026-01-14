import FlagManager from "@/managers/FlagManager"

const DEFAULT_SHOW_RATE_LESSON_PROBABILITY = 0.5

/**
 * Encapsulated helper for deciding whether to show the RateLesson screen.
 * Currently uses a simple 50% random chance.
 */
export async function shouldShowRateLesson(): Promise<boolean> {
  const showRateLessonProbability = await FlagManager.get("show_rate_lesson_probability")
  return Math.random() < (showRateLessonProbability ?? DEFAULT_SHOW_RATE_LESSON_PROBABILITY)
}
