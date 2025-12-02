import { FC, useEffect, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, ImageStyle, Image, Animated } from "react-native"
import Sound from "react-native-sound"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import AwardManager from "@/managers/AwardManager"
import BadgeManager from "@/managers/BadgeManager"
import { IAward } from "@/types/IAward"
import type { ThemedStyle } from "@/theme"
import RectangularButton from "@/components/buttons/RectangularButton"
import { getAwardImage } from "@/data/AwardImageRegistry"
import Log from "@/utils/Log"

// Conditionally import expo-image for animated WebP support
let ExpoImage: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ExpoImage = require("expo-image").Image
} catch {}

interface ClaimAwardScreenProps extends AppStackScreenProps<"ClaimAward"> {}

export const ClaimAwardScreen: FC<ClaimAwardScreenProps> = observer(function ClaimAwardScreen({
  navigation,
}) {
  const { themed, themeContext } = useAppTheme()
  const [award, setAward] = useState<IAward | null>(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Check for available award when screen loads
    const nextAward = AwardManager.getNextAward()
    setAward(nextAward)

    // If no award available, navigate back
    if (!nextAward) {
      navigation.goBack()
    }
  }, [navigation])

  useEffect(() => {
    // Fade in and scale up the award image when award is set
    if (award) {
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

      // Play award sparkle sound when award is set
      const playSparkleSound = () => {
        try {
          const sound = new Sound(
            require("../../assets/sounds/award_sparkle.mp3"),
            Sound.MAIN_BUNDLE,
            (error) => {
              if (error) {
                Log.error("ClaimAwardScreen: Failed to load award sparkle sound:", error)
                return
              }
              // Sound loaded successfully, start playing
              sound.setVolume(1.0)
              sound.play((playError) => {
                if (playError) {
                  Log.error("ClaimAwardScreen: Failed to play award sparkle sound:", playError)
                }
                // Auto-cleanup after playback completes
                sound.release()
              })
            },
          )
        } catch (error) {
          Log.error("ClaimAwardScreen: Failed to create award sparkle sound:", error)
        }
      }

      playSparkleSound()
    }
  }, [award, fadeAnim, scaleAnim])

  const handleClaim = () => {
    if (!award) return

    // Award the award (skip availability check since we already confirmed it's available)
    const awarded = AwardManager.award(true)

    if (awarded) {
      // Set badge on Me tab to indicate a new award was claimed
      BadgeManager.setBadge()

      // Reset navigation stack to TabNavigator, removing SingleLesson and ClaimAward from the stack
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }],
      })
    }
  }

  if (!award) {
    return null
  }

  const awardImage = getAwardImage(award.id)
  const spotlightImage =
    themeContext === "light"
      ? require("../../assets/images/spotlight_animation_light_mode.webp")
      : require("../../assets/images/spotlight_animation.webp")

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
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
          <Text style={themed($awardTitle)}>{award.name}</Text>
          <Text style={themed($awardDescription)}>{award.description}</Text>
        </View>
      </View>

      <RectangularButton onClick={handleClaim} buttonText="Claim" width="80%" />
    </Screen>
  )
})

const $awardTitleAndDescription: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
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
  marginBottom: 24,
  width: "80%",
  height: "45%",
})

const $awardImageContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 2,
  width: "100%",
  position: "relative",
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
  width: "100%",
  height: "100%",
  maxWidth: 200,
  maxHeight: 200,
  zIndex: 1,
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

const $awardTitle: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 24,
  fontWeight: "bold",
  color: theme.colors.text,
  marginTop: 20,
  textAlign: "center",
})

const $awardDescription: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 16,
  color: theme.colors.textDim,
  marginTop: 12,
  textAlign: "center",
  paddingHorizontal: 10,
})
