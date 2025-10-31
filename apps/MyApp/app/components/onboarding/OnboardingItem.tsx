import { memo, useCallback } from "react"
import { View, StyleSheet, Image, useWindowDimensions } from "react-native"
import { ISlide } from "@/types/ISlide"
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

  // Memoize the tokenizer function to prevent re-renders
  const tokenizer = useCallback((t: string) => t.split(" "), [])

  // Determine if this slide should start the animation
  const shouldStartAnimation = currentIndex === slideIndex

  return (
    <View style={[styles.container, { width }]}>
      {item.image && (
        <Image source={item.image} style={[styles.image, { width }]} resizeMode="contain" />
      )}
      {item.component && <View style={styles.component}>{item.component}</View>}
      <View style={styles.textContainer}>
        <Text preset="subheading" style={styles.title}>
          {item.title}
        </Text>
        {item.description && (
          <AnimatedTextSimulation
            text={item.description}
            tokenizer={tokenizer}
            separator=" "
            shouldStart={shouldStartAnimation}
            style={[styles.description, { color: theme.colors.textDim }]}
          />
        )}
      </View>
    </View>
  )
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
    marginHorizontal: 20,
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
    minHeight: 100,
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },
  top: {
    flex: 3,
  },
})
