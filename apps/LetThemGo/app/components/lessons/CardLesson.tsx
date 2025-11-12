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
import { View, useWindowDimensions } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import Animated, { FadeIn } from "react-native-reanimated"
import { LessonCard } from "./primitives/LessonCard"
import { LessonHeader } from "./LessonHeader"
import RectangularButton from "../buttons/RectangularButton"

export function CardLesson({
  config,
  onComplete,
}: {
  config: CardLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const { width } = useWindowDimensions()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const totalCards = config.cards.length
  const isLastCard = currentCardIndex === totalCards - 1
  const currentCard = config.cards[currentCardIndex]

  // Calculate button width: use 85% of screen width, but cap at 300px for readability
  const buttonWidth = Math.min(width * 0.85, 300)

  const handleNext = () => {
    if (isLastCard) {
      onComplete?.()
    } else {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  return (
    <View style={themed(() => ({ flex: 1 }))}>
      <LessonHeader title={config.title} subtitle={config.goal} />

      {/* Progress dots */}
      {totalCards > 1 && (
        <View
          style={themed(() => ({
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: theme.spacing.xs,
            paddingVertical: theme.spacing.sm,
          }))}
        >
          {config.cards.map((_, index) => (
            <View
              key={index}
              style={themed(() => ({
                width: index === currentCardIndex ? 8 : 6,
                height: index === currentCardIndex ? 8 : 6,
                borderRadius: index === currentCardIndex ? 4 : 3,
                backgroundColor:
                  index === currentCardIndex ? theme.colors.tint : theme.colors.border,
              }))}
            />
          ))}
        </View>
      )}

      {/* Current card */}
      <View
        style={themed(() => ({
          flex: 1,
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
      </View>

      {/* Navigation button */}
      <View
        style={themed(() => ({
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: theme.spacing.lg,
          alignItems: "center",
        }))}
      >
        <RectangularButton
          width={buttonWidth}
          buttonText={isLastCard ? config.commitment?.text || "Finish" : "Next"}
          onClick={handleNext}
        />
      </View>
    </View>
  )
}
