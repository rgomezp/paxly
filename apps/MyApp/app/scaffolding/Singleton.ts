export abstract class Singleton {
  private static _instances: Map<any, any> = new Map()

  protected constructor() {
    const derivedClass = new.target

    if (Singleton._instances.has(derivedClass)) {
      throw new Error(
        `${derivedClass.name} is a singleton and has already been instantiated. Use getInstance() to access the instance.`,
      )
    }

    Singleton._instances.set(derivedClass, this)
  }

  static getInstance<T>(this: new () => T): T {
    if (!Singleton._instances.has(this)) {
      Singleton._instances.set(this, new this())
    }

    return Singleton._instances.get(this) as T
  }

  static resetInstance(): void {
    Singleton._instances.clear()
  }
}
