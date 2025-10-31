import { MenuItem, ExternalLinkItem, MembershipDrawerItem, LeaveReviewDrawerItem } from "@/components"
import type { Theme } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import customConfig from "../../customConfig"

export const getHomeDrawerSections = () => {
  const config = customConfig()

  return [
    {
      name: "Welcome",
      data: ({ themed, theme }: { themed: any; theme: Theme }) => {
        const items = []

        if (config.includeLoginScreen) {
          items.push(
            <MenuItem
              key="login"
              text={LANGUAGE_COPY.homeScreen.loginCreateAccount[Language.current]}
              style={themed({ color: theme.colors.text })}
              containerStyle={themed({ marginBottom: theme.spacing.sm })}
              route="Login"
            />,
          )
        }

        if (config.includeSettingsScreen) {
          items.push(
            <MenuItem
              key="settings"
              text={LANGUAGE_COPY.words.settings[Language.current]}
              style={themed({ color: theme.colors.text })}
              containerStyle={themed({ marginBottom: theme.spacing.sm })}
              route="Settings"
            />,
          )
        }

        // Add Membership button
        items.push(
          <MembershipDrawerItem
            key="membership"
            text={LANGUAGE_COPY.words.membership[Language.current]}
            style={themed({ color: theme.colors.text })}
            containerStyle={themed({ marginBottom: theme.spacing.sm })}
          />,
        )

        // Add Leave a Review button
        items.push(
          <LeaveReviewDrawerItem
            key="leaveReview"
            text={LANGUAGE_COPY.words.leaveReview[Language.current]}
            style={themed({ color: theme.colors.text })}
            containerStyle={themed({ marginBottom: theme.spacing.sm })}
          />,
        )

        return items
      },
    },
    {
      name: "Info",
      data: ({ themed, theme }: { themed: any; theme: Theme }) => [
        <ExternalLinkItem
          key="terms"
          text={LANGUAGE_COPY.words.termsOfService[Language.current]}
          url={config.termsOfServiceUrl}
          style={themed({ color: theme.colors.text })}
          containerStyle={themed({ marginBottom: theme.spacing.sm })}
        />,
        <ExternalLinkItem
          key="privacy"
          text={LANGUAGE_COPY.words.privacyPolicy[Language.current]}
          url={config.privacyPolicyUrl}
          style={themed({ color: theme.colors.text })}
          containerStyle={themed({ marginBottom: theme.spacing.sm })}
        />,
        <ExternalLinkItem
          key="support"
          text={LANGUAGE_COPY.words.support[Language.current]}
          url="mailto:team@tryletthemgo.com"
          style={themed({ color: theme.colors.text })}
          containerStyle={themed({ marginBottom: theme.spacing.sm })}
        />,
      ],
    },
  ]
}
