import type { ISlide } from "@/types/ISlide"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"
import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import RectangularButton from "@/components/buttons/RectangularButton"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import type { ViewStyle } from "react-native"

type AnxietyFeelingsChoices =
  | "racing_thoughts"
  | "tight_chest_shallow_breathing"
  | "restlessness"
  | "overthinking_spiraling"
  | "sudden_panic"
  | "irritability"
  | "fatigue_or_shutdown"

type AnxietyFeelingsSlideProps = {
  onSelection?: () => void
}

interface AnxietyFeelingOption {
  id: AnxietyFeelingsChoices
  label: string
}

const options: AnxietyFeelingOption[] = [
  { id: "racing_thoughts", label: "Racing thoughts" },
  { id: "tight_chest_shallow_breathing", label: "Tight chest / shallow breathing" },
  { id: "restlessness", label: "Restlessness" },
  { id: "overthinking_spiraling", label: "Overthinking / spiraling" },
  { id: "sudden_panic", label: "Sudden panic" },
  { id: "irritability", label: "Irritability" },
  { id: "fatigue_or_shutdown", label: "Fatigue or shutdown" },
]

interface AnxietyFeelingsComponentProps {
  onSelection?: () => void
}

function AnxietyFeelingsComponent({ onSelection: _onSelection }: AnxietyFeelingsComponentProps) {
  // Read saved feelings from ganon
  const savedFeelings = (ganon.get("anxietyFeelings") as AnxietyFeelingsChoices[] | null) || []
  const [selectedFeelings, setSelectedFeelings] = useState<AnxietyFeelingsChoices[]>(savedFeelings)
  const { themed, themeContext } = useAppTheme()

  // Update selected feelings when saved feelings change
  useEffect(() => {
    const saved = (ganon.get("anxietyFeelings") as AnxietyFeelingsChoices[] | null) || []
    setSelectedFeelings(saved)
  }, [])

  const handleOptionSelect = (optionId: AnxietyFeelingsChoices) => {
    Log.info(`AnxietyFeelingsSlide: buttonPressed: ${optionId}`)

    // Update local state
    setSelectedFeelings((prev) => {
      const newFeelings = prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]

      // Save to ganon
      try {
        ganon.set("anxietyFeelings", newFeelings)
        Log.info(`AnxietyFeelingsSlide: Saved anxietyFeelings: ${JSON.stringify(newFeelings)}`)
      } catch (e) {
        Log.error(`AnxietyFeelingsSlide: Error saving anxietyFeelings: ${e}`)
      }

      return newFeelings
    })
  }

  return (
    <View style={themed($container)}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
        indicatorStyle={themeContext === "dark" ? "white" : "black"}
      >
        <View style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = selectedFeelings.includes(option.id)

            return (
              <RectangularButton
                key={option.id}
                buttonText={option.label}
                onClick={() => handleOptionSelect(option.id)}
                width={280}
                textStyle={styles.buttonText}
                customStyles={styles.buttonCustom}
                testID={`choice-${option.id}`}
                isSelected={isSelected}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export function anxietyFeelingsSlide({ onSelection }: AnxietyFeelingsSlideProps): ISlide {
  return {
    id: "anxietyFeelings",
    title: "When anxiety shows up, what does it feel like for you?",
    component: <AnxietyFeelingsComponent onSelection={onSelection} />,
    textAlignment: "center",
  }
}

const styles = StyleSheet.create({
  buttonCustom: {
    marginVertical: 2,
  },
  buttonText: {
    textAlign: "center",
  },
  optionsContainer: {
    alignItems: "center",
    gap: 12,
    marginBottom: 60,
    width: "100%",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 40,
  },
})

const $container: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  paddingBottom: 20,
  paddingHorizontal: 20,
  paddingTop: 20,
})
