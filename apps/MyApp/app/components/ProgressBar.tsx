import { ISlide } from "@/types/ISlide"
import { useEffect, useRef } from "react"
import { View, Animated, useWindowDimensions } from "react-native"
import { progressBarStyles } from "../theme/styles"

type ProgressBarProps = {
  data: ISlide[]
  scrollX: Animated.Value
  highlightedColor?: string
}

export default function ProgressBar({
  data,
  scrollX,
  highlightedColor = "#007AFF",
}: ProgressBarProps) {
  const { width } = useWindowDimensions()
  const progressWidth = useRef(new Animated.Value(0)).current

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
              backgroundColor: highlightedColor,
            },
          ]}
        />
      </View>
    </View>
  )
}
