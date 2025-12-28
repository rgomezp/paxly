import { types, Instance } from "mobx-state-tree"
import { ganon } from "@/services/ganon/ganon"
import { ILetterToMyself, LetterDeliveryTime } from "@/types/ILetterToMyself"

export interface LetterDraft {
  text: string
  deliveryTimeMonths: LetterDeliveryTime
}

export const LetterToMyselfStoreModel = types
  .model("LetterToMyselfStore", {
    letters: types.optional(types.array(types.frozen<ILetterToMyself>()), []),
    draft: types.optional(types.frozen<LetterDraft | null>(), null),
  })
  .views((self) => ({
    get deliveredLetters() {
      const now = Date.now()
      return self.letters
        .filter((letter) => letter.deliverAt <= now)
        .sort((a, b) => b.deliverAt - a.deliverAt) // Newest first
    },
    get unreadLetters() {
      return this.deliveredLetters.filter((letter) => !letter.isRead)
    },
    get hasUnreadLetters() {
      return this.unreadLetters.length > 0
    },
    get hasDeliveredLetters() {
      return this.deliveredLetters.length > 0
    },
    get pendingLetters() {
      const now = Date.now()
      return self.letters
        .filter((letter) => letter.deliverAt > now)
        .sort((a, b) => a.deliverAt - b.deliverAt) // Oldest first (next to deliver)
    },
    get hasDraft() {
      return self.draft !== null && self.draft.text.trim().length > 0
    },
  }))
  .actions((self) => ({
    loadFromGanon() {
      const data = ganon.get("letterToMyself") as { letters: ILetterToMyself[] } | null | undefined
      if (data && data.letters) {
        self.letters.replace(data.letters)
      }
      const draft = ganon.get("letterToMyselfDraft") as LetterDraft | null | undefined
      self.draft = draft ?? null
    },
    addLetter(letter: ILetterToMyself) {
      self.letters.push(letter)
      this.persist()
    },
    markAsRead(letterId: string) {
      const letter = self.letters.find((l) => l.id === letterId)
      if (letter) {
        const updatedLetter = { ...letter, isRead: true }
        const index = self.letters.indexOf(letter)
        self.letters[index] = updatedLetter
        this.persist()
      }
    },
    setDraft(draft: LetterDraft | null) {
      self.draft = draft
      // Persist to ganon
      try {
        ganon.set("letterToMyselfDraft", draft)
      } catch {
        // noop; persistence errors shouldn't break UI updates
      }
    },
    clearDraft() {
      self.draft = null
      ganon.set("letterToMyselfDraft", null)
    },
    persist() {
      try {
        ganon.set("letterToMyself", {
          letters: self.letters.slice(),
        })
      } catch {
        // noop; persistence errors shouldn't break UI updates
      }
    },
    afterCreate() {
      this.loadFromGanon()
    },
  }))

export interface LetterToMyselfStore extends Instance<typeof LetterToMyselfStoreModel> {}
