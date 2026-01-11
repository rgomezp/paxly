import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MoodStoreModel } from "./mood/MoodStore"
import { JournalStoreModel } from "./journal/JournalStore"
import { MessageIntoTheVoidStoreModel } from "./messageIntoTheVoid/MessageIntoTheVoidStore"
import { LessonStoreModel } from "./lessons/LessonStore"
import { WhyItDidntWorkStoreModel } from "./whyItDidntWork/WhyItDidntWorkStore"
import { LetterToMyselfStoreModel } from "./letterToMyself/LetterToMyselfStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  moodStore: types.optional(MoodStoreModel, {}),
  journalStore: types.optional(JournalStoreModel, {}),
  messageIntoTheVoidStore: types.optional(MessageIntoTheVoidStoreModel, {}),
  lessonStore: types.optional(LessonStoreModel, {}),
  whyItDidntWorkStore: types.optional(WhyItDidntWorkStoreModel, {}),
  letterToMyselfStore: types.optional(LetterToMyselfStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
