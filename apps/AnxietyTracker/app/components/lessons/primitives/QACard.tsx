import { View, Pressable, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"

export function QACard({ question, options }: { question: string; options: string[] }) {
  const { themed, theme } = useAppTheme()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <View style={themed(() => ({ width: "100%" }))}>
      <Text
        weight="bold"
        style={themed(() => ({
          marginBottom: theme.spacing.lg,
          textAlign: "center",
          color: theme.colors.text,
        }))}
      >
        {question}
      </Text>
      <View style={themed(() => ({ gap: theme.spacing.sm }))}>
        {options.map((option, index) => {
          const isSelected = selectedIndex === index
          return (
            <Pressable
              key={index}
              onPress={() => setSelectedIndex(index)}
              style={themed<ViewStyle>(() => ({
                padding: theme.spacing.md,
                borderRadius: 12,
                backgroundColor: isSelected ? theme.colors.tint : theme.colors.palette.neutral100,
                borderWidth: 1,
                borderColor: isSelected ? theme.colors.tint : theme.colors.border,
              }))}
            >
              <Text
                style={themed(() => ({
                  color: isSelected ? theme.colors.background : theme.colors.text,
                  textAlign: "center",
                }))}
              >
                {option}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
