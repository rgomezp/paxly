import { Pressable, View, type ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "@/components"
import { ThemedPhosphorIcon } from "@/components/ThemedPhosphorIcon"
import { CaretRightIcon, SmileyIcon } from "phosphor-react-native"

type Props = {
  name: string
  onPress: () => void
}

export default function EnjoyPaxlyBanner({ name, onPress }: Props) {
  const { themed, theme } = useAppTheme()

  // Ensure good contrast on the banner background in both themes.
  const bannerForegroundColor = theme.isDark
    ? theme.colors.palette.neutral900 // white in dark palette
    : theme.colors.palette.neutral100 // white in light palette

  return (
    <View style={themed($bannerOuter)}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [themed($banner), pressed ? themed($bannerPressed) : null]}
        android_ripple={{ color: "rgba(255,255,255,0.15)" }}
      >
        <View style={themed($bannerLeft)}>
          <ThemedPhosphorIcon Component={SmileyIcon} size={22} color={bannerForegroundColor} />
          <View style={themed($bannerTextCol)}>
            <Text
              text={`Hi, ${name}!`}
              weight="bold"
              style={themed({ color: bannerForegroundColor })}
            />
            <Text
              text="Are you enjoying Paxly?"
              size="sm"
              style={themed({ color: bannerForegroundColor, opacity: 0.9 })}
            />
          </View>
        </View>
        <ThemedPhosphorIcon Component={CaretRightIcon} size={22} color={bannerForegroundColor} />
      </Pressable>
    </View>
  )
}

const $bannerOuter: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 10,
}

const $banner: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  paddingHorizontal: 14,
  paddingVertical: 14,
  borderRadius: 16,
  // High-contrast, celebratory color
  backgroundColor: "#6C5CE7",
  shadowColor: "#000",
  shadowOpacity: 0.18,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 8 },
  elevation: 7,
}

const $bannerPressed: ViewStyle = {
  opacity: 0.92,
  transform: [{ scale: 0.99 }],
}

const $bannerLeft: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  flex: 1,
}

const $bannerTextCol: ViewStyle = {
  flex: 1,
}
