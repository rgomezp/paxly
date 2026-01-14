import { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Text as RNText, TextStyle } from "react-native"
import { Text } from "@/components"
import { getLocalDateKey } from "@/utils/date"
import { useAppTheme } from "@/utils/useAppTheme"
import MoodManager from "@/managers/MoodManager"
import { useStores } from "@/models"
import { MoodCategory } from "@/types/MoodCategory"
import { IMoodHistoryItem } from "@/types/IMoodHistoryItem"
import { spacing } from "@/theme"
// MoodLogList renders the list; no longer needed here

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
  chartHeight: propChartHeight,
  containerStyle,
}) {
  const { theme, themed } = useAppTheme()
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

  const chartHeight = propChartHeight || 180

  // Determine Y-axis scale dynamically from data.
  const maxTotal = Math.max(0, ...buckets.map((b) => b.total))
  const yStep = maxTotal > 10 ? 2 : 1
  // If stepping by 2, round the top up to the next even number so the last tick aligns.
  const yMax = maxTotal > 10 ? maxTotal + (maxTotal % 2) : maxTotal
  const yTicks = useMemo(() => {
    const ticks: number[] = []
    for (let v = 0; v <= yMax; v += yStep) ticks.push(v)
    return ticks
  }, [yMax, yStep])
  const yAxisWidth = 28

  const colors = {
    negative: theme.colors.palette.negative,
    neutral: theme.colors.palette.neutral,
    positive: theme.colors.palette.positive,
    grid: theme.colors.palette.neutral,
  }

  return (
    <View style={[themed($wrapper), containerStyle]}>
      {showTitle && (
        <Text
          text="Moods this week"
          preset="subheading"
          style={themed([$titleText, { color: theme.colors.text }])}
        />
      )}
      <View style={themed([$container])}>
        {/* Grid lines and Y-axis labels */}
        {yTicks.map((t) => {
          const y = yMax === 0 ? chartHeight : (1 - t / yMax) * chartHeight
          return (
            <View key={`tick-${t}`} style={[$tickContainer, { top: y }]}>
              <RNText
                style={themed([$yAxisLabel, { width: yAxisWidth, color: theme.colors.textDim }])}
              >
                {t}
              </RNText>
              <View
                style={themed([
                  $gridLineBase,
                  { backgroundColor: colors.grid, marginLeft: yAxisWidth },
                ])}
              />
            </View>
          )
        })}

        {/* Bars */}
        <View style={[$barsRow, { height: chartHeight, marginLeft: yAxisWidth }]}>
          {buckets.map((b) => {
            const denom = yMax === 0 ? 1 : yMax
            const height = b.total === 0 ? 0 : (b.total / denom) * chartHeight
            const hNeg = b.total === 0 ? 0 : (b.negative / denom) * chartHeight
            const hNeu = b.total === 0 ? 0 : (b.neutral / denom) * chartHeight
            const hPos = b.total === 0 ? 0 : (b.positive / denom) * chartHeight
            return (
              <View key={b.key} style={$barWrapper}>
                <View style={[$barBox, { height: chartHeight }]}>
                  <View style={[$bar, { height }]}>
                    <View
                      style={[$barTopSegment, { height: hNeg, backgroundColor: colors.negative }]}
                    />
                    <View
                      style={[$barMiddleSegment, { height: hNeu, backgroundColor: colors.neutral }]}
                    />
                    <View
                      style={[
                        $barBottomSegment,
                        { height: hPos, backgroundColor: colors.positive },
                      ]}
                    />
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        {/* Labels */}
        <View style={[$labelsRow, { marginLeft: yAxisWidth }]}>
          {buckets.map((b) => (
            <View key={`label-${b.key}`} style={$barWrapper}>
              <RNText style={themed([$barLabelText, { color: theme.colors.textDim }])}>
                {b.label}
              </RNText>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={$legendRow}>
          <LegendDot color={colors.negative} label="negative" textColor={theme.colors.text} />
          <LegendDot color={colors.neutral} label="neutral" textColor={theme.colors.text} />
          <LegendDot color={colors.positive} label="positive" textColor={theme.colors.text} />
        </View>
      </View>

      {/* List removed; rendered by MoodLogList component on the screen */}
    </View>
  )
})

function LegendDot({
  color,
  label,
  textColor,
}: {
  color: string
  label: string
  textColor: string
}) {
  return (
    <View style={$legendItemRow}>
      <View style={[$legendDot, { backgroundColor: color }]} />
      <RNText style={[$legendText, { color: textColor }]}>{label}</RNText>
    </View>
  )
}

const $container: ViewStyle = {
  marginTop: 12,
  paddingHorizontal: 16,
}

// Removed unused $gridLine

const $gridLineBase: ViewStyle = {
  height: 1,
  opacity: 0.3,
}

const $tickContainer: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
}

const $yAxisLabel: TextStyle = {
  position: "absolute",
  left: 0,
  textAlign: "center",
  fontSize: 12,
  transform: [{ translateY: -7 }],
}

const $barsRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingHorizontal: 8,
}

const $barWrapper: ViewStyle = {
  alignItems: "center",
  width: 32,
}

const $bar: ViewStyle = {
  width: 24,
  borderRadius: 6,
  overflow: "hidden",
  backgroundColor: "transparent",
  justifyContent: "flex-end",
}

const $barBox: ViewStyle = {
  justifyContent: "flex-end",
}

const $barTopSegment: ViewStyle = {
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
}

const $barMiddleSegment: ViewStyle = {}

const $barBottomSegment: ViewStyle = {
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
}

const $legendRow: ViewStyle = {
  marginTop: 12,
  flexDirection: "row",
  justifyContent: "space-around",
}

const $wrapper: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $titleText: TextStyle = {
  marginLeft: 8,
}

const $barLabelText: TextStyle = {
  marginTop: 6,
  fontSize: 12,
}

const $labelsRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingHorizontal: 8,
}

const $legendItemRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $legendDot: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  marginRight: 6,
}

const $legendText: TextStyle = {
  fontSize: 14,
}

// List styles and helpers removed

export default MoodGraph
