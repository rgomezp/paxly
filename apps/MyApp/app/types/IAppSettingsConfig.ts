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

export interface IAppSettingsThemeConfig extends IAppSettingsConfigBase {
  toggleTheme: () => void
}

// predicates
export const isBinaryConfig = (config: IAppSettingsConfig): config is IAppSettingsBinaryConfig => {
  return (config as IAppSettingsBinaryConfig).toggleBinarySetting !== undefined
}

export const isModalConfig = (config: IAppSettingsConfig): config is IAppSettingsModalConfig => {
  return (config as IAppSettingsModalConfig).modalContent !== undefined
}

export const isThemeConfig = (config: IAppSettingsConfig): config is IAppSettingsThemeConfig => {
  return (config as IAppSettingsThemeConfig).toggleTheme !== undefined
}

type IAppSettingsConfig =
  | IAppSettingsBinaryConfig
  | IAppSettingsModalConfig
  | IAppSettingsThemeConfig

export default IAppSettingsConfig
