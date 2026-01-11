export interface IRedFlag {
  id: string
  text: string
  createdAt: number
  isLocked: boolean // Once locked, cannot be edited
}
