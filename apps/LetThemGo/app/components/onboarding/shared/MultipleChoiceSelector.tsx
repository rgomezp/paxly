import RectangularButton from "@/components/buttons/RectangularButton"
import { View, StyleSheet, ImageRequireSource } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useState } from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "@/components/Text"

export interface MultipleChoiceOption {
  id: string
  label: string
}

interface MultipleChoiceSelectorProps {
  options: MultipleChoiceOption[]
  heroImage?: ImageRequireSource
  maxOptions?: number
  onSelection?: (optionId: string, shouldAutoAdvance?: boolean) => void
  allowMultiple?: boolean
  maxSelections?: number
  onAutoAdvance?: () => void
}

export const MultipleChoiceSelector = ({
  options,
  heroImage,
  maxOptions = 4,
  onSelection,
  allowMultiple = false,
  maxSelections,
  onAutoAdvance,
}: MultipleChoiceSelectorProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const { theme } = useAppTheme()

  // Limit options to maxOptions
  const displayOptions = options.slice(0, maxOptions)

  // Check if max selections limit is reached
  const isMaxSelectionsReached =
    allowMultiple && maxSelections && selectedOptions.length >= maxSelections

  const handleOptionSelect = (optionId: string) => {
    let shouldAutoAdvance = false

    if (allowMultiple) {
      const wasAtMax = isMaxSelectionsReached

      // Check before state update if we should auto-advance
      if (
        maxSelections &&
        selectedOptions.length + 1 === maxSelections &&
        !wasAtMax &&
        !selectedOptions.includes(optionId)
      ) {
        shouldAutoAdvance = true
      }

      setSelectedOptions((prev) => {
        if (prev.includes(optionId)) {
          // Allow deselecting even if at max
          return prev.filter((id) => id !== optionId)
        } else {
          // Only add if not at max limit
          if (maxSelections && prev.length >= maxSelections) {
            return prev
          }
          return [...prev, optionId]
        }
      })

      // Auto-advance if we just reached max
      if (shouldAutoAdvance) {
        setTimeout(() => {
          onAutoAdvance?.()
        }, 0)
      }
    } else {
      // Single selection mode - always auto-advance on first selection
      setSelectedOptions([optionId])
      shouldAutoAdvance = true
      setTimeout(() => {
        onAutoAdvance?.()
      }, 0)
    }

    onSelection?.(optionId, shouldAutoAdvance)
  }

  return (
    <View style={styles.container}>
      {heroImage && (
        <View style={styles.imageContainer}>
          <ExpoImage source={heroImage} style={styles.heroImage} contentFit="contain" />
        </View>
      )}

      <View style={styles.optionsContainer}>
        {displayOptions.map((option) => {
          const isSelected = selectedOptions.includes(option.id)
          const isDisabled = Boolean(!isSelected && isMaxSelectionsReached)

          return (
            <RectangularButton
              key={option.id}
              buttonText={option.label}
              onClick={() => handleOptionSelect(option.id)}
              width={"70%"}
              textStyle={styles.buttonText}
              customStyles={styles.buttonCustom}
              testID={`choice-${option.id}`}
              isSelected={allowMultiple && isSelected}
              isDisabled={isDisabled}
            />
          )
        })}
      </View>

      {isMaxSelectionsReached && maxSelections && (
        <View style={styles.limitContainer}>
          <Text style={styles.limitText}>
            Maximum {maxSelections} selection{maxSelections > 1 ? "s" : ""} allowed
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonCustom: {
    marginVertical: 2,
  },
  buttonText: {
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heroImage: {
    height: 140,
    maxHeight: "90%",
    maxWidth: "90%",
    width: 140,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  limitContainer: {
    alignItems: "center",
    marginTop: -40,
    paddingBottom: 10,
  },
  limitText: {
    color: "#9E9E9E",
    fontSize: 12,
    textAlign: "center",
  },
  optionsContainer: {
    alignItems: "center",
    gap: 12,
    marginBottom: 60,
    width: "100%",
  },
})
