import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"
import { useState, useEffect } from "react"

type AnxietyTriggerChoices =
  | "relationships"
  | "health_worries"
  | "money"
  | "news_social_media"
  | "lack_of_sleep"
  | "unclear"

type AnxietyTriggersSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<AnxietyTriggerChoices>[] = [
  { id: "relationships", label: "Relationships" },
  { id: "health_worries", label: "Health worries" },
  { id: "money", label: "Money" },
  { id: "news_social_media", label: "News / social media" },
  { id: "lack_of_sleep", label: "Lack of sleep" },
  { id: "unclear", label: "Unclear" },
]

interface AnxietyTriggersComponentProps {
  onSelection?: () => void
}

function AnxietyTriggersComponent({ onSelection }: AnxietyTriggersComponentProps) {
  // Read saved triggers from ganon
  const savedTriggers = (ganon.get("anxietyTriggers") as AnxietyTriggerChoices[] | null) || []
  const [selectedTriggers, setSelectedTriggers] = useState<AnxietyTriggerChoices[]>(savedTriggers)

  // Update selected triggers when saved triggers change
  useEffect(() => {
    const saved = (ganon.get("anxietyTriggers") as AnxietyTriggerChoices[] | null) || []
    setSelectedTriggers(saved)
  }, [])

  const buttonPressed = (optionId: string, _shouldAutoAdvance?: boolean) => {
    Log.info(`AnxietyTriggersSlide: buttonPressed: ${optionId}`)

    const trigger = optionId as AnxietyTriggerChoices

    // Update local state
    setSelectedTriggers((prev) => {
      const newTriggers = prev.includes(trigger)
        ? prev.filter((id) => id !== trigger)
        : [...prev, trigger]

      // Save to ganon
      try {
        ganon.set("anxietyTriggers", newTriggers)
        Log.info(`AnxietyTriggersSlide: Saved anxietyTriggers: ${JSON.stringify(newTriggers)}`)
      } catch (e) {
        Log.error(`AnxietyTriggersSlide: Error saving anxietyTriggers: ${e}`)
      }

      return newTriggers
    })
  }

  return (
    <MultipleChoiceSelector
      options={options}
      onSelection={buttonPressed}
      allowMultiple={true}
      maxOptions={6}
      initialSelectedOptions={selectedTriggers}
      onAutoAdvance={onSelection}
    />
  )
}

export function anxietyTriggersSlide({ onSelection }: AnxietyTriggersSlideProps): ISlide {
  return {
    id: "anxietyTriggers",
    title: "What tends to trigger your anxiety?",
    component: <AnxietyTriggersComponent onSelection={onSelection} />,
    textAlignment: "center",
  }
}
