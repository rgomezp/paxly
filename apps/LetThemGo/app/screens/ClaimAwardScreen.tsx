import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import AwardManager from "@/managers/AwardManager"
import { IAward } from "@/types/IAward"
import type { ThemedStyle } from "@/theme"
import RectangularButton from "@/components/buttons/RectangularButton"

interface ClaimAwardScreenProps extends AppStackScreenProps<"ClaimAward"> {}

export const ClaimAwardScreen: FC<ClaimAwardScreenProps> = observer(function ClaimAwardScreen({
  navigation,
}) {
  const { themed } = useAppTheme()
  const [award, setAward] = useState<IAward | null>(null)

  useEffect(() => {
    // Check for available award when screen loads
    const nextAward = AwardManager.getNextAward()
    setAward(nextAward)

    // If no award available, navigate back
    if (!nextAward) {
      navigation.goBack()
    }
  }, [navigation])

  const handleClaim = () => {
    if (!award) return

    // Award the award (skip availability check since we already confirmed it's available)
    const awarded = AwardManager.award(true)

    if (awarded) {
      // Navigate back to Lessons screen (skipping SingleLesson screen)
      navigation.navigate("Lessons")
    }
  }

  if (!award) {
    return null
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <View style={themed($awardCard)}>
        {/* Award image placeholder - images don't exist yet */}
        <View style={$awardImagePlaceholder}>
          <Text style={$awardImagePlaceholderText}>🏆</Text>
        </View>

        {/* Award title and description */}
        <View style={$awardTitleAndDescription}>
          <Text style={themed($awardTitle)}>{award.name}</Text>
          <Text style={themed($awardDescription)}>{award.description}</Text>
        </View>
      </View>

      <RectangularButton onClick={handleClaim} buttonText="Claim" width="80%" />
    </Screen>
  )
})

const $awardTitleAndDescription: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
}

const $awardCard: ThemedStyle<ViewStyle> = (theme) => ({
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.card,
  borderRadius: 16,
  padding: 40,
  marginBottom: 24,
  width: "80%",
  height: "45%",
})

const $awardImagePlaceholder: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 2,
}

const $awardImagePlaceholderText: TextStyle = {
  fontSize: 120,
  lineHeight: 150,
}

const $awardTitle: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 24,
  fontWeight: "bold",
  color: theme.colors.text,
  marginTop: 20,
  textAlign: "center",
})

const $awardDescription: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 16,
  color: theme.colors.textDim,
  marginTop: 12,
  textAlign: "center",
  paddingHorizontal: 10,
})
