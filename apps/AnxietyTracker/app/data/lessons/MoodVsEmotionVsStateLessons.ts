import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Mood vs Emotion vs State" lesson definitions.
 *
 * Phase 1: Foundations - Module 4
 *
 * These lessons help users understand the difference between moods, emotions, and states.
 * They cover:
 * - Moods last hours–days
 * - Emotions last minutes
 * - States fluctuate moment to moment
 *
 * Key learning: What you feel ≠ who you are.
 */
export const MOOD_VS_EMOTION_VS_STATE_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Mood vs Emotion vs State: Understanding the Difference
   *
   * Format: Card lesson
   * Focus: Understanding the three different time scales of experience
   */
  mood_vs_emotion_vs_state_understanding: {
    id: "mood_vs_emotion_vs_state_understanding",
    moduleId: "mood_vs_emotion_vs_state",
    title: "Mood vs Emotion vs State: Understanding the Difference",
    goal: "Understand how moods, emotions, and states differ in duration and intensity",
    format: "card",
    cards: [
      {
        type: "text",
        body: "What you're feeling right now might be a mood, an emotion, or a state. Understanding the difference helps you respond more skillfully to each.",
      },
      {
        type: "text",
        body: "Moods last hours to days. They're like the weather—cloudy for a while, then sunny, then cloudy again. A mood might be 'anxious' or 'irritable' or 'down' and it sticks around for a while.",
      },
      {
        type: "tip",
        body: "Mood = The emotional climate that lasts hours or days. It's the background feeling that colors your experience.",
      },
      {
        type: "text",
        body: "Emotions last minutes. They're like waves—they build, peak, and then fade. Fear, anger, joy, sadness—these are emotions. They're intense but temporary.",
      },
      {
        type: "tip",
        body: "Emotion = A wave of feeling that peaks and passes, usually within minutes. It's intense but brief.",
      },
      {
        type: "text",
        body: "States fluctuate moment to moment. They're like the surface of water—constantly changing. You might feel calm, then anxious, then calm again, all within a few minutes.",
      },
      {
        type: "tip",
        body: "State = Your moment-to-moment experience. It changes constantly, like ripples on water.",
      },
      {
        type: "text",
        body: "Here's why this matters: If you're in an anxious mood (lasting hours), you might have moments of calm (state) or spikes of panic (emotion). They're all different layers of experience.",
      },
      {
        type: "text",
        body: "Understanding which layer you're experiencing helps you know what to expect. A mood will stick around. An emotion will pass. A state will change.",
      },
      {
        type: "text",
        body: "Most importantly: None of these define who you are. They're experiences you're having, not identities you are. You can feel anxious without being an anxious person.",
      },
      {
        type: "tip",
        body: "What you feel ≠ who you are. Feelings are experiences, not identities.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why This Distinction Matters
   *
   * Format: Card lesson
   * Focus: Understanding why distinguishing between moods, emotions, and states is important
   */
  mood_vs_emotion_vs_state_why_matters: {
    id: "mood_vs_emotion_vs_state_why_matters",
    moduleId: "mood_vs_emotion_vs_state",
    title: "Why This Distinction Matters",
    goal: "Understand why distinguishing between moods, emotions, and states helps",
    format: "card",
    cards: [
      {
        type: "text",
        body: "When you don't understand the difference between moods, emotions, and states, everything can feel permanent and overwhelming. But when you do understand, you can respond more skillfully.",
      },
      {
        type: "text",
        body: "If you think an emotion (which lasts minutes) is a mood (which lasts hours), you might panic: 'This is going to last all day!' But emotions pass. Knowing this helps you ride them out.",
      },
      {
        type: "tip",
        body: "Emotions feel permanent when they're happening, but they always pass. Recognizing them as emotions (not moods) helps you wait them out.",
      },
      {
        type: "text",
        body: "If you think a state (moment-to-moment) is who you are, you might believe: 'I'm an anxious person' or 'I'm broken.' But states change constantly. You're not your state.",
      },
      {
        type: "tip",
        body: "States are temporary. You're not your current state—you're the one experiencing the state.",
      },
      {
        type: "text",
        body: "If you're in an anxious mood (lasting hours), you might have moments of calm. Those calm moments are real, even if the mood is still anxious. You don't have to wait for the mood to change to experience calm.",
      },
      {
        type: "text",
        body: "Understanding the layers helps you know what to expect. A mood might last, but you can still have moments of relief. An emotion will pass, even if it feels permanent. A state will change, even if it feels stuck.",
      },
      {
        type: "text",
        body: "This distinction also helps you avoid the trap of thinking 'I'm anxious' as an identity. Instead, you can think 'I'm experiencing anxiety' as a temporary experience.",
      },
      {
        type: "tip",
        body: "'I'm anxious' sounds permanent. 'I'm experiencing anxiety' sounds temporary. Language matters.",
      },
      {
        type: "text",
        body: "When you understand these layers, you can work with each one appropriately. You can ride out emotions, notice states changing, and be patient with moods while still finding moments of relief.",
      },
      {
        type: "text",
        body: "Most importantly: You can experience difficult feelings without believing they define you. You can feel anxious without being an anxious person. You can feel down without being a depressed person.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Noticing Your Layers of Experience
   *
   * Format: Practice lesson
   * Focus: Experiential practice in noticing moods, emotions, and states
   */
  mood_vs_emotion_vs_state_noticing_layers: {
    id: "mood_vs_emotion_vs_state_noticing_layers",
    moduleId: "mood_vs_emotion_vs_state",
    title: "Noticing Your Layers of Experience",
    goal: "Practice noticing the different layers of your experience",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Right now, take a moment to notice what you're experiencing. There are likely multiple layers happening at once.",
      },
      {
        t: "instruction",
        body: "First, notice your state—your moment-to-moment experience right now. Are you feeling calm? Anxious? Neutral? Tired? This can change from moment to moment.",
      },
      { t: "timer", seconds: 20, label: "Notice your current state" },
      {
        t: "instruction",
        body: "Now notice any emotions—waves of feeling that are building, peaking, or fading. Are you feeling any fear, anger, joy, sadness, or other emotions right now?",
      },
      { t: "timer", seconds: 20, label: "Notice any emotions present" },
      {
        t: "instruction",
        body: "Now notice your mood—the emotional climate that's been present for the last few hours. Has there been an underlying anxious mood? Irritable mood? Calm mood? This is the background feeling.",
      },
      { t: "timer", seconds: 20, label: "Notice your mood over the last few hours" },
      {
        t: "instruction",
        body: "Notice how these layers are different. Your state might be calm right now, even if your mood has been anxious. An emotion might spike and then fade, even while your mood stays the same.",
      },
      { t: "timer", seconds: 30, label: "Notice how the layers differ" },
      {
        t: "instruction",
        body: "Now try this: Notice that you can observe all of these layers. You're not just the mood, or the emotion, or the state. You're the one noticing them. That's important.",
      },
      { t: "timer", seconds: 20, label: "Notice that you can observe these layers" },
      {
        t: "instruction",
        body: "Practice this language: Instead of 'I'm anxious,' try 'I'm experiencing an anxious mood' or 'I'm feeling anxiety right now.' Notice how that feels different.",
      },
      { t: "timer", seconds: 30, label: "Practice the language shift" },
      {
        t: "instruction",
        body: "Remember: What you feel is not who you are. You can experience difficult feelings without them defining you. You're the one experiencing, not the experience itself.",
      },
      {
        t: "check",
        prompt: "I can notice my moods, emotions, and states without believing they define me.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. My Experience with Moods, Emotions, and States
   *
   * Format: Journal lesson
   * Focus: Personal reflection on experiences with different layers
   */
  mood_vs_emotion_vs_state_my_experience: {
    id: "mood_vs_emotion_vs_state_my_experience",
    moduleId: "mood_vs_emotion_vs_state",
    title: "My Experience with Moods, Emotions, and States",
    goal: "Reflect on your personal experiences with moods, emotions, and states",
    format: "journal",
    template: "custom",
    fields: [
      {
        name: "mood_experience",
        kind: "longText",
        label: "What moods do you tend to experience? (e.g., anxious mood lasting hours/days, irritable mood, down mood) How long do they typically last?",
        minWords: 20,
      },
      {
        name: "emotion_experience",
        kind: "longText",
        label: "What emotions do you experience? (e.g., fear, anger, sadness, joy) How long do they typically last? Do they feel permanent when they're happening?",
        minWords: 20,
      },
      {
        name: "state_experience",
        kind: "longText",
        label: "How do your states change throughout the day? Do you notice moments of calm even in anxious moods? Do states fluctuate moment to moment?",
        minWords: 20,
      },
      {
        name: "identity_trap",
        kind: "longText",
        label: "Have you ever believed that what you feel defines who you are? (e.g., 'I'm an anxious person,' 'I'm broken') How does understanding moods/emotions/states change that?",
        minWords: 20,
      },
      {
        name: "language_shift",
        kind: "longText",
        label: "How might you describe your experience differently using this framework? (e.g., 'I'm experiencing an anxious mood' instead of 'I'm anxious')",
        minWords: 20,
      },
    ],
    autosaveTag: "mood_emotion_state_experience",
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Understanding of Moods, Emotions, and States
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for understanding these layers
   */
  mood_vs_emotion_vs_state_build_understanding: {
    id: "mood_vs_emotion_vs_state_build_understanding",
    moduleId: "mood_vs_emotion_vs_state",
    title: "Building Your Understanding of Moods, Emotions, and States",
    goal: "Create a personal reference for understanding your layers of experience",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Moods last hours to days (like weather)",
            kind: "check",
          },
          {
            label: "Emotions last minutes (like waves)",
            kind: "check",
          },
          {
            label: "States fluctuate moment to moment (like ripples)",
            kind: "check",
          },
          {
            label: "What I feel ≠ who I am",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Typical Experience",
        items: [
          {
            label: "I experience anxious moods (lasting hours/days)",
            kind: "check",
          },
          {
            label: "I experience anxious emotions (lasting minutes)",
            kind: "check",
          },
          {
            label: "I notice my states changing moment to moment",
            kind: "check",
          },
          {
            label: "I can have calm moments even in anxious moods",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "Language I Want to Use",
        items: [
          {
            label: "Instead of 'I'm anxious,' I'll say 'I'm experiencing anxiety'",
            kind: "check",
          },
          {
            label: "Instead of 'I'm an anxious person,' I'll say 'I experience anxiety'",
            kind: "check",
          },
          {
            label: "I'll notice when I'm confusing moods, emotions, and states",
            kind: "check",
          },
          {
            label: "I'll remember that what I feel is temporary, not permanent",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Key Insight",
        items: [
          {
            label: "Write one key insight about moods, emotions, and states that you want to remember",
            kind: "shortText",
            inputId: "key_insight",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}

