import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MoodStoreModel } from "./mood/MoodStore"
import { JournalStoreModel } from "./journal/JournalStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    moodStore: types.optional(MoodStoreModel, {}),
    journalStore: types.optional(JournalStoreModel, {}),
  })

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
