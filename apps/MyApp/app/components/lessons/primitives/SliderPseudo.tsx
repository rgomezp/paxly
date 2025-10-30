import { Text } from "@/components/Text"
import { Pressable, View } from "react-native"
import { LessonCard } from "./LessonCard"
import { useAppTheme } from "@/utils/useAppTheme"

export function SliderPseudo({
  value,
  min,
  max,
  onChange,
}: {
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  const { themed, theme } = useAppTheme()
  // replace with @react-native-community/slider in prod
  return (
    <LessonCard>
      <Text>Value: {value}</Text>
      <View style={themed(() => ({ flexDirection: "row", gap: 6, marginTop: theme.spacing.xs }))}>
        {[...Array(11)].map((_, i) => {
          const v = Math.round(min + (i * (max - min)) / 10)
          const sel = v <= value
          return (
            <Pressable
              key={i}
              onPress={() => onChange(v)}
              style={themed(() => ({
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: sel ? theme.colors.tint : theme.colors.card,
              }))}
            />
          )
        })}
      </View>
    </LessonCard>
  )
}
