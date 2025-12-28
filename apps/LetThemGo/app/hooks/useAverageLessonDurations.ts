import { useState, useEffect } from "react"
import { getFirestore, collection, getDocs } from "@react-native-firebase/firestore"
import Log from "@/utils/Log"

interface AverageLessonDuration {
  lessonId: string
  averageDurationSec: number
  validCompletions: number
  lastUpdated: number
}

interface UseAverageLessonDurationsResult {
  durations: Record<string, number> // lessonId -> averageDurationSec in seconds
  isLoading: boolean
}

/**
 * Custom hook to fetch average lesson durations from Firestore
 * Returns a map of lessonId to average duration in seconds
 */
export const useAverageLessonDurations = (): UseAverageLessonDurationsResult => {
  const [durations, setDurations] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const db = getFirestore()
        const collectionRef = collection(db, "average_lesson_durations")
        const snapshot = await getDocs(collectionRef)

        const durationsMap: Record<string, number> = {}

        snapshot.docs.forEach((doc: { data: () => any }) => {
          const data = doc.data() as AverageLessonDuration
          if (data.lessonId && data.averageDurationSec !== undefined) {
            durationsMap[data.lessonId] = data.averageDurationSec
          }
        })

        setDurations(durationsMap)
      } catch (error) {
        Log.error(`Error fetching average lesson durations: ${error}`)
        setDurations({})
      } finally {
        setIsLoading(false)
      }
    }

    fetchDurations()
  }, [])

  return { durations, isLoading }
}
