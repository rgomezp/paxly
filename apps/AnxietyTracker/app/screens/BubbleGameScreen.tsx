import { FC, useRef, useState, useCallback, useEffect } from "react"
import {
  View,
  ViewStyle,
  Dimensions,
  Animated,
  Image,
  ImageStyle,
  TouchableOpacity,
} from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen } from "@/components/Screen"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useAudio } from "@/hooks/useAudio"
import { useFocusEffect } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { createAudioPlayer } from "expo-audio"

interface BubbleGameScreenProps extends AppStackScreenProps<"BubbleGame"> {}

interface Bubble {
  id: string
  lane: number
  animValue: Animated.Value
  size: "small" | "large"
  color: "blue" | "red"
  x: number
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const NUM_LANES = 8
const LANE_WIDTH = SCREEN_WIDTH / NUM_LANES
const BUBBLE_SPEED = 50 // pixels per second
const SPAWN_INTERVAL_MIN = 200 // milliseconds
const SPAWN_INTERVAL_MAX = 500 // milliseconds
const BUBBLE_SMALL_SIZE = 40
const BUBBLE_LARGE_SIZE = 60

export const BubbleGameScreen: FC<BubbleGameScreenProps> = function BubbleGameScreen() {
  const { theme, themed } = useAppTheme()
  const insets = useSafeAreaInsets()
  const isAudioSetup = useAudio()
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [count, setCount] = useState(0)
  const bubbleIdCounter = useRef(0)
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRefs = useRef<Map<string, Animated.CompositeAnimation>>(new Map())
  const isActiveRef = useRef(true)
  const popSoundRef = useRef<ReturnType<typeof createAudioPlayer> | null>(null)

  // Preload and reuse the pop sound to reduce latency and avoid creating
  // a new audio player instance on every bubble press.
  useEffect(() => {
    if (!isAudioSetup) return

    if (!popSoundRef.current) {
      const sound = createAudioPlayer(require("../../assets/sounds/bubble_pop.mp3"))
      sound.volume = 1.0
      popSoundRef.current = sound
    }

    return () => {
      if (popSoundRef.current) {
        try {
          popSoundRef.current.remove()
        } catch {
          // Ignore cleanup errors
        }
        popSoundRef.current = null
      }
    }
  }, [isAudioSetup])

  const resetGame = useCallback(() => {
    // Clear spawn timer
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current)
      spawnTimerRef.current = null
    }

    // Stop all animations
    animationRefs.current.forEach((anim) => anim.stop())
    animationRefs.current.clear()

    // Clear bubbles
    setBubbles([])
    setCount(0)
    bubbleIdCounter.current = 0
  }, [])

  // Reset game when screen loses focus
  useFocusEffect(
    useCallback(() => {
      // Screen is focused - start the game
      isActiveRef.current = true

      const spawnBubble = () => {
        if (!isActiveRef.current) return

        const lane = Math.floor(Math.random() * NUM_LANES)
        const size = Math.random() > 0.5 ? "small" : "large"
        const color = Math.random() > 0.5 ? "blue" : "red"
        const bubbleId = `bubble-${bubbleIdCounter.current++}`

        const x = lane * LANE_WIDTH + LANE_WIDTH / 2

        const animValue = new Animated.Value(0)

        const bubble: Bubble = {
          id: bubbleId,
          lane,
          animValue,
          size,
          color,
          x,
        }

        setBubbles((prev) => [...prev, bubble])

        // Animate bubble upward (negative translateY moves up when using bottom positioning)
        const bubbleSize = size === "small" ? BUBBLE_SMALL_SIZE : BUBBLE_LARGE_SIZE
        // Calculate distance: game area height + bubble size + extra to go off screen
        const totalDistance = SCREEN_HEIGHT + bubbleSize + 100
        const animation = Animated.timing(animValue, {
          toValue: -totalDistance, // Move up past the top of screen
          duration: (totalDistance / BUBBLE_SPEED) * 1000, // Convert to milliseconds
          useNativeDriver: true,
        })

        animationRefs.current.set(bubbleId, animation)

        animation.start(({ finished }: { finished: boolean }) => {
          if (finished) {
            // Remove bubble when it goes off screen
            setBubbles((prev) => prev.filter((b) => b.id !== bubbleId))
            animationRefs.current.delete(bubbleId)
            // Clean up the animated value to prevent memory leaks
            animValue.removeAllListeners()
          }
        })

        // Schedule next spawn
        const nextSpawnDelay =
          Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN) + SPAWN_INTERVAL_MIN
        spawnTimerRef.current = setTimeout(spawnBubble, nextSpawnDelay)
      }

      // Start spawning
      spawnBubble()

      return () => {
        // Screen loses focus - reset everything
        isActiveRef.current = false
        resetGame()
      }
    }, [resetGame]),
  )

  const handleBubblePress = (bubbleId: string) => {
    // Stop animation
    const anim = animationRefs.current.get(bubbleId)
    if (anim) {
      anim.stop()
      animationRefs.current.delete(bubbleId)
    }

    // Play pop sound using a preloaded, shared audio player instance.
    // This avoids repeatedly creating/destroying players and significantly
    // reduces latency between the press event and the sound.
    const sound = popSoundRef.current
    if (sound) {
      try {
        sound.play()
      } catch {
        // Silently fail if sound can't be played
      }
    }

    // Remove bubble immediately
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId))

    // Increment counter
    setCount((prev) => prev + 1)
  }

  return (
    <Screen
      preset="fixed"
      style={themed($screen)}
      contentContainerStyle={themed($screenContent)}
      safeAreaEdges={["top", "left", "right"]}
    >
      <View style={themed($container)}>
        {/* Game area */}
        <View style={themed($gameArea)}>
          {bubbles.map((bubble) => {
            const size = bubble.size === "small" ? BUBBLE_SMALL_SIZE : BUBBLE_LARGE_SIZE
            const imageSource =
              bubble.color === "blue"
                ? require("../../assets/images/games/bubble/bubble_blue.png")
                : require("../../assets/images/games/bubble/bubble_red.png")

            return (
              <Animated.View
                key={bubble.id}
                style={[
                  themed($bubbleContainer),
                  {
                    left: bubble.x - size / 2,
                    width: size,
                    height: size,
                    transform: [{ translateY: bubble.animValue }],
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleBubblePress(bubble.id)}
                  style={themed($bubbleTouchable)}
                >
                  <Image
                    source={imageSource}
                    style={[
                      themed($bubbleImage),
                      {
                        width: size,
                        height: size,
                      },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </Animated.View>
            )
          })}
        </View>

        {/* Counter */}
        <View
          style={[themed($counterContainer), { paddingBottom: insets.bottom + 20 }]}
          pointerEvents="none"
        >
          <Text
            text={count.toString()}
            preset="heading"
            style={themed({
              color: theme.colors.text,
              fontSize: 48,
              fontWeight: "600",
              lineHeight: 48,
            })}
          />
        </View>
      </View>
    </Screen>
  )
}

const $screen: ViewStyle = {
  flex: 1,
}

const $screenContent: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  position: "relative",
}

const $gameArea: ViewStyle = {
  flex: 1,
  position: "relative",
  overflow: "hidden",
}

const $bubbleContainer: ViewStyle = {
  position: "absolute",
  bottom: -BUBBLE_LARGE_SIZE, // Start off-screen below the container
}

const $bubbleTouchable: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $bubbleImage: ImageStyle = {
  // Size is set dynamically
}

const $counterContainer: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 20,
}
