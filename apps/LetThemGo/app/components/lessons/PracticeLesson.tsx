import { View } from "react-native"
import { Text } from ".."
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import { PracticeLessonConfig } from "@/types/lessons/IPracticeLessonConfig"
import { Countdown } from "./primitives/Countdown"
import { Breath } from "./primitives/Breath"
import { AudioStep } from "./primitives/AudioStep"
import { LessonHeader } from "./LessonHeader"
import { CheckRow } from "./primitives/CheckRow"
import { TextInputStep } from "./primitives/TextInputStep"
import { SliderStep } from "./primitives/SliderStep"
import { LessonFooter } from "./LessonFooter"
import { LessonNavigationButtons } from "./LessonNavigationButtons"

export function PracticeLesson({
  config,
  onComplete,
}: {
  config: PracticeLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [step, setStep] = useState(0)
  const [checkValues, setCheckValues] = useState<Record<number, boolean>>({})
  const s = config.steps[step]
  const totalSteps = config.steps.length
  const isLastStep = step === totalSteps - 1
  const isFirstStep = step === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.()
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setStep(step - 1)
    }
  }

  const handleCheckToggle = () => {
    setCheckValues((prev) => ({ ...prev, [step]: !prev[step] }))
  }
  const handleTextInputDone = () => {
    handleNext()
  }
  const handleSliderDone = () => {
    handleNext()
  }
  return (
    <View style={themed(() => ({ flex: 1 }))}>
      <LessonHeader title={config.title} subtitle={config.goal} />
      <View
        style={themed(() => ({
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing.md,
          paddingBottom: 100, // Always reserve space for button
        }))}
      >
        {s?.t === "instruction" && (
          <View style={themed(() => ({ paddingHorizontal: theme.spacing.md }))}>
            <Text style={themed(() => ({ textAlign: "center" }))}>{s.body}</Text>
          </View>
        )}
        {s?.t === "timer" && (
          <Countdown key={step} seconds={s.seconds} label={s.label} onDone={handleNext} />
        )}
        {s?.t === "breath" && (
          <Breath key={step} pattern={s.pattern} rounds={s.rounds} onDone={handleNext} />
        )}
        {s?.t === "audio" && <AudioStep key={step} asset={(s as any).asset} onDone={handleNext} />}
        {s?.t === "check" && (
          <CheckRow
            key={step}
            label={s.prompt}
            value={checkValues[step] ?? false}
            onToggle={handleCheckToggle}
          />
        )}
        {s?.t === "textInput" && (
          <TextInputStep
            key={step}
            prompt={s.prompt}
            placeholder={s.placeholder}
            onDone={handleTextInputDone}
            lessonId={config.id}
            inputId={s.inputId || `step_${step}`}
          />
        )}
        {s?.t === "slider" && (
          <SliderStep
            key={step}
            prompt={s.prompt}
            min={s.min}
            max={s.max}
            defaultValue={s.defaultValue}
            onDone={handleSliderDone}
            lessonId={config.id}
            inputId={s.inputId || `step_${step}`}
          />
        )}
      </View>
      <LessonFooter
        showProgressBar={config.steps.length > 1}
        currentIndex={step}
        totalItems={config.steps.length}
      >
        <LessonNavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          isFirst={isFirstStep}
          isLast={isLastStep}
        />
      </LessonFooter>
    </View>
  )
}
