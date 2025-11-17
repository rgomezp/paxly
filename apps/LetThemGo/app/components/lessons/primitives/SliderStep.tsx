import { useState, useEffect } from "react"
import { SliderPseudo } from "./SliderPseudo"
import LessonResponseManager from "@/managers/LessonResponseManager"

export function SliderStep({
  prompt,
  min = 0,
  max = 10,
  defaultValue,
  onDone: _onDone,
  lessonId,
  inputId,
}: {
  prompt: string
  min?: number
  max?: number
  defaultValue?: number
  onDone?: (value: number) => void
  lessonId?: string
  inputId?: string
}) {
  const initialValue = defaultValue ?? Math.round((min + max) / 2)
  const [value, setValue] = useState(initialValue)

  // Load saved response on mount if lessonId and inputId are provided
  useEffect(() => {
    if (lessonId && inputId) {
      const saved = LessonResponseManager.getResponse(lessonId, inputId)
      if (saved) {
        const parsedValue = parseInt(saved, 10)
        if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max) {
          setValue(parsedValue)
        }
      }
    }
  }, [lessonId, inputId, min, max])

  // Save response on change if lessonId and inputId are provided
  const handleChange = (newValue: number) => {
    setValue(newValue)
    if (lessonId && inputId) {
      LessonResponseManager.saveResponse(lessonId, inputId, newValue.toString())
    }
  }

  return <SliderPseudo value={value} min={min} max={max} onChange={handleChange} label={prompt} />
}
