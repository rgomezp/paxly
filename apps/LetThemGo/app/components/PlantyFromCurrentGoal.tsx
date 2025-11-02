import { FC } from "react"
import { ImageStyle, StyleProp } from "react-native"
import Planty from "@/components/Planty"
import PlantyManager from "@/managers/PlantyManager"
import NoContactManager from "@/managers/NoContactManager"
import { NoContactGoal } from "@/types/INoContactData"

interface PlantyFromCurrentGoalProps {
  style?: StyleProp<ImageStyle>
  isWatering?: boolean
  onDrinkFinished?: () => void
  loopMs?: number
}

export const PlantyFromCurrentGoal: FC<PlantyFromCurrentGoalProps> = ({
  style,
  isWatering,
  onDrinkFinished,
  loopMs,
}) => {
  // Get current goal to determine which planty image to show
  const progressData = NoContactManager.calculateDisplay()
  const goal = progressData?.currentGoal ?? NoContactGoal.OneDay
  const watered = PlantyManager.hasWateredToday()

  return (
    <Planty
      goal={goal}
      wateredToday={watered}
      style={style}
      isWatering={isWatering}
      onDrinkFinished={onDrinkFinished}
      loopMs={loopMs}
    />
  )
}
