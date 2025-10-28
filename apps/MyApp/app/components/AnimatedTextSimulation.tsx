import { useEffect, useState, useRef } from "react"
import { Text, TextProps, StyleProp, TextStyle } from "react-native"

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
  maxDelay = 250,
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

    // Only start animation if shouldStart is true
    if (!shouldStart) {
      setCurrentTokens([])
      hasStartedRef.current = false
      return
    }

    let isMounted = true
    const tokens = tokenizer(text)
    setCurrentTokens([])
    hasStartedRef.current = true

    let index = 0

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
    <Text style={style}>
      {currentTokens.join(separator)}
    </Text>
  )
}
