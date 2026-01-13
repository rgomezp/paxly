import { RootStoreModel } from "@/models/RootStore"
import { clearAllStores, reloadAllStores, rootStoreSingleton } from "./useStores"

describe("useStores", () => {
  describe("clearAllStores", () => {
    it("should clear all stores defined in RootStore", () => {
      // Get all store names from RootStoreModel
      const rootStoreType = RootStoreModel
      const storeNames = Object.keys(rootStoreType.properties || {})

      // Create spies for each store's clear method
      const spies: Record<string, jest.SpyInstance> = {}

      // Set up spies based on each store's clear method name
      // Different stores use different method names: clear(), clearAll(), clearDraft()
      storeNames.forEach((storeName) => {
        const store = rootStoreSingleton[storeName as keyof typeof rootStoreSingleton] as any

        // Try to find the clear method (could be clear, clearAll, or clearDraft)
        if (typeof store.clear === "function") {
          spies[storeName] = jest.spyOn(store, "clear")
        } else if (typeof store.clearAll === "function") {
          spies[storeName] = jest.spyOn(store, "clearAll")
        } else if (typeof store.clearDraft === "function") {
          spies[storeName] = jest.spyOn(store, "clearDraft")
        }
      })

      // Call clearAllStores
      clearAllStores()

      // Verify that each store's clear method was called
      storeNames.forEach((storeName) => {
        if (spies[storeName]) {
          expect(spies[storeName]).toHaveBeenCalledTimes(1)
          spies[storeName].mockRestore()
        } else {
          // If no spy was created, it means the store doesn't have a clear method
          // This should not happen, so we fail the test
          throw new Error(
            `Store "${storeName}" does not have a clear method (clear, clearAll, or clearDraft)`,
          )
        }
      })
    })

    it("should have the same number of stores as RootStore (prevents missing stores)", () => {
      // Get all store names from RootStoreModel
      const rootStoreType = RootStoreModel
      const storeNames = Object.keys(rootStoreType.properties || {})

      // Get all stores that are actually cleared in clearAllStores
      // This list should match the stores in RootStore
      const clearedStoreNames = [
        "moodStore",
        "journalStore",
        "messageIntoTheVoidStore",
        "lessonStore",
        "letterToMyselfStore",
        "whyItDidntWorkStore",
        "redFlagsStore",
      ]

      // Verify counts match - if they don't, a store was added to RootStore but not to clearAllStores
      expect(storeNames.length).toBe(clearedStoreNames.length)

      // Verify that every store in RootStore is in the list of cleared stores
      storeNames.forEach((storeName) => {
        expect(clearedStoreNames).toContain(storeName)
      })

      // Verify that every store in the cleared list is in RootStore
      clearedStoreNames.forEach((storeName) => {
        expect(storeNames).toContain(storeName)
      })
    })
  })

  describe("reloadAllStores", () => {
    it("should reload all stores defined in RootStore", () => {
      // Get all store names from RootStoreModel
      const rootStoreType = RootStoreModel
      const storeNames = Object.keys(rootStoreType.properties || {})

      // Create spies for each store's loadFromGanon method
      const spies: Record<string, jest.SpyInstance> = {}

      storeNames.forEach((storeName) => {
        const store = rootStoreSingleton[storeName as keyof typeof rootStoreSingleton] as any
        if (typeof store.loadFromGanon === "function") {
          spies[storeName] = jest.spyOn(store, "loadFromGanon")
        }
      })

      // Call reloadAllStores
      reloadAllStores()

      // Verify that each store's loadFromGanon method was called
      storeNames.forEach((storeName) => {
        if (spies[storeName]) {
          expect(spies[storeName]).toHaveBeenCalledTimes(1)
          spies[storeName].mockRestore()
        } else {
          throw new Error(`Store "${storeName}" does not have a loadFromGanon method`)
        }
      })
    })

    it("should have the same number of stores as RootStore (prevents missing stores)", () => {
      // Get all store names from RootStoreModel
      const rootStoreType = RootStoreModel
      const storeNames = Object.keys(rootStoreType.properties || {})

      // Get all stores that are actually reloaded in reloadAllStores
      // This list should match the stores in RootStore
      const reloadedStoreNames = [
        "moodStore",
        "journalStore",
        "messageIntoTheVoidStore",
        "lessonStore",
        "letterToMyselfStore",
        "whyItDidntWorkStore",
        "redFlagsStore",
      ]

      // Verify counts match - if they don't, a store was added to RootStore but not to reloadAllStores
      expect(storeNames.length).toBe(reloadedStoreNames.length)

      // Verify that every store in RootStore is in the list of reloaded stores
      storeNames.forEach((storeName) => {
        expect(reloadedStoreNames).toContain(storeName)
      })

      // Verify that every store in the reloaded list is in RootStore
      reloadedStoreNames.forEach((storeName) => {
        expect(storeNames).toContain(storeName)
      })
    })
  })
})

