import type { ReactElement } from "react"
import { Image, ImageProps, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { Button, ButtonProps } from "./Button"
import { Text, TextProps } from "./Text"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

const sadFace = require("../../assets/images/empty_state.png")

interface EmptyStateProps {
  /**
   * An optional prop that specifies the text/image set to use for the empty state.
   */
  preset?: "generic"
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps["source"]
  /**
   * Size preset for the image. Controls the width and height of the image.
   * @default "md"
   */
  imageSize?: "sm" | "md" | "lg" | "xl"
  /**
   * Style overrides for image.
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, "source">
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: TextProps["text"]
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: TextProps["text"]
  /**
   * Style overrides for content text.
   */
  contentStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: TextProps
  /**
   * The button text to display if not using `buttonTx`.
   */
  button?: TextProps["text"]
  /**
   * Style overrides for button.
   */
  buttonStyle?: ButtonProps["style"]
  /**
   * Style overrides for button text.
   */
  buttonTextStyle?: ButtonProps["textStyle"]
  /**
   * Called when the button is pressed.
   */
  buttonOnPress?: ButtonProps["onPress"]
  /**
   * Pass any additional props directly to the Button component.
   */
  ButtonProps?: ButtonProps
}

/**
 * A component to use when there is no data to display. It can be utilized to direct the user what to do next.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/EmptyState/}
 * @param {EmptyStateProps} props - The props for the `EmptyState` component.
 * @returns {ReactElement} The rendered `EmptyState` component.
 */
export function EmptyState(props: EmptyStateProps): ReactElement {
  const {
    theme,
    themed,
    theme: { spacing },
  } = useAppTheme()

  const {
    button,
    buttonOnPress,
    content,
    heading,
    imageSource,
    imageSize = "md",
    style: $containerStyleOverride,
    buttonStyle: $buttonStyleOverride,
    buttonTextStyle: $buttonTextStyleOverride,
    contentStyle: $contentStyleOverride,
    headingStyle: $headingStyleOverride,
    imageStyle: $imageStyleOverride,
    ButtonProps,
    ContentTextProps,
    HeadingTextProps,
    ImageProps,
  } = props

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!heading
  const isContentPresent = !!content
  const isButtonPresent = !!button

  const $containerStyles = [$containerStyleOverride]
  const $imageStyles = [
    $image,
    $imageSizes[imageSize],
    (isHeadingPresent || isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $imageStyleOverride,
    ImageProps?.style,
  ]
  const $headingStyles = [
    themed($heading),
    isImagePresent && { marginTop: spacing.xxxs },
    (isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyles = [
    themed($content),
    (isImagePresent || isHeadingPresent) && { marginTop: spacing.xxxs },
    isButtonPresent && { marginBottom: spacing.xxxs },
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $buttonStyles = [
    (isImagePresent || isHeadingPresent || isContentPresent) && { marginTop: spacing.xl },
    $buttonStyleOverride,
    ButtonProps?.style,
  ]

  return (
    <View style={$containerStyles}>
      {(isImagePresent || heading || content || button) && (
        <Image
          source={imageSource || sadFace}
          resizeMode="contain"
          {...ImageProps}
          style={$imageStyles}
          tintColor={theme.isDark ? theme.colors.palette.neutral900 : undefined}
        />
      )}

      {isHeadingPresent && (
        <Text preset="subheading" text={heading} {...HeadingTextProps} style={$headingStyles} />
      )}

      {isContentPresent && <Text text={content} {...ContentTextProps} style={$contentStyles} />}

      {isButtonPresent && (
        <Button
          onPress={buttonOnPress}
          textStyle={$buttonTextStyleOverride}
          {...ButtonProps}
          style={$buttonStyles}
        >
          {button}
        </Button>
      )}
    </View>
  )
}

const $image: ImageStyle = { alignSelf: "center" }

const $imageSizes: Record<"sm" | "md" | "lg" | "xl", ImageStyle> = {
  sm: { width: 80, height: 80 },
  md: { width: 120, height: 120 },
  lg: { width: 180, height: 180 },
  xl: { width: 240, height: 240 },
}

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  paddingHorizontal: spacing.lg,
})
const $content: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  paddingHorizontal: spacing.lg,
})
