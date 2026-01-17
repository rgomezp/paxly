import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Anxiety About Anxiety" lesson definitions.
 *
 * Phase 4: Relationship - Module 11
 *
 * These lessons help users understand secondary fear and anxiety about anxiety itself.
 * They cover:
 * - Secondary fear
 * - "What if this never stops?"
 * - Why panic disorder persists
 *
 * This lesson alone can change trajectories.
 */
export const ANXIETY_ABOUT_ANXIETY_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. What Is Anxiety About Anxiety?
   *
   * Format: Card lesson
   * Focus: Understanding secondary fear and anxiety about anxiety itself
   */
  anxiety_about_anxiety_what_is_it: {
    id: "anxiety_about_anxiety_what_is_it",
    moduleId: "anxiety_about_anxiety",
    title: "What Is Anxiety About Anxiety?",
    goal: "Understand secondary fear and anxiety about anxiety itself",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety about anxiety is when you're not just anxious—you're anxious about being anxious. It's fear of the fear itself, and it's one of the main reasons anxiety persists.",
      },
      {
        type: "text",
        body: "Here's how it works: You feel anxious (primary anxiety). Then you think: 'Oh no, I'm anxious again. What if this never stops? What if I'm losing control? What if I'm going crazy?' That's anxiety about anxiety (secondary fear).",
      },
      {
        type: "tip",
        body: "Anxiety about anxiety = Fear of the fear itself. Primary anxiety + secondary fear = More intense anxiety.",
      },
      {
        type: "text",
        body: "Secondary fear amplifies primary anxiety. You're not just feeling anxious—you're also afraid of what the anxiety means, how long it will last, and whether you can handle it.",
      },
      {
        type: "text",
        body: "Common thoughts in anxiety about anxiety: 'What if this never stops?' 'What if I'm losing my mind?' 'What if I can't handle this?' 'What if I have a panic attack?' 'What if people notice?'",
      },
      {
        type: "text",
        body: "These thoughts create more anxiety, which creates more fear about the anxiety, which creates more anxiety. It's a feedback loop that keeps anxiety going.",
      },
      {
        type: "tip",
        body: "Anxiety about anxiety creates a feedback loop: Anxiety → Fear of anxiety → More anxiety → More fear → More anxiety.",
      },
      {
        type: "text",
        body: "Understanding anxiety about anxiety is crucial because it's often the secondary fear that keeps anxiety going, not the primary anxiety itself. Primary anxiety might pass, but secondary fear keeps it alive.",
      },
      {
        type: "text",
        body: "The good news: Once you understand anxiety about anxiety, you can work with it. You can notice the secondary fear and respond to it differently, which breaks the feedback loop.",
      },
      {
        type: "text",
        body: "The key is recognizing when you're anxious about being anxious. When you notice that, you can say: 'This is anxiety about anxiety. This is secondary fear amplifying primary anxiety. I can work with this.'",
      },
      {
        type: "text",
        body: "Breaking free from anxiety about anxiety is often the turning point in anxiety recovery. Once you stop fearing the fear, anxiety loses much of its power.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. "What If This Never Stops?"
   *
   * Format: Card lesson
   * Focus: Addressing the fear that anxiety will never end
   */
  anxiety_about_anxiety_never_stops: {
    id: "anxiety_about_anxiety_never_stops",
    moduleId: "anxiety_about_anxiety",
    title: "'What If This Never Stops?'",
    goal: "Address the fear that anxiety will never end",
    format: "card",
    cards: [
      {
        type: "text",
        body: "'What if this never stops?' is one of the most common and powerful thoughts in anxiety about anxiety. It's the fear that you'll be anxious forever, that you'll never feel normal again.",
      },
      {
        type: "text",
        body: "Here's what's true: The feeling that anxiety will never stop is part of the anxiety itself. It's not a prediction—it's a symptom. When you're in the middle of anxiety, it feels permanent, but that's the anxiety talking.",
      },
      {
        type: "tip",
        body: "The feeling that anxiety will never stop is a symptom of anxiety, not a fact about the future.",
      },
      {
        type: "text",
        body: "Think about it: Have you ever had anxiety that truly never stopped? Every anxiety episode you've had has ended. Every panic attack has passed. Every wave of worry has subsided.",
      },
      {
        type: "text",
        body: "The thought 'this will never stop' feels true when you're anxious, but it's not. Anxiety always passes. It might come back, but it always passes. You have evidence of this from every anxiety episode you've survived.",
      },
      {
        type: "tip",
        body: "Every anxiety episode you've had has ended. The thought 'this will never stop' is anxiety, not truth.",
      },
      {
        type: "text",
        body: "When you notice the thought 'what if this never stops?', you can respond to it: 'This is anxiety about anxiety. This thought feels true, but it's not. Anxiety always passes, and this will too.'",
      },
      {
        type: "text",
        body: "You don't have to believe the thought. You can notice it, acknowledge it's there, and then remind yourself: 'This is a thought, not a fact. Anxiety passes. I've survived every episode before, and I'll survive this one.'",
      },
      {
        type: "text",
        body: "The more you practice this, the less power the thought has. You learn that 'what if this never stops?' is anxiety about anxiety, not a prediction. You learn to let the thought be there without believing it.",
      },
      {
        type: "text",
        body: "Remember: Anxiety feels permanent when it's happening, but it's not. The feeling of permanence is part of the anxiety itself. Understanding this helps you ride it out instead of getting caught in the fear.",
      },
      {
        type: "text",
        body: "Breaking free from 'what if this never stops?' is often a major turning point. Once you stop believing that thought, anxiety loses much of its power to terrify you.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Why Panic Disorder Persists
   *
   * Format: Card lesson
   * Focus: Understanding how anxiety about anxiety keeps panic disorder going
   */
  anxiety_about_anxiety_panic_disorder: {
    id: "anxiety_about_anxiety_panic_disorder",
    moduleId: "anxiety_about_anxiety",
    title: "Why Panic Disorder Persists",
    goal: "Understand how anxiety about anxiety keeps panic disorder going",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Panic disorder persists largely because of anxiety about anxiety. It's not just the panic attacks—it's the fear of having another panic attack that keeps the cycle going.",
      },
      {
        type: "text",
        body: "Here's the cycle: You have a panic attack. It's terrifying. Then you become afraid of having another one. That fear itself creates anxiety, which makes you more likely to have another panic attack.",
      },
      {
        type: "tip",
        body: "Panic disorder cycle: Panic attack → Fear of another attack → Anxiety → More likely to panic → Panic attack → Fear of another attack...",
      },
      {
        type: "text",
        body: "The fear of panic becomes a trigger for panic. You might avoid situations where you've had panic attacks, or you might constantly scan your body for signs of panic, which creates more anxiety.",
      },
      {
        type: "text",
        body: "This is anxiety about anxiety in action. You're not just afraid of panic attacks—you're afraid of being afraid. That secondary fear keeps the panic cycle going.",
      },
      {
        type: "text",
        body: "Breaking the cycle requires addressing the anxiety about anxiety. It means learning to tolerate the fear of panic without trying to avoid it or make it stop.",
      },
      {
        type: "tip",
        body: "Breaking panic disorder = Addressing anxiety about anxiety, not just panic attacks themselves.",
      },
      {
        type: "text",
        body: "When you stop fearing panic attacks, they lose much of their power. You can have panic sensations without the catastrophic fear about what they mean. You can ride them out knowing they'll pass.",
      },
      {
        type: "text",
        body: "This doesn't mean you have to like panic attacks. It means you can stop being afraid of them, which breaks the cycle. You can have panic sensations without the secondary fear that amplifies them.",
      },
      {
        type: "text",
        body: "The key insight: Panic disorder persists because of anxiety about anxiety. Once you address that, panic attacks often become less frequent and less intense, or they stop altogether.",
      },
      {
        type: "text",
        body: "Understanding this is often the turning point in panic disorder recovery. Once you see how anxiety about anxiety keeps panic going, you can work with it differently and break the cycle.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Breaking Free from Anxiety About Anxiety
   *
   * Format: Practice lesson
   * Focus: Experiential practice in working with anxiety about anxiety
   */
  anxiety_about_anxiety_breaking_free: {
    id: "anxiety_about_anxiety_breaking_free",
    moduleId: "anxiety_about_anxiety",
    title: "Breaking Free from Anxiety About Anxiety",
    goal: "Practice working with anxiety about anxiety",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice working with anxiety about anxiety. This is a crucial skill that can change your relationship with anxiety.",
      },
      {
        t: "instruction",
        body: "First, think about a time when you felt anxious about being anxious. Maybe you thought 'what if this never stops?' or 'what if I'm losing control?' Notice what that felt like.",
      },
      { t: "timer", seconds: 30, label: "Recall a time of anxiety about anxiety" },
      {
        t: "instruction",
        body: "Now, notice the difference between primary anxiety (the initial anxiety) and secondary fear (anxiety about the anxiety). Can you see how the secondary fear amplified the primary anxiety?",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Notice the difference between primary and secondary fear",
      },
      {
        t: "instruction",
        body: "Practice this reframe: When you notice anxiety about anxiety, say to yourself: 'This is anxiety about anxiety. This is secondary fear amplifying primary anxiety. I can work with this.'",
      },
      { t: "timer", seconds: 30, label: "Practice the reframe" },
      {
        t: "instruction",
        body: "Now practice responding to the thought 'what if this never stops?' Say to yourself: 'This is a thought, not a fact. Anxiety always passes. I've survived every episode before, and I'll survive this one.'",
      },
      { t: "timer", seconds: 30, label: "Practice responding to 'never stops' thought" },
      {
        t: "instruction",
        body: "Notice how recognizing anxiety about anxiety changes your relationship with it. You're not fighting it or believing it—you're seeing it for what it is: secondary fear that amplifies primary anxiety.",
      },
      { t: "timer", seconds: 20, label: "Notice the shift" },
      {
        t: "instruction",
        body: "Practice this: The next time you feel anxious, pause and ask: 'Am I also anxious about being anxious?' If yes, acknowledge it: 'This is anxiety about anxiety. I can work with this.'",
      },
      {
        t: "instruction",
        body: "Remember: Breaking free from anxiety about anxiety is often the turning point. Once you stop fearing the fear, anxiety loses much of its power.",
      },
      {
        t: "check",
        prompt: "I can recognize anxiety about anxiety and work with it differently.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Understanding of Anxiety About Anxiety
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for anxiety about anxiety
   */
  anxiety_about_anxiety_build_understanding: {
    id: "anxiety_about_anxiety_build_understanding",
    moduleId: "anxiety_about_anxiety",
    title: "Building Your Understanding of Anxiety About Anxiety",
    goal: "Create a personal reference for anxiety about anxiety",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Anxiety about anxiety is secondary fear that amplifies primary anxiety",
            kind: "check",
          },
          {
            label: "The thought 'what if this never stops?' is anxiety, not truth",
            kind: "check",
          },
          {
            label: "Anxiety about anxiety creates a feedback loop that keeps anxiety going",
            kind: "check",
          },
          {
            label: "Breaking free from anxiety about anxiety is often the turning point",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Anxiety About Anxiety Thoughts",
        items: [
          {
            label: "'What if this never stops?'",
            kind: "check",
          },
          {
            label: "'What if I'm losing my mind?'",
            kind: "check",
          },
          {
            label: "'What if I can't handle this?'",
            kind: "check",
          },
          {
            label: "'What if I have a panic attack?'",
            kind: "check",
          },
          {
            label: "'What if people notice?'",
            kind: "check",
          },
          {
            label: "'What if I'm going crazy?'",
            kind: "check",
          },
          {
            label: "Other anxiety about anxiety thoughts",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Response to Anxiety About Anxiety",
        items: [
          {
            label: "I can recognize when I'm anxious about being anxious",
            kind: "check",
          },
          {
            label: "I can distinguish between primary anxiety and secondary fear",
            kind: "check",
          },
          {
            label: "I can remind myself that 'what if this never stops?' is anxiety, not truth",
            kind: "check",
          },
          {
            label: "I can work with anxiety about anxiety instead of fighting it",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Reminder",
        items: [
          {
            label:
              "Write a reminder you can use when you notice anxiety about anxiety (e.g., 'This is secondary fear, not truth,' 'Anxiety always passes')",
            kind: "shortText",
            inputId: "anxiety_about_anxiety_reminder",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
