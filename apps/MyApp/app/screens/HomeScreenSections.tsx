import { FC } from "react"
import { MenuItem, ExternalLinkItem } from "@/components"
import type { Theme } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import customConfig from "../../customConfig"

export const getHomeScreenSections = () => [
  {
    name: "Welcome",
    data: ({ themed, theme }: { themed: any; theme: Theme }) => [
      <MenuItem
        key="login"
        text={LANGUAGE_COPY.homeScreen.loginCreateAccount[Language.current]}
        style={themed({ color: theme.colors.text })}
        route="Login"
      />,
      <MenuItem
        key="settings"
        text={LANGUAGE_COPY.words.settings[Language.current]}
        style={themed({ color: theme.colors.text })}
        route="Settings"
      />,
    ],
  },
  {
    name: "Info",
    data: ({ themed, theme }: { themed: any; theme: Theme }) => [
      <ExternalLinkItem
        key="terms"
        text={LANGUAGE_COPY.words.termsOfService[Language.current]}
        url={customConfig().termsOfServiceUrl}
        style={themed({ color: theme.colors.text })}
      />,
      <ExternalLinkItem
        key="privacy"
        text={LANGUAGE_COPY.words.privacyPolicy[Language.current]}
        url={customConfig().privacyPolicyUrl}
        style={themed({ color: theme.colors.text })}
      />,
    ],
  },
]
