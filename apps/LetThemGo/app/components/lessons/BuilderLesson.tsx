import { BuilderLessonConfig } from "@/types/lessons/IBuilderLessonConfig"
import { useState, useEffect } from "react"
import { Text } from "../Text"
import { ScrollView, TextInput, View, useWindowDimensions } from "react-native"
import RectangularButton from "../buttons/RectangularButton"
import { CheckRow } from "./primitives/CheckRow"
import { LessonCard } from "./primitives/LessonCard"
import { useAppTheme } from "@/utils/useAppTheme"
import { LessonHeader } from "./LessonHeader"
import LessonResponseManager from "@/managers/LessonResponseManager"

export function BuilderLesson({
  config,
  onComplete,
}: {
  config: BuilderLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const { width } = useWindowDimensions()
  const [checked, setChecked] = useState<Record<string, any>>({})
  const [textInputs, setTextInputs] = useState<Record<string, string>>({})

  // Load saved responses on mount
  useEffect(() => {
    const savedResponses = LessonResponseManager.getLessonResponses(config.id)
    setTextInputs(savedResponses)
  }, [config.id])

  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }))

  // Save text input changes
  const handleTextChange = (item: { label: string; inputId?: string }, text: string) => {
    // Generate a unique ID: use inputId if provided, otherwise generate from label
    const inputId = item.inputId || `text_${item.label.replace(/\s+/g, "_").toLowerCase()}`
    setTextInputs((prev) => ({ ...prev, [inputId]: text }))
    LessonResponseManager.saveResponse(config.id, inputId, text)
  }

  // Calculate button width: use 85% of screen width, but cap at 300px for readability
  const buttonWidth = Math.min(width * 0.85, 300)

  return (
    <View style={themed(() => ({ flex: 1 }))}>
      <ScrollView
        style={themed(() => ({ flex: 1 }))}
        contentContainerStyle={themed(() => ({
          padding: theme.spacing.lg,
          paddingBottom: 100, // Reserve space for button
        }))}
      >
        <LessonHeader title={config.title} subtitle={config.goal} />
        {config.sections.map((s, idx) => (
          <View key={idx} style={themed(() => ({ marginBottom: theme.spacing.lg }))}>
            <Text
              style={themed(() => ({
                color: theme.colors.text,
                fontWeight: "600",
                marginBottom: theme.spacing.sm,
                fontSize: 18,
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
                      backgroundColor: theme.colors.background,
                    }))}
                    placeholder={it.label}
                    placeholderTextColor={theme.colors.textDim}
                    value={
                      textInputs[
                        it.inputId || `text_${it.label.replace(/\s+/g, "_").toLowerCase()}`
                      ] ?? ""
                    }
                    onChangeText={(t) => handleTextChange(it, t)}
                  />
                )
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
        <RectangularButton
          width={buttonWidth}
          buttonText={config.commitment?.text || "Done"}
          onClick={() => onComplete?.()}
        />
      </View>
    </View>
  )
}
