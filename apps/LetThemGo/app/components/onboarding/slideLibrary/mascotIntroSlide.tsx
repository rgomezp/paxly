import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { useAppTheme } from "@/utils/useAppTheme"
import { PlantyFromCurrentGoal } from "@/components/PlantyFromCurrentGoal"
import { WaterDropletButton } from "@/components/WaterDropletButton"
import { MascotNames } from "@/types/MascotName"
import { ganon } from "@/services/ganon/ganon"
import Log from "@/utils/Log"

type MascotIntroSlideProps = {
  onSelection?: () => void
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
    Log.info("MascotIntroSlide: handleWaterPress")
    setIsWatering(true)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.plantyContainer}>
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
          {!hasAnimated && <WaterDropletButton onPress={handleWaterPress} isDemo={true} />}
        </View>
      </View>
    </View>
  )
}

export function mascotIntroSlide({ onSelection }: MascotIntroSlideProps): ISlide {
  // Get mascot name for dynamic text
  const mascotName = ganon.get("mascotName") as MascotNames | null
  const capitalizedMascotName = mascotName
    ? mascotName.charAt(0).toUpperCase() + mascotName.slice(1)
    : "Planty" // Default fallback if user skipped naming

  return {
    id: "mascotIntro",
    title: `Let's Water ${capitalizedMascotName}`,
    description: `> You will see the water button after completing daily tasks. When you see it, give me some water which I need to be healthy and grow! Let's try it now!`,
    component: <MascotIntroComponent onSelection={onSelection} />,
    textPlacement: "top",
    textAlignment: "left",
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
