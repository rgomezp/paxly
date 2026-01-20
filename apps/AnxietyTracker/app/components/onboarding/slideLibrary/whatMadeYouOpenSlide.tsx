import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"
import { useState, useEffect } from "react"

type WhatMadeYouOpenChoices =
  | "feeling_anxious_or_overwhelmed"
  | "stress_from_work_or_school"
  | "trouble_sleeping"
  | "low_mood_or_emotional_numbness"
  | "panic_or_sudden_anxiety"
  | "just_checking_it_out"

type WhatMadeYouOpenSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<WhatMadeYouOpenChoices>[] = [
  { id: "feeling_anxious_or_overwhelmed", label: "Feeling anxious or overwhelmed" },
  { id: "stress_from_work_or_school", label: "Stress from work or school" },
  { id: "trouble_sleeping", label: "Trouble sleeping" },
  { id: "low_mood_or_emotional_numbness", label: "Low mood / emotional numbness" },
  { id: "panic_or_sudden_anxiety", label: "Panic or sudden anxiety" },
  { id: "just_checking_it_out", label: "Just checking it out" },
]

interface WhatMadeYouOpenComponentProps {
  onSelection?: () => void
}

function WhatMadeYouOpenComponent({ onSelection }: WhatMadeYouOpenComponentProps) {
  // Read saved reasons from ganon
  const savedReasons = (ganon.get("whatMadeYouOpen") as WhatMadeYouOpenChoices[] | null) || []
  const [selectedReasons, setSelectedReasons] = useState<WhatMadeYouOpenChoices[]>(savedReasons)

  // Update selected reasons when saved reasons change
  useEffect(() => {
    const saved = (ganon.get("whatMadeYouOpen") as WhatMadeYouOpenChoices[] | null) || []
    setSelectedReasons(saved)
  }, [])

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`WhatMadeYouOpenSlide: buttonPressed: ${optionId}`)

    const reason = optionId as WhatMadeYouOpenChoices

    // Update local state
    setSelectedReasons((prev) => {
      const newReasons = prev.includes(reason)
        ? prev.filter((id) => id !== reason)
        : [...prev, reason]

      // Save to ganon
      try {
        ganon.set("whatMadeYouOpen", newReasons)
        Log.info(`WhatMadeYouOpenSlide: Saved whatMadeYouOpen: ${JSON.stringify(newReasons)}`)
      } catch (e) {
        Log.error(`WhatMadeYouOpenSlide: Error saving whatMadeYouOpen: ${e}`)
      }

      return newReasons
    })

    onSelection?.()
  }

  return (
    <MultipleChoiceSelector
      options={options}
      onSelection={buttonPressed}
      allowMultiple={true}
      maxOptions={6}
      initialSelectedOptions={selectedReasons}
      onAutoAdvance={onSelection}
    />
  )
}

export function whatMadeYouOpenSlide({ onSelection }: WhatMadeYouOpenSlideProps): ISlide {
  return {
    id: "whatMadeYouOpen",
    title: "What made you open Paxly today?",
    component: <WhatMadeYouOpenComponent onSelection={onSelection} />,
    textAlignment: "center",
  }
}
