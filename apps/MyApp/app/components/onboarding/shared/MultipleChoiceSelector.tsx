import RectangularButton from "@/components/buttons/RectangularButton"
import { View, StyleSheet, Image, ImageRequireSource } from "react-native"

export interface MultipleChoiceOption {
  id: string
  label: string
}

interface MultipleChoiceSelectorProps {
  options: MultipleChoiceOption[]
  heroImage?: ImageRequireSource
  maxOptions?: number
  onSelection?: (optionId: string) => void
}

export const MultipleChoiceSelector = ({
  options,
  heroImage,
  maxOptions = 4,
  onSelection,
}: MultipleChoiceSelectorProps) => {
  // Limit options to maxOptions
  const displayOptions = options.slice(0, maxOptions)

  const handleOptionSelect = (optionId: string) => {
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
        {displayOptions.map((option) => (
          <RectangularButton
            key={option.id}
            buttonText={option.label}
            onClick={() => handleOptionSelect(option.id)}
            width={"70%"}
            textStyle={styles.buttonText}
            customStyles={styles.buttonCustom}
            testID={`choice-${option.id}`}
          />
        ))}
      </View>
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
})
