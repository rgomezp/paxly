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

  // Derive iOS URL scheme from iOS client ID if available
  // Format: if client ID is "1234567890-abcdefg.apps.googleusercontent.com"
  // then URL scheme is "com.googleusercontent.apps.1234567890-abcdefg"
  const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID
  let iosUrlScheme: string | undefined
  if (iosClientId) {
    // Remove the .apps.googleusercontent.com suffix if present
    const clientIdPrefix = iosClientId.replace(/\.apps\.googleusercontent\.com$/, "")
    iosUrlScheme = `com.googleusercontent.apps.${clientIdPrefix}`
  }

  // Build Google Sign-In plugin configuration
  const googleSignInPluginConfig: [string, { iosUrlScheme: string }] | string = iosUrlScheme
    ? ["@react-native-google-signin/google-signin", { iosUrlScheme }]
    : "@react-native-google-signin/google-signin"

  return {
    name: "LetThemGo",
    slug: "let-them-go",
    scheme: "myapp",
    owner: "honeywolf",
    version: "0.1.2",
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
      package: "com.honeywolf.letthemgo",
      versionCode: 9,
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon-android-adaptive-foreground.png",
        backgroundImage: "./assets/images/app-icon-android-adaptive-background.png",
      },
      blockedPermissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.WRITE_SETTINGS",
        "android.permission.SYSTEM_ALERT_WINDOW",
        "com.oppo.launcher.permission.WRITE_SETTINGS",
        "com.huawei.android.launcher.permission.WRITE_SETTINGS",
        "com.google.android.gms.permission.AD_ID",
      ],
      allowBackup: false,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    ios: {
      icon: "./assets/images/app-icon-ios.png",
      supportsTablet: true,
      bundleIdentifier: "com.honeywolf.letthemgo",
      buildNumber: "10",
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
        projectId: "3bd038bc-12a4-4fa0-9928-431e77c2b743",
      },
      ...customConfig(),
    },
    web: {
      favicon: "./assets/images/app-icon-web-favicon.png",
      bundler: "metro",
    },
    plugins: [
      [
        "onesignal-expo-plugin",
        {
          mode: process.env.APP_VARIANT === "development" ? "development" : "production",
          smallIcons: ["./assets/notifIcons/ic_stat_onesignal_default.png"],
          largeIcons: ["./assets/notifIcons/ic_onesignal_large_icon_default.png"],
        },
      ],
      "expo-localization",
      "expo-font",
      googleSignInPluginConfig,
      "@react-native-firebase/app",
      "@react-native-firebase/app-check",
      "@react-native-firebase/crashlytics",
      "expo-apple-authentication",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash_icon.png",
          imageWidth: 150,
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
          android: {
            targetSdkVersion: 35,
            compileSdkVersion: 35,
            minSdkVersion: 24,
            ndkVersion: "28.1.10169557",
            extraMavenDependencies: [
              "androidx.appcompat:appcompat:1.7.1",
              "androidx.lifecycle:lifecycle-runtime-ktx:2.8.7",
              "androidx.fragment:fragment-ktx:1.8.6",
            ],
            javaVersion: "17",
          },
        },
      ],
      ...existingPlugins,
      // require("./plugins/withSplashScreen").withSplashScreen,
    ],
    experiments: {
      tsconfigPaths: true,
    },
  }
}
