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

    // Initialize with first token to avoid layout jank
    if (tokens.length > 0) {
      setCurrentTokens([tokens[0]])
    } else {
      setCurrentTokens([])
    }

    // Only start animation if shouldStart is true
    if (!shouldStart) {
      hasStartedRef.current = false
      return
    }

    let isMounted = true
    hasStartedRef.current = true

    let index = 1 // Start from 1 since the first token is already shown

    const addNextToken = () => {
      if (!isMounted || index >= tokens.length) {
        if (isMounted && index >= tokens.length) {
          onCompleteRef.current?.()
        }
        return
      }

      const delay = Math.random() * (maxDelay - minDelay) + minDelay

      timeoutRef.current = setTimeout(() => {
        if (!isMounted) return
        setCurrentTokens((prev) => [...prev, tokens[index]])
        index++
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

  return (
    <View style={$container}>
      {/* Invisible full text to reserve space */}
      <Text style={[style, $invisibleText]}>{text}</Text>
      {/* Animated text overlaid on top */}
      <View style={$overlay}>
        <Text style={style}>{currentTokens.join(separator)}</Text>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  position: "relative",
}

const $invisibleText: TextStyle = {
  opacity: 0,
}

const $overlay: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
}
