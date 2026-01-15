import { View, StyleSheet } from "react-native"
import type { ISlide } from "@/types/ISlide"
import { useAppTheme } from "@/utils/useAppTheme"
import { MascotNames } from "@/types/MascotName"

type MascotIntroSlideProps = {
  onSelection?: () => void
  mascotName?: MascotNames | null
}

function MascotIntroComponent({ onSelection }: MascotIntroSlideProps) {
  const { theme } = useAppTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer} />
    </View>
  )
}

export function mascotIntroSlide({ onSelection, mascotName }: MascotIntroSlideProps): ISlide {
  // Use the latest mascot name passed from useSlides for dynamic text
  const capitalizedMascotName = mascotName
    ? mascotName.charAt(0).toUpperCase() + mascotName.slice(1)
    : "your friend" // Default fallback if user skipped naming

  return {
    id: "mascotIntro",
    title: `Meet ${capitalizedMascotName}`,
    description: `> ${capitalizedMascotName} is here to support you on your journey. Complete daily tasks to stay on track!`,
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
})
