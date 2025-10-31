import { ganon } from "@/services/ganon/ganon"

export default class MessageIntoTheVoidManager {
  static getDraft(): string | null {
    return ganon.get("messageIntoTheVoidDraft") ?? null
  }

  static saveDraft(text: string): void {
    ganon.set("messageIntoTheVoidDraft", text)
  }

  static clearDraft(): void {
    ganon.set("messageIntoTheVoidDraft", null)
  }

  static sendMessage(text: string): void {
    // Delete the draft when sending
    MessageIntoTheVoidManager.clearDraft()
    // The message is intentionally not saved - it's sent into the void
  }
}
