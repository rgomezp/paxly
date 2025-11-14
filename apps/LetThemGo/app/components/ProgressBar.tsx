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

  // Extract dependencies to avoid complex expressions in dependency array
  const scrollX = isScrollBased ? props.scrollX : null
  const currentIndex = !isScrollBased ? props.currentIndex : null

  useEffect(() => {
    if (isScrollBased && scrollX) {
      // Scroll-based navigation
      const listener = scrollX.addListener(({ value }) => {
        const currentProgress = Math.min(value / width, totalItems - 1)
        const animatedProgress = (currentProgress / (totalItems - 1)) * progressBarWidth

        Animated.timing(progressWidth, {
          toValue: animatedProgress,
          duration: 300,
          useNativeDriver: false,
        }).start()
      })

      return () => {
        scrollX.removeListener(listener)
      }
    } else if (!isScrollBased && currentIndex !== null) {
      // Index-based navigation
      const animatedProgress =
        totalItems > 1 ? (currentIndex / (totalItems - 1)) * progressBarWidth : progressBarWidth

      Animated.timing(progressWidth, {
        toValue: animatedProgress,
        duration: 300,
        useNativeDriver: false,
      }).start()
    }
  }, [
    isScrollBased,
    scrollX,
    currentIndex,
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
