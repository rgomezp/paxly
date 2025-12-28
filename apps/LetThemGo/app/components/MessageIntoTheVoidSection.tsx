import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "@/components/buttons/RectangularButton"
import { navigate } from "@/navigators/navigationUtilities"

export const MessageIntoTheVoidSection: FC = function MessageIntoTheVoidSection() {
  const { themed, theme } = useAppTheme()

  return (
    <>
      <View style={themed($messageSectionHeader)}>
        <Text
          text="Send to the Void"
          preset="subheading"
          style={themed({ color: theme.colors.text })}
        />
      </View>
      <View style={$messageButtonContainer}>
        <RectangularButton
          buttonText="Send Message"
          onClick={() => navigate("MessageIntoTheVoid")}
          icon="envelope"
        />
      </View>
    </>
  )
}

const $messageSectionHeader: ViewStyle = {
  marginBottom: 20,
  marginLeft: 30,
}

const $messageButtonContainer: ViewStyle = {
  marginBottom: 40,
  paddingHorizontal: 40,
}
