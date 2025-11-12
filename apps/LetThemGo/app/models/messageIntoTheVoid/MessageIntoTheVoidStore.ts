import { types, Instance } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"

export const MessageIntoTheVoidStoreModel = types
  .model("MessageIntoTheVoidStore", {
    draft: types.optional(types.string, ""),
  })
  .views((self) => ({
    get hasDraft() {
      return self.draft.trim().length > 0
    },
  }))
  .actions((self) => ({
    loadFromGanon() {
      const draft = (ganon.get("messageIntoTheVoidDraft") ?? null) as string | null
      self.draft = draft ?? ""
    },
    setDraft(text: string) {
      self.draft = text
      // Persist to ganon
      try {
        ganon.set("messageIntoTheVoidDraft", text || null)
      } catch {
        // noop; persistence errors shouldn't break UI updates
      }
    },
    clearDraft() {
      self.draft = ""
      ganon.set("messageIntoTheVoidDraft", null)
    },
    afterCreate() {
      this.loadFromGanon()
    },
  }))

export interface MessageIntoTheVoidStore extends Instance<typeof MessageIntoTheVoidStoreModel> {}
