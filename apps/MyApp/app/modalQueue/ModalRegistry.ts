import Log from "@/utils/Log"
import { ModalRegistration, BaseModalProps } from "@/types/modals/modals"

class ModalRegistryManager {
  private static instance: ModalRegistryManager
  private registry: Map<string, ModalRegistration<any>> = new Map()

  private constructor() {}

  static getInstance(): ModalRegistryManager {
    if (!ModalRegistryManager.instance) {
      ModalRegistryManager.instance = new ModalRegistryManager()
    }
    return ModalRegistryManager.instance
  }

  register<T extends BaseModalProps>(name: string, registration: ModalRegistration<T>): void {
    if (this.registry.has(name)) {
      Log.info(`Modal component ${name} is already registered. Overwriting...`)
    }
    this.registry.set(name, registration as ModalRegistration<any>)
    Log.info(`Registered modal component: ${name}`)
  }

  get<T extends BaseModalProps>(name: string): ModalRegistration<T> | undefined {
    const registration = this.registry.get(name)
    if (!registration) {
      Log.error(`Modal component ${name} is not registered`)
      return undefined
    }
    return registration as ModalRegistration<T>
  }

  has(name: string): boolean {
    return this.registry.has(name)
  }

  unregister(name: string): boolean {
    const result = this.registry.delete(name)
    if (result) {
      Log.info(`Unregistered modal component: ${name}`)
    }
    return result
  }

  getAllRegisteredNames(): string[] {
    return Array.from(this.registry.keys())
  }
}

// Export a singleton instance
export const modalRegistry = ModalRegistryManager.getInstance()

// Decorator for registering modal components
export function registerModal<P extends BaseModalProps>(name: string) {
  return function <T extends P>(component: ModalRegistration<T>["component"]) {
    modalRegistry.register(name, { component })
    return component
  }
}
