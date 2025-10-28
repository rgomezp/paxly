import { useRef, useState } from "react"
import { StyleSheet, ScrollView, Animated, Dimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import LottieView from "lottie-react-native"
import OnboardingItem from "./OnboardingItem"
import { useScrollContext } from "@/screens/OnboardingScreen/ScrollProvider"
import { ISlide } from "@/types/ISlide"
import { useSlides } from "./hooks/useSlides"
import ProgressBar from "../ProgressBar"
import NextButton from "../buttons/NextButton"
import StoreReviewManager from "@/managers/StoreReviewManager"
import Log from "@/utils/Log"
import { useCustomColor } from "@/hooks/useCustomColor"

const DARK_OVERLAY_COLOR = "rgba(0, 0, 0, 0.7)"

interface OnboardingSlidesViewProps {
  onComplete?: () => void
}

const OnboardingSlidesView: React.FC<OnboardingSlidesViewProps> = ({ onComplete }) => {
  const { scrollEnabled } = useScrollContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasShownReviewOnCurrentSlide, setHasShownReviewOnCurrentSlide] = useState(false)
  const { slides } = useSlides()
  const { color } = useCustomColor()

  const scrollX = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef<ScrollView>(null)
  const { width } = Dimensions.get("window")

  // Early return if no slides - at least show the background
  if (slides.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <LottieView
          source={require("../../../assets/blocks.json")}
          autoPlay
          loop
          speed={2}
          resizeMode="cover"
          style={styles.backgroundAnimation}
        />
        <View style={styles.backgroundOverlay} />
      </View>
    )
  }

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(offsetX / width)
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
      // setHasShownReviewOnCurrentSlide(false) // Reset review state on slide change
    }
    scrollX.setValue(offsetX)
  }

  // Placeholder for future scroll navigation feature
  const scrollTo = () => {
    if (isScrolling) return

    setIsScrolling(true)

    if (scrollViewRef.current && currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1
      scrollViewRef.current.scrollTo({
        x: nextIndex * width,
        animated: true,
      })

      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    } else {
      onComplete?.()
      setIsScrolling(false)
    }
  }

  const handleStoreReviewPrompt = async () => {
    if (!hasShownReviewOnCurrentSlide) {
      // First press: show review prompt
      setHasShownReviewOnCurrentSlide(true)
      try {
        const reviewShown = await StoreReviewManager.requestReview()
        if (!reviewShown) {
          // If review was not shown (cannot request), advance immediately
          scrollTo()
        }
        // If review was successfully shown, wait for second press to allow user to interact
      } catch (error) {
        Log.info(`StoreReviewManager: requestReview failed: ${error}`)
        // If review fails, advance immediately
        scrollTo()
      }
    } else {
      // Second press: advance to next slide
      scrollTo()
    }
  }

  return (
    <View style={styles.rootContainer}>
      <LottieView
        source={require("../../../assets/blocks.json")}
        autoPlay
        loop
        speed={2}
        resizeMode="cover"
        style={styles.backgroundAnimation}
      />
      <View style={styles.backgroundOverlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ProgressBar data={slides} scrollX={scrollX} highlightedColor={color} />
          <View style={styles.slides}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              scrollEnabled={scrollEnabled}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              onMoveShouldSetResponder={() => false}
              onStartShouldSetResponder={() => false}
            >
              {slides.map(
                (item: ISlide, index: number): React.ReactNode => (
                  <View key={item.id} style={[styles.slideItem, { width }]}>
                    <OnboardingItem item={item} currentIndex={currentIndex} slideIndex={index} />
                  </View>
                ),
              )}
            </ScrollView>
          </View>
          <NextButton
            scrollTo={scrollTo}
            onPressOverride={
              slides[currentIndex]?.showStoreReview ? handleStoreReviewPrompt : undefined
            }
            isDisabled={false}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundAnimation: {
    bottom: 0,
    height: "100%",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
  },
  backgroundOverlay: {
    backgroundColor: DARK_OVERLAY_COLOR,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  rootContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  slideItem: {},
  slides: {
    flex: 8,
  },
})

export default OnboardingSlidesView
