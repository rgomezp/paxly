import { useState, useRef, useEffect } from "react"
import {
  View,
  ViewStyle,
  ScrollView,
  TextStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Platform,
} from "react-native"
import Modal from "react-native-modal"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import RectangularButton from "../buttons/RectangularButton"

interface MedicalDisclaimerModalProps {
  visible: boolean
  onAccept: () => void
  onDismiss?: () => void
}

const MODAL_MAX_HEIGHT_RATIO = 0.85

export default function MedicalDisclaimerModal({
  visible,
  onAccept,
  onDismiss,
}: MedicalDisclaimerModalProps) {
  const { theme, themed } = useAppTheme()
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [visibleReady, setVisibleReady] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  // On Android, delay showing modal content by one frame so layout is measured first.
  // Avoids the accept button being unreachable when modal renders before layout is ready.
  useEffect(() => {
    let frameId: number | null = null

    if (visible) {
      if (Platform.OS === "android") {
        frameId = requestAnimationFrame(() => {
          setVisibleReady(true)
        })
      } else {
        setVisibleReady(true)
      }
    } else {
      setVisibleReady(false)
    }

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [visible])

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const paddingToBottom = 20 // Threshold to consider "scrolled to bottom"
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom

    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true)
    }
  }

  // Reset scroll state when modal becomes visible
  useEffect(() => {
    if (visible) {
      setHasScrolledToBottom(false)
    }
  }, [visible])

  const modalVisible = Platform.OS === "android" ? visibleReady : visible
  const windowHeight = Dimensions.get("window").height
  const androidContentHeight = windowHeight * MODAL_MAX_HEIGHT_RATIO

  return (
    <Modal
      testID="medical-disclaimer-modal"
      isVisible={modalVisible}
      onBackdropPress={onDismiss}
      onSwipeComplete={undefined}
      swipeDirection={[]}
      style={$modalView}
      avoidKeyboard={true}
      useNativeDriverForBackdrop={true}
      propagateSwipe={true}
    >
      <View
        style={[
          $modalContent,
          { backgroundColor: theme.colors.background },
          Platform.OS === "android" && {
            height: androidContentHeight,
            maxHeight: androidContentHeight,
          },
        ]}
      >
        <View style={themed($headerContainer)}>
          <Text
            text="Important Information"
            preset="subheading"
            style={themed([$title, { color: theme.colors.text }])}
          />
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={$scrollView}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={$scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
        >
          <View onStartShouldSetResponder={() => true}>
            <View style={themed($section)}>
              <Text
                text="General Medical Disclaimer"
                preset="bold"
                style={themed([$sectionTitle, { color: theme.colors.text }])}
              />
              <Text
                text="This application provides educational information about anxiety and panic. It is not a substitute for professional medical, psychiatric, or psychological advice, diagnosis, or treatment. Always seek the advice of qualified health providers with any questions you may have regarding a medical condition or mental health concern. Never disregard professional medical advice or delay in seeking it because of something you have read in this application."
                size="sm"
                style={themed([$sectionText, { color: theme.colors.text }])}
              />
              <Text
                text="If you are experiencing a medical emergency, contact your local emergency services or go to your nearest emergency room immediately. If you are having thoughts of self-harm or suicide, please contact your local crisis helpline or seek immediate medical attention."
                size="sm"
                style={themed([$sectionText, { color: theme.colors.text, marginTop: 12 }])}
              />
            </View>

            <View style={themed($section)}>
              <Text
                text="AI-Generated Content Disclaimer"
                preset="bold"
                style={themed([$sectionTitle, { color: theme.colors.text }])}
              />
              <Text
                text="Some lessons and content in this application are generated using artificial intelligence. AI-generated content may contain mistakes, inaccuracies, or information that is not appropriate for your specific situation. Please use your judgment and consult with qualified professionals when making decisions based on this content."
                size="sm"
                style={themed([$sectionText, { color: theme.colors.text }])}
              />
            </View>

            <View style={themed($section)}>
              <Text
                text="Therapy Disclaimer"
                preset="bold"
                style={themed([$sectionTitle, { color: theme.colors.text }])}
              />
              <Text
                text="The techniques and information provided in this application are for educational purposes only. They are not a substitute for professional therapy or treatment. If you are considering exposure therapy or other therapeutic interventions, we recommend working with a qualified mental health professional."
                size="sm"
                style={themed([$sectionText, { color: theme.colors.text }])}
              />
            </View>

            <View style={themed($section)}>
              <Text
                text="Medication Disclaimer"
                preset="bold"
                style={themed([$sectionTitle, { color: theme.colors.text }])}
              />
              <Text
                text="Any references to medications in this application are for informational purposes only. Do not start, stop, or change any medication without consulting your healthcare provider."
                size="sm"
                style={themed([$sectionText, { color: theme.colors.text }])}
              />
            </View>

            <View style={themed($section)}>
              <Text
                text="Individual Results Disclaimer"
                preset="bold"
                style={themed([$sectionTitle, { color: theme.colors.text }])}
              />
              <Text
                text="Results may vary. The information provided is based on general principles and may not apply to all individuals. Your experience may differ from what is described."
                size="sm"
                style={themed([$sectionText, { color: theme.colors.text }])}
              />
            </View>
          </View>
        </ScrollView>

        <View style={themed($buttonContainer)}>
          <RectangularButton
            buttonText="I Understand and Accept"
            onClick={onAccept}
            width="100%"
            customStyles={$button}
            isDisabled={!hasScrolledToBottom}
          />
        </View>
      </View>
    </Modal>
  )
}

const $modalView: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: 0,
}

const $modalContent: ViewStyle = {
  borderRadius: 12,
  overflow: "hidden",
  maxHeight: "85%",
  width: "90%",
  marginHorizontal: 10,
  flexDirection: "column",
  // Explicit height so the inner flex (ScrollView + button) can distribute; avoids Android layout issues
  height: "85%",
}

const $headerContainer: ViewStyle = {
  padding: 20,
  paddingBottom: 16,
  flexShrink: 0,
}

const $scrollView: ViewStyle = {
  flex: 1,
  minHeight: 0, // Required on Android so ScrollView can shrink and button stays visible
}

const $scrollContent: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 10,
}

const $title: TextStyle = {
  fontSize: 20,
  fontWeight: "600",
}

const $section: ViewStyle = {
  marginBottom: 24,
}

const $sectionTitle: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 8,
}

const $sectionText: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
}

const $buttonContainer: ViewStyle = {
  padding: 20,
  paddingTop: 16,
  borderTopWidth: 1,
  borderTopColor: "rgba(0, 0, 0, 0.1)",
  flexShrink: 0, // Keep button always visible and tappable
}

const $button: ViewStyle = {
  marginTop: 0,
}
