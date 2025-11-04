import { View } from "react-native"
import { Text } from ".."
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import { PracticeLessonConfig } from "@/types/lessons/IPracticeLessonConfig"
import RectangularButton from "../buttons/RectangularButton"
import { Countdown } from "./primitives/Countdown"
import { Breath } from "./primitives/Breath"
import { AudioStep } from "./primitives/AudioStep"
import { LessonHeader } from "./LessonHeader"
import { CheckRow } from "./primitives/CheckRow"
import { TextInputStep } from "./primitives/TextInputStep"

export function PracticeLesson({
  config,
  onComplete,
}: {
  config: PracticeLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [step, setStep] = useState(0)
  const [showFinish, setShowFinish] = useState(false)
  const [checkValues, setCheckValues] = useState<Record<number, boolean>>({})
  const s = config.steps[step]
  const next = () => {
    if (step + 1 < config.steps.length) setStep(step + 1)
    else setShowFinish(true)
  }
  const handleCheckToggle = () => {
    setCheckValues((prev) => ({ ...prev, [step]: !prev[step] }))
  }
  const handleTextInputDone = () => {
    next()
  }
  const showButton = showFinish || (s?.t !== "timer" && s?.t !== "breath" && s?.t !== "audio")
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
        {s?.t === "timer" && <Countdown seconds={s.seconds} label={s.label} onDone={next} />}
        {s?.t === "breath" && <Breath pattern={s.pattern} rounds={s.rounds} onDone={next} />}
        {s?.t === "audio" && <AudioStep asset={(s as any).asset} onDone={onComplete} />}
        {s?.t === "check" && (
          <CheckRow
            label={s.prompt}
            value={checkValues[step] ?? false}
            onToggle={handleCheckToggle}
          />
        )}
        {s?.t === "textInput" && (
          <TextInputStep
            prompt={s.prompt}
            placeholder={s.placeholder}
            onDone={handleTextInputDone}
          />
        )}
      </View>
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
        {showButton && (
          <RectangularButton
            width={200}
            buttonText={showFinish || step + 1 >= config.steps.length ? "Finish" : "Next"}
            onClick={() => {
              if (showFinish || step + 1 >= config.steps.length) onComplete?.()
              else next()
            }}
          />
        )}
      </View>
    </View>
  )
}
