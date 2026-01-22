import { useMemo, useState } from "react"
import { View, ViewStyle, TextStyle, LayoutChangeEvent } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "./Text"
import type { ThemedStyle } from "@/theme"

const WEEKS = 26 // ~6 months
const DAYS_PER_WEEK = 7
const DAY_LABEL_WIDTH = 28
const DAY_LABEL_GAP = 6

export type GridValue = string | number | null

export type GridProps<T extends GridValue> = {
  getValueForDate: (date: Date) => T | null
  getColorForValue: (value: T | null) => string
  style?: ViewStyle
}

export const Grid = <T extends GridValue>({
  getValueForDate,
  getColorForValue,
  style,
}: GridProps<T>) => {
  const { themed } = useAppTheme()
  const [containerWidth, setContainerWidth] = useState(0)

  // Calculate dot size and gap based on available width
  const { dotSize, dotGap } = useMemo(() => {
    if (containerWidth === 0) {
      return { dotSize: 0, dotGap: 0 }
    }
    const availableWidth = containerWidth - DAY_LABEL_WIDTH - DAY_LABEL_GAP
    // We have WEEKS columns, and WEEKS-1 gaps between them
    // availableWidth = WEEKS * dotSize + (WEEKS - 1) * gap
    // Let's use a ratio: gap = dotSize * 0.3
    // availableWidth = WEEKS * dotSize + (WEEKS - 1) * dotSize * 0.3
    // availableWidth = dotSize * (WEEKS + (WEEKS - 1) * 0.3)
    const gapRatio = 0.3
    const calculatedDotSize = availableWidth / (WEEKS + (WEEKS - 1) * gapRatio)
    const calculatedGap = calculatedDotSize * gapRatio

    return {
      dotSize: Math.floor(calculatedDotSize),
      dotGap: Math.floor(calculatedGap),
    }
  }, [containerWidth])

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  // Generate the grid data: 7 rows (days) x 26 columns (weeks)
  const gridData = useMemo(() => {
    const today = new Date()
    const todayDayOfWeek = today.getDay() // 0 = Sunday, 6 = Saturday

    // Find the most recent Sunday to start our grid
    const endDate = new Date(today)
    endDate.setDate(today.getDate() - todayDayOfWeek + 6) // End on Saturday of current week

    // Go back 26 weeks from the end date for the start
    const startDate = new Date(endDate)
    startDate.setDate(endDate.getDate() - (WEEKS * DAYS_PER_WEEK - 1))

    // Build the grid: columns are weeks, rows are days (0=Sun, 1=Mon, ..., 6=Sat)
    const grid: { date: Date; value: T | null }[][] = []

    for (let week = 0; week < WEEKS; week++) {
      const weekData: { date: Date; value: T | null }[] = []
      for (let day = 0; day < DAYS_PER_WEEK; day++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + week * DAYS_PER_WEEK + day)

        // Don't show future dates
        const isFuture = date > today
        const value = isFuture ? null : getValueForDate(date)

        weekData.push({ date, value })
      }
      grid.push(weekData)
    }

    return grid
  }, [getValueForDate])

  // Generate month labels with their positions
  const monthLabels = useMemo(() => {
    const labels: { label: string; weekIndex: number }[] = []
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]

    let lastMonth = -1
    gridData.forEach((week, weekIndex) => {
      // Check the first day of the week (Sunday)
      const date = week[0].date
      const month = date.getMonth()

      if (month !== lastMonth) {
        labels.push({ label: monthNames[month], weekIndex })
        lastMonth = month
      }
    })

    return labels
  }, [gridData])

  // Day labels for the y-axis (Mon, Wed, Fri)
  const dayLabels = [
    { label: "", row: 0 }, // Sunday - no label
    { label: "Mon", row: 1 },
    { label: "", row: 2 }, // Tuesday - no label
    { label: "Wed", row: 3 },
    { label: "", row: 4 }, // Thursday - no label
    { label: "Fri", row: 5 },
    { label: "", row: 6 }, // Saturday - no label
  ]

  // Helper function to get dot style
  const getDotStyle = useMemo(
    () => (isFuture: boolean, value: T | null) => ({
      backgroundColor: isFuture ? "transparent" : getColorForValue(value),
      width: dotSize,
      height: dotSize,
      marginRight: dotGap,
      marginBottom: dotGap,
      borderRadius: Math.max(2, dotSize * 0.2),
    }),
    [dotSize, dotGap, getColorForValue],
  )

  // Don't render until we have measured the container
  if (containerWidth === 0) {
    return <View style={[themed($container), style]} onLayout={handleLayout} />
  }

  return (
    <View style={[themed($container), style]} onLayout={handleLayout}>
      {/* Month labels */}
      <View style={$monthLabelsContainer}>
        <View style={[$dayLabelSpacer, { width: DAY_LABEL_WIDTH + DAY_LABEL_GAP }]} />
        <View style={$monthLabelsRow}>
          {monthLabels.map(({ label, weekIndex }, idx) => (
            <Text
              key={`month-${idx}`}
              style={[
                themed($monthLabel),
                {
                  left: weekIndex * (dotSize + dotGap),
                },
              ]}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>

      {/* Main grid with day labels */}
      <View style={$gridRow}>
        {/* Day labels column */}
        <View style={[$dayLabelsColumn, { width: DAY_LABEL_WIDTH, marginRight: DAY_LABEL_GAP }]}>
          {dayLabels.map(({ label, row }) => (
            <View
              key={`day-${row}`}
              style={[$dayLabelCell, { height: dotSize, marginBottom: dotGap }]}
            >
              {label ? (
                <Text style={[themed($dayLabel), { lineHeight: dotSize }]}>{label}</Text>
              ) : null}
            </View>
          ))}
        </View>

        {/* Dots grid */}
        <View style={$dotsContainer}>
          {/* Render by rows (days) first, then columns (weeks) */}
          {Array.from({ length: DAYS_PER_WEEK }).map((_, dayIndex) => (
            <View key={`row-${dayIndex}`} style={$dotsRow}>
              {gridData.map((week, weekIndex) => {
                const { date, value } = week[dayIndex]
                const today = new Date()
                const isFuture = date > today

                return (
                  <View
                    key={`dot-${weekIndex}-${dayIndex}`}
                    style={[$dot, getDotStyle(isFuture, value)]}
                  />
                )
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  paddingVertical: 12,
})

const $monthLabelsContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: 6,
}

const $dayLabelSpacer: ViewStyle = {}

const $monthLabelsRow: ViewStyle = {
  flexDirection: "row",
  position: "relative",
  height: 14,
  flex: 1,
}

const $monthLabel: ThemedStyle<TextStyle> = (theme) => ({
  position: "absolute",
  fontSize: 9,
  color: theme.colors.textDim,
})

const $gridRow: ViewStyle = {
  flexDirection: "row",
}

const $dayLabelsColumn: ViewStyle = {}

const $dayLabelCell: ViewStyle = {
  justifyContent: "center",
  alignItems: "flex-end",
}

const $dayLabel: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 9,
  color: theme.colors.textDim,
})

const $dotsContainer: ViewStyle = {
  flexDirection: "column",
  flex: 1,
}

const $dotsRow: ViewStyle = {
  flexDirection: "row",
}

const $dot: ViewStyle = {}

export default Grid
