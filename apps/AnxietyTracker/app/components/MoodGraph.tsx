import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { getLocalDateKey } from "@/utils/date"
import { useAppTheme } from "@/utils/useAppTheme"
import MoodManager from "@/managers/MoodManager"
import { useStores } from "@/models"
import { MoodCategory } from "@/types/MoodCategory"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { BarGraph, BarData, LegendItem } from "./BarGraph"

type DayBucket = {
  key: string
  label: string
  negative: number
  neutral: number
  positive: number
  total: number
}

type MoodGraphProps = {
  demoData?: DayBucket[]
  showTitle?: boolean
  chartHeight?: number
  containerStyle?: ViewStyle
}

export const MoodGraph: FC<MoodGraphProps> = observer(function MoodGraph({
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
          negative: 0,
          neutral: 0,
          positive: 0,
          total: 0,
        }
      }

      const historyList: IMoodHistoryItem[] = moodStore.history.length
        ? (moodStore.history.slice() as IMoodHistoryItem[])
        : MoodManager.getHistory()
      for (const item of historyList) {
        const date = new Date(item.date)
        const key = makeKey(date)
        const bucket = map[key]
        if (!bucket) continue
        if (item.mood.category === MoodCategory.Negative) bucket.negative += 1
        else if (item.mood.category === MoodCategory.Neutral) bucket.neutral += 1
        else bucket.positive += 1
        bucket.total += 1
      }
      return Object.values(map)
    })()

  const colors = {
    negative: theme.colors.palette.negative,
    neutral: theme.colors.palette.neutral,
    positive: theme.colors.palette.positive,
  }

  // Transform DayBucket data to BarData format
  const barData: BarData[] = buckets.map((bucket) => ({
    key: bucket.key,
    label: bucket.label,
    total: bucket.total,
    segments: [
      { key: "negative", color: colors.negative, value: bucket.negative },
      { key: "neutral", color: colors.neutral, value: bucket.neutral },
      { key: "positive", color: colors.positive, value: bucket.positive },
    ],
  }))

  const legendItems: LegendItem[] = [
    { color: colors.negative, label: "negative" },
    { color: colors.neutral, label: "neutral" },
    { color: colors.positive, label: "positive" },
  ]

  return (
    <BarGraph
      data={barData}
      title="Moods this week"
      showTitle={showTitle}
      chartHeight={chartHeight}
      containerStyle={containerStyle}
      legendItems={legendItems}
      gridColor={theme.colors.palette.neutral}
    />
  )
})

export default MoodGraph
