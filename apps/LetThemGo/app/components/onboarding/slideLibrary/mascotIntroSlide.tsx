import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { useAppTheme } from "@/utils/useAppTheme"
import UserManager from "@/managers/UserManager"
import { ganon } from "@/services/ganon/ganon"
import { MascotNames } from "@/types/MascotName"
import { PlantyFromCurrentGoal } from "@/components/PlantyFromCurrentGoal"
import { WaterDropletButton } from "@/components/WaterDropletButton"

type MascotIntroSlideProps = {
  onSelection?: () => void
}

// Helper function to get mascot display name
const getMascotDisplayName = (name: MascotNames): string => {
  switch (name) {
    case MascotNames.PLANTY:
      return "Planty"
    case MascotNames.WILLOW:
      return "Willow"
    case MascotNames.CHLOE:
      return "Chloe"
    case MascotNames.OLIVE:
      return "Olive"
    case MascotNames.FLORA:
      return "Flora"
    case MascotNames.PENNY:
      return "Penny"
    case MascotNames.SPROUT:
      return "Sprout"
    default:
      return "Planty"
  }
}

function MascotIntroComponent({ onSelection }: MascotIntroSlideProps) {
  const { theme } = useAppTheme()
  const [isWatering, setIsWatering] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Reset state when component mounts so droplet is available again when navigating back
    setIsWatering(false)
    setHasAnimated(false)
  }, [])

  const handleWaterPress = () => {
    setIsWatering(true)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.plantyContainer}>
          {!hasAnimated && <WaterDropletButton onPress={handleWaterPress} />}
          <PlantyFromCurrentGoal
            isWatering={isWatering}
            style={styles.planty}
            onDrinkFinished={() => {
              setIsWatering(false)
              setHasAnimated(true)
              // Auto-advance after watering animation completes
              setTimeout(() => {
                onSelection?.()
              }, 300)
            }}
          />
        </View>
      </View>
    </View>
  )
}

export function mascotIntroSlide({ onSelection }: MascotIntroSlideProps): ISlide {
  // Get nickname and mascot name for dynamic text
  const user = UserManager.getUser()
  const nickname = user?.nickname || null
  const mascotName = (ganon.get("mascotName") as MascotNames | null) || MascotNames.PLANTY

  const mascotDisplayName = getMascotDisplayName(mascotName)
  const title = nickname ? `Hi, ${nickname}!` : "Hi!"

  return {
    id: "mascotIntro",
    title,
    description: `I'm ${mascotDisplayName}. When you complete tasks, you earn water which I need to grow! Can you give me some water now?`,
    component: <MascotIntroComponent onSelection={onSelection} />,
    textPlacement: "sandwich",
    textAlignment: "center",
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  planty: {
    height: 140,
    marginTop: 42,
    resizeMode: "contain",
    width: 140,
  },
  plantyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
})
