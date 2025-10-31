import { TouchableOpacity, StyleProp, ViewStyle } from "react-native"

import RectangularButton from "./RectangularButton"
import FloatingCenterWrapper from "../FloatingCenterWrapper"

type IProps = {
  isValid: boolean
  onPress: () => void
  backgroundColor?: string
  marginBottom?: number
  text?: string
  onOuterPress?: () => void
  customStyles?: StyleProp<ViewStyle>
  icon?: string
}

export default function FloatingCenterButton({
  isValid,
  onPress,
  text,
  onOuterPress,
  backgroundColor,
  customStyles,
  icon,
}: IProps) {
  return (
    <FloatingCenterWrapper position="bottom">
      <TouchableOpacity onPress={onOuterPress} testID="floatingCenterButtonOuter">
        <RectangularButton
          buttonText={text || "Save"}
          onClick={onPress}
          isDisabled={!isValid}
          width={200}
          backgroundColor={backgroundColor}
          testID="floatingCenterButton"
          customStyles={customStyles}
          icon={icon}
        />
      </TouchableOpacity>
    </FloatingCenterWrapper>
  )
}
