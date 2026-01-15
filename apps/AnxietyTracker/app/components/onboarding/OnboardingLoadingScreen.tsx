import { useEffect, useRef } from "react"
import { View, StyleSheet, useWindowDimensions, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated"
import LottieView from "lottie-react-native"
import { useAppTheme } from "@/utils/useAppTheme"

const LOADING_DURATION = 5000 // 5 seconds

interface OnboardingLoadingScreenProps {
  onComplete: () => void
}

export default function OnboardingLoadingScreen({ onComplete }: OnboardingLoadingScreenProps) {
  const { theme } = useAppTheme()
  const { width } = useWindowDimensions()
  const progress = useSharedValue(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lottieRef = useRef<LottieView>(null)

  // Animate progress bar and start Lottie animation when component mounts
  useEffect(() => {
    // Start Lottie animation
    lottieRef.current?.play()

    // Animate progress bar from 0 to 100% over 5 seconds
    progress.value = withTiming(1, {
      duration: LOADING_DURATION,
      easing: Easing.linear,
    })

    // Auto-advance after 5 seconds
    timeoutRef.current = setTimeout(() => {
      onComplete()
    }, LOADING_DURATION)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      // Note: We don't call pause() here because the native view will be destroyed
      // when the component unmounts, which automatically stops the animation.
      // Calling pause() can cause errors if the view is already destroyed.
    }
  }, [progress, onComplete])

  const progressBarWidth = width * 0.8 // 80% of screen width
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: progress.value * progressBarWidth,
    }
  })

  return (
    <View style={styles.rootContainer}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              ref={lottieRef}
              source={require("../../../assets/animations/blob.json")}
              loop
              style={styles.lottie}
            />
          </View>
          <Text style={[styles.text, { color: theme.colors.textDim }]}>Ready to heal</Text>
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
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  lottie: {
    height: 200,
    width: 200,
  },
  lottieContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  progressBarContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  progressBarFill: {
    borderRadius: 4,
    height: "100%",
  },
  progressBarTrack: {
    borderRadius: 4,
    height: 8,
    overflow: "hidden",
  },
  rootContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
})
