import { FC, useEffect, useRef, useState } from "react"
import { Animated, View, ViewStyle, TextStyle, Pressable, ImageStyle } from "react-native"
import Svg, { Circle } from "react-native-svg"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text, PlantyFromCurrentGoal } from "@/components"
import NoContactManager from "@/managers/NoContactManager"
import DatePickerModal from "./modals/DatePickerModal"
import PlantyManager from "@/managers/PlantyManager"
import DailyTaskManager from "@/managers/DailyTaskManager"
import { useStores } from "@/models"
import { WaterDropletButton } from "./WaterDropletButton"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface NoContactProgressWheelProps {
  refreshTrigger?: number
}

export const NoContactProgressWheel: FC<NoContactProgressWheelProps> = ({
  refreshTrigger: externalRefreshTrigger,
}) => {
  const { theme, themed } = useAppTheme()
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [internalRefreshTrigger, setInternalRefreshTrigger] = useState(0)
  const { moodStore } = useStores()
  const [isWatering, setIsWatering] = useState(false)

  // Use external trigger if provided, otherwise use internal
  const refreshTrigger = externalRefreshTrigger ?? internalRefreshTrigger

  // Calculate progress data - refreshTrigger forces recalculation on state change
  const progressData = NoContactManager.calculateDisplay()

  // Animate the progress
  const animatedProgress = useRef(new Animated.Value(0)).current
  // Animate fade-in
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!progressData) return

    Animated.spring(animatedProgress, {
      toValue: progressData.progress,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start()
  }, [animatedProgress, progressData, refreshTrigger])

  // Fade in animation
  useEffect(() => {
    if (!progressData) return

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim, progressData])

  if (!progressData) {
    return null
  }

  const primaryColor = theme.isDark
    ? theme.colors.palette.primary500
    : theme.colors.palette.primary500
  const backgroundColor = theme.isDark
    ? theme.colors.palette.neutral300
    : theme.colors.palette.neutral300

  const goalDisplayName = NoContactManager.getGoalDisplayName(progressData.currentGoal)
  const timeRemaining = NoContactManager.getTimeRemainingDisplay()

  // Circle dimensions
  const size = 280
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  // Calculate stroke dash offset for progress
  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  })

  // Daily task completion detection to show water droplet
  // Only require mood and journal (not lesson) to show water droplet
  const dailyTasks = DailyTaskManager.getState()
  const hasJournal = dailyTasks.journal
  const hasLesson = dailyTasks.lesson
  // Mirror DailyTasksTimeline logic for mood done (based on history)
  let hasMood = false
  try {
    const history = moodStore.history
    if (history?.length) {
      const { getLocalDateKey } = require("@/utils/date")
      const todayKey = getLocalDateKey()
      for (const item of history) {
        const key = getLocalDateKey(new Date(item.date))
        if (key === todayKey) {
          hasMood = true
          break
        }
      }
    }
  } catch {}

  const atLeastOneDailyTaskCompleted = hasMood || hasJournal || hasLesson
  const wateredToday = PlantyManager.hasWateredToday()
  const showDroplet = atLeastOneDailyTaskCompleted && !wateredToday

  return (
    <Animated.View style={[themed($container), { opacity: fadeAnim }]}>
      {/* Glow effect wrapper */}
      <View style={[$glowWrapper, { backgroundColor: primaryColor }]}>
        {/* Inner container */}
        <View style={[$innerContainer, { backgroundColor: theme.colors.background }]}>
          {/* Pressable container for tap handling */}
          <Pressable
            onPress={() => setIsDatePickerVisible(true)}
            style={$circleWrapper}
            hitSlop={0}
          >
            {/* SVG Circle Progress */}
            <Svg width={size} height={size} style={$svgStyle}>
              {/* Background circle */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={backgroundColor}
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* Progress circle */}
              <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={primaryColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </Svg>

            {/* Inner circle with contrasting background */}
            <View
              style={[
                $innerCircle,
                {
                  backgroundColor: theme.isDark
                    ? theme.colors.palette.neutral200
                    : theme.colors.palette.neutral100,
                },
              ]}
            />

            {/* Content */}
            <View style={$contentContainer}>
              {showDroplet && (
                <WaterDropletButton
                  onPress={() => {
                    // Begin watering: play one-shot animation
                    setIsWatering(true)
                    setInternalRefreshTrigger((prev) => prev + 1)
                  }}
                />
              )}
              <PlantyFromCurrentGoal
                isWatering={isWatering}
                style={$planty}
                onDrinkFinished={() => {
                  setIsWatering(false)
                }}
                showName={true}
              />
              {progressData.timeDisplay.secondary ? (
                <>
                  <Text
                    preset="heading"
                    style={$primaryText}
                    text={progressData.timeDisplay.primary}
                  />
                  <Text style={$secondaryText} text={progressData.timeDisplay.secondary} />
                </>
              ) : (
                <Text
                  preset="heading"
                  style={$primaryText}
                  text={progressData.timeDisplay.primary}
                />
              )}
            </View>
          </Pressable>
        </View>
      </View>

      {/* Goal info */}
      <View style={themed($goalContainer)}>
        <Text
          style={[themed($goalText), { color: theme.colors.textDim }]}
          text={`Current goal: ${goalDisplayName}`}
        />
        {timeRemaining && (
          <Text
            style={[themed($timeRemainingText), { color: theme.colors.text }]}
            text={`${timeRemaining} left`}
          />
        )}
      </View>

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => {
          setIsDatePickerVisible(false)
          setInternalRefreshTrigger((prev) => prev + 1)
        }}
      />
    </Animated.View>
  )
}

const $container: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
}

const $glowWrapper: ViewStyle = {
  borderRadius: 150,
  padding: 4,
  shadowColor: "#5A7A8F",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.6,
  shadowRadius: 20,
  elevation: 20,
}

const $innerContainer: ViewStyle = {
  borderRadius: 146,
  overflow: "visible",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
}

const $circleWrapper: ViewStyle = {
  width: 280,
  height: 280,
  borderRadius: 140,
  justifyContent: "center",
  alignItems: "center",
}

const $svgStyle: ViewStyle = {
  position: "absolute",
}

const $innerCircle: ViewStyle = {
  position: "absolute",
  width: 256,
  height: 256,
  borderRadius: 128,
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  width: 280,
  height: 280,
}

const $planty: ImageStyle = {
  width: 94,
  height: 104,
  marginBottom: 8,
  resizeMode: "contain",
  marginTop: -16,
}

const $primaryText: TextStyle = {
  fontWeight: "bold",
  textAlign: "center",
}

const $secondaryText: TextStyle = {
  fontSize: 20,
  fontWeight: "600",
  textAlign: "center",
}

const $goalContainer: ViewStyle = {
  marginTop: 24,
  alignItems: "center",
}

const $goalText: TextStyle = {
  fontSize: 14,
  textAlign: "center",
}

const $timeRemainingText: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
  marginTop: 4,
}
