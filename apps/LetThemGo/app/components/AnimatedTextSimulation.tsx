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

  // Update the ref when onAnimationComplete changes
  useEffect(() => {
    onCompleteRef.current = onAnimationComplete
  }, [onAnimationComplete])

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
      indexRef.current = 1
      // Initialize with first token to avoid layout jank
      if (tokens.length > 0) {
        setCurrentTokens([tokens[0]])
      } else {
        setCurrentTokens([])
      }
    }

    // Only start animation if shouldStart is true
    if (!shouldStart) {
      return
    }

    // Don't restart if we've already started for this text
    if (hasStartedRef.current && !textChanged) {
      return
    }

    let isMounted = true
    hasStartedRef.current = true
    indexRef.current = 1 // Reset index when starting animation

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
          return [...prev, tokenToAdd]
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
