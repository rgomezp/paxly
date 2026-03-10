import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { getLocalDateKey } from "@/utils/date"
import { useAppTheme } from "@/utils/useAppTheme"
import MoodManager from "@/managers/MoodManager"
import { useStores } from "@/models"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { BarGraph, BarData, LegendItem } from "./BarGraph"

type DayBucket = {
  key: string
  label: string
  level1: number // lowest anxiety
  level2: number
  level3: number
  level4: number
  level5: number // highest anxiety
  total: number
}

type AnxietyGraphProps = {
  demoData?: DayBucket[]
  showTitle?: boolean
  chartHeight?: number
  containerStyle?: ViewStyle
}

export const AnxietyGraph: FC<AnxietyGraphProps> = observer(function AnxietyGraph({
  demoData,
  showTitle = true,
  chartHeight,
  containerStyle,
}) {
  const { theme } = useAppTheme()
  const { moodStore } = useStores()

  const buckets: DayBucket[] =
    demoData ||
    (() => {
      // Build last 7 days, oldest -> newest
      const today = new Date()
      const start = new Date()
      start.setDate(today.getDate() - 6)

      const makeKey = (d: Date) => getLocalDateKey(d)
      const short = (d: Date) => d.toLocaleDateString(undefined, { weekday: "short" }).toLowerCase()

      const map: Record<string, DayBucket> = {}
      for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        const key = makeKey(d)
        map[key] = {
          key,
          label: short(new Date(d)),
          level1: 0,
          level2: 0,
          level3: 0,
          level4: 0,
          level5: 0,
          total: 0,
        }
      }

      const historyList: IMoodHistoryItem[] = moodStore.history.length
        ? (moodStore.history.slice() as IMoodHistoryItem[])
        : MoodManager.getHistory()

      for (const item of historyList) {
        // Only count items that have an anxiety rating
        if (item.anxietyRating === undefined) continue

        const date = new Date(item.date)
        const key = makeKey(date)
        const bucket = map[key]
        if (!bucket) continue

        // Map anxiety rating (1-5) to the appropriate level
        switch (item.anxietyRating) {
          case 1:
            bucket.level1 += 1
            break
          case 2:
            bucket.level2 += 1
            break
          case 3:
            bucket.level3 += 1
            break
          case 4:
            bucket.level4 += 1
            break
          case 5:
            bucket.level5 += 1
            break
        }
        bucket.total += 1
      }
      return Object.values(map)
    })()

  // Use theme anxiety level colors (tuned per light/dark in theme)
  const colors = {
    level1: theme.colors.anxietyLevel1,
    level2: theme.colors.anxietyLevel2,
    level3: theme.colors.anxietyLevel3,
    level4: theme.colors.anxietyLevel4,
    level5: theme.colors.anxietyLevel5,
  }

  // Transform DayBucket data to BarData format
  // Order: level1 at top (displayed first), level5 at bottom (displayed last)
  const barData: BarData[] = buckets.map((bucket) => ({
    key: bucket.key,
    label: bucket.label,
    total: bucket.total,
    segments: [
      { key: "level1", color: colors.level1, value: bucket.level1 },
      { key: "level2", color: colors.level2, value: bucket.level2 },
      { key: "level3", color: colors.level3, value: bucket.level3 },
      { key: "level4", color: colors.level4, value: bucket.level4 },
      { key: "level5", color: colors.level5, value: bucket.level5 },
    ],
  }))

  const legendItems: LegendItem[] = [
    { color: colors.level1, label: "1" },
    { color: colors.level2, label: "2" },
    { color: colors.level3, label: "3" },
    { color: colors.level4, label: "4" },
    { color: colors.level5, label: "5" },
  ]

  return (
    <BarGraph
      data={barData}
      title="Anxiety this week"
      showTitle={showTitle}
      chartHeight={chartHeight}
      containerStyle={containerStyle}
      legendItems={legendItems}
      gridColor={theme.colors.palette.neutral}
    />
  )
})

export default AnxietyGraph
