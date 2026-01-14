import { View } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import ProgressBar from "../ProgressBar"
import { ReactNode } from "react"

interface LessonFooterProps {
  children: ReactNode
  showProgressBar?: boolean
  currentIndex?: number
  totalItems?: number
}

export function LessonFooter({
  children,
  showProgressBar = false,
  currentIndex = 0,
  totalItems = 0,
}: LessonFooterProps) {
  const { themed, theme } = useAppTheme()

  return (
    <View
      style={themed(() => ({
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
        backgroundColor: theme.colors.background,
      }))}
    >
      {children}
      {/* Progress bar */}
      {showProgressBar && (
        <View
          style={themed(() => ({
            width: "100%",
            alignItems: "center",
          }))}
        >
          <ProgressBar currentIndex={currentIndex} totalItems={totalItems} widthPercent={0.9} />
        </View>
      )}
    </View>
  )
}
