import RectangularButton from "@/components/buttons/RectangularButton"
import { View, StyleSheet, Image, ImageRequireSource } from "react-native"
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
  onSelection?: (optionId: string) => void
  allowMultiple?: boolean
  maxSelections?: number
}

export const MultipleChoiceSelector = ({
  options,
  heroImage,
  maxOptions = 4,
  onSelection,
  allowMultiple = false,
  maxSelections,
}: MultipleChoiceSelectorProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const { theme } = useAppTheme()

  // Limit options to maxOptions
  const displayOptions = options.slice(0, maxOptions)
  
  // Check if max selections limit is reached
  const isMaxSelectionsReached =
    allowMultiple && maxSelections && selectedOptions.length >= maxSelections

  const handleOptionSelect = (optionId: string) => {
    if (allowMultiple) {
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
    } else {
      // Single selection mode
      setSelectedOptions([optionId])
    }

    onSelection?.(optionId)
  }

  return (
    <View style={styles.container}>
      {heroImage && (
        <View style={styles.imageContainer}>
          <Image source={heroImage} style={styles.heroImage} resizeMode="contain" />
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
  optionsContainer: {
    alignItems: "center",
    gap: 12,
    marginBottom: 60,
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
})
