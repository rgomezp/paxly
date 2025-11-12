import { ganon } from "@/services/ganon/ganon"
import { rootStoreSingleton } from "@/models/helpers/useStores"

export default class MessageIntoTheVoidManager {
  static getDraft(): string | null {
    return ganon.get("messageIntoTheVoidDraft") ?? null
  }

  static saveDraft(text: string): void {
    // Update both ganon and the store for reactivity
    ganon.set("messageIntoTheVoidDraft", text)
    rootStoreSingleton.messageIntoTheVoidStore.setDraft(text)
  }

  static clearDraft(): void {
    ganon.set("messageIntoTheVoidDraft", null)
    rootStoreSingleton.messageIntoTheVoidStore.clearDraft()
  }

  static sendMessage(_text: string): void {
    // Delete the draft when sending
    MessageIntoTheVoidManager.clearDraft()
    // The message is intentionally not saved - it's sent into the void
  }
}
