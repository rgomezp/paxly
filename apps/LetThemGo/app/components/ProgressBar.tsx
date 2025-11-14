import { ISlide } from "@/types/ISlide"
import { useEffect, useRef } from "react"
import { View, Animated, useWindowDimensions } from "react-native"
import { progressBarStyles } from "../theme/styles"
import { useAppTheme } from "@/utils/useAppTheme"

type ProgressBarProps =
  | {
      // Scroll-based navigation (for carousels)
      data: ISlide[]
      scrollX: Animated.Value
      highlightedColor?: string
      widthPercent?: number
    }
  | {
      // Index-based navigation (for step-by-step lessons)
      currentIndex: number
      totalItems: number
      highlightedColor?: string
      widthPercent?: number
    }

export default function ProgressBar(props: ProgressBarProps) {
  const { theme } = useAppTheme()
  const { width } = useWindowDimensions()
  const progressWidth = useRef(new Animated.Value(0)).current

  // Use theme-aware tint color if no highlightedColor is provided
  const color = props.highlightedColor || theme.colors.tint

  // Determine if using scroll-based or index-based navigation
  const isScrollBased = "scrollX" in props && "data" in props
  const totalItems = isScrollBased ? props.data.length : props.totalItems
  const widthPercent = props.widthPercent ?? 0.8
  const progressBarWidth = width * widthPercent

  useEffect(() => {
    if (isScrollBased && props.scrollX) {
      // Scroll-based navigation
      const listener = props.scrollX.addListener(({ value }) => {
        const currentProgress = Math.min(value / width, totalItems - 1)
        const animatedProgress = (currentProgress / (totalItems - 1)) * progressBarWidth

        Animated.timing(progressWidth, {
          toValue: animatedProgress,
          duration: 300,
          useNativeDriver: false,
        }).start()
      })

      return () => {
        props.scrollX.removeListener(listener)
      }
    } else if (!isScrollBased) {
      // Index-based navigation
      const currentProgress = props.currentIndex
      const animatedProgress =
        totalItems > 1 ? (currentProgress / (totalItems - 1)) * progressBarWidth : progressBarWidth

      Animated.timing(progressWidth, {
        toValue: animatedProgress,
        duration: 300,
        useNativeDriver: false,
      }).start()
    }
  }, [
    isScrollBased,
    isScrollBased ? props.scrollX : props.currentIndex,
    progressBarWidth,
    totalItems,
    width,
    progressWidth,
  ])

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
