import { FC } from "react"
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

export const PlantyFromCurrentGoal: FC<PlantyFromCurrentGoalProps> = ({
  style,
  isWatering,
  onDrinkFinished,
  loopMs,
  showName = false,
}) => {
  const { theme } = useAppTheme()

  // Get current goal to determine which planty image to show
  const progressData = NoContactManager.calculateDisplay()
  const goal = progressData?.currentGoal ?? NoContactGoal.OneDay
  const watered = PlantyManager.hasWateredToday()
  const isSad = PlantyManager.hasNotWateredIn3Days()

  // Get mascot name if showName is true
  const mascotName = showName ? (ganon.get("mascotName") as MascotNames | null) : null
  const capitalizedMascotName = mascotName
    ? mascotName.charAt(0).toUpperCase() + mascotName.slice(1)
    : "Planty" // Default fallback if user skipped naming

  return (
    <View style={$container}>
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
}

const $mascotNameText: TextStyle = {
  fontSize: 12,
  textAlign: "center",
  marginTop: -4,
  marginBottom: 4,
}
