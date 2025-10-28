import { StyleSheet, Image, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import RectangularButton from "../buttons/RectangularButton"
import { Text } from "../Text"
import { colors } from "../../theme"

interface OnboardingOpeningScreenProps {
  onGetStarted: () => void
  onIHaveAccount: () => void
}

const OnboardingOpeningScreen: React.FC<OnboardingOpeningScreenProps> = ({
  onGetStarted,
  onIHaveAccount,
}) => {
  return (
    <View style={styles.view}>
      <View style={styles.backgroundContainer}>{/* Background image */}</View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.welcomeText}>Welcome to Potion Forge</Text>
            <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
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
        <View style={styles.mascotContainer}>
          <Image source={require("../../../assets/images/welcome-face.png")} style={styles.logo} />
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
    backgroundColor: colors.transparent,
    paddingBottom: 40,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  getStartedButton: {
    marginBottom: 16,
  },
  logo: {
    height: 140,
    resizeMode: "contain",
    width: 300,
  },
  logoContainer: {
    backgroundColor: colors.transparent,
    paddingTop: 40,
  },
  mascotContainer: {
    alignItems: "center",
    backgroundColor: colors.transparent,
    justifyContent: "center",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  safeArea: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  welcomeText: {
    color: colors.palette.neutral100,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: -20,
    marginLeft: 20,
    textAlign: "left",
  },
})

export default OnboardingOpeningScreen
