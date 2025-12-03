import { FC, useEffect, useState } from "react"
import { ImageStyle, StyleProp, View, TextStyle, ViewStyle } from "react-native"
import Planty from "@/components/Planty"
import PlantyManager from "@/managers/PlantyManager"
import NoContactManager from "@/managers/NoContactManager"
import { NoContactGoal } from "@/types/INoContactData"
import { Text } from "@/components"
import { ganon } from "@/services/ganon/ganon"
import { MascotNames } from "@/types/MascotName"
import { useAppTheme } from "@/utils/useAppTheme"

interface PlantyFromCurrentGoalProps {
  style?: StyleProp<ImageStyle>
  isWatering?: boolean
  onDrinkFinished?: () => void
  loopMs?: number
  showName?: boolean
}

const PlantySadBubble: FC = () => {
  const { theme } = useAppTheme()

  return (
    <View
      style={[
        $speechBubble,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.palette.neutral400,
        },
      ]}
    >
      <Text
        style={[$speechBubbleText, { color: theme.colors.text }]}
        numberOfLines={2}
        text="I’m feeling a bit thirsty... please water me."
      />
      <View style={[$speechBubbleTailOuter, { borderTopColor: theme.colors.palette.neutral400 }]} />
      <View style={[$speechBubbleTailInner, { borderTopColor: theme.colors.card }]} />
    </View>
  )
}

export const PlantyFromCurrentGoal: FC<PlantyFromCurrentGoalProps> = ({
  style,
  isWatering,
  onDrinkFinished,
  loopMs,
  showName = false,
}) => {
  const { theme } = useAppTheme()
  const [showSadBubble, setShowSadBubble] = useState(false)

  // Get current goal to determine which planty image to show
  const progressData = NoContactManager.calculateDisplay()
  const goal = progressData?.currentGoal ?? NoContactGoal.OneDay
  const watered = PlantyManager.hasWateredToday()
  const isSad = PlantyManager.hasNotWateredIn3Days()

  useEffect(() => {
    if (!isSad) {
      setShowSadBubble(false)
      return
    }

    setShowSadBubble(true)
    const timeout = setTimeout(() => {
      setShowSadBubble(false)
    }, 10000)

    return () => {
      clearTimeout(timeout)
    }
  }, [isSad])

  // Get mascot name if showName is true
  const mascotName = showName ? (ganon.get("mascotName") as MascotNames | null) : null
  const capitalizedMascotName = mascotName
    ? mascotName.charAt(0).toUpperCase() + mascotName.slice(1)
    : "Planty" // Default fallback if user skipped naming

  return (
    <View style={$container}>
      {isSad && showSadBubble && <PlantySadBubble />}
      <Planty
        goal={goal}
        wateredToday={watered}
        isSad={isSad}
        style={style}
        isWatering={isWatering}
        onDrinkFinished={onDrinkFinished}
        loopMs={loopMs}
      />
      {showName && (
        <Text
          style={[$mascotNameText, { color: theme.colors.textDim }]}
          text={capitalizedMascotName}
        />
      )}
    </View>
  )
}

const $container: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}

const $mascotNameText: TextStyle = {
  fontSize: 12,
  textAlign: "center",
  marginTop: -4,
  marginBottom: 4,
}

const $speechBubble: ViewStyle = {
  maxWidth: 240,
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 16,
  borderWidth: 1,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
  position: "absolute",
  top: -60,
}

const $speechBubbleText: TextStyle = {
  fontSize: 13,
  textAlign: "center",
}

const $speechBubbleTailBase: ViewStyle = {
  position: "absolute",
  bottom: -10,
  alignSelf: "center",
  width: 0,
  height: 0,
  borderTopWidth: 10,
  borderRightWidth: 8,
  borderLeftWidth: 8,
  borderRightColor: "transparent",
  borderLeftColor: "transparent",
}

const $speechBubbleTailOuter: ViewStyle = {
  ...$speechBubbleTailBase,
}

const $speechBubbleTailInner: ViewStyle = {
  ...$speechBubbleTailBase,
  bottom: -9,
  borderTopWidth: 9,
  borderRightWidth: 7,
  borderLeftWidth: 7,
}
