import { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { useAppTheme } from "@/utils/useAppTheme"
import UserManager from "@/managers/UserManager"
import { ganon } from "@/services/ganon/ganon"
import { MascotNames } from "@/types/MascotName"
import { PlantyFromCurrentGoal } from "@/components/PlantyFromCurrentGoal"
import { Text } from "@/components/Text"

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.plantyContainer}>
          {!hasAnimated && (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                setIsWatering(true)
              }}
              style={[styles.dropletBtn, { backgroundColor: theme.colors.tint }]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text text="💧" style={styles.dropletEmoji} />
            </TouchableOpacity>
          )}
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
  dropletBtn: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    position: "absolute",
    top: -10,
    width: 32,
    zIndex: 1,
  },
  dropletEmoji: {
    fontSize: 16,
    textAlign: "center",
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
