import { ImageRequireSource } from "react-native"

/**
 * Registry mapping award IDs to their image sources.
 * This ensures Metro bundles all award images at build time.
 */
export const AWARD_IMAGE_REGISTRY: Record<string, ImageRequireSource> = {
  "green-thumb": require("../../assets/images/awards/green_thumb.png"),
  "hand-trowel": require("../../assets/images/awards/trowel.png"),
  "miracle-legumes": require("../../assets/images/awards/legumes.png"),
  "back-pack": require("../../assets/images/awards/backpack.png"),
  "old-photo": require("../../assets/images/awards/old_photo.png"),
  "watering-can": require("../../assets/images/awards/watering_can.png"),
  "teddy-bear": require("../../assets/images/awards/teddybear.png"),
  "old-letter": require("../../assets/images/awards/old_letter.png"),
  "pet-pig": require("../../assets/images/awards/pig.png"),
  "notepad": require("../../assets/images/awards/notepad.png"),
  "magic-flute": require("../../assets/images/awards/flute.png"),
  "ballcap": require("../../assets/images/awards/ballcap.png"),
  "necklace": require("../../assets/images/awards/necklace.png"),
  "sneakers": require("../../assets/images/awards/sneakers.png"),
  "lunch-box": require("../../assets/images/awards/backpack.png"), // Using backpack as placeholder until image is added
  "old-map": require("../../assets/images/awards/map.png"),
  "old-book": require("../../assets/images/awards/book.png"),
  "trophy": require("../../assets/images/awards/trophy.png"),
} as const

/**
 * Gets the image source for an award by its ID
 * @param awardId - The ID of the award
 * @returns The image source, or undefined if not found
 */
export function getAwardImage(awardId: string): ImageRequireSource | undefined {
  return AWARD_IMAGE_REGISTRY[awardId]
}
