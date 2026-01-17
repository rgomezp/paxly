import { ONBOARDING_VERSION } from "@/constants/onboarding"
import fs from "fs"
import path from "path"
import { type ReactNode } from "react"
import { renderHook } from "@testing-library/react-native"
import { useSlides } from "./useSlides"
import { FlagContext } from "@/hooks/useFlags"
import UserManager from "@/managers/UserManager"

// Mock ganon
const mockGanonStorage: Record<string, any> = {}

jest.mock("@/services/ganon/ganon", () => {
  return {
    ganon: {
      get: jest.fn((key: string) => mockGanonStorage[key]),
      set: jest.fn((key: string, value: any) => {
        mockGanonStorage[key] = value
      }),
    },
  }
})

/**
 * This test ensures that whenever the onboarding slides array changes
 * (order or length), the ONBOARDING_VERSION constant must be updated.
 *
 * Expected slide order and IDs - update this when slides change:
 * Last updated for ONBOARDING_VERSION: 1.4
 * Note: freeToTrySlide and reminderBellSlide are conditional (leadup_slides flag)
 */
const EXPECTED_SLIDE_IDS = [
  "wowMoment",
  "problem_solution",
  "hero",
  "howItWorks",
  "name_input",
  "gender",
  "ageRange",
  "anxietySeverity",
  "anxietyTriggerSituation",
  "anxietyDuration",
  "moodTrackingIntro",
  "moodReminderFrequency",
  "congratulationsAward",
  "testimonials",
  "referralSource",
  "freeToTry",
  "reminderBell",
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
      congratulationsAwardSlide: "congratulationsAward",
      testimonialsSlide: "testimonials",
      genderSlide: "gender",
      ageSlide: "ageRange",
      anxietySeveritySlide: "anxietySeverity",
      anxietyTriggersSlide: "anxietyTriggerSituation",
      anxietyDurationSlide: "anxietyDuration",
      moodTrackingIntroSlide: "moodTrackingIntro",
      moodReminderFrequencySlide: "moodReminderFrequency",
      referralSourceSlide: "referralSource",
      freeToTrySlide: "freeToTry",
      reminderBellSlide: "reminderBell",
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

describe("useSlides - leadup slides feature", () => {
  // Mock UserManager
  beforeEach(() => {
    jest.spyOn(UserManager, "getUser").mockReturnValue({
      nickname: "TestUser",
    } as any)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const createWrapper = (leadup_slides: boolean) => {
    const mockUseFeatureFlags = jest.fn(() => ({
      leadup_slides,
      testimonials_slide: true, // testimonials_slide is enabled by default
    }))
    const mockFlagContext = {
      useFeatureFlags: mockUseFeatureFlags,
    }

    const Wrapper = ({ children }: { children: ReactNode }) => (
      <FlagContext.Provider value={mockFlagContext as any}>{children}</FlagContext.Provider>
    )
    Wrapper.displayName = "FlagContextWrapper"

    return Wrapper
  }

  it("should include leadup slides (freeToTrySlide and reminderBellSlide) when leadup_slides flag is enabled", () => {
    const wrapper = createWrapper(true)
    const { result } = renderHook(() => useSlides(), { wrapper })

    const slides = result.current.slides
    const slideIds = slides.map((slide) => slide.id)

    // Should include the leadup slides at the end
    expect(slideIds).toContain("freeToTry") // freeToTrySlide returns "freeToTry" ID
    expect(slideIds).toContain("reminderBell") // reminderBellSlide returns "reminderBell" ID

    // Verify they are at the end of the array
    const lastTwoSlides = slideIds.slice(-2)
    expect(lastTwoSlides).toEqual(["freeToTry", "reminderBell"])

    // Verify the total count includes the leadup slides
    expect(slides.length).toBe(EXPECTED_SLIDE_IDS.length)
  })

  it("should NOT include leadup slides when leadup_slides flag is disabled", () => {
    const wrapper = createWrapper(false)
    const { result } = renderHook(() => useSlides(), { wrapper })

    const slides = result.current.slides
    const slideIds = slides.map((slide) => slide.id)

    // Should NOT include the leadup slides
    expect(slideIds).not.toContain("reminderBell")
    expect(slideIds).not.toContain("freeToTry")

    // Verify the last slide is referralSource (before leadup slides)
    expect(slideIds[slideIds.length - 1]).toBe("referralSource")

    // Verify the total count excludes the leadup slides
    expect(slides.length).toBe(EXPECTED_SLIDE_IDS.length - 2)
  })

  it("should return correct slide order when leadup_slides is enabled", () => {
    const wrapper = createWrapper(true)
    const { result } = renderHook(() => useSlides(), { wrapper })

    const slides = result.current.slides
    const slideIds = slides.map((slide) => slide.id)

    // Should match the expected order including leadup slides
    expect(slideIds).toEqual(EXPECTED_SLIDE_IDS)
  })

  it("should return correct slide order when leadup_slides is disabled", () => {
    const wrapper = createWrapper(false)
    const { result } = renderHook(() => useSlides(), { wrapper })

    const slides = result.current.slides
    const slideIds = slides.map((slide) => slide.id)

    // Should match expected order without the last 2 leadup slides
    const expectedWithoutLeadup = EXPECTED_SLIDE_IDS.slice(0, -2)
    expect(slideIds).toEqual(expectedWithoutLeadup)
  })

  it("should update slides when leadup_slides flag changes", () => {
    let leadup_slides = false
    const mockUseFeatureFlags = jest.fn(() => ({
      leadup_slides,
      testimonials_slide: true, // testimonials_slide is enabled by default
    }))
    const mockFlagContext = {
      useFeatureFlags: mockUseFeatureFlags,
    }

    const Wrapper = ({ children }: { children: ReactNode }) => (
      <FlagContext.Provider value={mockFlagContext as any}>{children}</FlagContext.Provider>
    )
    Wrapper.displayName = "FlagContextWrapper"

    const { result, rerender } = renderHook(() => useSlides(), { wrapper: Wrapper })

    // Initially disabled
    expect(result.current.slides.length).toBe(EXPECTED_SLIDE_IDS.length - 2)
    expect(result.current.slides.map((s) => s.id)).not.toContain("reminderBell")
    expect(result.current.slides.map((s) => s.id)).not.toContain("freeToTry")

    // Enable the flag
    leadup_slides = true
    mockUseFeatureFlags.mockReturnValue({
      leadup_slides,
      testimonials_slide: true, // testimonials_slide is enabled by default
    })
    rerender({})

    // Should now include leadup slides
    expect(result.current.slides.length).toBe(EXPECTED_SLIDE_IDS.length)
    expect(result.current.slides.map((s) => s.id)).toContain("reminderBell")
    expect(result.current.slides.map((s) => s.id)).toContain("freeToTry")
  })
})
