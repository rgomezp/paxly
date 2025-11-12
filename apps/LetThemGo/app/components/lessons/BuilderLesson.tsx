import { BuilderLessonConfig } from "@/types/lessons/IBuilderLessonConfig"
import { useState } from "react"
import { Screen } from "../Screen"
import { Text } from "../Text"
import { ScrollView, TextInput, View } from "react-native"
import RectangularButton from "../buttons/RectangularButton"
import { LinkRow } from "./primitives/LinkRow"
import { CheckRow } from "./primitives/CheckRow"
import { LessonCard } from "./primitives/LessonCard"
import { useAppTheme } from "@/utils/useAppTheme"
import { LessonHeader } from "./LessonHeader"

export function BuilderLesson({
  config,
  onComplete,
}: {
  config: BuilderLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [checked, setChecked] = useState<Record<string, any>>({})
  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }))
  return (
    <Screen>
      <View style={themed(() => ({ flex: 1 }))}>
        <LessonHeader title={config.title} subtitle={config.goal} />
        <ScrollView style={themed(() => ({ flex: 1, padding: theme.spacing.lg }))}>
          {config.sections.map((s, idx) => (
            <View key={idx} style={themed(() => ({ marginBottom: theme.spacing.lg }))}>
              <Text
                style={themed(() => ({
                  color: theme.colors.text,
                  fontWeight: "600",
                  marginBottom: theme.spacing.xs,
                }))}
              >
                {s.title}
              </Text>
              {s.items.map((it, i) => {
                const key = `${idx}-${i}-${it.label}`
                if (it.kind === "check")
                  return (
                    <CheckRow
                      key={key}
                      label={it.label}
                      value={!!checked[key]}
                      onToggle={() => toggle(key)}
                    />
                  )
                if (it.kind === "picker")
                  return (
                    <LessonCard key={key}>
                      <Text style={themed(() => ({ color: theme.colors.text }))}>
                        {it.label}: {(it as any).options.join(", ")}
                      </Text>
                    </LessonCard>
                  )
                if (it.kind === "datetime")
                  return (
                    <LessonCard key={key}>
                      <Text style={themed(() => ({ color: theme.colors.text }))}>
                        {it.label || "Pick date/time"}
                      </Text>
                    </LessonCard>
                  )
                if (it.kind === "shortText")
                  return (
                    <TextInput
                      key={key}
                      style={themed(() => ({
                        paddingVertical: theme.spacing.sm,
                        paddingHorizontal: theme.spacing.md,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: theme.colors.border,
                        color: theme.colors.text,
                        marginTop: theme.spacing.xs,
                      }))}
                      placeholder={it.label}
                      placeholderTextColor={theme.colors.textDim}
                    />
                  )
                if (it.kind === "link")
                  return <LinkRow key={key} label={it.label} action={(it as any).action} />
                if (it.kind === "contact")
                  return (
                    <LessonCard key={key}>
                      <Text style={themed(() => ({ color: theme.colors.text }))}>
                        Select contact: {it.label}
                      </Text>
                    </LessonCard>
                  )
                return null
              })}
            </View>
          ))}
        </ScrollView>
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
          <RectangularButton buttonText="Done" onClick={() => onComplete?.()} />
        </View>
      </View>
    </Screen>
  )
}
