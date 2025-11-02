import { ReactElement } from "react"

export type TextPlacement = "top" | "bottom" | "sandwich"
export type TextAlignment = "left" | "center" | "right"

export interface ISlide {
  id: string
  title?: string
  description?: string
  image?: any
  titleColor?: string
  component?: ReactElement
  showStoreReview?: boolean
  textPlacement?: TextPlacement
  textAlignment?: TextAlignment
}
