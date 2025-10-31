import { MenuItem, ExternalLinkItem, MembershipDrawerItem, LeaveReviewDrawerItem, LogoutDrawerItem } from "@/components"
import type { Theme } from "@/theme"
import Language from "@/internationalization/Language"
import LANGUAGE_COPY from "@/internationalization/LanguageCopy"
import customConfig from "../../customConfig"
import { useEffect, useState } from "react"
import LoginManager from "@/managers/LoginManager"
import UserManager from "@/managers/UserManager"
import type { FirebaseAuthTypes } from "@react-native-firebase/auth"
import type IUser from "@/types/IUser"
import { GLOBAL_EVENTS } from "@/constants/events"
import { EventRegister } from "@/utils/EventEmitter"

export const useHomeDrawerSections = () => {
  const config = customConfig()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [userInfo, setUserInfo] = useState<IUser | undefined>(undefined)

  useEffect(() => {
    const updateUserInfo = () => {
      setUserInfo(UserManager.getUser())
    }

    const updateLoginStatus = async () => {
      const loginManager = LoginManager.getInstance()
      const loggedIn = await loginManager.isLoggedIn()
      setIsLoggedIn(loggedIn)
    }

    // Subscribe to auth changes
    const loginManager = LoginManager.getInstance()
    const unsubscribeAuth = loginManager.subscribe((authUser) => {
      setUser(authUser)
      updateLoginStatus()
      updateUserInfo()
    })

    // Listen to global update events (e.g., when user info changes)
    const handleUpdateAll = () => {
      updateUserInfo()
      updateLoginStatus()
    }
    EventRegister.on(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)

    // Initial state
    updateLoginStatus()
    updateUserInfo()

    return () => {
      unsubscribeAuth()
      EventRegister.off(GLOBAL_EVENTS.UPDATE_ALL, handleUpdateAll)
    }
  }, [])

  // Get welcome section name with nickname/first name
  const getWelcomeSectionName = (): string => {
    const name = userInfo?.nickname || userInfo?.first
    if (name) {
      return `Welcome, ${name}`
    }
    return "Welcome"
  }

  return [
    {
      name: getWelcomeSectionName(),
      data: ({ themed, theme }: { themed: any; theme: Theme }) => {
        const items = []

        if (config.includeLoginScreen) {
          if (isLoggedIn) {
            items.push(
              <LogoutDrawerItem
                key="logout"
                text={LANGUAGE_COPY.homeScreen.logout[Language.current]}
                style={themed({ color: theme.colors.text })}
                containerStyle={themed({ marginBottom: theme.spacing.sm })}
              />,
            )
          } else {
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
