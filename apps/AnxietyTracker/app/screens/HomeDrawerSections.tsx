import {
  MenuItem,
  ExternalLinkItem,
  MembershipDrawerItem,
  LeaveReviewDrawerItem,
  LogoutDrawerItem,
  Text,
} from "@/components"
import { Alert, TouchableOpacity } from "react-native"
import type { Theme } from "@/theme"
import customConfig from "../../customConfig"
import { useEffect, useState } from "react"
import LoginManager from "@/managers/LoginManager"
import UserManager from "@/managers/UserManager"
import type IUser from "@/types/IUser"
import { GLOBAL_EVENTS } from "@/constants/events"
import { EventRegister } from "@/utils/EventEmitter"
import { ganon } from "@/services/ganon/ganon"
import { MascotNames } from "@/types/MascotName"

export const useHomeDrawerSections = () => {
  const config = customConfig()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<IUser | undefined>(undefined)
  const mascotName = (ganon.get("mascotName") as MascotNames | null) ?? null
  const capitalizedMascotName = mascotName
    ? mascotName.charAt(0).toUpperCase() + mascotName.slice(1)
    : "Planty"

  useEffect(() => {
    const updateUserInfo = () => {
      setUserInfo(UserManager.getUser())
    }

    const updateLoginStatus = () => {
      const loginManager = LoginManager.getInstance()
      const loggedIn = loginManager.isLoggedIn()
      setIsLoggedIn(loggedIn)
    }

    // Subscribe to auth changes
    const loginManager = LoginManager.getInstance()
    const unsubscribeAuth = loginManager.subscribe(() => {
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
                text="Logout"
                style={themed({ color: theme.colors.text })}
                containerStyle={themed({ marginBottom: theme.spacing.sm })}
              />,
            )
          } else {
            items.push(
              <MenuItem
                key="login"
                text="Login / Create Account"
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
              text="Settings"
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
            text="Membership"
            style={themed({ color: theme.colors.text })}
            containerStyle={themed({ marginBottom: theme.spacing.sm })}
          />,
        )

        // Add Leave a Review button
        items.push(
          <LeaveReviewDrawerItem
            key="leaveReview"
            text="Leave a Review"
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
          text="Terms of Service"
          url={config.termsOfServiceUrl}
          style={themed({ color: theme.colors.text })}
          containerStyle={themed({ marginBottom: theme.spacing.sm })}
        />,
        <ExternalLinkItem
          key="privacy"
          text="Privacy Policy"
          url={config.privacyPolicyUrl}
          style={themed({ color: theme.colors.text })}
          containerStyle={themed({ marginBottom: theme.spacing.sm })}
        />,
        <ExternalLinkItem
          key="support"
          text="Support"
          url={`mailto:${config.supportEmail}`}
          style={themed({ color: theme.colors.text })}
          containerStyle={themed({ marginBottom: theme.spacing.sm })}
        />,
      ],
    },
    {
      name: "FAQ",
      data: ({ themed, theme }: { themed: any; theme: Theme }) => {
        const handleHowToWaterPress = () => {
          Alert.alert(
            `How to Water ${capitalizedMascotName}`,
            `Simply complete a daily task to earn water. Then press the water droplet above ${capitalizedMascotName} to water.`,
          )
        }

        const handleWhySadPress = () => {
          Alert.alert(
            `Why is ${capitalizedMascotName} Sad?`,
            `You haven't watered ${capitalizedMascotName} in 3 days or more! Complete a daily task then water ${capitalizedMascotName} to keep healthy and happy!`,
          )
        }

        return [
          <TouchableOpacity
            key="faq-why-sad"
            onPress={handleWhySadPress}
            style={themed({ marginBottom: theme.spacing.sm })}
          >
            <Text
              text={`Why is ${capitalizedMascotName} Sad?`}
              style={themed({ color: theme.colors.text })}
            />
          </TouchableOpacity>,
          <TouchableOpacity
            key="faq-how-to-water"
            onPress={handleHowToWaterPress}
            style={themed({ marginBottom: theme.spacing.sm })}
          >
            <Text
              text={`How to Water ${capitalizedMascotName}`}
              style={themed({ color: theme.colors.text })}
            />
          </TouchableOpacity>,
        ]
      },
    },
  ]
}
