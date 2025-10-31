import { useEffect, useMemo, useRef, useState } from "react"
import { Image, ImageStyle, StyleProp } from "react-native"
import PlantyManager from "@/managers/PlantyManager"
import { NoContactGoal } from "@/types/INoContactData"

export type PlantyState = "happy" | "serious" | "drinking"
type GoalSuffix = "1d" | "1w" | "2w" | "1m" | "2m" | "3m" | "4m" | "5m" | "6m"

interface PlantyProps {
  goal: NoContactGoal
  wateredToday: boolean
  isWatering?: boolean
  style?: StyleProp<ImageStyle>
  // Called when the one-shot drinking animation has finished and swapped to happy
  onDrinkFinished?: () => void
  // Optional override for looping interval of happy/serious animations
  loopMs?: number
}

// Map goals to filename suffixes
const GOAL_SUFFIX: Record<NoContactGoal, GoalSuffix> = {
  [NoContactGoal.OneDay]: "1d",
  [NoContactGoal.OneWeek]: "1w",
  [NoContactGoal.TwoWeeks]: "2w",
  [NoContactGoal.OneMonth]: "1m",
  [NoContactGoal.TwoMonths]: "2m",
  [NoContactGoal.ThreeMonths]: "3m",
  [NoContactGoal.FourMonths]: "4m",
  [NoContactGoal.FiveMonths]: "5m",
  [NoContactGoal.SixMonths]: "6m",
  // For any goal beyond 6 months, reuse 6m assets
  [NoContactGoal.OneYear]: "6m",
}

// Static registry so Metro bundles assets. Folder per goal (e.g., planty/1m/planty.webp)
const REGISTRY: Record<PlantyState, Record<"default" | GoalSuffix, any>> = {
  happy: {
    "default": require("../../assets/images/planty/1d/planty.webp"),
    "1d": require("../../assets/images/planty/1d/planty.webp"),
    "1w": require("../../assets/images/planty/1w/planty.webp"),
    "2w": require("../../assets/images/planty/2w/planty.webp"),
    "1m": require("../../assets/images/planty/1m/planty.webp"),
    "2m": require("../../assets/images/planty/2m/planty.webp"),
    "3m": require("../../assets/images/planty/3m/planty.webp"),
    "4m": require("../../assets/images/planty/4m/planty.webp"),
    "5m": require("../../assets/images/planty/5m/planty.webp"),
    "6m": require("../../assets/images/planty/6m/planty.webp"),
    // no 1y-specific asset; 1y maps to 6m
  },
  serious: {
    "default": require("../../assets/images/planty/1d/planty_serious.webp"),
    "1d": require("../../assets/images/planty/1d/planty_serious.webp"),
    "1w": require("../../assets/images/planty/1w/planty_serious.webp"),
    "2w": require("../../assets/images/planty/2w/planty_serious.webp"),
    "1m": require("../../assets/images/planty/1m/planty_serious.webp"),
    "2m": require("../../assets/images/planty/2m/planty_serious.webp"),
    "3m": require("../../assets/images/planty/3m/planty_serious.webp"),
    "4m": require("../../assets/images/planty/4m/planty_serious.webp"),
    "5m": require("../../assets/images/planty/5m/planty_serious.webp"),
    "6m": require("../../assets/images/planty/6m/planty_serious.webp"),
    // no 1y-specific asset; 1y maps to 6m
  },
  drinking: {
    "default": require("../../assets/images/planty/1d/planty_drinking.webp"),
    "1d": require("../../assets/images/planty/1d/planty_drinking.webp"),
    "1w": require("../../assets/images/planty/1w/planty_drinking.webp"),
    "2w": require("../../assets/images/planty/2w/planty_drinking.webp"),
    "1m": require("../../assets/images/planty/1m/planty_drinking.webp"),
    "2m": require("../../assets/images/planty/2m/planty_drinking.webp"),
    "3m": require("../../assets/images/planty/3m/planty_drinking.webp"),
    "4m": require("../../assets/images/planty/4m/planty_drinking.webp"),
    "5m": require("../../assets/images/planty/5m/planty_drinking.webp"),
    "6m": require("../../assets/images/planty/6m/planty_drinking.webp"),
    // no 1y-specific asset; 1y maps to 6m
  },
} as const

function resolveSource(state: PlantyState, goal: NoContactGoal) {
  const suffix: GoalSuffix = GOAL_SUFFIX[goal]
  const bucket = REGISTRY[state]
  return bucket[suffix] ?? bucket.default
}

export default function Planty({
  goal,
  wateredToday,
  isWatering,
  style,
  onDrinkFinished,
  loopMs = 3000,
}: PlantyProps) {
  const [playingDrink, setPlayingDrink] = useState(false)
  const drinkTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loopIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [refreshNonce, setRefreshNonce] = useState(0)

  const shouldPlayDrinkNow = useMemo(() => {
    if (!isWatering) return false
    if (PlantyManager.hasPlayedDrinkAnimationToday()) return false
    return true
  }, [isWatering])

  useEffect(() => {
    if (shouldPlayDrinkNow) {
      setPlayingDrink(true)
      PlantyManager.markDrinkAnimationPlayedToday()
      // WebP duration is unknown to RN; use a conservative 1500ms one-shot
      drinkTimeoutRef.current = setTimeout(() => {
        setPlayingDrink(false)
        onDrinkFinished?.()
      }, 1500)
    }
    return () => {
      if (drinkTimeoutRef.current) {
        clearTimeout(drinkTimeoutRef.current)
        drinkTimeoutRef.current = null
      }
    }
  }, [shouldPlayDrinkNow, onDrinkFinished])

  // Force loop for happy/serious by remounting only when expo-image is NOT available
  // expo-image handles animated WebP looping internally; remounting causes flicker
  // The interval is only used for the RN Image fallback.
  let ExpoImage: any = null
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ExpoImage = require("expo-image").Image
  } catch {}

  useEffect(() => {
    if (ExpoImage) return
    const isLoopingState = !playingDrink
    if (isLoopingState) {
      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current)
      loopIntervalRef.current = setInterval(
        () => {
          setRefreshNonce((n) => (n + 1) % 10000)
        },
        Math.max(1000, loopMs),
      )
    }
    return () => {
      if (loopIntervalRef.current) {
        clearInterval(loopIntervalRef.current)
        loopIntervalRef.current = null
      }
    }
  }, [ExpoImage, playingDrink, loopMs])

  const state: PlantyState = playingDrink ? "drinking" : wateredToday ? "happy" : "serious"
  const source = resolveSource(state, goal)
  const suffix = GOAL_SUFFIX[goal]

  // Prefer expo-image for animated WebP support if available; avoid key changes to prevent flicker
  return ExpoImage ? (
    <ExpoImage
      recyclingKey={`planty-${suffix}`}
      source={source}
      style={style as any}
      contentFit="contain"
      transition={0}
      cachePolicy="memory"
    />
  ) : (
    <Image
      key={`planty-${state}-${suffix}-${refreshNonce}`}
      source={source}
      style={style}
      accessibilityIgnoresInvertColors
    />
  )
}
