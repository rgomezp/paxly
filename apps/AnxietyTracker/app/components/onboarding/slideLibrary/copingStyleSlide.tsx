import type { ISlide } from "@/types/ISlide"
import { MultipleChoiceSelector, type MultipleChoiceOption } from "../shared/MultipleChoiceSelector"
import Log from "@/utils/Log"
import { ganon } from "@/services/ganon/ganon"
import { useState, useEffect } from "react"

type CopingStyleChoices =
  | "push_through_it"
  | "avoid_things"
  | "distract_myself"
  | "talk_to_someone"
  | "try_breathing_or_calming_tools"
  | "not_sure_nothing_helps"

type CopingStyleSlideProps = {
  onSelection?: () => void
}

const options: MultipleChoiceOption<CopingStyleChoices>[] = [
  { id: "push_through_it", label: "Push through it" },
  { id: "avoid_things", label: "Avoid things" },
  { id: "distract_myself", label: "Distract myself" },
  { id: "talk_to_someone", label: "Talk to someone" },
  { id: "try_breathing_or_calming_tools", label: "Try breathing or calming tools" },
  { id: "not_sure_nothing_helps", label: "Not sure / nothing helps" },
]

interface CopingStyleComponentProps {
  onSelection?: () => void
}

function CopingStyleComponent({ onSelection }: CopingStyleComponentProps) {
  // Read saved coping styles from ganon
  const savedCopingStyles = (ganon.get("copingStyle") as CopingStyleChoices[] | null) || []
  const [selectedCopingStyles, setSelectedCopingStyles] =
    useState<CopingStyleChoices[]>(savedCopingStyles)

  // Update selected coping styles when saved coping styles change
  useEffect(() => {
    const saved = (ganon.get("copingStyle") as CopingStyleChoices[] | null) || []
    setSelectedCopingStyles(saved)
  }, [])

  const buttonPressed = (optionId: string, shouldAutoAdvance?: boolean) => {
    Log.info(`CopingStyleSlide: buttonPressed: ${optionId}`)

    const copingStyle = optionId as CopingStyleChoices

    // Update local state
    setSelectedCopingStyles((prev) => {
      const newCopingStyles = prev.includes(copingStyle)
        ? prev.filter((id) => id !== copingStyle)
        : [...prev, copingStyle]

      // Save to ganon
      try {
        ganon.set("copingStyle", newCopingStyles)
        Log.info(`CopingStyleSlide: Saved copingStyle: ${JSON.stringify(newCopingStyles)}`)
      } catch (e) {
        Log.error(`CopingStyleSlide: Error saving copingStyle: ${e}`)
      }

      return newCopingStyles
    })
  }

  return (
    <MultipleChoiceSelector
      options={options}
      onSelection={buttonPressed}
      allowMultiple={true}
      maxOptions={6}
      initialSelectedOptions={selectedCopingStyles}
      onAutoAdvance={onSelection}
    />
  )
}

export function copingStyleSlide({ onSelection }: CopingStyleSlideProps): ISlide {
  return {
    id: "copingStyle",
    title: "When anxiety hits, what do you usually do?",
    component: <CopingStyleComponent onSelection={onSelection} />,
    textAlignment: "center",
  }
}
