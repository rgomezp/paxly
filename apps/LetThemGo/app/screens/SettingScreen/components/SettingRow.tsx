import { isBinaryConfig, isModalConfig, isThemeConfig } from "@/types/IAppSettingsConfig"
import { IAppSettingsModalConfig } from "@/types/IAppSettingsConfig"
import { IAppSettingsBinaryConfig } from "@/types/IAppSettingsConfig"
import { IAppSettingsThemeConfig } from "@/types/IAppSettingsConfig"
import { useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Text } from "@/components"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import BottomModal from "@/components/modals/BottomModal"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

interface SettingRowProps {
  config: IAppSettingsBinaryConfig | IAppSettingsModalConfig | IAppSettingsThemeConfig
  value: string
}

const SettingRow: React.FC<SettingRowProps> = ({ config, value }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const { themed } = useAppTheme()

  const handlePress = () => {
    if (isModalConfig(config) && config.onPress) {
      config.onPress()
      return
    }

    if (isBinaryConfig(config)) {
      config.toggleBinarySetting(value === "Off")
    } else if (isThemeConfig(config)) {
      config.toggleTheme()
    } else {
      setModalVisible(true)
    }
  }

  return (
    <>
      <TouchableOpacity style={themed($container)} onPress={handlePress}>
        <ThemedFontAwesome5Icon
          name={config.iconName}
          type={config.iconType}
          style={themed([$icon, config.danger ? $iconDanger : undefined])}
        />
        <Text
          style={themed([$title, config.danger ? $titleDanger : undefined])}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {config.title}
        </Text>
        <Text style={themed($value)} numberOfLines={1} ellipsizeMode="tail">
          {value}
        </Text>
      </TouchableOpacity>
      {isModalConfig(config) && !config.onPress && (
        <BottomModal visible={isModalVisible} onClose={() => setModalVisible(false)}>
          {config.modalContent}
        </BottomModal>
      )}
    </>
  )
}

export default SettingRow

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border,
  backgroundColor: theme.colors.background,
})

const $icon: ThemedStyle<TextStyle> = (theme) => ({
  marginRight: 10,
  color: theme.colors.text,
})

const $iconDanger: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.angry500,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  flex: 1,
  flexShrink: 1,
  fontSize: 16,
  color: theme.colors.text,
  backgroundColor: "transparent",
  marginRight: 12,
})

const $titleDanger: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.angry500,
})

const $value: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 16,
  color: theme.colors.textDim,
  flexShrink: 0,
  maxWidth: "40%",
})
