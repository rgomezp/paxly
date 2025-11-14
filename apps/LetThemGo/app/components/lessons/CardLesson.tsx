/**
 * CardLesson Component
 *
 * Displays informational/reflective content in a step-by-step carousel format.
 *
 * When to use Card Lessons vs Practice Lessons:
 *
 * **Card Lessons** (`format: "card"`):
 * - Best for: Reading/reflecting on concepts, reminders, cognitive reframing
 * - Content: Static text cards with tips or informational messages
 * - Interaction: User reads through cards sequentially by tapping "Next"
 * - Example: "Reframe the Urge", "Why No Contact Matters"
 *
 * **Practice Lessons** (`format: "practice"`):
 * - Best for: Guided exercises, interventions, interactive activities
 * - Content: Steps can include timers, breathing exercises, audio, checkboxes, text input
 * - Interaction: User actively participates in exercises (breathing, waiting, etc.)
 * - Example: "Wait 90 Seconds", "Box Breathing for Urges", "5-4-3-2-1 Grounding"
 *
 * The key difference: Card lessons are for reading/reflecting, Practice lessons are for doing.
 */

import { CardLessonConfig } from "@/types/lessons/ICardLessonConfig"
import { Text } from ".."
import { View, StyleSheet } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import Animated, { FadeIn } from "react-native-reanimated"
import { LessonCard } from "./primitives/LessonCard"
import { LessonHeader } from "./LessonHeader"
import RectangularButton from "../buttons/RectangularButton"
import ProgressBar from "../ProgressBar"

const buttonContainerStyles = StyleSheet.create({
  noHorizontalMargin: {
    marginLeft: 0,
    marginRight: 0,
  },
})

export function CardLesson({
  config,
  onComplete,
}: {
  config: CardLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const totalCards = config.cards.length
  const isLastCard = currentCardIndex === totalCards - 1
  const isFirstCard = currentCardIndex === 0
  const currentCard = config.cards[currentCardIndex]

  const handleNext = () => {
    if (isLastCard) {
      onComplete?.()
    } else {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstCard) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  return (
    <View style={themed(() => ({ flex: 1 }))}>
      <LessonHeader title={config.title} subtitle={config.goal} />

      {/* Current card */}
      <View
        style={themed(() => ({
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing.md,
          paddingBottom: 100, // Reserve space for button
        }))}
      >
        <Animated.View key={currentCardIndex} entering={FadeIn.duration(300)}>
          <LessonCard tone={currentCard.type === "tip" ? "tip" : "default"}>
            <Text>{"body" in currentCard ? currentCard.body : (currentCard as any).caption}</Text>
          </LessonCard>
        </Animated.View>
        {/* Progress bar */}
        {totalCards > 1 && (
          <View
            style={themed(() => ({
              paddingVertical: theme.spacing.sm,
            }))}
          >
            <ProgressBar
              currentIndex={currentCardIndex}
              totalItems={totalCards}
              widthPercent={0.9}
            />
          </View>
        )}
      </View>

      {/* Navigation buttons */}
      <View
        style={themed(() => ({
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: theme.spacing.lg,
          paddingHorizontal: theme.spacing.md,
          flexDirection: "row",
          gap: theme.spacing.sm,
        }))}
      >
        <View style={themed(() => ({ flex: 1 }))}>
          <RectangularButton
            width="100%"
            buttonText="Back"
            onClick={handleBack}
            isDisabled={isFirstCard}
            customStyles={buttonContainerStyles.noHorizontalMargin}
          />
        </View>
        <View style={themed(() => ({ flex: 3 }))}>
          <RectangularButton
            width="100%"
            buttonText={isLastCard ? config.commitment?.text || "Finish" : "Next"}
            onClick={handleNext}
            customStyles={buttonContainerStyles.noHorizontalMargin}
          />
        </View>
      </View>
    </View>
  )
}
