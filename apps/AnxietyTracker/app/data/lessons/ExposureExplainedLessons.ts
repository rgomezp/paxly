import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Exposure Explained (Without Fear)" lesson definitions.
 *
 * Phase 5: Action - Module 15
 *
 * These lessons help users understand exposure therapy in a non-threatening way.
 * They cover:
 * - What exposure *actually* is
 * - Why small + repeated works
 * - Prediction vs outcome learning
 *
 * This pairs beautifully with your **Tiny Exposure** lesson.
 */
export const EXPOSURE_EXPLAINED_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. What Exposure Actually Is
   *
   * Format: Card lesson
   * Focus: Demystifying exposure therapy
   */
  exposure_explained_what_is_it: {
    id: "exposure_explained_what_is_it",
    moduleId: "exposure_explained",
    title: "What Exposure Actually Is",
    goal: "Understand what exposure therapy actually is, without fear",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Exposure therapy sounds scary, but it's actually simple: It's facing what you're avoiding, in small steps, until it's no longer scary.",
      },
      {
        type: "text",
        body: "That's it. Exposure isn't about throwing yourself into your worst fear. It's about taking small, manageable steps toward what you're avoiding, one step at a time.",
      },
      {
        type: "tip",
        body: "Exposure = Facing what you're avoiding, in small steps, until it's no longer scary. It's not about overwhelming yourself.",
      },
      {
        type: "text",
        body: "The goal of exposure isn't to eliminate anxiety. It's to learn that you can handle anxiety and that what you're avoiding isn't as dangerous as you thought.",
      },
      {
        type: "text",
        body: "When you avoid something, your brain learns: 'That thing is dangerous, and I can't handle it.' When you face it, your brain learns: 'I can handle it, even with anxiety.'",
      },
      {
        type: "tip",
        body: "Avoidance teaches: 'I can't handle it.' Exposure teaches: 'I can handle it, even with anxiety.'",
      },
      {
        type: "text",
        body: "Exposure works because it gives your brain new information. Instead of only knowing 'I avoid this and feel relief,' your brain learns 'I faced this and survived, even with anxiety.'",
      },
      {
        type: "text",
        body: "The key is starting small. You don't have to face your biggest fear first. You can start with something that's challenging but manageable, and build from there.",
      },
      {
        type: "text",
        body: "Exposure is about learning, not about being brave. You're not trying to prove anything—you're just giving your brain new information about what you can handle.",
      },
      {
        type: "tip",
        body: "Exposure = Learning, not bravery. You're giving your brain new information, not proving anything.",
      },
      {
        type: "text",
        body: "Remember: Exposure isn't about eliminating anxiety. It's about learning that you can live your life even when anxiety is present. That's the real goal.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Small + Repeated Works
   *
   * Format: Card lesson
   * Focus: Understanding the science behind gradual exposure
   */
  exposure_explained_small_repeated: {
    id: "exposure_explained_small_repeated",
    moduleId: "exposure_explained",
    title: "Why Small + Repeated Works",
    goal: "Understand why gradual, repeated exposure is effective",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Exposure works best when it's small and repeated. Understanding why helps you do it in a way that's effective, not overwhelming.",
      },
      {
        type: "text",
        body: "Small means starting with something that's challenging but manageable. If you're afraid of crowds, you don't start with a concert. You might start with a small group, or even just being near people.",
      },
      {
        type: "tip",
        body: "Small = Challenging but manageable. Start where you are, not where you think you should be.",
      },
      {
        type: "text",
        body: "Small exposure works because it's not overwhelming. When you're not completely overwhelmed, your brain can actually learn. When you're overwhelmed, your brain just goes into survival mode.",
      },
      {
        type: "text",
        body: "Repeated means doing it multiple times. One exposure isn't enough—your brain needs repetition to learn. The more you face something, the more your brain learns: 'I can handle this.'",
      },
      {
        type: "tip",
        body: "Repeated = Multiple times. Your brain needs repetition to learn new information.",
      },
      {
        type: "text",
        body: "Each repetition builds on the last. The first time you face something, it's scary. The second time, it's still scary but maybe a little less. The third time, even less. Over time, it becomes manageable.",
      },
      {
        type: "text",
        body: "The combination of small + repeated is powerful. Small makes it manageable. Repeated makes it stick. Together, they help your brain learn that you can handle what you're avoiding.",
      },
      {
        type: "text",
        body: "You don't have to do it perfectly. Some days will be harder than others. That's okay. What matters is the overall pattern: small steps, repeated over time.",
      },
      {
        type: "tip",
        body: "Small + repeated = Manageable learning. You don't have to be perfect—just consistent.",
      },
      {
        type: "text",
        body: "Remember: Progress isn't linear. You might have good days and hard days. What matters is that you're moving in the right direction: toward facing instead of avoiding.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Prediction vs Outcome Learning
   *
   * Format: Card lesson
   * Focus: Understanding how exposure changes predictions
   */
  exposure_explained_prediction_vs_outcome: {
    id: "exposure_explained_prediction_vs_outcome",
    moduleId: "exposure_explained",
    title: "Prediction vs Outcome Learning",
    goal: "Understand how exposure changes your predictions about outcomes",
    format: "card",
    cards: [
      {
        type: "text",
        body: "When you avoid something, your brain makes predictions: 'If I do that, something bad will happen.' But because you avoid, you never learn if the prediction was true.",
      },
      {
        type: "text",
        body: "Exposure lets you test your predictions. You face what you're avoiding and see what actually happens. Usually, the outcome is different from what you predicted.",
      },
      {
        type: "tip",
        body: "Avoidance = Predictions without testing. Exposure = Testing predictions and learning the actual outcome.",
      },
      {
        type: "text",
        body: "Your brain might predict: 'If I go to that party, I'll have a panic attack.' But when you actually go, you might feel anxious but not panic. Or you might panic, but you handle it. The outcome is different from the prediction.",
      },
      {
        type: "text",
        body: "Each time you face something and the outcome is different from your prediction, your brain learns. It updates its predictions. Over time, your predictions become more accurate and less catastrophic.",
      },
      {
        type: "tip",
        body: "Each exposure = New information. Your brain updates its predictions based on actual outcomes, not fears.",
      },
      {
        type: "text",
        body: "This is why exposure works: It gives your brain real data instead of just predictions. Your brain learns from experience, not from fear.",
      },
      {
        type: "text",
        body: "You might still predict that something will be scary. But after exposure, you also know: 'Even if it's scary, I can handle it.' That's the key learning.",
      },
      {
        type: "text",
        body: "The goal isn't to never predict danger. The goal is to have accurate predictions based on experience, not fear. Exposure gives you that experience.",
      },
      {
        type: "tip",
        body: "Exposure = Learning from experience, not fear. Your predictions become accurate, not just scary.",
      },
      {
        type: "text",
        body: "Remember: You're not trying to eliminate predictions. You're trying to make them accurate based on actual outcomes, not catastrophic fears.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing Small Exposure
   *
   * Format: Practice lesson
   * Focus: Experiential practice in small exposure
   */
  exposure_explained_practicing: {
    id: "exposure_explained_practicing",
    moduleId: "exposure_explained",
    title: "Practicing Small Exposure",
    goal: "Practice planning and doing small exposure",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice exposure. Remember: Small and repeated is the key. We'll start by identifying something small you can face.",
      },
      {
        t: "instruction",
        body: "Think about something you avoid because of anxiety. It doesn't have to be big—just something you typically avoid. What comes to mind?",
      },
      { t: "timer", seconds: 30, label: "Identify something you avoid" },
      {
        t: "instruction",
        body: "Now, think about a small version of that. If you avoid crowds, maybe a small version is being near a few people. If you avoid driving, maybe a small version is driving around the block. What's a small step?",
      },
      { t: "timer", seconds: 45, label: "Identify a small step" },
      {
        t: "instruction",
        body: "Before you do it, notice your prediction. What do you think will happen? What are you afraid of? Just notice the prediction without judging it.",
      },
      { t: "timer", seconds: 30, label: "Notice your prediction" },
      {
        t: "instruction",
        body: "Now, if you're ready, take that small step. Do the small exposure. Notice what happens. What's the actual outcome?",
      },
      { t: "timer", seconds: 60, label: "Do the small exposure (if ready)" },
      {
        t: "instruction",
        body: "Afterward, compare your prediction to the outcome. Was it different? What did you learn?",
      },
      { t: "timer", seconds: 30, label: "Compare prediction to outcome" },
      {
        t: "instruction",
        body: "Remember: The goal isn't to eliminate anxiety. The goal is to learn that you can handle it. Even if you felt anxious, did you handle it?",
      },
      {
        t: "instruction",
        body: "This is exposure: Small steps, repeated over time, learning from actual outcomes instead of just predictions. Every small step counts.",
      },
      {
        t: "check",
        prompt: "I can practice small exposure and learn from actual outcomes instead of just predictions.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Exposure Plan
   *
   * Format: Builder lesson
   * Focus: Create a personal exposure plan
   */
  exposure_explained_build_plan: {
    id: "exposure_explained_build_plan",
    moduleId: "exposure_explained",
    title: "Building Your Exposure Plan",
    goal: "Create a personal plan for gradual exposure",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Exposure is facing what I'm avoiding, in small steps, until it's no longer scary",
            kind: "check",
          },
          {
            label: "Small + repeated exposure works best",
            kind: "check",
          },
          {
            label: "Exposure helps me learn from actual outcomes, not just predictions",
            kind: "check",
          },
          {
            label: "The goal is learning I can handle it, not eliminating anxiety",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "What I'm Avoiding",
        items: [
          {
            label: "Social situations or events",
            kind: "check",
          },
          {
            label: "Certain places or locations",
            kind: "check",
          },
          {
            label: "Driving or transportation",
            kind: "check",
          },
          {
            label: "Crowded or public places",
            kind: "check",
          },
          {
            label: "Specific activities or experiences",
            kind: "check",
          },
          {
            label: "Other things I avoid",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Small Steps Forward",
        items: [
          {
            label: "Step 1: (Write a very small step you can take)",
            kind: "shortText",
            inputId: "exposure_step_1",
          },
          {
            label: "Step 2: (Write the next small step)",
            kind: "shortText",
            inputId: "exposure_step_2",
          },
          {
            label: "Step 3: (Write another small step)",
            kind: "shortText",
            inputId: "exposure_step_3",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Exposure Practice",
        items: [
          {
            label: "I'll start small and build gradually",
            kind: "check",
          },
          {
            label: "I'll repeat exposures multiple times",
            kind: "check",
          },
          {
            label: "I'll notice my predictions and compare them to actual outcomes",
            kind: "check",
          },
          {
            label: "I'll remember the goal is learning, not eliminating anxiety",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
}

