import { TouchableOpacity, StyleSheet, DimensionValue, View, StyleProp } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { useEntitlements } from "../../entitlements/useEntitlements"
import Log from "../../utils/Log"
import { presentPaywallSafely } from "../../thirdParty/revenueCatUtils"
import darkenHex from "../../utils/darkenHex"
import { FEATURES } from "@/entitlements/constants/features"
import { $styles } from "../../theme/styles"
import { triggerLightHaptic } from "../../utils/hapticFeedback"
import { useMemo } from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"

type IProps = {
  buttonText: string
  onClick: () => void
  backgroundColor?: string
  width?: DimensionValue // Optional, but defaults to 200 for consistency
  icon?: string
  isDisabled?: boolean
  customStyles?: StyleProp<any> // Additional styles
  testID?: string
  isPaidFeature?: boolean
  fontSize?: number // New prop for font size
  lightBackground?: boolean
  textStyle?: StyleProp<any> // New prop for text style
  isSelected?: boolean // New prop for selected state
}

export default function RectangularButton(props: IProps) {
  const { theme } = useAppTheme()
  const { colors } = theme

  // Default colors if not provided
  const defaultColor = props.lightBackground ? "#F5F5F5" : colors.tint

  // Use accent color for selected state, otherwise use provided or default
  const buttonBackgroundColor = props.isSelected
    ? theme.colors.palette.accent500
    : (props.backgroundColor ?? defaultColor)

  // Determine darkenedBackgroundColor based on the button's color format
  let darkenedBackgroundColor
  if (buttonBackgroundColor.startsWith("#")) {
    // For hex colors, use the darkenHex utility
    darkenedBackgroundColor = darkenHex(buttonBackgroundColor, 20)
  } else if (buttonBackgroundColor.startsWith("rgb")) {
    // For RGB colors, parse and create a darker version
    try {
      // Extract RGB values
      const rgbMatch = buttonBackgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      const rgbaMatch = buttonBackgroundColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)

      if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10)
        const g = parseInt(rgbMatch[2], 10)
        const b = parseInt(rgbMatch[3], 10)

        const darkR = Math.max(0, r - 40)
        const darkG = Math.max(0, g - 40)
        const darkB = Math.max(0, b - 40)

        darkenedBackgroundColor = `rgb(${darkR}, ${darkG}, ${darkB})`
      } else if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1], 10)
        const g = parseInt(rgbaMatch[2], 10)
        const b = parseInt(rgbaMatch[3], 10)
        const a = parseFloat(rgbaMatch[4])

        const darkR = Math.max(0, r - 40)
        const darkG = Math.max(0, g - 40)
        const darkB = Math.max(0, b - 40)

        darkenedBackgroundColor = `rgba(${darkR}, ${darkG}, ${darkB}, ${a})`
      } else {
        // Fallback if parsing fails
        darkenedBackgroundColor = "rgba(0, 0, 0, 0.8)"
      }
    } catch (error) {
      Log.error(`Error darkening background color: ${error}`)
      // Fallback if any error occurs
      darkenedBackgroundColor = "rgba(0, 0, 0, 0.8)"
    }
  } else {
    // For any other format, use a darker overlay
    darkenedBackgroundColor = "rgba(0, 0, 0, 0.8)"
  }

  const { hasFeatureAccess } = useEntitlements()
  const hasAccess = !props.isPaidFeature || hasFeatureAccess(FEATURES.PREMIUM_FEATURES)

  const handleButtonPress = () => {
    if (props.isDisabled) {
      return
    }

    triggerLightHaptic()

    if (props.isPaidFeature) {
      paidAction()
    } else {
      props.onClick()
    }
  }

  const paidAction = async () => {
    try {
      const hasAccess = hasFeatureAccess(FEATURES.PREMIUM_FEATURES)
      if (!hasAccess) {
        await presentPaywallSafely()
        return
      }
      props.onClick()
    } catch (error) {
      Log.error(`Error presenting paywall: ${error}`)
      // Fallback to regular action if paywall fails
      props.onClick()
    }
  }

  const renderIcon = () => {
    const iconMargin = props.buttonText ? 10 : 0
    const iconColor = props.isSelected
      ? theme.colors.palette.neutral900
      : props.lightBackground
        ? "#424242" // Dark color for light gray background (works in both themes)
        : colors.background

    // Show lock icon for paid features when user doesn't have access
    if (props.isPaidFeature && !hasAccess) {
      return (
        <FontAwesome5
          name="lock"
          size={props.fontSize || 18}
          color={iconColor}
          style={{ marginRight: iconMargin }}
        />
      )
    }

    // Show custom icon if provided and user has access
    if (props.icon && (!props.isPaidFeature || hasAccess)) {
      return (
        <FontAwesome5
          name={props.icon}
          size={props.fontSize || 18}
          color={iconColor}
          style={{ marginRight: iconMargin }}
        />
      )
    }

    return null
  }

  const textStyles = useMemo(
    () => [
      {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: props.fontSize || 14,
        color: props.isSelected
          ? theme.colors.palette.neutral900 // Dark text for accent500 background
          : props.lightBackground
            ? "#424242" // Dark text for light gray background (works in both themes)
            : colors.background,
      },
      props.textStyle,
    ],
    [
      props.fontSize,
      props.lightBackground,
      props.textStyle,
      props.isSelected,
      colors.background,
      theme,
    ],
  )

  const renderButtonText = () => {
    if (props.buttonText.length === 0) {
      return null
    }

    return <Text style={textStyles}>{props.buttonText.toUpperCase()}</Text>
  }

  // Use theme color for selected state shadow
  const selectedShadowColor = props.isSelected ? theme.colors.palette.accent500 : undefined

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={[
        styles.button,
        { width: props.width, backgroundColor: darkenedBackgroundColor }, // Default width
        props.isDisabled ? styles.disabled : styles.active,
        props.isSelected && [
          styles.selected,
          selectedShadowColor && { shadowColor: selectedShadowColor },
        ], // Apply selected style with themed shadow color
        props.customStyles, // Merge custom styles
      ]}
      disabled={props.isDisabled}
      testID={props.testID}
    >
      <View style={[styles.innerButtonBackground, { backgroundColor: buttonBackgroundColor }]}>
        {renderIcon()}
        {renderButtonText()}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  active: {
    opacity: 1,
  },
  button: {
    height: 50,
    margin: 10,
    ...$styles.borderRadius,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  innerButtonBackground: {
    alignItems: "center",
    flexDirection: "row",
    height: "90%",
    justifyContent: "center",
    ...$styles.borderRadius,
    paddingHorizontal: 20,
  },
  selected: {
    elevation: 8,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
})
