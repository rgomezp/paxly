import { ONBOARDING_VERSION } from "@/constants/onboarding"
import fs from "fs"
import path from "path"

/**
 * This test ensures that whenever the onboarding slides array changes
 * (order or length), the ONBOARDING_VERSION constant must be updated.
 *
 * Expected slide order and IDs - update this when slides change:
 * Last updated for ONBOARDING_VERSION: 1.2
 */
const EXPECTED_SLIDE_IDS = [
  "wowMoment",
  "hero",
  "problem_solution",
  "howItWorks",
  "name_input",
  "lastContactDate",
  "gender",
  "ageRange",
  "relationshipDuration",
  "isFirstBreakup",
  "noContactReason",
  "checkSocialMedia",
  "contactTemptationSituation",
  "whoEndedIt",
  "mascotName",
  "mascotIntro",
  "testimonials",
  "moodTrackingIntro",
  "moodReminderFrequency",
  "referralSource",
  "freeToTry",
]

describe("useSlides - ONBOARDING_VERSION consistency", () => {
  it("should have ONBOARDING_VERSION updated when slide order or length changes", () => {
    // Read the useSlides.tsx file to extract slide order
    const useSlidesPath = path.join(__dirname, "useSlides.tsx")
    const fileContent = fs.readFileSync(useSlidesPath, "utf-8")

    // Extract slide function calls from the slides array
    // Find the slides array section
    const slidesArrayMatch = fileContent.match(
      /const slides: ISlide\[\] = useMemo\s*\(\s*\(\) => \[([\s\S]*?)\],/m,
    )
    if (!slidesArrayMatch) {
      throw new Error("Could not find slides array in useSlides.tsx")
    }

    const slidesArrayContent = slidesArrayMatch[1]
    // Pattern: functionName({ onSelection }) - only match within the array
    const slideFunctionPattern = /(\w+Slide)\(/g
    const matches = Array.from(slidesArrayContent.matchAll(slideFunctionPattern))
    const actualSlideOrder = matches.map((match) => match[1])

    // Map function names to slide IDs
    // This mapping should match the actual slide IDs returned by each function
    const functionNameToId: Record<string, string> = {
      wowMomentSlide: "wowMoment",
      heroSlide: "hero",
      problemSolutionSlide: "problem_solution",
      howItWorksSlide: "howItWorks",
      nicknameSlide: "name_input",
      mascotNameSlide: "mascotName",
      mascotIntroSlide: "mascotIntro",
      testimonialsSlide: "testimonials",
      lastContactSlide: "lastContactDate",
      genderSlide: "gender",
      ageSlide: "ageRange",
      relationshipDurationSlide: "relationshipDuration",
      isFirstBreakupSlide: "isFirstBreakup",
      noContactReasonSlide: "noContactReason",
      checkSocialMediaSlide: "checkSocialMedia",
      contactTemptationSituationsSlide: "contactTemptationSituation",
      whoEndedItSlide: "whoEndedIt",
      moodTrackingIntroSlide: "moodTrackingIntro",
      moodReminderFrequencySlide: "moodReminderFrequency",
      referralSourceSlide: "referralSource",
      freeToTrySlide: "freeToTry",
    }

    // Convert function names to slide IDs
    const actualSlideIds = actualSlideOrder.map((fnName) => {
      const slideId = functionNameToId[fnName]
      if (!slideId) {
        throw new Error(
          `Unknown slide function: ${fnName}. Please add it to functionNameToId mapping in the test.`,
        )
      }
      return slideId
    })

    // Check if the order or length has changed
    const hasChanged =
      actualSlideIds.length !== EXPECTED_SLIDE_IDS.length ||
      actualSlideIds.some((id, index) => id !== EXPECTED_SLIDE_IDS[index])

    if (hasChanged) {
      const errorMessage = `
ONBOARDING_VERSION must be updated when slides change!

Current ONBOARDING_VERSION: ${ONBOARDING_VERSION}
Expected slide IDs: ${JSON.stringify(EXPECTED_SLIDE_IDS, null, 2)}
Actual slide IDs:   ${JSON.stringify(actualSlideIds, null, 2)}

Please:
1. Update ONBOARDING_VERSION in @/constants/onboarding.ts
2. Update EXPECTED_SLIDE_IDS in this test file to match the new slide order
`
      throw new Error(errorMessage)
    }

    // If we get here, the slides match the expected order
    expect(actualSlideIds).toEqual(EXPECTED_SLIDE_IDS)
  })
})
