import { FC, useEffect, useRef } from "react"
import { View, ViewStyle, Image, ImageStyle } from "react-native"
import LottieView from "lottie-react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

// Conditionally import expo-image for animated WebP support
let ExpoImage: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ExpoImage = require("expo-image").Image
} catch {}

interface MascotProps {
  /**
   * Width of the mascot animation
   * @default 400
   */
  width?: number
  /**
   * Height of the mascot animation
   * @default 180
   */
  height?: number
  /**
   * Custom style for the container
   */
  style?: ViewStyle
}

export const Mascot: FC<MascotProps> = ({ width = 400, height = 180, style }) => {
  const { themed } = useAppTheme()
  const blobLottieRef = useRef<LottieView>(null)

  // Start blob animation when component mounts
  useEffect(() => {
    blobLottieRef.current?.play()
  }, [])

  const faceImageSource = require("../../assets/animations/cute_face_animation.webp")

  return (
    <View style={[themed($container), { width, height }, style]}>
      {/* Blob Lottie animation as base */}
      <LottieView
        ref={blobLottieRef}
        source={require("../../assets/animations/blob.json")}
        loop
        style={themed($blobAnimation)}
      />
      {/* Face WebP animation overlaid on top */}
      <View style={themed($faceContainer)}>
        {ExpoImage ? (
          <ExpoImage
            source={faceImageSource}
            style={themed($faceImage)}
            contentFit="contain"
            transition={0}
          />
        ) : (
          <Image source={faceImageSource} style={themed($faceImage)} resizeMode="contain" />
        )}
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
})

const $blobAnimation: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: "100%",
})

const $faceContainer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
})

const $faceImage: ThemedStyle<ImageStyle> = () => ({
  width: "100%",
  height: "100%",
  transform: [{ scale: 0.34 }], // 66% smaller (34% of original size)
})
