import { StyleSheet, View, Image, Linking, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import LoginComponent from "../login/LoginComponent"
import { colors } from "../../theme"
import customConfig from "../../../customConfig"

const OnboardingLoginScreen: React.FC = () => {
  const config = customConfig()

  const openTerms = () => {
    Linking.openURL(config.termsOfServiceUrl)
  }

  const openPrivacy = () => {
    Linking.openURL(config.privacyPolicyUrl)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {/* Image container - takes up 1/2 of the screen */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Login component */}
          <View style={styles.loginContainer}>
            <LoginComponent />
          </View>

          {/* Terms and privacy text with links */}
          <View style={styles.legalContainer}>
            <Text style={styles.legalText}>
              By continuing you accept the{" "}
              <Text style={styles.linkText} onPress={openTerms}>
                terms and conditions
              </Text>{" "}
              and have reviewed the{" "}
              <Text style={styles.linkText} onPress={openPrivacy}>
                privacy policy
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  imageContainer: {
    alignItems: "center",
    flex: 0.5, // Takes up 1/2 of the screen
    justifyContent: "center",
    paddingTop: 40,
  },
  legalContainer: {
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  legalText: {
    color: colors.textDim,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  linkText: {
    color: colors.tint,
    textDecorationLine: "underline",
  },
  loginContainer: {
    flex: 0.25,
    justifyContent: "center",
  },
  logo: {
    height: 250,
    width: 250,
  },
  safeArea: {
    flex: 1,
  },
})

export default OnboardingLoginScreen
