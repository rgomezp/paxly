import { ReactElement } from "react"

export interface ISlide {
  id: string
  title?: string
  description?: string
  image?: any
  titleColor?: string
  component?: ReactElement
  showStoreReview?: boolean
}
