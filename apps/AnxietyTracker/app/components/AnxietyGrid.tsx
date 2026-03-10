import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import MoodManager from "@/managers/MoodManager"
import { useStores } from "@/models"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { Grid } from "./Grid"
import { getLocalDateKey } from "@/utils/date"

interface AnxietyGridProps {
  style?: ViewStyle
}

export const AnxietyGrid: FC<AnxietyGridProps> = observer(function AnxietyGrid({ style }) {
  const { theme } = useAppTheme()
  const { moodStore } = useStores()

  const getValueForDate = (date: Date): number | null => {
    const dateKey = getLocalDateKey(date)
    const historyList: IMoodHistoryItem[] = moodStore.history.length
      ? (moodStore.history.slice() as IMoodHistoryItem[])
      : MoodManager.getHistory()

    // Filter items for this date that have anxiety ratings
    const itemsForDate = historyList.filter((item) => {
      const itemKey = getLocalDateKey(new Date(item.date))
      return itemKey === dateKey && item.anxietyRating !== undefined
    })

    if (itemsForDate.length === 0) {
      return null
    }

    // Calculate average anxiety rating and round to nearest integer (1-5)
    const sum = itemsForDate.reduce((acc, item) => acc + (item.anxietyRating || 0), 0)
    const average = sum / itemsForDate.length
    const rounded = Math.round(average)
    // Clamp to 1-5 range
    return Math.max(1, Math.min(5, rounded))
  }

  const getColorForValue = (level: number | null): string => {
    if (level === null) {
      return theme.colors.separator
    }

    const colors = {
      1: theme.colors.anxietyLevel1,
      2: theme.colors.anxietyLevel2,
      3: theme.colors.anxietyLevel3,
      4: theme.colors.anxietyLevel4,
      5: theme.colors.anxietyLevel5,
    }
    return colors[level as keyof typeof colors] || theme.colors.separator
  }

  return (
    <Grid getValueForDate={getValueForDate} getColorForValue={getColorForValue} style={style} />
  )
})

export default AnxietyGrid
