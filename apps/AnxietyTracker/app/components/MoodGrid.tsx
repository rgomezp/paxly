import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import MoodManager from "@/managers/MoodManager"
import { MoodCategory } from "@/types/MoodCategory"
import { Grid } from "./Grid"

interface MoodGridProps {
  style?: ViewStyle
}

export const MoodGrid: FC<MoodGridProps> = observer(function MoodGrid({ style }) {
  const { theme } = useAppTheme()

  const getValueForDate = (date: Date): MoodCategory | null => {
    return MoodManager.getTopMoodCategoryForDate(date)
  }

  const getColorForValue = (category: MoodCategory | null): string => {
    if (category === null) {
      return theme.colors.separator
    }
    switch (category) {
      case MoodCategory.Positive:
        return theme.colors.palette.positive
      case MoodCategory.Negative:
        return theme.colors.palette.negative
      case MoodCategory.Neutral:
        return theme.colors.palette.neutral
      default:
        return theme.colors.separator
    }
  }

  return <Grid getValueForDate={getValueForDate} getColorForValue={getColorForValue} style={style} />
})

export default MoodGrid
