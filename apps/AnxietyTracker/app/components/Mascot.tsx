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

// Blob's natural aspect ratio (width:height) from original design (400x180)
const BLOB_ASPECT_RATIO = 400 / 180

// Face size as a ratio of the blob's actual rendered height
const FACE_SIZE_RATIO = 0.5

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

  // Calculate the blob's actual rendered size based on its aspect ratio
  // The blob will scale to fit within the container while maintaining its aspect ratio
  const containerAspectRatio = width / height
  let blobRenderedHeight: number

  if (containerAspectRatio >= BLOB_ASPECT_RATIO) {
    // Container is wider than blob - blob is constrained by height
    blobRenderedHeight = height
  } else {
    // Container is taller than blob - blob is constrained by width
    blobRenderedHeight = width / BLOB_ASPECT_RATIO
  }

  // Calculate face size based on blob's actual rendered height
  const faceSize = blobRenderedHeight * FACE_SIZE_RATIO

  const $faceImageDynamic: ImageStyle = {
    width: faceSize,
    height: faceSize,
  }

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
            style={$faceImageDynamic}
            contentFit="contain"
            transition={0}
          />
        ) : (
          <Image source={faceImageSource} style={$faceImageDynamic} resizeMode="contain" />
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
