import FlagManager from "@/managers/FlagManager"
import Log from "./Log"

const DEFAULT_SHOW_RATE_LESSON_PROBABILITY = 0.5

/**
 * Encapsulated helper for deciding whether to show the RateLesson screen.
 * Currently uses a simple 50% random chance.
 */
export async function shouldShowRateLesson(): Promise<boolean> {
  try {
    const showRateLessonProbability = await FlagManager.get("show_rate_lesson_probability")
    return Math.random() < (showRateLessonProbability ?? DEFAULT_SHOW_RATE_LESSON_PROBABILITY)
  } catch (error) {
    // Handle errors gracefully (e.g., Firestore permission issues)
    // Default to not showing rate lesson if we can't fetch the flag
    Log.warn(`shouldShowRateLesson: Error fetching flag, defaulting to false: ${error}`)
    return false
  }
}
