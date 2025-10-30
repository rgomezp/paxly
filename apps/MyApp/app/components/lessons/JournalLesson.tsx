import { JournalLessonConfig } from "@/types/lessons/IJournalLessonConfig"
import { useState } from "react"
import { Screen, Header, Text } from ".."
import { FlatList, ScrollView, TextInput, View } from "react-native"
import RectangularButton from "../buttons/RectangularButton"
import { SliderPseudo } from "./primitives/SliderPseudo"
import { Chip } from "./primitives/Chip"
import { useAppTheme } from "@/utils/useAppTheme"

export function JournalLesson({
  config,
  onComplete,
}: {
  config: JournalLessonConfig
  onComplete?: () => void
}) {
  const { themed, theme } = useAppTheme()
  const [form, setForm] = useState<Record<string, any>>({})
  const update = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))
  return (
    <Screen>
      <Header title={config.title} />
      <Text preset="subheading">{config.goal}</Text>
      <ScrollView>
        {config.fields.map((f) => (
          <View key={f.name}>
            <Text>{(f as any).label}</Text>
            {f.kind === "shortText" || f.kind === "longText" ? (
              <TextInput
                style={themed(() => ({
                  paddingVertical: theme.spacing.sm,
                  paddingHorizontal: theme.spacing.md,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  marginTop: theme.spacing.xs,
                }))}
                placeholderTextColor={theme.colors.textDim}
                multiline={f.kind === "longText"}
                onChangeText={(t) => update(f.name, t)}
              />
            ) : f.kind === "radio" ? (
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
            ) : f.kind === "slider" ? (
              <SliderPseudo
                value={form[f.name] ?? f.min}
                min={f.min}
                max={f.max}
                onChange={(v) => update(f.name, v)}
              />
            ) : f.kind === "checkbox" ? (
              <Chip
                selected={!!form[f.name]}
                label={(f as any).label}
                onPress={() => update(f.name, !form[f.name])}
              />
            ) : null}
          </View>
        ))}
      </ScrollView>
      <RectangularButton buttonText="Save & Continue" onClick={() => onComplete?.()} />
    </Screen>
  )
}
