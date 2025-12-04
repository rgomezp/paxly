import { getFirestore, collection, addDoc } from "@react-native-firebase/firestore"
import { ganon } from "@/services/ganon/ganon"
import { ICompletion } from "@/types/ICompletion"
import Log from "@/utils/Log"
import Constants from "expo-constants"

export default class LessonCompletionManager {
  /**
   * Saves a lesson completion to Firestore
   */
  static async saveCompletion(params: {
    lessonId: string
    startedAt: number
    completedAt: number
    flow?: string
    helpful?: boolean | null
  }): Promise<void> {
    try {
      const { lessonId, startedAt, completedAt, flow = "unknown", helpful } = params

      // Get user email (optional)
      const email = ganon.get("email")

      // Calculate duration in seconds
      const durationSec = Math.max(0, Math.floor((completedAt - startedAt) / 1000))

      // Get app version
      const appVersion = Constants.expoConfig?.version || "unknown"

      // Create completion object
      const completion: ICompletion = {
        lessonId,
        startedAt,
        completedAt,
        durationSec,
        appVersion,
        flow,
        createdAt: Date.now(),
        ...(email && { email }),
        ...(Object.prototype.hasOwnProperty.call(params, "helpful") && { helpful }),
      }

      // Save to Firestore
      const db = getFirestore()
      const completionsCollection = collection(db, "lesson_completions")
      const docRef = await addDoc(completionsCollection, completion)

      Log.info(
        `LessonCompletionManager: Saved completion ${docRef.id} for lesson ${lessonId} with duration ${durationSec}s${email ? "" : " (no email)"}`,
      )
    } catch (error) {
      Log.error(`LessonCompletionManager: Error saving completion: ${error}`)
      // Don't throw - we don't want completion tracking to break the lesson flow
    }
  }
}
