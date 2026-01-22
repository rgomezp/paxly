import { ImageSourcePropType } from "react-native"

export interface IAward {
  id: string
  name: string
  description: string
  image?: ImageSourcePropType
}
