import { useState, useEffect } from "react"
import { View, StyleSheet, TextInput, Text } from "react-native"
import { useCustomColor } from "@/hooks/useCustomColor"
import UserManager from "@/managers/UserManager"
import Log from "@/utils/Log"
import RectangularButton from "./buttons/RectangularButton"
import { useAppTheme } from "@/utils/useAppTheme"

interface NameInputProps {
  onSelection?: () => void
  showTitle?: boolean
}

export default function NameInput({ showTitle = true, onSelection }: NameInputProps) {
  const [name, setName] = useState("")
  const {
    theme: { colors },
    themeContext,
  } = useAppTheme()
  const { color } = useCustomColor()

  // Load existing nickname when component mounts
  useEffect(() => {
    const loadNickname = async () => {
      try {
        const user = await UserManager.getUser()
        if (user?.nickname) {
          setName(user.nickname)
        }
      } catch (error) {
        Log.error(`Error loading nickname: ${error}`)
      }
    }
    loadNickname()
  }, [])

  const handleSubmit = async () => {
    if (!name.trim()) {
      return // Don't submit if name is empty
    }

    try {
      // Save the nickname to UserManager
      await UserManager.setNickname(name.trim())

      // Call the selection callback to advance to next slide
      onSelection?.()
    } catch (error) {
      Log.error(`Error saving nickname: ${error}`)
      // Still advance to next slide even if save fails
      onSelection?.()
    }
  }

  const isDark = themeContext === "dark"
  const themedInputStyles = {
    color: colors.text,
    backgroundColor: isDark ? colors.palette.neutral300 : colors.palette.neutral200,
    width: "70%" as const,
  }

  const placeholderColor = colors.textDim

  const titleStyle = { fontSize: 18, fontWeight: "600" as const, color: colors.text }

  return (
    <View style={styles.container}>
      {showTitle && <Text style={[styles.title, titleStyle]}>What should we call you?</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, themedInputStyles]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={placeholderColor}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        <View style={styles.buttonContainer}>
          <RectangularButton
            buttonText="Save"
            onClick={handleSubmit}
            width={"70%"}
            backgroundColor={color}
            isDisabled={!name.trim()}
            customStyles={styles.buttonTopMargin}
          />
        </View>
      </View>
    </View>
  )
}

const baseInputStyles = {
  borderRadius: 8,
  fontSize: 18,
  height: 50,
  marginBottom: 10,
  paddingHorizontal: 15,
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonTopMargin: {
    marginTop: 20,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  input: baseInputStyles as any,
  inputContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
})
