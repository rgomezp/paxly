import { memo, useCallback } from "react"
import { View, StyleSheet, Image, useWindowDimensions, ViewStyle } from "react-native"
import { ISlide, TextPlacement, TextAlignment } from "@/types/ISlide"
import { AnimatedTextSimulation } from "../AnimatedTextSimulation"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"

interface OnboardingItemProps {
  item: ISlide
  currentIndex: number
  slideIndex: number
}

const OnboardingItem = memo(({ item, currentIndex, slideIndex }: OnboardingItemProps) => {
  const { width } = useWindowDimensions()
  const { theme } = useAppTheme()

  // Get textPlacement and textAlignment from slide item, with defaults
  const textPlacement: TextPlacement = item.textPlacement || "top"
  const textAlignment: TextAlignment = item.textAlignment || "left"

  // Memoize the tokenizer function to prevent re-renders
  const tokenizer = useCallback((t: string) => t.split(" "), [])

  // Determine if this slide should start the animation
  const shouldStartAnimation = currentIndex === slideIndex

  // Create dynamic styles based on textPlacement and textAlignment
  const alignItemsValue: ViewStyle["alignItems"] =
    textAlignment === "center" ? "center" : textAlignment === "left" ? "flex-start" : "flex-end"
  const baseTextContainerStyle = [styles.textContainer, { alignItems: alignItemsValue }]

  // Title style - reduce marginBottom when description follows directly
  const titleMarginBottom = textPlacement === "top" || textPlacement === "bottom" ? 2 : 4
  const titleStyle = [styles.title, { textAlign: textAlignment, marginBottom: titleMarginBottom }]
  // Description style - remove horizontal margin when not center aligned to match title padding
  const descriptionStyle = [
    styles.description,
    {
      color: theme.colors.textDim,
      textAlign: textAlignment,
      marginHorizontal: textAlignment === "center" ? 20 : 0,
    },
  ]

  // Render content based on textPlacement
  const renderContent = () => {
    const imageComponent = item.image && (
      <Image source={item.image} style={[styles.image, { width }]} resizeMode="contain" />
    )
    const componentView = item.component && <View style={styles.component}>{item.component}</View>
    const contentBlock = (
      <>
        {imageComponent}
        {componentView}
      </>
    )

    // Title container style - no marginTop when at top, keep it when at bottom
    const titleContainerStyle = [
      baseTextContainerStyle,
      {
        marginTop: textPlacement === "top" || textPlacement === "sandwich" ? 0 : 10,
        minHeight: textPlacement === "top" ? 0 : undefined,
      },
    ]

    // Title component
    const titleElement = (
      <View style={titleContainerStyle}>
        <Text preset="subheading" style={titleStyle}>
          {item.title}
        </Text>
      </View>
    )

    // Description container style - no marginTop when adjacent to title, no minHeight
    const descriptionContainerStyle = [
      baseTextContainerStyle,
      {
        marginTop: textPlacement === "sandwich" ? 20 : 10,
        minHeight: 0,
      },
    ]
    const descriptionElement = item.description && (
      <View style={descriptionContainerStyle}>
        <AnimatedTextSimulation
          text={item.description}
          tokenizer={tokenizer}
          separator=" "
          shouldStart={shouldStartAnimation}
          style={descriptionStyle}
        />
      </View>
    )

    switch (textPlacement) {
      case "top":
        return (
          <>
            {titleElement}
            {descriptionElement}
            {contentBlock}
          </>
        )
      case "bottom":
        return (
          <>
            {contentBlock}
            {titleElement}
            {descriptionElement}
          </>
        )
      case "sandwich":
        return (
          <>
            {titleElement}
            {contentBlock}
            {descriptionElement}
          </>
        )
      default:
        return (
          <>
            {titleElement}
            {descriptionElement}
            {contentBlock}
          </>
        )
    }
  }

  return <View style={[styles.container, { width }]}>{renderContent()}</View>
})

OnboardingItem.displayName = "OnboardingItem"

export default OnboardingItem

const styles = StyleSheet.create({
  component: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 10,
    minHeight: 100,
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
})
