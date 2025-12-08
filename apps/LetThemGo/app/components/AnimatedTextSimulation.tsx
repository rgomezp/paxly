import { useEffect, useState, useRef } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { Text } from "./Text"

interface AnimatedTextSimulationProps {
  text: string
  tokenizer?: (text: string) => string[]
  minDelay?: number
  maxDelay?: number
  separator?: string
  onAnimationComplete?: () => void
  shouldStart?: boolean
  style?: StyleProp<TextStyle>
}

const defaultTokenizer = (t: string) => t.split(/(\s+)/)

export function AnimatedTextSimulation({
  text,
  tokenizer = defaultTokenizer,
  minDelay = 50,
  maxDelay = 100,
  separator = "",
  onAnimationComplete,
  shouldStart = true,
  style,
}: AnimatedTextSimulationProps) {
  const [currentTokens, setCurrentTokens] = useState<string[]>([])
  const onCompleteRef = useRef(onAnimationComplete)
  const hasStartedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentTextRef = useRef<string>("")
  const tokensRef = useRef<string[]>([])
  const indexRef = useRef<number>(1)
  const currentTokensLengthRef = useRef<number>(0)

  // Update the ref when onAnimationComplete changes
  useEffect(() => {
    onCompleteRef.current = onAnimationComplete
  }, [onAnimationComplete])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const tokens = tokenizer(text)
    tokensRef.current = tokens

    // Reset state if text has changed
    const textChanged = currentTextRef.current !== text
    if (textChanged) {
      currentTextRef.current = text
      hasStartedRef.current = false
      // Initialize with first token to avoid layout jank
      if (tokens.length > 0) {
        setCurrentTokens([tokens[0]])
        // Start index at 1 since tokens[0] is already rendered
        indexRef.current = 1
        currentTokensLengthRef.current = 1
      } else {
        setCurrentTokens([])
        indexRef.current = 0
        currentTokensLengthRef.current = 0
      }
    }

    // Reset hasStarted when shouldStart becomes false (e.g., navigating away)
    // This allows the animation to restart when returning to the slide
    if (!shouldStart) {
      hasStartedRef.current = false
      return
    }

    // Check if animation is complete by comparing current tokens length with total tokens
    const isAnimationComplete = currentTokensLengthRef.current >= tokens.length

    // Don't restart if we've already started for this text AND animation is complete
    if (hasStartedRef.current && !textChanged && isAnimationComplete) {
      return
    }

    // If animation was interrupted (incomplete), reset state to restart
    if (hasStartedRef.current && !textChanged && !isAnimationComplete) {
      hasStartedRef.current = false
      // Reset to first token if we're restarting an incomplete animation
      if (tokens.length > 0) {
        setCurrentTokens([tokens[0]])
        indexRef.current = 1
        currentTokensLengthRef.current = 1
      }
    }

    let isMounted = true
    hasStartedRef.current = true
    // Don't reset index here - it's already set correctly above when text changed
    // If text hasn't changed but animation is starting, ensure index is correct
    if (!textChanged && tokens.length > 0 && indexRef.current === 0) {
      indexRef.current = 1
    }

    const addNextToken = () => {
      const currentIndex = indexRef.current
      const currentTokens = tokensRef.current

      if (!isMounted || currentIndex >= currentTokens.length) {
        if (isMounted && currentIndex >= currentTokens.length) {
          onCompleteRef.current?.()
        }
        return
      }

      const delay = Math.random() * (maxDelay - minDelay) + minDelay

      timeoutRef.current = setTimeout(() => {
        if (!isMounted) return
        setCurrentTokens((prev) => {
          // Ensure we're adding the correct token at the correct index
          const tokenToAdd = currentTokens[currentIndex]
          const newTokens = [...prev, tokenToAdd]
          currentTokensLengthRef.current = newTokens.length
          return newTokens
        })
        indexRef.current = currentIndex + 1
        addNextToken()
      }, delay)
    }

    addNextToken()

    return () => {
      isMounted = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
    // We intentionally don't include currentTokens.length to avoid restarting animation on each token update
    // Instead, we use currentTokensLengthRef to track completion status
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, tokenizer, minDelay, maxDelay, shouldStart])

  const $container: ViewStyle = { position: "relative" }
  const $invisibleText: TextStyle = { opacity: 0 }
  const $overlayContainer: ViewStyle = { position: "absolute", top: 0, left: 0, right: 0 }

  return (
    <View style={$container}>
      {/* Invisible full text to reserve space */}
      <Text style={[style, $invisibleText]}>{text}</Text>
      {/* Animated text overlaid on top */}
      <View style={$overlayContainer}>
        <Text style={style}>{currentTokens.join(separator)}</Text>
      </View>
    </View>
  )
}
