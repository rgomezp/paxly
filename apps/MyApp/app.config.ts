import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

// Import customConfig after ts-node is registered
const { default: customConfig } = require("./customConfig")

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    name: "MyApp",
    slug: "MyApp",
    scheme: "myapp",
    owner: "honeywolf",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    icon: "./assets/images/app-icon-all.png",
    updates: {
      fallbackToCacheTimeout: 0,
    },
    newArchEnabled: false,
    jsEngine: "hermes",
    assetBundlePatterns: ["**/*"],
    android: {
      icon: "./assets/images/app-icon-android-legacy.png",
      package: "com.honeywolf.myapp",
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon-android-adaptive-foreground.png",
        backgroundImage: "./assets/images/app-icon-android-adaptive-background.png",
      },
      allowBackup: false,
    },
    ios: {
      icon: "./assets/images/app-icon-ios.png",
      supportsTablet: true,
      bundleIdentifier: "com.honeywolf.myapp",
      config: {
        usesNonExemptEncryption: false,
      },
      usesAppleSignIn: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "This app needs access to your location to send push notifications.",
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
    },
    extra: {
      eas: {
        projectId: "bc2c5c21-b7da-4a11-8072-32564adf1d10",
      },
      ...customConfig(),
    },
    web: {
      favicon: "./assets/images/app-icon-web-favicon.png",
      bundler: "metro",
    },
    plugins: [
      // [
      //   "onesignal-expo-plugin",
      //   {
      //     mode: process.env.APP_VARIANT === "development" ? "development" : "production",
      //     smallIcons: ["./assets/images/notifIcons/ic_stat_onesignal_default.png"],
      //     largeIcons: ["./assets/images/notifIcons/ic_onesignal_large_icon_default.png"],
      //   },
      // ],
      "expo-localization",
      "expo-font",
      "@react-native-google-signin/google-signin",
      "@react-native-firebase/app",
      "@react-native-firebase/app-check",
      "@react-native-firebase/crashlytics",
      "expo-apple-authentication",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/app-icon-android-adaptive-foreground.png",
          imageWidth: 300,
          resizeMode: "contain",
          backgroundColor: "#191015",
        },
      ],
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      ...existingPlugins,
      require("./plugins/withSplashScreen").withSplashScreen,
    ],
    experiments: {
      tsconfigPaths: true,
    },
  }
}
