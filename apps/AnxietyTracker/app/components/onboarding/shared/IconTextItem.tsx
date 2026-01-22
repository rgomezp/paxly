import { View } from "react-native"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ViewStyle, TextStyle } from "react-native"
import type { ThemedStyle } from "@/theme"

export interface IconTextData {
  icon: string
  title: string
  description: string
}

interface IconTextItemProps {
  icon: string
  title: string
  description: string
}

export const IconTextItem: React.FC<IconTextItemProps> = ({ icon, title, description }) => {
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($row)}>
      <View style={themed($iconContainer)}>
        <ThemedFontAwesome5Icon name={icon} size={28} color={theme.colors.tint} solid />
      </View>
      <View style={themed($textContainer)}>
        <Text style={themed($title)}>{title}</Text>
        <Text style={themed($description)}>{description}</Text>
      </View>
    </View>
  )
}

const $row: ThemedStyle<ViewStyle> = () => ({
  alignItems: "flex-start",
  flexDirection: "row",
  gap: 16,
  width: "100%",
})

const $iconContainer: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  backgroundColor: theme.colors.card,
  borderRadius: 12,
  height: 56,
  justifyContent: "center",
  width: 56,
})

const $textContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  minWidth: 0,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 4,
})

const $description: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 15,
  lineHeight: 22,
})
