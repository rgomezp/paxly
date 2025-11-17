import { Text } from "@/components/Text"
import { Pressable, View } from "react-native"
import { LessonCard } from "./LessonCard"
import { useAppTheme } from "@/utils/useAppTheme"

export function SliderPseudo({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  label?: string
}) {
  const { themed, theme } = useAppTheme()
  // replace with @react-native-community/slider in prod
  const steps = 11
  const stepValues = [...Array(steps)].map((_, i) =>
    Math.round(min + (i * (max - min)) / (steps - 1)),
  )
  const foundIndex = stepValues.findIndex((v) => v >= value)
  const activeIndex = foundIndex !== -1 ? foundIndex : stepValues.length - 1
  const percentage = (activeIndex / (steps - 1)) * 100

  return (
    <View style={themed(() => ({ width: "100%", alignSelf: "stretch" }))}>
      <LessonCard>
        <View
          style={themed(() => ({
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.sm,
          }))}
        >
          {label && (
            <Text style={themed(() => ({ fontSize: 16, fontWeight: "500" }))}>{label}</Text>
          )}
          <Text style={themed(() => ({ fontSize: 18, fontWeight: "600" }))}>{value}</Text>
        </View>
        <View
          style={themed(() => ({
            position: "relative",
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.sm,
          }))}
        >
          {/* Track background */}
          <View
            style={themed(() => ({
              position: "absolute",
              top: 14,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: theme.colors.border,
              borderRadius: 2,
            }))}
          />
          {/* Active track */}
          <View
            style={themed(() => ({
              position: "absolute",
              top: 14,
              left: 0,
              width: `${percentage}%`,
              height: 4,
              backgroundColor: theme.colors.tint,
              borderRadius: 2,
            }))}
          />
          {/* Slider dots */}
          <View
            style={themed(() => ({
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }))}
          >
            {stepValues.map((v, i) => {
              const isActive = v <= value
              const isSelected = v === value
              return (
                <Pressable
                  key={i}
                  onPress={() => onChange(v)}
                  style={themed(() => ({
                    width: isSelected ? 28 : 24,
                    height: isSelected ? 28 : 24,
                    borderRadius: isSelected ? 14 : 12,
                    backgroundColor: isActive ? theme.colors.tint : theme.colors.border,
                    borderWidth: isSelected ? 3 : 0,
                    borderColor: theme.colors.background,
                    zIndex: isSelected ? 2 : 1,
                    shadowColor: isSelected ? theme.colors.tint : "transparent",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isSelected ? 0.3 : 0,
                    shadowRadius: 4,
                    elevation: isSelected ? 4 : 0,
                  }))}
                />
              )
            })}
          </View>
        </View>
        {/* Min/Max labels */}
        <View
          style={themed(() => ({
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing.xs,
          }))}
        >
          <Text style={themed(() => ({ fontSize: 12, color: theme.colors.textDim }))}>{min}</Text>
          <Text style={themed(() => ({ fontSize: 12, color: theme.colors.textDim }))}>{max}</Text>
        </View>
      </LessonCard>
    </View>
  )
}
