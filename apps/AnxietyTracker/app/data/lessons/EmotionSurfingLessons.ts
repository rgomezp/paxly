import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Emotion Surfing" lesson definitions.
 *
 * Phase 3: Regulation - Module 10
 *
 * These lessons help users learn to ride out emotions like waves. They cover:
 * - Waves metaphor
 * - Why feelings peak and fall
 * - What "riding it out" actually means
 */
export const EMOTION_SURFING_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Emotions as Waves
   *
   * Format: Card lesson
   * Focus: Understanding emotions using the waves metaphor
   */
  emotion_surfing_waves_metaphor: {
    id: "emotion_surfing_waves_metaphor",
    moduleId: "emotion_surfing",
    title: "Emotions as Waves",
    goal: "Understand emotions using the waves metaphor",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Emotions are like waves. They build, peak, and then fall. Understanding this helps you ride them out instead of fighting them.",
      },
      {
        type: "text",
        body: "Think about a wave in the ocean. It starts small, builds as it approaches the shore, peaks at the crest, and then falls as it breaks. Emotions work the same way.",
      },
      {
        type: "tip",
        body: "Emotions = Waves. They build, peak, and fall. You can't stop a wave, but you can learn to ride it.",
      },
      {
        type: "text",
        body: "When anxiety shows up, it's like a wave building. The intensity increases as it approaches its peak. This is when it feels most overwhelming—when the wave is at its highest point.",
      },
      {
        type: "text",
        body: "But here's what's true: Every wave peaks and then falls. No wave stays at its peak forever. The same is true for emotions—they peak and then subside, even when it feels like they'll last forever.",
      },
      {
        type: "tip",
        body: "Every emotion peaks and falls. The peak feels permanent, but it's temporary. The wave will break.",
      },
      {
        type: "text",
        body: "The problem is that when you're in the middle of an emotional wave, it feels like it will never end. But that's part of the wave—the intensity makes it feel permanent, even though it's not.",
      },
      {
        type: "text",
        body: "Understanding emotions as waves helps you ride them out. You don't try to stop the wave—you can't. Instead, you learn to surf it, to stay with it as it builds, peaks, and falls.",
      },
      {
        type: "text",
        body: "Surfing a wave doesn't mean you like it or want it. It means you're willing to experience it, to stay with it, knowing it will pass. You're not fighting the wave—you're riding it.",
      },
      {
        type: "tip",
        body: "Surfing = Willingness to experience the emotion, knowing it will pass. Not fighting, not avoiding—just riding.",
      },
      {
        type: "text",
        body: "The more you practice emotion surfing, the easier it becomes. You learn that emotions peak and fall, that you can handle the intensity, and that fighting the wave makes it worse.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Feelings Peak and Fall
   *
   * Format: Card lesson
   * Focus: Understanding the natural cycle of emotions
   */
  emotion_surfing_peak_and_fall: {
    id: "emotion_surfing_peak_and_fall",
    moduleId: "emotion_surfing",
    title: "Why Feelings Peak and Fall",
    goal: "Understand why emotions naturally peak and fall",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Emotions peak and fall because that's how your nervous system works. Intense activation can't be sustained forever—your body naturally returns to baseline.",
      },
      {
        type: "text",
        body: "When anxiety activates, your nervous system releases stress hormones like adrenaline. These create the intense physical sensations and emotional intensity you feel.",
      },
      {
        type: "tip",
        body: "Emotions peak because of stress hormones. They fall because your body can't sustain that intensity forever.",
      },
      {
        type: "text",
        body: "But here's the thing: Your body has built-in mechanisms to return to baseline. Stress hormones are metabolized. Your nervous system naturally seeks balance. The intensity can't last forever.",
      },
      {
        type: "text",
        body: "The peak feels like it will last forever, but it's actually temporary. Your body is designed to return to a more manageable state. It's biology, not willpower.",
      },
      {
        type: "text",
        body: "When you fight the emotion or try to make it stop, you can actually prolong it. Fighting creates more tension, which your nervous system interprets as more threat, which can extend the emotional wave.",
      },
      {
        type: "tip",
        body: "Fighting emotions can prolong them. Allowing them can help them pass more quickly.",
      },
      {
        type: "text",
        body: "When you allow the emotion to be there, you're working with your body's natural process instead of against it. You're not trying to stop the wave—you're letting it complete its cycle.",
      },
      {
        type: "text",
        body: "This doesn't mean you have to like the emotion or want it. It just means you're willing to experience it, knowing it will pass. You're trusting your body's natural process.",
      },
      {
        type: "text",
        body: "Every time you ride out an emotional wave, you're building evidence that you can handle it. You're learning that emotions peak and fall, that you can survive the intensity, and that your body knows how to return to baseline.",
      },
      {
        type: "text",
        body: "The more you practice, the more you trust the process. You learn that even intense emotions pass, that you can handle them, and that fighting them makes them worse.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. What "Riding It Out" Actually Means
   *
   * Format: Card lesson
   * Focus: Understanding what it means to ride out emotions
   */
  emotion_surfing_riding_it_out: {
    id: "emotion_surfing_riding_it_out",
    moduleId: "emotion_surfing",
    title: "What 'Riding It Out' Actually Means",
    goal: "Understand what it means to ride out emotions skillfully",
    format: "card",
    cards: [
      {
        type: "text",
        body: "'Riding it out' sounds simple, but it's actually a skill. It means staying with the emotion as it builds, peaks, and falls, without fighting it or trying to make it stop.",
      },
      {
        type: "text",
        body: "Riding it out doesn't mean you're passive or resigned. It means you're actively choosing to experience the emotion, to stay present with it, knowing it will pass.",
      },
      {
        type: "tip",
        body: "Riding it out = Active willingness to experience the emotion, not passive resignation.",
      },
      {
        type: "text",
        body: "It means acknowledging the emotion is there: 'Anxiety is here. This is intense. I can feel this.' You're not pretending it's not happening or trying to escape it.",
      },
      {
        type: "text",
        body: "It means staying present with the physical sensations. Noticing where anxiety lives in your body—tight chest, racing heart, tension. Not fighting the sensations, just noticing them.",
      },
      {
        type: "text",
        body: "It means allowing the emotion to be there without trying to change it. You're not trying to make anxiety go away—you're letting it be there while you continue to breathe and stay present.",
      },
      {
        type: "tip",
        body: "Riding it out = Allowing the emotion to be there while staying present, not trying to change it.",
      },
      {
        type: "text",
        body: "It means trusting the process. Knowing that emotions peak and fall, that your body knows how to return to baseline, and that you can handle the intensity.",
      },
      {
        type: "text",
        body: "It doesn't mean you have to like it or want it. You can hate the emotion and still ride it out. You can wish it would stop and still allow it to be there.",
      },
      {
        type: "text",
        body: "Riding it out is a practice. You don't have to do it perfectly. Sometimes you'll fight the wave, and that's okay. The skill is noticing when you're fighting and gently returning to riding.",
      },
      {
        type: "text",
        body: "The more you practice, the easier it becomes. You learn that you can handle intense emotions, that they pass, and that fighting them makes them worse. You build confidence in your ability to ride the waves.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing Emotion Surfing
   *
   * Format: Practice lesson
   * Focus: Experiential practice in emotion surfing
   */
  emotion_surfing_practicing: {
    id: "emotion_surfing_practicing",
    moduleId: "emotion_surfing",
    title: "Practicing Emotion Surfing",
    goal: "Practice riding out emotions like waves",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice emotion surfing. We'll start by noticing any emotion you're feeling right now—it doesn't have to be anxiety. Any emotion works for practice.",
      },
      {
        t: "instruction",
        body: "First, notice what emotion is present. Is there anxiety? Sadness? Irritation? Joy? Just notice what's there without judgment.",
      },
      { t: "timer", seconds: 20, label: "Notice what emotion is present" },
      {
        t: "instruction",
        body: "Now, acknowledge it's there. Say to yourself: '[Emotion] is here. This is what I'm feeling right now.' You're not trying to change it—just acknowledging it.",
      },
      { t: "timer", seconds: 15, label: "Acknowledge the emotion" },
      {
        t: "instruction",
        body: "Notice where you feel it in your body. Where does this emotion live? In your chest? Stomach? Throat? Just notice the physical sensations without trying to change them.",
      },
      { t: "timer", seconds: 30, label: "Notice physical sensations" },
      {
        t: "instruction",
        body: "Now, practice staying with it. Take a slow breath. Notice the emotion is still there. That's okay. You're not trying to make it go away—you're just staying present with it.",
      },
      { t: "breath", pattern: "box", rounds: 3 },
      {
        t: "instruction",
        body: "Notice if the intensity has changed at all. Has it peaked? Is it building? Is it falling? Just notice without trying to control it.",
      },
      { t: "timer", seconds: 20, label: "Notice any changes in intensity" },
      {
        t: "instruction",
        body: "Remember: Emotions are like waves. They build, peak, and fall. You're practicing riding the wave, not stopping it. You're staying with it, knowing it will pass.",
      },
      {
        t: "instruction",
        body: "This is emotion surfing—acknowledging the emotion, staying present with it, and trusting that it will pass. The more you practice, the easier it becomes.",
      },
      {
        t: "check",
        prompt: "I can ride out emotions like waves, staying present with them as they build, peak, and fall.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Emotion Surfing Skills
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for emotion surfing
   */
  emotion_surfing_build_skills: {
    id: "emotion_surfing_build_skills",
    moduleId: "emotion_surfing",
    title: "Building Your Emotion Surfing Skills",
    goal: "Create a personal reference for emotion surfing",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Emotions are like waves—they build, peak, and fall",
            kind: "check",
          },
          {
            label: "Every emotion peaks and falls—the peak feels permanent but is temporary",
            kind: "check",
          },
          {
            label: "Riding it out means staying present with the emotion, not fighting it",
            kind: "check",
          },
          {
            label: "Fighting emotions can prolong them; allowing them helps them pass",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Emotion Surfing Practice",
        items: [
          {
            label: "I acknowledge the emotion is there",
            kind: "check",
          },
          {
            label: "I notice where I feel it in my body",
            kind: "check",
          },
          {
            label: "I stay present with it without trying to change it",
            kind: "check",
          },
          {
            label: "I breathe slowly while allowing the emotion to be there",
            kind: "check",
          },
          {
            label: "I trust that emotions peak and fall naturally",
            kind: "check",
          },
        ],
        minRequired: 3,
      },
      {
        title: "What I Notice About Emotions",
        items: [
          {
            label: "Emotions do peak and fall, even when they feel permanent",
            kind: "check",
          },
          {
            label: "Fighting emotions makes them worse",
            kind: "check",
          },
          {
            label: "Allowing emotions helps them pass more quickly",
            kind: "check",
          },
          {
            label: "I can handle intense emotions",
            kind: "check",
          },
          {
            label: "My body knows how to return to baseline",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Emotion Surfing Reminder",
        items: [
          {
            label: "Write a reminder you can use when emotions feel intense (e.g., 'This is a wave, it will pass,' 'I can ride this out')",
            kind: "shortText",
            inputId: "surfing_reminder",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}

