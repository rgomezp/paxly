import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"
import { useState, useEffect } from "react"

type IntentCommitmentChoices =
  | "calm_down_in_the_moment"
  | "understand_my_patterns"
  | "reduce_anxiety_long_term"
  | "sleep_better"
  | "feel_more_in_control_emotionally"

type IntentCommitmentSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<IntentCommitmentChoices>[] = [
  { id: "calm_down_in_the_moment", label: "Calm down in the moment" },
  { id: "understand_my_patterns", label: "Understand my patterns" },
  { id: "reduce_anxiety_long_term", label: "Reduce anxiety long-term" },
  { id: "sleep_better", label: "Sleep better" },
  { id: "feel_more_in_control_emotionally", label: "Feel more emotional control" },
]

interface IntentCommitmentComponentProps {
  onSelection?: () => void
}

function IntentCommitmentComponent({ onSelection }: IntentCommitmentComponentProps) {
  // Read saved intent commitments from ganon
  const savedIntentCommitments =
    (ganon.get("intentCommitment") as IntentCommitmentChoices[] | null) || []
  const [selectedIntentCommitments, setSelectedIntentCommitments] =
    useState<IntentCommitmentChoices[]>(savedIntentCommitments)

  // Update selected intent commitments when saved intent commitments change
  useEffect(() => {
    const saved = (ganon.get("intentCommitment") as IntentCommitmentChoices[] | null) || []
    setSelectedIntentCommitments(saved)
  }, [])

  const buttonPressed = (optionId: string) => {
    Log.info(`IntentCommitmentSlide: buttonPressed: ${optionId}`)

    const intentCommitment = optionId as IntentCommitmentChoices

    // Update local state
    setSelectedIntentCommitments((prev) => {
      const newIntentCommitments = prev.includes(intentCommitment)
        ? prev.filter((id) => id !== intentCommitment)
        : [...prev, intentCommitment]

      // Save to ganon
      try {
        ganon.set("intentCommitment", newIntentCommitments)
        Log.info(
          `IntentCommitmentSlide: Saved intentCommitment: ${JSON.stringify(newIntentCommitments)}`,
        )
      } catch (e) {
        Log.error(`IntentCommitmentSlide: Error saving intentCommitment: ${e}`)
      }

      return newIntentCommitments
    })
  }

  return (
    <MultipleChoiceSelector
      options={options}
      onSelection={buttonPressed}
      allowMultiple={true}
      maxOptions={5}
      initialSelectedOptions={selectedIntentCommitments}
      onAutoAdvance={onSelection}
    />
  )
}

export function intentCommitmentSlide({ onSelection }: IntentCommitmentSlideProps): ISlide {
  return {
    id: "intentCommitment",
    title: "What are you hoping Paxly helps you with most?",
    component: <IntentCommitmentComponent onSelection={onSelection} />,
    textAlignment: "center",
  }
}
