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
  const { theme, themeContext } = useAppTheme()
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

    // In light mode: accent200 is lightest, accent600 is darkest
    // In dark mode: accent100 is darkest, accent600 is lightest (reversed)
    // We want level 1 (lowest anxiety) to be lightest, level 5 (highest anxiety) to be darkest
    const colors =
      themeContext === "dark"
        ? {
            // Dark mode: reversed order - darkest for highest anxiety
            1: theme.colors.palette.accent600,
            2: theme.colors.palette.accent500,
            3: theme.colors.palette.accent400,
            4: theme.colors.palette.accent300,
            5: theme.colors.palette.accent100,
          }
        : {
            // Light mode: normal order - darkest for highest anxiety
            1: theme.colors.palette.accent200,
            2: theme.colors.palette.accent300,
            3: theme.colors.palette.accent400,
            4: theme.colors.palette.accent500,
            5: theme.colors.palette.accent600,
          }

    return colors[level as keyof typeof colors] || theme.colors.separator
  }

  return (
    <Grid getValueForDate={getValueForDate} getColorForValue={getColorForValue} style={style} />
  )
})

export default AnxietyGrid
