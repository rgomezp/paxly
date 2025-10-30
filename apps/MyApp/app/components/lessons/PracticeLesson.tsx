import { View } from "react-native"
import { Card, Header, Screen, Text } from ".."
import { useState } from "react"
import { PracticeLessonConfig } from "@/types/lessons/IPracticeLessonConfig"
import RectangularButton from "../buttons/RectangularButton"
import { Countdown } from "./primitives/Countdown"
import { Breath } from "./primitives/Breath"
import { AudioStep } from "./primitives/AudioStep"

export function PracticeLesson({
  config,
  onComplete,
}: {
  config: PracticeLessonConfig
  onComplete?: () => void
}) {
  const [step, setStep] = useState(0)
  const s = config.steps[step]
  const next = () => {
    if (step + 1 < config.steps.length) setStep(step + 1)
    else onComplete?.()
  }
  return (
    <Screen>
      <Header title={config.title} />
      <Text preset="subheading">{config.goal}</Text>
      <View>
        {s?.t === "instruction" && (
          <Card>
            <Text>{s.body}</Text>
          </Card>
        )}
        {s?.t === "timer" && <Countdown seconds={s.seconds} label={s.label} onDone={next} />}
        {s?.t === "breath" && <Breath pattern={s.pattern} rounds={s.rounds} onDone={next} />}
        {s?.t === "audio" && <AudioStep asset={(s as any).asset} onDone={onComplete} />}
        {s?.t === "check" && (
          <Card>
            <Text>{s.prompt}</Text>
          </Card>
        )}
      </View>
      {s?.t !== "timer" && s?.t !== "breath" && s?.t !== "audio" && (
        <RectangularButton
          buttonText={step + 1 < config.steps.length ? "Next" : "Finish"}
          onClick={next}
        />
      )}
    </Screen>
  )
}
