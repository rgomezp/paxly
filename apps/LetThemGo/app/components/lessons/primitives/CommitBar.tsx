import RectangularButton from "@/components/buttons/RectangularButton"
import { View } from "react-native"

export function CommitBar({ text, onDone }: { text?: string; onDone?: () => void }) {
  if (!text) return null
  return (
    <View>
      <RectangularButton buttonText={text} onClick={() => onDone?.()} />
    </View>
  )
}
