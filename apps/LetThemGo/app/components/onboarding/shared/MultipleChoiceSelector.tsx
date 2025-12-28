import RectangularButton from "@/components/buttons/RectangularButton"
import {
  View,
  StyleSheet,
  ImageRequireSource,
  TextStyle,
  ScrollView,
  ViewStyle,
} from "react-native"
import { Image as ExpoImage } from "expo-image"
import { useState, useEffect } from "react"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

export interface MultipleChoiceOption<T extends string = string> {
  id: T
  label: string
}

interface MultipleChoiceSelectorProps<T extends string = string> {
  options: MultipleChoiceOption<T>[]
  heroImage?: ImageRequireSource
  maxOptions?: number
  onSelection?: (optionId: T, shouldAutoAdvance?: boolean) => void
  allowMultiple?: boolean
  maxSelections?: number
  onAutoAdvance?: () => void
  initialSelectedOptions?: T[]
}

export function MultipleChoiceSelector<T extends string = string>({
  options,
  heroImage,
  maxOptions = 4,
  onSelection,
  allowMultiple = false,
  maxSelections,
  onAutoAdvance,
  initialSelectedOptions = [],
}: MultipleChoiceSelectorProps<T>) {
  const [selectedOptions, setSelectedOptions] = useState<T[]>(initialSelectedOptions)
  const { themed, themeContext } = useAppTheme()

  // Update selected options when initialSelectedOptions changes
  useEffect(() => {
    setSelectedOptions(initialSelectedOptions)
  }, [initialSelectedOptions])

  // Use all options if maxOptions is not set or is large enough, otherwise limit
  const shouldShowScroll = !maxOptions || options.length > maxOptions
  const displayOptions = shouldShowScroll ? options : options.slice(0, maxOptions)

  // Check if max selections limit is reached
  const isMaxSelectionsReached =
    allowMultiple && maxSelections && selectedOptions.length >= maxSelections

  const handleOptionSelect = (optionId: T) => {
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

  const renderOptions = () => (
    <View style={styles.optionsContainer}>
      {displayOptions.map((option) => {
        const isSelected = selectedOptions.includes(option.id)
        const isDisabled = Boolean(!isSelected && isMaxSelectionsReached)

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
            isDisabled={isDisabled}
          />
        )
      })}
    </View>
  )

  return (
    <View style={styles.container}>
      {heroImage && (
        <View style={styles.imageContainer}>
          <ExpoImage source={heroImage} style={styles.heroImage} contentFit="contain" />
        </View>
      )}

      {isMaxSelectionsReached && maxSelections && (
        <View style={styles.limitContainerTop}>
          <Text style={themed($limitText)}>
            Maximum {maxSelections} selection{maxSelections > 1 ? "s" : ""} allowed
          </Text>
        </View>
      )}
      {!isMaxSelectionsReached && maxSelections && (
        <View style={styles.limitContainerTop}>
          <Text style={themed($limitText)}>Select up to {maxSelections} options</Text>
        </View>
      )}

      {shouldShowScroll ? (
        <View style={styles.scrollWrapper}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
            indicatorStyle={themeContext === "dark" ? "white" : "black"}
          >
            {renderOptions()}
          </ScrollView>
          <View style={[styles.scrollHint, themed($scrollHintContainer)]}>
            <Text style={themed($scrollHintText)}>Scroll for more options</Text>
          </View>
        </View>
      ) : (
        renderOptions()
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
  limitContainerTop: {
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 4,
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
    paddingBottom: 40, // Extra space for the hint
  },
  scrollHint: {
    alignItems: "center",
    borderTopWidth: 1,
    bottom: 0,
    left: -20,
    paddingVertical: 8,
    position: "absolute",
    right: -20,
  },
  scrollWrapper: {
    flex: 1,
    position: "relative",
    width: "100%",
  },
})

const $limitText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
  fontSize: 12,
  textAlign: "center",
})

const $scrollHintContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.border,
})

const $scrollHintText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
  fontSize: 12,
  fontStyle: "italic",
  textAlign: "center",
})
