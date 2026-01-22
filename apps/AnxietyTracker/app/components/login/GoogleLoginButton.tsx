import { FC } from "react"
import { LoginButton } from "./LoginButton"

type GoogleLoginButtonProps = {
  onPress: () => void
  testID?: string
  disabled?: boolean
}

export const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  onPress,
  testID = "loginGoogleButton",
  disabled = false,
}) => {
  return (
    <LoginButton
      onPress={onPress}
      text="Continue with Google"
      iconName="logo-google"
      backgroundColor="#4285F4"
      testID={testID}
      disabled={disabled}
    />
  )
}
