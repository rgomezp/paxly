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
    RNFBNativeEventEmitter: class MockRNFBNativeEventEmitter extends EventEmitter {
      constructor() {
        super()
      }
    },
  }
})

jest.mock("@react-native-firebase/app", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    utils: jest.fn(),
  })),
  firebase: {
    utils: jest.fn(),
    app: jest.fn(),
  },
}))

jest.mock("@react-native-firebase/firestore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(),
    doc: jest.fn(),
  })),
}))

jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
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
  })),
}))
