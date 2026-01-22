import { FC } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle, Alert } from "react-native"
import { Text, TextProps } from "./Text"
import LoginManager from "@/managers/LoginManager"
import Log from "@/utils/Log"

export interface LogoutDrawerItemProps extends Omit<TextProps, "onPress"> {
  /**
   * Optional style override for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the text
   */
  textStyle?: StyleProp<TextStyle>
}

export const LogoutDrawerItem: FC<LogoutDrawerItemProps> = ({
  containerStyle,
  textStyle,
  ...textProps
}) => {
  const handlePress = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await LoginManager.getInstance().logout()
            } catch (error) {
              Log.error(`Error in LogoutDrawerItem: ${error}`)
            }
          },
        },
      ],
      { cancelable: true },
    )
  }

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
      <Text {...textProps} style={textStyle} />
    </TouchableOpacity>
  )
}
