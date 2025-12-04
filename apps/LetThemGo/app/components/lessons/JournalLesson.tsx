import { JournalLessonConfig } from "@/types/lessons/IJournalLessonConfig"
import { useState, useEffect } from "react"
import { Text } from ".."
import { FlatList, ScrollView, StyleSheet, TextInput, View } from "react-native"
import RectangularButton from "../buttons/RectangularButton"
import { SliderPseudo } from "./primitives/SliderPseudo"
import { Chip } from "./primitives/Chip"
import { useAppTheme } from "@/utils/useAppTheme"
import { LessonHeader } from "./LessonHeader"
import LessonResponseManager from "@/managers/LessonResponseManager"

export function JournalLesson({
  config,
  onComplete,
}: {
  config: JournalLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [form, setForm] = useState<Record<string, any>>({})

  // Load saved responses on mount
  useEffect(() => {
    const savedResponses = LessonResponseManager.getLessonResponses(config.id)
    setForm(savedResponses)
  }, [config.id])

  const update = (k: string, v: any) => {
    setForm((f) => ({ ...f, [k]: v }))
  }

  // Save text input changes
  const handleTextChange = (field: { name: string; inputId?: string }, text: string) => {
    const inputId = field.inputId || field.name // Use inputId if provided, otherwise fallback to name
    update(inputId, text)
    LessonResponseManager.saveResponse(config.id, inputId, text)
  }
  return (
    <View style={themed(() => ({ flex: 1 }))}>
      <ScrollView
        style={themed(() => ({
          flex: 1,
          padding: theme.spacing.md,
        }))}
      >
        <LessonHeader title={config.title} subtitle={config.goal} />
        {config.fields.map((f, index) => {
          const isLast = index === config.fields.length - 1
          const marginBottom = isLast ? theme.spacing.xxxl * 3 : theme.spacing.lg
          return (
            <View key={f.name} style={themed(() => ({ marginBottom }))}>
              {f.kind === "text" ? (
                <Text>{(f as any).label}</Text>
              ) : f.kind === "shortText" || f.kind === "longText" ? (
                <>
                  <Text>{(f as any).label}</Text>
                  <TextInput
                    style={themed(() => ({
                      paddingVertical: theme.spacing.sm,
                      paddingHorizontal: theme.spacing.md,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                      marginTop: theme.spacing.md,
                      backgroundColor: theme.colors.textInputBackground,
                    }))}
                    placeholderTextColor={theme.colors.textDim}
                    multiline={f.kind === "longText"}
                    value={form[f.inputId || f.name] ?? ""}
                    onChangeText={(t) => handleTextChange(f, t)}
                  />
                </>
              ) : f.kind === "radio" ? (
                <>
                  <Text>{(f as any).label}</Text>
                  <View style={themed(() => ({ marginTop: theme.spacing.md }))}>
                    <FlatList
                      data={(f as any).options}
                      horizontal
                      renderItem={({ item }) => (
                        <Chip
                          selected={form[f.name] === item}
                          label={item}
                          onPress={() => update(f.name, item)}
                        />
                      )}
                    />
                  </View>
                </>
              ) : f.kind === "slider" ? (
                <SliderPseudo
                  value={form[f.name] ?? f.min}
                  min={f.min}
                  max={f.max}
                  onChange={(v) => update(f.name, v)}
                  label={(f as any).label}
                />
              ) : f.kind === "checkbox" ? (
                <Chip
                  selected={!!form[f.name]}
                  label={(f as any).label}
                  onPress={() => update(f.name, !form[f.name])}
                />
              ) : null}
            </View>
          )
        })}
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
          buttonText={config.commitment?.text || "Finish"}
          onClick={() => onComplete?.()}
          customStyles={styles.buttonMinWidth}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonMinWidth: {
    minWidth: 200,
  },
})
