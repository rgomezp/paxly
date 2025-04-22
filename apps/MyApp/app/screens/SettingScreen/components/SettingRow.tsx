import { isBinaryConfig, isModalConfig } from "@/models/IAppSettingsConfig"
import { IAppSettingsModalConfig } from "@/models/IAppSettingsConfig"
import { IAppSettingsBinaryConfig } from "@/models/IAppSettingsConfig"
import { useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Text } from "@/components"
import { ThemedFontAwesome5Icon } from "@/components/ThemedFontAwesome5Icon"
import BottomModal from "@/components/modals/BottomModal"

interface SettingRowProps {
  config: IAppSettingsBinaryConfig | IAppSettingsModalConfig
  value: string
}

const SettingRow: React.FC<SettingRowProps> = ({ config, value }) => {
  const [isModalVisible, setModalVisible] = useState(false)

  const handlePress = () => {
    if (isModalConfig(config) && config.onPress) {
      config.onPress()
      return
    }

    if (isBinaryConfig(config)) {
      config.toggleBinarySetting(value === "Off")
    } else {
      setModalVisible(true)
    }
  }

  return (
    <>
      <TouchableOpacity style={$container} onPress={handlePress}>
        <ThemedFontAwesome5Icon name={config.iconName} type={config.iconType} style={$icon} />
        <Text style={$title}>{config.title}</Text>
        <Text style={$value}>{value}</Text>
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

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: "#333",
}

const $icon: TextStyle = {
  marginRight: 10,
}

const $title: TextStyle = {
  flex: 1,
  fontSize: 16,
  backgroundColor: "transparent",
}

const $value: TextStyle = {
  fontSize: 16,
  color: "grey",
}
