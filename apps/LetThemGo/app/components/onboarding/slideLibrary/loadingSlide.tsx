import { useEffect, useRef } from "react"
import { View, StyleSheet, useWindowDimensions } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"
import LottieView from "lottie-react-native"
import type { ISlide } from "@/types/ISlide"
import { useAppTheme } from "@/utils/useAppTheme"

type LoadingSlideProps = {
  onSelection?: () => void
  isActive?: boolean
}

const LOADING_DURATION = 5000 // 5 seconds

function LoadingSlideComponent({ onSelection, isActive = false }: LoadingSlideProps) {
  const { theme } = useAppTheme()
  const { width } = useWindowDimensions()
  const progress = useSharedValue(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lottieRef = useRef<LottieView>(null)

  // Animate progress bar and start Lottie animation only when slide becomes active
  useEffect(() => {
    if (!isActive) {
      // Reset progress when not active
      progress.value = 0
      // Stop Lottie animation
      lottieRef.current?.pause()
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    // Start Lottie animation
    lottieRef.current?.play()

    // Animate progress bar from 0 to 100% over 5 seconds
    progress.value = withTiming(1, {
      duration: LOADING_DURATION,
      easing: Easing.linear,
    })

    // Auto-advance after 5 seconds
    timeoutRef.current = setTimeout(() => {
      onSelection?.()
    }, LOADING_DURATION)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isActive, progress, onSelection])

  const progressBarWidth = width * 0.8 // 80% of screen width
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: progress.value * progressBarWidth,
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          ref={lottieRef}
          source={require("../../../../assets/animations/heart.json")}
          loop
          style={styles.lottie}
        />
      </View>
      <View style={[styles.progressBarContainer, { width: progressBarWidth }]}>
        <View style={[styles.progressBarTrack, { backgroundColor: theme.colors.border }]}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: theme.colors.tint,
              },
              animatedProgressStyle,
            ]}
          />
        </View>
      </View>
    </View>
  )
}

export function loadingSlide({ onSelection }: LoadingSlideProps): ISlide {
  return {
    id: "loading",
    description: "Ready to heal",
    component: <LoadingSlideComponent onSelection={onSelection} />,
    textPlacement: "bottom",
    textAlignment: "center",
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  lottieContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  lottie: {
    height: 200,
    width: 200,
  },
  progressBarContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  progressBarTrack: {
    borderRadius: 4,
    height: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    borderRadius: 4,
    height: "100%",
  },
})

