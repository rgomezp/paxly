import { OneSignal } from "react-native-onesignal"
import Purchases, { LOG_LEVEL } from "react-native-purchases"
import crashlytics from "@react-native-firebase/crashlytics"

export declare enum LogLevel {
  None = 0,
  Fatal = 1,
  Error = 2,
  Warn = 3,
  Info = 4,
  Debug = 5,
  Verbose = 6,
}

const REVENUECAT_LOG_LEVEL_MAP = {
  [LogLevel.Fatal]: LOG_LEVEL.ERROR,
  [LogLevel.Error]: LOG_LEVEL.ERROR,
  [LogLevel.Warn]: LOG_LEVEL.WARN,
  [LogLevel.Info]: LOG_LEVEL.INFO,
  [LogLevel.Debug]: LOG_LEVEL.DEBUG,
  [LogLevel.Verbose]: LOG_LEVEL.VERBOSE,
}

export default class Log {
  public static level: LogLevel = LogLevel.None

  public static setLevel(level: LogLevel) {
    this.level = level
    OneSignal.Debug.setLogLevel(level)

    if (level !== LogLevel.None) {
      Purchases.setLogLevel(REVENUECAT_LOG_LEVEL_MAP[level])
    }
  }

  public static log(message: string, ...args: any[]) {
    if (this.level >= LogLevel.None) {
      console.log(message, ...args)
    }
  }

  public static error(message: string, ...args: any[]) {
    crashlytics().log(message)
    if (this.level >= LogLevel.Error) {
      console.error(message, ...args)
    }
  }

  public static warn(message: string, ...args: any[]) {
    crashlytics().log(message)
    if (this.level >= LogLevel.Warn) {
      console.warn(message, ...args)
    }
  }

  public static info(message: string, ...args: any[]) {
    crashlytics().log(message)
    if (this.level >= LogLevel.Info) {
      console.info(message, ...args)
    }
  }

  public static debug(message: string, ...args: any[]) {
    crashlytics().log(message)
    if (this.level >= LogLevel.Debug) {
      console.debug(message, ...args)
    }
  }
}
