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
