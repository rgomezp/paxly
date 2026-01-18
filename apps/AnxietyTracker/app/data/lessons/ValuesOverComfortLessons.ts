import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Values Over Comfort" lesson definitions.
 *
 * Phase 5: Action - Module 16
 *
 * These lessons help users understand values-based living.
 * They cover:
 * - Comfort-seeking vs value-driven life
 * - Why meaning outlasts calm
 * - Anxiety as a passenger, not a driver
 */
export const VALUES_OVER_COMFORT_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Comfort-Seeking vs Value-Driven Life
   *
   * Format: Card lesson
   * Focus: Understanding the difference between comfort-seeking and values-based living
   */
  values_over_comfort_comfort_vs_values: {
    id: "values_over_comfort_comfort_vs_values",
    moduleId: "values_over_comfort",
    title: "Comfort-Seeking vs Value-Driven Life",
    goal: "Understand the difference between comfort-seeking and values-based living",
    format: "card",
    cards: [
      {
        type: "text",
        body: "There are two ways to live: Seeking comfort, or living by your values. Understanding the difference helps you make choices that serve your long-term goals.",
      },
      {
        type: "text",
        body: "Comfort-seeking means making choices based on what feels easiest or safest right now. You avoid discomfort, choose the path of least resistance, and prioritize feeling good in the moment.",
      },
      {
        type: "tip",
        body: "Comfort-seeking = Choosing what feels easiest now, avoiding discomfort, prioritizing immediate comfort.",
      },
      {
        type: "text",
        body: "Value-driven living means making choices based on what matters to you, even when it's uncomfortable. You choose actions aligned with your values, even if they create anxiety or discomfort.",
      },
      {
        type: "tip",
        body: "Value-driven = Choosing what matters to you, even when uncomfortable, prioritizing meaning over comfort.",
      },
      {
        type: "text",
        body: "The problem with comfort-seeking: It feels good in the moment, but it often leads to a smaller, less meaningful life. Every time you choose comfort over values, you're trading long-term fulfillment for short-term ease.",
      },
      {
        type: "text",
        body: "The power of value-driven living: It might be uncomfortable, but it leads to a life that feels meaningful and aligned with who you want to be. You're choosing long-term fulfillment over short-term comfort.",
      },
      {
        type: "text",
        body: "This doesn't mean you can never seek comfort. It means you're aware of the choice: Am I choosing comfort, or am I choosing what matters to me?",
      },
      {
        type: "tip",
        body: "The choice: Comfort now, or meaning over time? Both are valid—the key is being aware of which you're choosing.",
      },
      {
        type: "text",
        body: "When anxiety shows up, comfort-seeking says: 'Avoid this, it's too hard.' Value-driven living says: 'This matters to me, and I'm willing to feel anxious while I do it.'",
      },
      {
        type: "text",
        body: "The more you practice choosing values over comfort, the easier it becomes. You learn that you can handle discomfort, and that meaning outlasts comfort.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Meaning Outlasts Calm
   *
   * Format: Card lesson
   * Focus: Understanding why values-based living is more sustainable
   */
  values_over_comfort_meaning_outlasts: {
    id: "values_over_comfort_meaning_outlasts",
    moduleId: "values_over_comfort",
    title: "Why Meaning Outlasts Calm",
    goal: "Understand why values-based living is more sustainable than comfort-seeking",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Calm feels good, but it doesn't last. Meaning, on the other hand, sustains you even when you're not calm. Understanding this helps you make choices that serve you long-term.",
      },
      {
        type: "text",
        body: "When you prioritize calm, you're always chasing it. Every time anxiety shows up, you have to do something to get calm again. It's a constant effort to maintain a feeling that's temporary.",
      },
      {
        type: "tip",
        body: "Prioritizing calm = Constant chasing. Every anxiety episode requires action to get calm again.",
      },
      {
        type: "text",
        body: "When you prioritize meaning, you have something that sustains you even when you're not calm. You can feel anxious and still know your life has meaning. Meaning doesn't depend on how you feel.",
      },
      {
        type: "tip",
        body: "Prioritizing meaning = Sustaining foundation. Meaning exists even when you're not calm.",
      },
      {
        type: "text",
        body: "Think about it: When you look back on your life, what will matter more—how calm you felt, or what you did that mattered to you? Meaning outlasts calm because it's about who you are and what you do, not how you feel.",
      },
      {
        type: "text",
        body: "This doesn't mean you can't want to feel calm. It means you don't have to wait for calm to live your life. You can pursue meaning even when you're anxious.",
      },
      {
        type: "text",
        body: "Meaning gives you a reason to tolerate discomfort. When something matters to you, you're willing to feel anxious while you do it. That willingness is powerful.",
      },
      {
        type: "tip",
        body: "Meaning = Reason to tolerate discomfort. When something matters, you're willing to feel anxious while doing it.",
      },
      {
        type: "text",
        body: "The more you practice choosing meaning over calm, the more you see: Meaning sustains you. Calm is temporary. You can have both, but meaning is the foundation that lasts.",
      },
      {
        type: "text",
        body: "Remember: You don't necessarily have to eliminate anxiety to have a meaningful life. Many people find they can feel anxious and still live by their values. Meaning and anxiety can often coexist.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Anxiety as a Passenger, Not a Driver
   *
   * Format: Card lesson
   * Focus: Understanding how to live with anxiety without it controlling you
   */
  values_over_comfort_passenger_not_driver: {
    id: "values_over_comfort_passenger_not_driver",
    moduleId: "values_over_comfort",
    title: "Anxiety as a Passenger, Not a Driver",
    goal: "Understand how to live with anxiety without it controlling your choices",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety doesn't have to drive your life. You can let it be a passenger—present, but not in control. Understanding this helps you make choices based on values, not anxiety.",
      },
      {
        type: "text",
        body: "When anxiety is the driver, it makes all the decisions. You avoid things because anxiety says to. You choose comfort because anxiety demands it. Anxiety is in control.",
      },
      {
        type: "tip",
        body: "Anxiety as driver = Anxiety makes decisions. You avoid, seek comfort, let anxiety control your choices.",
      },
      {
        type: "text",
        body: "When anxiety is a passenger, you're in the driver's seat. Anxiety is there—you can feel it, hear it, acknowledge it—but you're making the decisions based on what matters to you.",
      },
      {
        type: "tip",
        body: "Anxiety as passenger = You make decisions. Anxiety is present, but you choose based on values, not anxiety.",
      },
      {
        type: "text",
        body: "This doesn't mean anxiety disappears. It means anxiety doesn't get to decide. You can feel anxious and still choose to do what matters to you.",
      },
      {
        type: "text",
        body: "Think of it like this: You're driving a car. Anxiety is in the passenger seat, maybe yelling or giving directions. But you're still the one driving. You can acknowledge anxiety without letting it take the wheel.",
      },
      {
        type: "text",
        body: "The more you practice this, the easier it becomes. You learn that you can feel anxious and still make choices based on values. Anxiety doesn't have to control you.",
      },
      {
        type: "tip",
        body: "You're the driver. Anxiety is a passenger. You can acknowledge it without letting it control you.",
      },
      {
        type: "text",
        body: "This is the goal: Not eliminating anxiety, but living your life even when anxiety is present. Anxiety can be along for the ride, but you're driving.",
      },
      {
        type: "text",
        body: "Remember: You don't have to like having anxiety as a passenger. You just have to be willing to drive anyway, knowing anxiety is there but doesn't get to decide where you go.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing Values Over Comfort
   *
   * Format: Practice lesson
   * Focus: Experiential practice in values-based choices
   */
  values_over_comfort_practicing: {
    id: "values_over_comfort_practicing",
    moduleId: "values_over_comfort",
    title: "Practicing Values Over Comfort",
    goal: "Practice making choices based on values, not comfort",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice choosing values over comfort. We'll start by identifying what matters to you, then practice choosing it even when it's uncomfortable.",
      },
      {
        t: "instruction",
        body: "First, think about what matters to you. What are your values? What do you care about? (e.g., connection, growth, contribution, authenticity, creativity)",
      },
      { t: "timer", seconds: 45, label: "Identify your values" },
      {
        t: "instruction",
        body: "Now think about a recent time when you chose comfort over values. Maybe you avoided something because of anxiety, or chose the easier path. What did you choose comfort over?",
      },
      { t: "timer", seconds: 45, label: "Identify a comfort choice" },
      {
        t: "instruction",
        body: "Now think about what you could have done differently. If you had chosen values over comfort, what would that have looked like? What action would have aligned with your values?",
      },
      { t: "timer", seconds: 45, label: "Identify a values-based alternative" },
      {
        t: "instruction",
        body: "Notice the difference. Comfort-seeking feels easier in the moment, but values-based living feels more meaningful. Which serves you long-term?",
      },
      { t: "timer", seconds: 30, label: "Notice the difference" },
      {
        t: "instruction",
        body: "Now practice this: Think of one small thing you could do today that aligns with your values, even if it creates some anxiety. What's one small step?",
      },
      { t: "timer", seconds: 45, label: "Identify one small values-based action" },
      {
        t: "instruction",
        body: "Remember: You're the driver. Anxiety is a passenger. You can feel anxious and still choose what matters to you. Meaning outlasts calm.",
      },
      {
        t: "instruction",
        body: "The more you practice choosing values over comfort, the easier it becomes. You learn that you can handle discomfort, and that meaning sustains you even when you're not calm.",
      },
      {
        t: "check",
        prompt: "I can choose values over comfort, even when it creates anxiety.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Values-Based Life
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for values-based living
   */
  values_over_comfort_build_life: {
    id: "values_over_comfort_build_life",
    moduleId: "values_over_comfort",
    title: "Building Your Values-Based Life",
    goal: "Create a personal reference for values-based living",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "I can choose values over comfort, even when it's uncomfortable",
            kind: "check",
          },
          {
            label: "Meaning outlasts calm—meaning sustains me even when I'm not calm",
            kind: "check",
          },
          {
            label: "Anxiety is a passenger, not a driver—I'm in control of my choices",
            kind: "check",
          },
          {
            label: "I can feel anxious and still live by my values",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Values",
        items: [
          {
            label: "Connection or relationships",
            kind: "check",
          },
          {
            label: "Growth or learning",
            kind: "check",
          },
          {
            label: "Contribution or helping others",
            kind: "check",
          },
          {
            label: "Authenticity or being true to myself",
            kind: "check",
          },
          {
            label: "Creativity or self-expression",
            kind: "check",
          },
          {
            label: "Adventure or new experiences",
            kind: "check",
          },
          {
            label: "Other values that matter to me",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Values-Based Choices",
        items: [
          {
            label: "I can choose values over comfort, even when it creates anxiety",
            kind: "check",
          },
          {
            label: "I can feel anxious and still do what matters to me",
            kind: "check",
          },
          {
            label: "I'm the driver; anxiety is a passenger",
            kind: "check",
          },
          {
            label: "I prioritize meaning over immediate comfort",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Values-Based Action",
        items: [
          {
            label:
              "Write one values-based action you'll take this week, even if it creates some anxiety",
            kind: "shortText",
            inputId: "values_action",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
