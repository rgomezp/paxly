interface IAppSettingsConfigBase {
  title: string
  iconType: string
  iconName: string
  getValue: () => string
}

export interface IAppSettingsBinaryConfig extends IAppSettingsConfigBase {
  toggleBinarySetting: (value: boolean) => void
}

export interface IAppSettingsModalConfig extends IAppSettingsConfigBase {
  modalContent: JSX.Element | null
  onPress?: () => void
}

// predicates
export const isBinaryConfig = (config: IAppSettingsConfig): config is IAppSettingsBinaryConfig => {
  return (config as IAppSettingsBinaryConfig).toggleBinarySetting !== undefined
}

export const isModalConfig = (config: IAppSettingsConfig): config is IAppSettingsModalConfig => {
  return (config as IAppSettingsModalConfig).modalContent !== undefined
}

type IAppSettingsConfig = IAppSettingsBinaryConfig | IAppSettingsModalConfig

export default IAppSettingsConfig
