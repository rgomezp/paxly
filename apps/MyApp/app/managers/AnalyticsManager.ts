import { getAnalytics, logEvent } from "@react-native-firebase/analytics"
import Log from "../utils/Log"
import { TEST_EVENTS } from "@/constants/events"
import { EventRegister } from "react-native-event-listeners"

type Entry = {
  message: string
  count: number
}

type MessagesHash = {
  [key: string]: Entry
}

export default class AnalyticsManager {
  private static instance: AnalyticsManager | null = null
  private errorMessages: MessagesHash = {}
  private interval: NodeJS.Timeout

  private constructor() {
    this.interval = setInterval(async () => {
      if (Object.keys(this.errorMessages).length > 0) {
        await this._logAllErrorsToFirebase()

        if (process.env.NODE_ENV === "test") {
          EventRegister.emit(TEST_EVENTS.ANALYTICS_INTERVAL_FIRED)
        }
      }
    }, 1000 * 5) // 5 seconds
  }

  public static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager()
    }
    return AnalyticsManager.instance
  }

  public static resetInstance(): void {
    AnalyticsManager.instance = null
  }

  public logEvent(eventName: string, params?: { [key: string]: any }): void {
    if (process.env.NODE_ENV === "development") {
      Log.info(`AnalyticsManager: logEvent: ${eventName} ` + JSON.stringify(params))
      return
    }

    logEvent(getAnalytics(), eventName, params).catch((error) => {
      console.error("Failed to log event to Firebase:", error)
    })
  }

  public getErrors(): MessagesHash {
    return this.errorMessages
  }

  /**
   * Push an event to the buffer (hash map)
   * @param message
   */
  public logError(message: string): void {
    // get unique hash for message
    const hash = this._hashString(message)

    // check if message exists
    if (this.errorMessages[hash]) {
      this.errorMessages[hash].count++
    } else {
      this.errorMessages[hash] = {
        message: message,
        count: 1,
      }
    }
  }

  /**
   * Destroy the instance and log all events to Firebase
   */
  public async destroy(): Promise<void> {
    await this._logAllErrorsToFirebase()
    clearInterval(this.interval)
  }

  private _hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    return hash.toString()
  }

  private async _logAllErrorsToFirebase(): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      return
    }

    const promises = []
    for (const key in this.errorMessages) {
      const entry = this.errorMessages[key]
      const promise = logEvent(getAnalytics(), "fw_log_error", {
        message: entry.message.substring(0, 100),
        count: entry.count,
      }).catch((error) => {
        console.error("Failed to log event to Firebase:", error)
      })
      promises.push(promise)
    }

    // Await all logEvent promises
    await Promise.all(promises).then(() => {
      this.errorMessages = {} // Reset messages after successful logging
    })
  }
}
