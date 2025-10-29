import { FC } from "react"
import { View, ViewStyle, Pressable, TextStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "./Text"

export interface SegmentedSelectorOption {
  key: string
  label: string
}

interface SegmentedSelectorProps {
  options: SegmentedSelectorOption[]
  selectedKey: string
  onSelect: (key: string) => void
}

const SegmentedSelector: FC<SegmentedSelectorProps> = ({ options, selectedKey, onSelect }) => {
  const { theme, themed } = useAppTheme()

  return (
    <View style={themed([$segmented, { backgroundColor: theme.colors.card }])}>
      {options.map((opt) => {
        const isSelected = selectedKey === opt.key
        return (
          <Pressable
            key={opt.key}
            onPress={() => onSelect(opt.key)}
            style={[
              themed($segmentButton),
              isSelected && themed([$segmentSelected, { backgroundColor: theme.colors.tint }]),
            ]}
          >
            <Text
              style={themed([
                $segmentText,
                { color: isSelected ? theme.colors.background : theme.colors.text },
              ])}
              text={opt.label}
            />
          </Pressable>
        )
      })}
    </View>
  )
}

export default SegmentedSelector

const $segmented: ViewStyle = {
  flexDirection: "row",
  borderRadius: 12,
  overflow: "hidden",
  marginVertical: 32,
}

const $segmentButton: ViewStyle = {
  flex: 1,
  paddingVertical: 10,
  alignItems: "center",
  justifyContent: "center",
}

const $segmentSelected: ViewStyle = {}

const $segmentText: TextStyle = {
  fontWeight: "600",
}
