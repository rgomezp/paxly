import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import type { ThemedStyle, ThemedStyleArray } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { typography } from "@/theme/typography"
import { ReactNode, forwardRef, ForwardedRef } from "react"
import LanguageCopy from "../internationalization/LanguageCopy"
import Language from "../internationalization/Language"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = "default" | "bold" | "heading" | "subheading" | "formLabel" | "formHelper"

export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * Text which is looked up via the LanguageCopy system.
   * Format: "namespace:key" (e.g., "homeScreen:welcome")
   */
  tx?: string

  /**
   * Optional options to pass to the translation system. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: Record<string, any>

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export const Text = forwardRef(function Text(props: TextProps, ref: ForwardedRef<RNText>) {
  const { weight, size, text, tx, txOptions, children, style: $styleOverride, ...rest } = props
  const { themed } = useAppTheme()

  // Handle translation
  let translatedText = text
  if (tx) {
    translatedText = getTranslation(tx, txOptions)
  }

  const content = translatedText || children

  const preset: Presets = props.preset ?? "default"
  // Detect italic request in style overrides
  const isItalicRequested = (() => {
    if (!$styleOverride) return false
    const check = (s: TextStyle | any) => !!s && (s as TextStyle).fontStyle === "italic"
    if (Array.isArray($styleOverride)) return $styleOverride.some(check)
    return check($styleOverride as TextStyle)
  })()

  const italicFamily = (typography.primary as any).italic as string | undefined

  const $styles: StyleProp<TextStyle> = [themed($presets[preset])]

  // Apply weight-specific font family first
  if (weight) $styles.push($fontWeightStyles[weight])

  // If italic is requested and we have an italic font variant, use it
  if (isItalicRequested && italicFamily) {
    $styles.push({ fontFamily: italicFamily })
  }

  if (size) $styles.push($sizeStyles[size])
  if ($styleOverride) $styles.push($styleOverride)

  return (
    <RNText {...rest} style={$styles} ref={ref}>
      {content}
    </RNText>
  )
})

/**
 * Get translation from the LanguageCopy system
 */
function getTranslation(key: string, options?: Record<string, any>): string {
  try {
    const keys = key.split(":")
    if (keys.length !== 2) {
      console.warn(`Invalid translation key format: ${key}. Expected format: "namespace:key"`)
      return key
    }

    const [namespace, translationKey] = keys
    const currentLanguage = Language.current

    // Navigate through the nested object structure
    const namespaceObj = (LanguageCopy as any)[namespace]
    if (!namespaceObj) {
      console.warn(`Translation namespace not found: ${namespace}`)
      return key
    }

    const translationObj = namespaceObj[translationKey]
    if (!translationObj) {
      console.warn(`Translation key not found: ${translationKey} in namespace ${namespace}`)
      return key
    }

    const translation = translationObj[currentLanguage]
    if (!translation) {
      console.warn(`Translation not found for language: ${currentLanguage}`)
      return key
    }

    // Handle interpolation if options are provided
    if (options) {
      return Object.keys(options).reduce((result, optionKey) => {
        return result.replace(new RegExp(`{{${optionKey}}}`, "g"), String(options[optionKey]))
      }, translation)
    }

    return translation
  } catch (error) {
    console.warn(`Error getting translation for key: ${key}`, error)
    return key
  }
}

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: ThemedStyle<TextStyle> = (theme) => ({
  ...$sizeStyles.sm,
  ...$fontWeightStyles.normal,
  color: theme.colors.text,
})

const $presets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [$baseStyle],
  bold: [$baseStyle, { ...$fontWeightStyles.bold }],
  heading: [
    $baseStyle,
    {
      ...$sizeStyles.xxl,
      ...$fontWeightStyles.bold,
    },
  ],
  subheading: [$baseStyle, { ...$sizeStyles.lg, ...$fontWeightStyles.medium }],
  formLabel: [$baseStyle, { ...$fontWeightStyles.medium }],
  formHelper: [$baseStyle, { ...$sizeStyles.sm, ...$fontWeightStyles.normal }],
}
