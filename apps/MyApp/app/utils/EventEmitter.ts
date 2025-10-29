import { EventEmitter } from 'eventemitter3'

// Create a singleton event emitter instance
class AppEventEmitter extends EventEmitter {
  private static instance: AppEventEmitter | null = null

  static getInstance(): AppEventEmitter {
    if (!this.instance) {
      this.instance = new AppEventEmitter()
    }
    return this.instance
  }

  static resetInstance(): void {
    this.instance = null
  }
}

// Export the singleton instance
export const eventEmitter = AppEventEmitter.getInstance()

// Create a compatibility layer that matches the react-native-event-listeners API
export const EventRegister = {
  on: (event: string, callback: (...args: any[]) => void) => {
    eventEmitter.on(event, callback)
  },
  
  off: (event: string, callback?: (...args: any[]) => void) => {
    if (callback) {
      eventEmitter.off(event, callback)
    } else {
      eventEmitter.removeAllListeners(event)
    }
  },
  
  rm: (event: string, callback?: (...args: any[]) => void) => {
    EventRegister.off(event, callback)
  },
  
  emit: (event: string, ...args: any[]) => {
    eventEmitter.emit(event, ...args)
  },
  
  removeAllListeners: (event?: string) => {
    if (event) {
      eventEmitter.removeAllListeners(event)
    } else {
      eventEmitter.removeAllListeners()
    }
  }
}

export default EventRegister
