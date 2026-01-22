import { useMemo, useState, useEffect, useRef } from "react"
import { View, ViewStyle, TextStyle, LayoutChangeEvent, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import type { ThemedStyle } from "@/theme"

interface OnboardingWowScreenProps {
  onComplete: () => void
}

const SQUARES_PER_ROW = 7
const GRID_MARGIN = 20
const SQUARE_GAP = 5
const NUM_ROWS = 10 // Total number of rows to display

const OnboardingWowScreen: React.FC<OnboardingWowScreenProps> = ({ onComplete }) => {
  const { theme, themeContext, themed } = useAppTheme()
  const [containerWidth, setContainerWidth] = useState(0)
  const [currentRow, setCurrentRow] = useState(0)
  const animationRefs = useRef<Animated.Value[][]>([])
  const textOpacity = useRef(new Animated.Value(0)).current
  const screenOpacity = useRef(new Animated.Value(1)).current
  const finalTextOpacity = useRef(new Animated.Value(0)).current

  // Calculate square size based on available width
  const squareSize = useMemo(() => {
    if (containerWidth === 0) return 0
    const availableWidth = containerWidth - GRID_MARGIN * 2
    // availableWidth = SQUARES_PER_ROW * squareSize + (SQUARES_PER_ROW - 1) * SQUARE_GAP
    // availableWidth = SQUARES_PER_ROW * squareSize + (SQUARES_PER_ROW - 1) * SQUARE_GAP
    // availableWidth = squareSize * SQUARES_PER_ROW + SQUARE_GAP * (SQUARES_PER_ROW - 1)
    // availableWidth - SQUARE_GAP * (SQUARES_PER_ROW - 1) = squareSize * SQUARES_PER_ROW
    const calculatedSize = (availableWidth - SQUARE_GAP * (SQUARES_PER_ROW - 1)) / SQUARES_PER_ROW
    return Math.floor(calculatedSize)
  }, [containerWidth])

  // Generate dummy anxiety data - decreasing from top to bottom
  // Top rows have higher anxiety (5), bottom rows have lower anxiety (1)
  const gridData = useMemo(() => {
    const data: number[][] = []
    for (let row = 0; row < NUM_ROWS; row++) {
      const rowData: number[] = []
      // Calculate base anxiety level for this row (5 at top, 1 at bottom)
      const baseAnxiety = Math.max(1, 5 - Math.floor((row / NUM_ROWS) * 4))
      for (let col = 0; col < SQUARES_PER_ROW; col++) {
        // For early rows (first 3), add bright spots (low anxiety) occasionally but less frequently
        if (row < 3 && baseAnxiety >= 4) {
          // 10% chance of a bright spot (anxiety 1 or 2) in early rows - reduced for higher red concentration
          if (Math.random() < 0.1) {
            const brightSpot = Math.random() < 0.5 ? 1 : 2
            rowData.push(brightSpot)
            continue
          }
        }
        // For middle rows (rows 3-5, excluding bottom 4), add dark spots (high anxiety) occasionally
        if (row >= 3 && row < NUM_ROWS - 4 && baseAnxiety < 4) {
          // 15% chance of a dark spot (anxiety 4 or 5) in middle rows
          if (Math.random() < 0.15) {
            const darkSpot = Math.random() < 0.5 ? 4 : 5
            rowData.push(darkSpot)
            continue
          }
        }
        // Add some variation to make it more interesting
        // For first 3 rows, reduce variation to keep higher concentration of red
        const maxVariation = row < 3 ? 0 : 1
        const variation = Math.floor(Math.random() * (maxVariation * 2 + 1)) - maxVariation // -maxVariation to maxVariation
        const anxiety = Math.max(1, Math.min(5, baseAnxiety + variation))
        rowData.push(anxiety)
      }
      data.push(rowData)
    }
    return data
  }, [])

  // Initialize animation values
  useEffect(() => {
    animationRefs.current = gridData.map((row) => row.map(() => new Animated.Value(0)))
  }, [gridData])

  // Fade in text on mount
  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [textOpacity])

  // Animate rows one by one
  useEffect(() => {
    if (currentRow >= NUM_ROWS) {
      // All rows animated, wait 1 second then fade out the screen over 1 second
      const timer = setTimeout(() => {
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          // After screen fades out, fade in the final text
          Animated.timing(finalTextOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            // Show the text for 2 seconds, then fade it out
            setTimeout(() => {
              Animated.timing(finalTextOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start(() => {
                onComplete()
              })
            }, 2000)
          })
        })
      }, 1000)
      return () => clearTimeout(timer)
    }

    // Animate all squares in current row
    const animations = gridData[currentRow].map((_, colIndex) => {
      return Animated.timing(animationRefs.current[currentRow][colIndex], {
        toValue: 1,
        duration: 150,
        delay: colIndex * 50, // Stagger each square in the row
        useNativeDriver: true,
      })
    })

    // Start the animations
    Animated.parallel(animations).start()

    // Start next row when the last square of current row starts animating
    // Last square starts at: (SQUARES_PER_ROW - 1) * 50 = 6 * 50 = 300ms
    // Start next row shortly after that for fluid transition
    const lastSquareStartDelay = (SQUARES_PER_ROW - 1) * 50
    const nextRowStartDelay = lastSquareStartDelay + 100 // Start next row 100ms after last square starts

    const timer = setTimeout(() => {
      setCurrentRow((prev) => prev + 1)
    }, nextRowStartDelay)

    return () => clearTimeout(timer)
  }, [currentRow, gridData, onComplete])

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  const getColorForValue = (level: number): string => {
    // Use same color logic as AnxietyGrid
    const colors =
      themeContext === "dark"
        ? {
            // Dark mode: reversed order - darkest for highest anxiety
            1: theme.colors.palette.accent600,
            2: theme.colors.palette.accent500,
            3: theme.colors.palette.accent400,
            4: theme.colors.palette.accent300,
            5: theme.colors.palette.accent100,
          }
        : {
            // Light mode: normal order - darkest for highest anxiety
            1: theme.colors.palette.accent200,
            2: theme.colors.palette.accent300,
            3: theme.colors.palette.accent400,
            4: theme.colors.palette.accent500,
            5: theme.colors.palette.accent600,
          }

    return colors[level as keyof typeof colors] || theme.colors.separator
  }

  return (
    <View style={[themed($container), { backgroundColor: theme.colors.background }]}>
      <Animated.View style={[themed($container), { opacity: screenOpacity }]}>
        <SafeAreaView style={themed($safeArea)}>
          <View style={themed($content)} onLayout={handleLayout}>
            <Animated.View style={{ opacity: textOpacity }}>
              <Text
                preset="heading"
                style={[themed($title), { color: theme.colors.text }]}
                text="Tame your anxiety"
              />
              <Text
                preset="default"
                size="md"
                style={[themed($subheader), { color: theme.colors.textDim }]}
                text="Track your anxiety and watch it go down over time"
              />
            </Animated.View>

            <View style={themed($gridContainer)}>
              {gridData.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={themed($row)}>
                  {row.map((anxietyLevel, colIndex) => {
                    const animatedValue = animationRefs.current[rowIndex]?.[colIndex]
                    if (!animatedValue) return null

                    const scale = animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    })

                    const opacity = animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    })

                    const marginRight = colIndex < SQUARES_PER_ROW - 1 ? SQUARE_GAP : 0

                    return (
                      <Animated.View
                        key={`square-${rowIndex}-${colIndex}`}
                        style={[
                          themed($square),
                          {
                            width: squareSize,
                            height: squareSize,
                            backgroundColor: getColorForValue(anxietyLevel),
                            marginRight,
                            transform: [{ scale }],
                            opacity,
                          },
                        ]}
                      />
                    )
                  })}
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
      <Animated.View style={[themed($finalTextContainer), { opacity: finalTextOpacity }]}>
        <Text
          preset="subheading"
          style={[themed($finalText), { color: theme.colors.text }]}
          text="We're glad you're here"
        />
      </Animated.View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $safeArea: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $content: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: GRID_MARGIN,
  paddingVertical: GRID_MARGIN,
})

const $title: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 12,
  textAlign: "center",
})

const $subheader: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 40,
  textAlign: "center",
})

const $gridContainer: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  alignItems: "center",
})

const $row: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  marginBottom: SQUARE_GAP,
})

const $square: ThemedStyle<ViewStyle> = () => ({
  borderRadius: 4,
})

const $finalTextContainer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
})

const $finalText: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
})

export default OnboardingWowScreen
