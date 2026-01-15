import { useEffect, useRef } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import LottieView from "lottie-react-native"
import RectangularButton from "../buttons/RectangularButton"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"

interface OnboardingOpeningScreenProps {
  onGetStarted: () => void
  onIHaveAccount: () => void
}

const OnboardingOpeningScreen: React.FC<OnboardingOpeningScreenProps> = ({
  onGetStarted,
  onIHaveAccount,
}) => {
  const { theme } = useAppTheme()
  const lottieRef = useRef<LottieView>(null)

  useEffect(() => {
    lottieRef.current?.play()
  }, [])

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.background }]}>
      <View style={styles.backgroundContainer}>{/* Background image */}</View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text
            preset="subheading"
            style={[styles.welcomeTextSubheading, { color: theme.colors.text }]}
          >
            Welcome to
          </Text>
          <Text preset="heading" style={[styles.welcomeText, { color: theme.colors.text }]}>
            Anxiety Tracker
          </Text>
          <View style={styles.logoContainer}>
            <LottieView
              ref={lottieRef}
              source={require("../../../assets/animations/blob.json")}
              loop
              style={styles.logo}
            />
          </View>
          <View style={styles.buttonContainer}>
            <RectangularButton
              buttonText="Get Started"
              onClick={onGetStarted}
              width={260}
              fontSize={18}
              customStyles={styles.getStartedButton}
            />
            <RectangularButton
              buttonText="I Have an Account"
              onClick={onIHaveAccount}
              width={260}
              fontSize={18}
              lightBackground
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  getStartedButton: {
    marginBottom: 16,
  },
  logo: {
    height: 140,
    width: 300,
  },
  logoContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  welcomeText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeTextSubheading: {
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
})

export default OnboardingOpeningScreen
