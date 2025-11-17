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
import { View, ScrollView } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import Animated, { FadeIn } from "react-native-reanimated"
import { LessonCard } from "./primitives/LessonCard"
import { LessonHeader } from "./LessonHeader"
import { QACard } from "./primitives/QACard"
import { LessonFooter } from "./LessonFooter"
import { LessonNavigationButtons } from "./LessonNavigationButtons"

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

  // Calculate footer height: buttons + padding + progress bar (if visible)
  // Buttons: 50px height + 10px margin = 60px
  // Footer padding: md top (16px) + lg bottom (24px) = 40px
  // Progress bar: ~4px + sm padding (12px) = ~16px (at bottom)
  // Total: ~100px base + 16px progress bar = ~116px when progress bar visible, ~100px when not
  const footerHeight = totalCards > 1 ? 116 : 100

  return (
    <View style={themed(() => ({ flex: 1 }))}>
      <LessonHeader title={config.title} subtitle={config.goal} />

      {/* Current card */}
      <ScrollView
        style={themed(() => ({ flex: 1 }))}
        contentContainerStyle={themed(() => ({
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing.md,
          paddingBottom: footerHeight + theme.spacing.lg, // Footer height + extra spacing
        }))}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View key={currentCardIndex} entering={FadeIn.duration(300)}>
          {currentCard.type === "qa" ? (
            <LessonCard>
              <QACard question={currentCard.question} options={currentCard.options} />
            </LessonCard>
          ) : (
            <LessonCard tone={currentCard.type === "tip" ? "tip" : "default"}>
              <Text>{"body" in currentCard ? currentCard.body : (currentCard as any).caption}</Text>
            </LessonCard>
          )}
        </Animated.View>
      </ScrollView>

      {/* Footer: Navigation buttons and progress bar */}
      <LessonFooter
        showProgressBar={totalCards > 1}
        currentIndex={currentCardIndex}
        totalItems={totalCards}
      >
        <LessonNavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          isFirst={isFirstCard}
          isLast={isLastCard}
          nextButtonText={isLastCard ? config.commitment?.text : undefined}
        />
      </LessonFooter>
    </View>
  )
}
