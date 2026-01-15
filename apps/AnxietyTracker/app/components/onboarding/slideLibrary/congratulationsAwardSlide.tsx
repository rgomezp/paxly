import { View, Image, Animated, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { ISlide } from "@/types/ISlide"
import { useEffect, useRef, useCallback } from "react"
import { createAudioPlayer } from "expo-audio"
import AwardManager from "@/managers/AwardManager"
import BadgeManager from "@/managers/BadgeManager"
import { BadgeType } from "@/types/IBadgeData"
import { AWARD_SEQUENCE } from "@/data/AwardSequence"
import { getAwardImage } from "@/data/AwardImageRegistry"
import Log from "@/utils/Log"

type CongratulationsAwardSlideProps = {
  onSelection?: () => void
}

const FIRST_AWARD = AWARD_SEQUENCE[0] // "miracle-legumes"

// Shared state to trigger animation from onLoad callback
let triggerAnimationRef: (() => void) | null = null

export function congratulationsAwardSlide({
  onSelection: _onSelection,
}: CongratulationsAwardSlideProps): ISlide {
  // Award the first award when the slide loads (if not already earned)
  const onLoad = async () => {
    try {
      const earnedAwards = AwardManager.getEarnedAwards()
      const alreadyEarned = earnedAwards.some((award) => award.id === FIRST_AWARD.id)

      if (!alreadyEarned) {
        // Award the first award (skip availability check)
        const awarded = AwardManager.award(true)
        if (awarded) {
          Log.info(`CongratulationsAwardSlide: Awarded first award: ${awarded.name}`)
          // Set badge on Me tab to indicate a new award was claimed
          BadgeManager.setBadge(BadgeType.MY_STUFF)
        }
      }

      // Trigger animation when slide becomes active (delay to ensure component is mounted)
      setTimeout(() => {
        if (triggerAnimationRef) {
          triggerAnimationRef()
        }
      }, 300)
    } catch (error) {
      Log.error(`CongratulationsAwardSlide: Error awarding award: ${error}`)
    }
  }

  return {
    id: "congratulationsAward",
    title: "Congratulations!",
    description: "Earn rewards as you complete lessons.",
    component: <CongratulationsAwardComponent />,
    onLoad,
    textPlacement: "top",
    textAlignment: "center",
  }
}

interface CongratulationsAwardComponentProps {
  isActive?: boolean
}

const CongratulationsAwardComponent: React.FC<CongratulationsAwardComponentProps> = ({
  isActive = false,
}) => {
  const { themed, themeContext } = useAppTheme()
  const awardImage = getAwardImage(FIRST_AWARD.id)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current
  const hasAnimated = useRef(false)
  const animationTriggered = useRef(false)

  const startAnimation = useCallback(() => {
    if (hasAnimated.current) {
      return
    }
    hasAnimated.current = true

    // Play award sparkle sound
    const playSparkleSound = () => {
      try {
        const sound = createAudioPlayer(require("../../../../assets/sounds/award_sparkle.mp3"))
        sound.volume = 1.0
        sound.play()

        // Set up listener for auto-cleanup when playback finishes
        const removeListener = sound.addListener("playbackStatusUpdate", (status: any) => {
          if (status.didJustFinish) {
            sound.remove()
            removeListener.remove()
          }
        })
      } catch (error) {
        Log.error("CongratulationsAwardSlide: Failed to play award sparkle sound:", error)
      }
    }

    playSparkleSound()

    // Reset animation values to ensure they start from 0
    fadeAnim.setValue(0)
    scaleAnim.setValue(0)

    // Use requestAnimationFrame to ensure the component has rendered before starting animation
    requestAnimationFrame(() => {
      // Start animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }, [fadeAnim, scaleAnim])

  // Set up the trigger function that onLoad can call
  useEffect(() => {
    triggerAnimationRef = () => {
      if (!animationTriggered.current) {
        animationTriggered.current = true
        startAnimation()
      }
    }
    return () => {
      triggerAnimationRef = null
    }
  }, [startAnimation])

  // Also trigger animation when isActive becomes true (fallback)
  useEffect(() => {
    if (isActive && !hasAnimated.current && !animationTriggered.current) {
      animationTriggered.current = true
      startAnimation()
    } else if (!isActive) {
      // Reset animation state when slide becomes inactive
      hasAnimated.current = false
      animationTriggered.current = false
      fadeAnim.setValue(0)
      scaleAnim.setValue(0)
    }
  }, [isActive, startAnimation, fadeAnim, scaleAnim])

  const spotlightImage =
    themeContext === "light"
      ? require("../../../../assets/images/spotlight_animation_light_mode.webp")
      : require("../../../../assets/images/spotlight_animation.webp")

  return (
    <View style={$container}>
      <View style={themed($awardCard)}>
        {/* Award image with spotlight background */}
        <View style={$awardImageContainer}>
          {/* Spotlight background - use expo-image for animated WebP support */}
          {ExpoImage ? (
            <ExpoImage
              source={spotlightImage}
              style={$spotlightImage}
              contentFit="contain"
              transition={0}
            />
          ) : (
            <Image source={spotlightImage} style={$spotlightImage} resizeMode="contain" />
          )}
          {/* Award image on top with fade-in and scale animation */}
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
              $awardImageWrapper,
            ]}
          >
            {awardImage ? (
              <Image source={awardImage} style={$awardImage} resizeMode="contain" />
            ) : (
              <Text style={$awardImagePlaceholderText}>🏆</Text>
            )}
          </Animated.View>
        </View>

        {/* Award title and description */}
        <View style={$awardTitleAndDescription}>
          <Text style={themed($awardTitle)}>{FIRST_AWARD.name}</Text>
          <Text style={themed($awardDescription)}>{FIRST_AWARD.description}</Text>
        </View>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
}

const $awardCard: ThemedStyle<ViewStyle> = (theme) => ({
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.card,
  borderRadius: 16,
  padding: 40,
  width: "80%",
  height: "45%",
})

const $awardImageContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 2,
  width: "100%",
  position: "relative",
  overflow: "visible",
}

const $spotlightImage: ImageStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  maxWidth: 250,
  maxHeight: 250,
  zIndex: 0,
}

const $awardImageWrapper: ViewStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  maxWidth: 200,
  maxHeight: 200,
  zIndex: 10,
  justifyContent: "center",
  alignItems: "center",
}

const $awardImage: ImageStyle = {
  width: "100%",
  height: "100%",
}

const $awardImagePlaceholderText: TextStyle = {
  fontSize: 120,
  lineHeight: 150,
}

const $awardTitleAndDescription: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "100%",
}

const $awardTitle: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 24,
  fontWeight: "bold",
  color: theme.colors.text,
  marginTop: 20,
  textAlign: "center",
  width: "100%",
})

const $awardDescription: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 16,
  color: theme.colors.textDim,
  marginTop: 12,
  textAlign: "center",
  paddingHorizontal: 20,
  width: "100%",
})
