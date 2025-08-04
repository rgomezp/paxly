import { FC } from "react"
import { LoginButton } from "./LoginButton"
import { useAppTheme } from "@/utils/useAppTheme"

type AppleLoginButtonProps = {
  onPress: () => void
  testID?: string
  disabled?: boolean
}

export const AppleLoginButton: FC<AppleLoginButtonProps> = ({
  onPress,
  testID = "loginAppleButton",
  disabled = false,
}) => {
  const { theme } = useAppTheme()

  return (
    <LoginButton
      onPress={onPress}
      text="Continue with Apple"
      iconName="logo-apple"
      backgroundColor="#000000"
      testID={testID}
      disabled={disabled}
      borderColor={theme.isDark ? "#fff" : undefined}
    />
  )
}
