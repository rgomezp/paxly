import { FC, useEffect, useRef } from "react"
import { Animated, View, ViewStyle, TextStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "@/components"
import NoContactManager from "@/managers/NoContactManager"

export const NoContactProgressWheel: FC = () => {
  const { theme, themed } = useAppTheme()
  const progressData = NoContactManager.calculateDisplay()

  // Animate the progress
  const animatedProgress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!progressData) return

    Animated.spring(animatedProgress, {
      toValue: progressData.progress,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start()
  }, [animatedProgress, progressData])

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

  return (
    <View style={themed($container)}>
      {/* Glow effect wrapper */}
      <View style={[$glowWrapper, { backgroundColor: primaryColor }]}>
        {/* Inner container */}
        <View style={[$innerContainer, { backgroundColor: theme.colors.background }]}>
          {/* SVG-like circular progress using View and clips */}
          <View style={$circleWrapper}>
            {/* Background arc */}
            <View style={[$arcContainer, { borderColor: backgroundColor }]}>
              <View style={[$arcHalf, { borderColor: backgroundColor }]} />
            </View>

            {/* Progress arc - first half */}
            <View style={$clipContainer}>
              <Animated.View
                style={[
                  $arcHalf,
                  {
                    borderColor: primaryColor,
                    opacity: animatedProgress.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1, 1],
                    }),
                  },
                  {
                    transform: [
                      {
                        rotate: animatedProgress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["-90deg", "90deg"],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>

            {/* Progress arc - second half (if > 50%) */}
            {progressData.progress > 0.5 && (
              <View style={[$clipContainer, { transform: [{ rotate: "180deg" }] }]}>
                <Animated.View
                  style={[
                    $arcHalf,
                    {
                      borderColor: primaryColor,
                      transform: [
                        {
                          rotate: animatedProgress.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: ["-90deg", "90deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            )}

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
                <Text style={$primaryText} text={progressData.timeDisplay.primary} />
              )}
            </View>
          </View>
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
    </View>
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
  overflow: "hidden",
}

const $arcContainer: ViewStyle = {
  position: "absolute",
  width: 280,
  height: 280,
  borderRadius: 140,
  borderWidth: 12,
}

const $clipContainer: ViewStyle = {
  position: "absolute",
  width: 140,
  height: 280,
  overflow: "hidden",
}

const $arcHalf: ViewStyle = {
  width: 280,
  height: 280,
  borderRadius: 140,
  borderWidth: 12,
  borderBottomWidth: 0,
  borderRightWidth: 0,
}

const $innerCircle: ViewStyle = {
  position: "absolute",
  width: 256,
  height: 256,
  borderRadius: 128,
  top: 12,
  left: 12,
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  width: 280,
  height: 280,
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
