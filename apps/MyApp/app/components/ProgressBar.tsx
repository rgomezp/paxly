import { ISlide } from "@/types/ISlide"
import { useEffect, useRef } from "react"
import { View, Animated, useWindowDimensions } from "react-native"
import { progressBarStyles } from "../theme/styles"
import { useAppTheme } from "@/utils/useAppTheme"

type ProgressBarProps = {
  data: ISlide[]
  scrollX: Animated.Value
  highlightedColor?: string
}

export default function ProgressBar({ data, scrollX, highlightedColor }: ProgressBarProps) {
  const { theme } = useAppTheme()
  const { width } = useWindowDimensions()
  const progressWidth = useRef(new Animated.Value(0)).current

  // Use theme-aware tint color if no highlightedColor is provided
  const color = highlightedColor || theme.colors.tint

  const totalSlides = data.length
  const progressBarWidth = width * 0.8 // 60% of screen width

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const currentProgress = Math.min(value / width, totalSlides - 1)
      const animatedProgress = (currentProgress / (totalSlides - 1)) * progressBarWidth

      Animated.timing(progressWidth, {
        toValue: animatedProgress,
        duration: 300,
        useNativeDriver: false,
      }).start()
    })

    return () => {
      scrollX.removeListener(listener)
    }
  }, [scrollX, progressBarWidth, totalSlides, width, progressWidth])

  return (
    <View style={progressBarStyles.container}>
      <View style={[progressBarStyles.track, { width: progressBarWidth }]}>
        <Animated.View
          style={[
            progressBarStyles.progress,
            {
              width: progressWidth,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  )
}
