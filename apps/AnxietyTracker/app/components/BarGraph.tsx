import { FC, useMemo } from "react"
import { View, ViewStyle, Text as RNText, TextStyle } from "react-native"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { spacing } from "@/theme"

export type BarSegment = {
  key: string
  color: string
  value: number
}

export type BarData = {
  key: string
  label: string
  segments: BarSegment[]
  total: number
}

export type LegendItem = {
  color: string
  label: string
}

type BarGraphProps = {
  data: BarData[]
  title?: string
  showTitle?: boolean
  chartHeight?: number
  containerStyle?: ViewStyle
  legendItems?: LegendItem[]
  gridColor?: string
}

export const BarGraph: FC<BarGraphProps> = function BarGraph({
  data,
  title,
  showTitle = true,
  chartHeight: propChartHeight,
  containerStyle,
  legendItems,
  gridColor,
}) {
  const { theme, themed } = useAppTheme()

  const chartHeight = propChartHeight || 180
  const effectiveGridColor = gridColor || theme.colors.palette.neutral

  // Determine Y-axis scale dynamically from data
  const maxTotal = Math.max(0, ...data.map((b) => b.total))
  const yStep = maxTotal > 10 ? 2 : 1
  // If stepping by 2, round the top up to the next even number so the last tick aligns
  const yMax = maxTotal > 10 ? maxTotal + (maxTotal % 2) : maxTotal
  const yTicks = useMemo(() => {
    const ticks: number[] = []
    for (let v = 0; v <= yMax; v += yStep) ticks.push(v)
    return ticks
  }, [yMax, yStep])
  const yAxisWidth = 28

  return (
    <View style={[themed($wrapper), containerStyle]}>
      {showTitle && title && (
        <Text
          text={title}
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
                  { backgroundColor: effectiveGridColor, marginLeft: yAxisWidth },
                ])}
              />
            </View>
          )
        })}

        {/* Bars */}
        <View style={[$barsRow, { height: chartHeight, marginLeft: yAxisWidth }]}>
          {data.map((bar) => {
            const denom = yMax === 0 ? 1 : yMax
            const totalHeight = bar.total === 0 ? 0 : (bar.total / denom) * chartHeight
            
            // Calculate heights for each segment
            const segmentHeights = bar.segments.map((seg) =>
              bar.total === 0 ? 0 : (seg.value / denom) * chartHeight
            )

            return (
              <View key={bar.key} style={$barWrapper}>
                <View style={[$barBox, { height: chartHeight }]}>
                  <View style={[$bar, { height: totalHeight }]}>
                    {bar.segments.map((seg, index) => {
                      const isFirst = index === 0
                      const isLast = index === bar.segments.length - 1
                      return (
                        <View
                          key={seg.key}
                          style={[
                            {
                              height: segmentHeights[index],
                              backgroundColor: seg.color,
                            },
                            isFirst && $barTopSegment,
                            isLast && $barBottomSegment,
                          ]}
                        />
                      )
                    })}
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        {/* Labels */}
        <View style={[$labelsRow, { marginLeft: yAxisWidth }]}>
          {data.map((bar) => (
            <View key={`label-${bar.key}`} style={$barWrapper}>
              <RNText style={themed([$barLabelText, { color: theme.colors.textDim }])}>
                {bar.label}
              </RNText>
            </View>
          ))}
        </View>

        {/* Legend */}
        {legendItems && legendItems.length > 0 && (
          <View style={$legendRow}>
            {legendItems.map((item) => (
              <LegendDot
                key={item.label}
                color={item.color}
                label={item.label}
                textColor={theme.colors.text}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

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

export default BarGraph

