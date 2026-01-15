import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Acceptance vs Resignation" lesson definitions.
 *
 * Phase 4: Relationship - Module 12
 *
 * These lessons help users understand the difference between acceptance and resignation.
 * They cover:
 * - What acceptance *isn't*
 * - Why allowing reduces intensity
 * - Willingness as strength
 */
export const ACCEPTANCE_VS_RESIGNATION_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Acceptance vs Resignation: The Key Difference
   *
   * Format: Card lesson
   * Focus: Understanding the fundamental difference between acceptance and resignation
   */
  acceptance_vs_resignation_difference: {
    id: "acceptance_vs_resignation_difference",
    moduleId: "acceptance_vs_resignation",
    title: "Acceptance vs Resignation: The Key Difference",
    goal: "Understand the difference between acceptance and resignation",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Acceptance and resignation sound similar, but they're fundamentally different. Understanding the difference is crucial for working with anxiety skillfully.",
      },
      {
        type: "text",
        body: "Resignation is giving up. It's saying: 'I can't do anything about this, so I'll just suffer.' It's passive, hopeless, and disempowering. Resignation means you've stopped trying.",
      },
      {
        type: "tip",
        body: "Resignation = Giving up, passive, hopeless. 'I can't do anything, so I'll just suffer.'",
      },
      {
        type: "text",
        body: "Acceptance is active willingness. It's saying: 'This is what's happening right now, and I'm willing to experience it while I take action.' It's active, empowering, and allows for change.",
      },
      {
        type: "tip",
        body: "Acceptance = Active willingness, empowering, allows for action. 'This is happening, and I'm willing to experience it while I act.'",
      },
      {
        type: "text",
        body: "The key difference: Resignation means you've given up. Acceptance means you're willing to experience what's happening while you work with it.",
      },
      {
        type: "text",
        body: "Acceptance doesn't mean you like anxiety or want it. It means you're willing to feel it without fighting it, which paradoxically reduces its intensity.",
      },
      {
        type: "text",
        body: "When you accept anxiety, you're not saying 'I'm okay with this forever.' You're saying 'I'm willing to feel this right now, and I can still take action.'",
      },
      {
        type: "tip",
        body: "Acceptance = Willingness to feel anxiety while taking action. Resignation = Giving up and just suffering.",
      },
      {
        type: "text",
        body: "Acceptance is a skill you can practice. It's not about being passive—it's about being willing to experience what's happening while you respond skillfully.",
      },
      {
        type: "text",
        body: "The paradox: Fighting anxiety makes it stronger. Accepting anxiety (being willing to feel it) makes it weaker. It's counterintuitive, but it's true.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. What Acceptance Isn't
   *
   * Format: Card lesson
   * Focus: Clarifying common misconceptions about acceptance
   */
  acceptance_vs_resignation_what_isnt: {
    id: "acceptance_vs_resignation_what_isnt",
    moduleId: "acceptance_vs_resignation",
    title: "What Acceptance Isn't",
    goal: "Clarify common misconceptions about acceptance",
    format: "card",
    cards: [
      {
        type: "text",
        body: "There are many misconceptions about acceptance. Understanding what acceptance isn't helps you understand what it actually is.",
      },
      {
        type: "text",
        body: "Acceptance isn't giving up. You're not saying 'I'll just live with anxiety forever.' You're saying 'I'm willing to feel this right now while I work with it.'",
      },
      {
        type: "tip",
        body: "Acceptance ≠ Giving up. It's willingness to feel while working with anxiety.",
      },
      {
        type: "text",
        body: "Acceptance isn't liking anxiety or wanting it. You don't have to like anxiety to accept it. You can hate it and still be willing to feel it.",
      },
      {
        type: "text",
        body: "Acceptance isn't being passive. You're not just sitting there doing nothing. You're actively choosing to feel anxiety while you take action.",
      },
      {
        type: "tip",
        body: "Acceptance ≠ Passivity. It's active willingness to feel while taking action.",
      },
      {
        type: "text",
        body: "Acceptance isn't pretending anxiety isn't there. You're not ignoring it or denying it. You're acknowledging it's there and being willing to feel it.",
      },
      {
        type: "text",
        body: "Acceptance isn't resignation. You're not giving up hope or stopping trying. You're choosing to work with anxiety instead of against it.",
      },
      {
        type: "text",
        body: "Acceptance is: Willingness to experience anxiety while taking action. It's active, empowering, and allows for change. It's a skill you can practice.",
      },
      {
        type: "tip",
        body: "Acceptance = Active willingness to feel anxiety while taking action. It's a skill, not a state of being.",
      },
      {
        type: "text",
        body: "The more you understand what acceptance isn't, the clearer it becomes what it actually is: a powerful skill for working with anxiety instead of against it.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Why Allowing Reduces Intensity
   *
   * Format: Card lesson
   * Focus: Understanding the paradox of how acceptance reduces anxiety
   */
  acceptance_vs_resignation_why_reduces: {
    id: "acceptance_vs_resignation_why_reduces",
    moduleId: "acceptance_vs_resignation",
    title: "Why Allowing Reduces Intensity",
    goal: "Understand how acceptance paradoxically reduces anxiety intensity",
    format: "card",
    cards: [
      {
        type: "text",
        body: "It seems counterintuitive: How can allowing anxiety reduce its intensity? Shouldn't fighting it make it go away? But the opposite is true.",
      },
      {
        type: "text",
        body: "When you fight anxiety, you create tension. Your body tenses against the anxiety, which your nervous system interprets as more threat, which creates more anxiety. Fighting amplifies anxiety.",
      },
      {
        type: "tip",
        body: "Fighting anxiety = Creating tension = More threat signal = More anxiety. Fighting amplifies anxiety.",
      },
      {
        type: "text",
        body: "When you allow anxiety, you stop fighting. You're not creating tension against it. Your nervous system doesn't interpret your response as more threat, so anxiety doesn't amplify.",
      },
      {
        type: "text",
        body: "Allowing anxiety doesn't mean you're okay with it. It means you're willing to feel it without fighting it. That willingness removes the tension that amplifies anxiety.",
      },
      {
        type: "tip",
        body: "Allowing anxiety = No tension = No amplification. Willingness removes the fuel that makes anxiety stronger.",
      },
      {
        type: "text",
        body: "Think of it like this: If you're in quicksand, struggling makes you sink faster. Relaxing and allowing yourself to float helps you stay on the surface. Anxiety works similarly.",
      },
      {
        type: "text",
        body: "When you allow anxiety, you're working with your body's natural process instead of against it. Your body knows how to return to baseline—you just need to stop fighting it.",
      },
      {
        type: "text",
        body: "This doesn't mean anxiety disappears immediately. It means it doesn't amplify. It can still be intense, but it doesn't get stronger from your fighting. And over time, allowing helps it pass more quickly.",
      },
      {
        type: "tip",
        body: "Allowing doesn't make anxiety disappear—it prevents amplification and helps it pass more quickly.",
      },
      {
        type: "text",
        body: "The more you practice allowing, the more you see this paradox in action: Fighting makes anxiety stronger, allowing makes it weaker. It's counterintuitive, but it's true.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing Acceptance
   *
   * Format: Practice lesson
   * Focus: Experiential practice in acceptance
   */
  acceptance_vs_resignation_practicing: {
    id: "acceptance_vs_resignation_practicing",
    moduleId: "acceptance_vs_resignation",
    title: "Practicing Acceptance",
    goal: "Practice acceptance as active willingness",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice acceptance. Remember: Acceptance is active willingness to feel anxiety while taking action, not passive resignation.",
      },
      {
        t: "instruction",
        body: "First, notice if there's any anxiety present right now. It doesn't have to be intense—just notice what's there.",
      },
      { t: "timer", seconds: 20, label: "Notice any anxiety present" },
      {
        t: "instruction",
        body: "Now, practice acceptance. Say to yourself: 'Anxiety is here. I don't like it, but I'm willing to feel it right now.' Notice the difference between fighting it and allowing it.",
      },
      { t: "timer", seconds: 30, label: "Practice acceptance" },
      {
        t: "instruction",
        body: "Notice what happens when you allow anxiety instead of fighting it. Does the intensity change? Does it feel different? You're not trying to make it go away—just noticing what happens when you allow it.",
      },
      { t: "timer", seconds: 30, label: "Notice what happens when you allow it" },
      {
        t: "instruction",
        body: "Now practice this: 'I'm willing to feel this anxiety, and I can still take action.' Notice how acceptance allows for action, while resignation doesn't.",
      },
      { t: "timer", seconds: 30, label: "Practice willingness with action" },
      {
        t: "instruction",
        body: "Take a slow breath. Notice that you can breathe while allowing anxiety. You're not fighting it—you're feeling it while you breathe. This is acceptance in action.",
      },
      { t: "breath", pattern: "box", rounds: 3 },
      {
        t: "instruction",
        body: "Remember: Acceptance is a skill you practice. You don't have to do it perfectly. The more you practice, the easier it becomes to allow anxiety without fighting it.",
      },
      {
        t: "instruction",
        body: "The paradox: Fighting anxiety makes it stronger. Allowing anxiety makes it weaker. Practice allowing, and notice how it changes your relationship with anxiety.",
      },
      {
        t: "check",
        prompt: "I can practice acceptance as active willingness to feel anxiety while taking action.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Acceptance Practice
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for acceptance practice
   */
  acceptance_vs_resignation_build_practice: {
    id: "acceptance_vs_resignation_build_practice",
    moduleId: "acceptance_vs_resignation",
    title: "Building Your Acceptance Practice",
    goal: "Create a personal reference for acceptance practice",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Acceptance is active willingness, not passive resignation",
            kind: "check",
          },
          {
            label: "Acceptance doesn't mean I like anxiety—it means I'm willing to feel it",
            kind: "check",
          },
          {
            label: "Fighting anxiety makes it stronger; allowing makes it weaker",
            kind: "check",
          },
          {
            label: "Acceptance allows for action; resignation doesn't",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "What Acceptance Isn't",
        items: [
          {
            label: "Acceptance is NOT giving up",
            kind: "check",
          },
          {
            label: "Acceptance is NOT liking anxiety",
            kind: "check",
          },
          {
            label: "Acceptance is NOT being passive",
            kind: "check",
          },
          {
            label: "Acceptance is NOT pretending anxiety isn't there",
            kind: "check",
          },
          {
            label: "Acceptance is NOT resignation",
            kind: "check",
          },
        ],
        minRequired: 3,
      },
      {
        title: "What Acceptance Is",
        items: [
          {
            label: "Willingness to experience anxiety while taking action",
            kind: "check",
          },
          {
            label: "Active choice to feel anxiety without fighting it",
            kind: "check",
          },
          {
            label: "Acknowledging anxiety is there and being willing to feel it",
            kind: "check",
          },
          {
            label: "A skill I can practice",
            kind: "check",
          },
        ],
        minRequired: 3,
      },
      {
        title: "My Acceptance Practice",
        items: [
          {
            label: "I can say: 'Anxiety is here. I'm willing to feel it.'",
            kind: "check",
          },
          {
            label: "I can allow anxiety without fighting it",
            kind: "check",
          },
          {
            label: "I can feel anxiety and still take action",
            kind: "check",
          },
          {
            label: "I notice that allowing reduces intensity over time",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Acceptance Reminder",
        items: [
          {
            label: "Write an acceptance reminder you can use (e.g., 'I'm willing to feel this while I act,' 'Allowing reduces intensity')",
            kind: "shortText",
            inputId: "acceptance_reminder",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}

