// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import customConfig from "../../customConfig"
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk"

// import inter, poppins, and roboto
import {
  Inter_400Regular as interRegular,
  Inter_400Regular_Italic as interItalic,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
} from "@expo-google-fonts/inter"
import {
  Poppins_400Regular as poppinsRegular,
  Poppins_400Regular_Italic as poppinsItalic,
  Poppins_500Medium as poppinsMedium,
  Poppins_600SemiBold as poppinsSemiBold,
  Poppins_700Bold as poppinsBold,
} from "@expo-google-fonts/poppins"
import {
  Roboto_400Regular as robotoRegular,
  Roboto_400Regular_Italic as robotoItalic,
  Roboto_500Medium as robotoMedium,
  Roboto_700Bold as robotoBold,
} from "@expo-google-fonts/roboto"

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
  interRegular,
  interItalic,
  interMedium,
  interSemiBold,
  interBold,
  poppinsRegular,
  poppinsItalic,
  poppinsMedium,
  poppinsSemiBold,
  poppinsBold,
  robotoRegular,
  robotoItalic,
  robotoMedium,
  robotoBold,
}

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
  inter: {
    normal: "interRegular",
    italic: "interItalic",
    medium: "interMedium",
    semiBold: "interSemiBold",
    bold: "interBold",
  },
  poppins: {
    normal: "poppinsRegular",
    italic: "poppinsItalic",
    medium: "poppinsMedium",
    semiBold: "poppinsSemiBold",
    bold: "poppinsBold",
  },
  roboto: {
    normal: "robotoRegular",
    italic: "robotoItalic",
    medium: "robotoMedium",
    bold: "robotoBold",
  },
}

// Helper function to get the primary font based on custom config
const getPrimaryFont = () => {
  const config = customConfig()
  const fontName = config.primaryFont || "poppins"

  switch (fontName) {
    case "inter":
      return fonts.inter
    case "roboto":
      return fonts.roboto
    case "spaceGrotesk":
      return fonts.spaceGrotesk
    case "poppins":
    default:
      return fonts.poppins
  }
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: getPrimaryFont(),
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
