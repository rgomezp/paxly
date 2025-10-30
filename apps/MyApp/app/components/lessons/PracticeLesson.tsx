import { View } from "react-native"
import { Text } from ".."
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import { PracticeLessonConfig } from "@/types/lessons/IPracticeLessonConfig"
import RectangularButton from "../buttons/RectangularButton"
import { Countdown } from "./primitives/Countdown"
import { Breath } from "./primitives/Breath"
import { AudioStep } from "./primitives/AudioStep"
import { LessonCard } from "./primitives/LessonCard"
import { LessonHeader } from "./LessonHeader"

export function PracticeLesson({
  config,
  onComplete,
}: {
  config: PracticeLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [step, setStep] = useState(0)
  const s = config.steps[step]
  const next = () => {
    if (step + 1 < config.steps.length) setStep(step + 1)
    else onComplete?.()
  }
  return (
    <View style={themed(() => ({ alignItems: "center" }))}>
      <LessonHeader title={config.title} subtitle={config.goal} />
      <View style={themed(() => ({ padding: theme.spacing.md, gap: theme.spacing.sm }))}>
        {s?.t === "instruction" && (
          <LessonCard>
            <Text>{s.body}</Text>
          </LessonCard>
        )}
        {s?.t === "timer" && <Countdown seconds={s.seconds} label={s.label} onDone={next} />}
        {s?.t === "breath" && <Breath pattern={s.pattern} rounds={s.rounds} onDone={next} />}
        {s?.t === "audio" && <AudioStep asset={(s as any).asset} onDone={onComplete} />}
        {s?.t === "check" && (
          <LessonCard>
            <Text>{s.prompt}</Text>
          </LessonCard>
        )}
      </View>
      {s?.t !== "timer" && s?.t !== "breath" && s?.t !== "audio" && (
        <RectangularButton
          buttonText={step + 1 < config.steps.length ? "Next" : "Finish"}
          onClick={next}
        />
      )}
    </View>
  )
}
