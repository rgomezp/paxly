export type LetterDeliveryTime = 1 | 3 | 12 // months

export interface ILetterToMyself {
  id: string
  text: string
  deliveryTimeMonths: LetterDeliveryTime
  createdAt: number
  deliverAt: number // timestamp when letter becomes available
  isRead: boolean
}
