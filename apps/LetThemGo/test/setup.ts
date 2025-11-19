/// <reference types="jest" />

// we always make sure 'react-native' gets included first
import * as ReactNative from "react-native"
import mockFile from "./mockFile"

// libraries to mock
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source: any) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn(
          (
            uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  )
})

jest.mock("expo-localization", () => ({
  ...jest.requireActual("expo-localization"),
  getLocales: () => [{ languageTag: "en-US", textDirection: "ltr" }],
}))

// Mock React Native Firebase modules
// Mock the native event emitter that Firebase uses internally
jest.mock("@react-native-firebase/app/lib/internal/RNFBNativeEventEmitter", () => {
  const { EventEmitter } = require("events")
  return {
    RNFBNativeEventEmitter: class MockRNFBNativeEventEmitter extends EventEmitter {},
  }
})

// Mock the native module registry that Firebase uses
jest.mock("@react-native-firebase/app/lib/internal/registry/nativeModule", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => ({
      addListener: jest.fn(),
      removeListeners: jest.fn(),
    })),
  },
}))

// Mock the FirebaseApp internal module
jest.mock("@react-native-firebase/app/lib/FirebaseApp", () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Mock the internal index that Firebase uses
jest.mock("@react-native-firebase/app/lib/internal/index", () => ({
  __esModule: true,
  default: {},
}))

jest.mock("@react-native-firebase/app", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    utils: jest.fn(),
  })),
  firebase: {
    utils: jest.fn(),
    app: jest.fn(),
  },
  getApp: jest.fn(() => ({
    name: "[DEFAULT]",
    options: {},
  })),
}))

jest.mock("@react-native-firebase/firestore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(),
    doc: jest.fn(),
  })),
  getFirestore: jest.fn(() => ({
    collection: jest.fn(),
    doc: jest.fn(),
    enableNetwork: jest.fn(() => Promise.resolve()),
    disableNetwork: jest.fn(() => Promise.resolve()),
  })),
}))

jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
  getAuth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
  GoogleAuthProvider: jest.fn(),
  AppleAuthProvider: jest.fn(),
  signInWithCredential: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
}))

jest.mock("@react-native-firebase/storage", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ref: jest.fn(),
  })),
}))

jest.mock("@react-native-firebase/analytics", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    logEvent: jest.fn(),
  })),
}))

jest.mock("@react-native-firebase/crashlytics", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    recordError: jest.fn(),
    log: jest.fn(),
  })),
}))

jest.mock("@react-native-firebase/app-check", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    activate: jest.fn(),
    newReactNativeFirebaseAppCheckProvider: jest.fn(() => ({
      configure: jest.fn(),
    })),
  })),
  getToken: jest.fn(() => Promise.resolve({ token: "mock-token" })),
  initializeAppCheck: jest.fn(() => Promise.resolve()),
}))

jest.mock("react-native-onesignal", () => ({
  __esModule: true,
  OneSignal: {
    Notifications: {
      getPermissionAsync: jest.fn(() => Promise.resolve(true)),
      requestPermission: jest.fn(() => Promise.resolve(true)),
    },
  },
}))

jest.mock("react-native-purchases", () => ({
  __esModule: true,
  default: {
    configure: jest.fn(),
    getOfferings: jest.fn(() => Promise.resolve({ current: null })),
    getCustomerInfo: jest.fn(() => Promise.resolve({})),
    setAttributes: jest.fn(() => Promise.resolve()),
  },
  LOG_LEVEL: {
    VERBOSE: "VERBOSE",
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
  },
}))

jest.mock("react-native-purchases-ui", () => ({
  __esModule: true,
  default: {
    presentPaywall: jest.fn(() => Promise.resolve({})),
  },
  PAYWALL_RESULT: {
    NOT_PRESENTED: "NOT_PRESENTED",
    CANCELLED: "CANCELLED",
    PURCHASED: "PURCHASED",
    RESTORED: "RESTORED",
    ERROR: "ERROR",
  },
}))

jest.mock("react-native-keyboard-controller", () => ({
  __esModule: true,
  KeyboardAwareScrollView: "KeyboardAwareScrollView",
  useKeyboardHandler: jest.fn(),
  useReanimatedKeyboardAnimation: jest.fn(() => ({ height: { value: 0 } })),
}))

jest.mock("@react-native-google-signin/google-signin", () => ({
  __esModule: true,
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn(() => Promise.resolve({})),
    signOut: jest.fn(() => Promise.resolve()),
    isSignedIn: jest.fn(() => Promise.resolve(false)),
    getCurrentUser: jest.fn(() => Promise.resolve(null)),
  },
}))

jest.mock("expo-av", () => ({
  __esModule: true,
  Audio: {
    Sound: {
      createAsync: jest.fn(() =>
        Promise.resolve({ sound: { play: jest.fn(), unloadAsync: jest.fn() } }),
      ),
    },
    setAudioModeAsync: jest.fn(() => Promise.resolve()),
  },
  InterruptionModeAndroid: {},
  InterruptionModeIOS: {},
}))
